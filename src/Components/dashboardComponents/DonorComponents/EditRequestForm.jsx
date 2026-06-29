"use client";

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, Input, Label, TextField, FieldError, DatePicker, DateField, Calendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useRouter } from 'next/navigation';
import Loader from '@/Components/Shared/Loading';
import { ArrowLeft } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'

const EditRequestForm = ({ id }) => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    const { register, handleSubmit, reset: update, control, watch, setValue, formState: { errors } } = useForm();


    const selectedDistrictId = watch("district");

    const formatTime12Hour = (time24) => {
        if (!time24) return "";
        let [hour, minute] = time24.split(":");
        hour = Number(hour);

        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;

        return `${hour}:${minute} ${ampm}`;
    };

    const formatDate = (dateObj) => {
        if (!dateObj) return "";
        return dateObj.toString();
    };

    const formatTime = (time12) => {
        if (!time12) return "";
        const [time, modifier] = time12.split(" ");
        let [hours, minutes] = time.split(":");
        if (hours === "12") hours = "00";
        if (modifier === "PM") hours = parseInt(hours, 10) + 12;
        return `${String(hours).padStart(2, "0")}:${minutes}`;
    };

    useEffect(() => {
        const initializeFormData = async () => {
            try {

                const [districtRes, upazilaRes] = await Promise.all([
                    fetch("/districts.json"),
                    fetch("/upazilas.json")
                ]);

                const districtData = await districtRes.json();
                const upazilaData = await upazilaRes.json();

                const fetchedDistricts = districtData?.[2]?.data || [];
                const fetchedUpazilas = upazilaData?.[2]?.data || [];

                setDistricts(fetchedDistricts);
                setUpazilas(fetchedUpazilas);

                if (id) {
                    const requestRes = await fetch(`${baseurl}/api/donationrequest/get/edit/${id}`);
                    const requestData = await requestRes.json();


                    const currentDistrictObj = fetchedDistricts.find(d => d.name === requestData.recipientDistrict);
                    const currentUpazilaObj = fetchedUpazilas.find(u => u.name === requestData.recipientUpazila);


                    update({
                        recipientName: requestData.recipientName || "",
                        bloodGroup: requestData.bloodGroup || "",
                        hospitalName: requestData.hospitalName || "",
                        fullAddressLine: requestData.fullAddressLine || "",
                        requestMessage: requestData.requestMessage || "",
                        district: currentDistrictObj ? currentDistrictObj.id : "",
                        upazila: currentUpazilaObj ? currentUpazilaObj.id : "",
                        donationDate: requestData.donationDate ? parseDate(requestData.donationDate) : null,
                        donationTime: formatTime(requestData.donationTime)
                    });
                }


                setLoading(false);
            } catch (error) {
                toast.error("Failed to load initial data:", error)
                setLoading(false);
            }
        };

        if (id) {
            initializeFormData();
        }
    }, [id, baseurl, update]);

    const filteredUpazilas = upazilas.filter(
        (upazila) => upazila.district_id === selectedDistrictId
    );

    const onFormSubmit = async (data) => {
        const { data: tokenData } = await authClient.token()
        setSubmitting(true);


        const selectedDistrictObj = districts.find(d => d.id === data.district);
        const selectedUpazilaObj = upazilas.find(u => u.id === data.upazila);

        const finalPayload = {
            recipientName: data.recipientName,
            bloodGroup: data.bloodGroup,
            recipientDistrict: selectedDistrictObj ? selectedDistrictObj.name : data.district,
            recipientUpazila: selectedUpazilaObj ? selectedUpazilaObj.name : data.upazila,
            hospitalName: data.hospitalName,
            fullAddressLine: data.fullAddressLine,
            donationDate: formatDate(data.donationDate),
            donationTime: formatTime12Hour(data.donationTime),
            requestMessage: data.requestMessage
        };

        try {
            const res = await fetch(`${baseurl}/api/donationrequest/edit/${id}`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearar ${tokenData?.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalPayload),
            });

            if (res.ok) {
                toast.success('Donation request updated successfully!')
                router.push(`/dashboard/${user.role}/my-donation-requests`)
                router.refresh();
            } else {
                toast.error('"Failed to update donation request."')

            }
        } catch (error) {
            toast.error("Error updating request:", error)

        } finally {
            setSubmitting(false);
        }
    };

    const { data, isPending } = authClient.useSession()

    const user = data?.user
    if (isPending) {
        return <Loader></Loader>
    }

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
            <Form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit(onFormSubmit)}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {/* Recipient Name */}
                    <TextField className="w-full" isInvalid={!!errors.recipientName}>
                        <Label className="text-xs font-bold dark:text-slate-300">Recipient Name</Label>
                        <Input
                            {...register("recipientName", { required: "Recipient name is required" })}
                            placeholder="Enter recipient name"
                            className={'w-full dark:bg-white/17'}
                        />
                        <FieldError>{errors.recipientName?.message}</FieldError>
                    </TextField>

                    {/* Blood Group */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-xs font-bold dark:text-slate-300">Blood Group</Label>
                        <select
                            {...register("bloodGroup", { required: "Blood group is required" })}
                            className="w-full h-[42px] border dark:border-none rounded-xl p-2 bg-white text-sm focus:outline-hidden dark:bg-white/17"
                        >
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map((group) => (
                                <option key={group} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>
                        {errors.bloodGroup && <span className="text-xs text-red-500">{errors.bloodGroup.message}</span>}
                    </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-end z-50">
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-xs font-bold dark:text-slate-300">Donation Date</Label>
                        <Controller
                            name="donationDate"
                            control={control}
                            rules={{ required: "Donation date is required" }}
                            render={({ field }) => (
                                <DatePicker
                                    className="w-full"
                                    value={field.value || null}
                                    onChange={field.onChange}
                                >
                                    <DateField.Group className="w-full border rounded-xl dark:bg-white/17 border-gray-100 dark:border-none">
                                        <DateField.Input>
                                            {(segment) => <DateField.Segment segment={segment} />}
                                        </DateField.Input>
                                        <DateField.Suffix>
                                            <DatePicker.Trigger>
                                                <DatePicker.TriggerIndicator />
                                            </DatePicker.Trigger>
                                        </DateField.Suffix>
                                    </DateField.Group>
                                    <DatePicker.Popover>
                                        <Calendar>
                                            <Calendar.Grid>
                                                <Calendar.GridBody>
                                                    {(date) => <Calendar.Cell date={date} />}
                                                </Calendar.GridBody>
                                            </Calendar.Grid>
                                        </Calendar>
                                    </DatePicker.Popover>
                                </DatePicker>
                            )}
                        />
                        {errors.donationDate && <span className="text-xs text-red-500">{errors.donationDate.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-xs font-bold dark:text-slate-300">Donation Time</Label>
                        <TextField className={'w-full z-50'}>
                            <input
                                type="time"
                                {...register("donationTime", {
                                    required: "Donation time is required",
                                })}
                                className="w-full h-[42px] px-3 rounded-xl bg-white dark:bg-white/17 border dark:border-none text-sm focus:outline-hidden"
                            />
                        </TextField>
                        {errors.donationTime && <span className="text-xs text-red-500">{errors.donationTime.message}</span>}
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* District Dropdown */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-xs font-bold dark:text-slate-300">District</Label>
                        <select
                            {...register("district", {
                                required: "District is required",
                                onChange: () => {
                                    setValue("upazila", "");
                                }
                            })}
                            className="w-full h-[42px] border dark:border-none dark:bg-white/17 rounded-xl p-2 bg-white text-sm focus:outline-hidden"
                        >
                            <option value="">Select district</option>
                            {districts.map((district) => (
                                <option key={district.id} value={String(district.id)}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                        {errors.district && <span className="text-xs text-red-500">{errors.district.message}</span>}
                    </div>

                    {/* Upazila Dropdown */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-xs font-bold dark:text-slate-300">Upazila</Label>
                        <select
                            {...register("upazila", { required: "Upazila is required" })}
                            className="w-full h-[42px] border dark:border-none rounded-xl p-2 bg-white dark:bg-white/17 text-sm focus:outline-hidden"
                        >
                            <option value="">Select upazila</option>
                            {filteredUpazilas.map((upazila) => (
                                <option key={upazila.id} value={String(upazila.id)}>
                                    {upazila.name}
                                </option>
                            ))}
                        </select>
                        {errors.upazila && <span className="text-xs text-red-500">{errors.upazila.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {/* Hospital Name */}
                    <TextField className="w-full" isInvalid={!!errors.hospitalName}>
                        <Label className="text-xs font-bold dark:text-slate-300">Hospital Name</Label>
                        <Input
                            {...register("hospitalName", { required: "Hospital name is required" })}
                            placeholder="Enter hospital name"
                            className={'w-full dark:bg-white/17'}
                        />
                        <FieldError>{errors.hospitalName?.message}</FieldError>
                    </TextField>

                    {/* Full Address Line */}
                    <TextField className="w-full" isInvalid={!!errors.fullAddressLine}>
                        <Label className="text-xs font-bold dark:text-slate-300">Full Address</Label>
                        <Input
                            {...register("fullAddressLine", { required: "Full address is required" })}
                            placeholder="Specific location details"
                            className={'w-full dark:bg-white/17'}
                        />
                        <FieldError>{errors.fullAddressLine?.message}</FieldError>
                    </TextField>
                </div>

                {/* Request Message */}
                <TextField className="w-full" isInvalid={!!errors.requestMessage}>
                    <Label className="text-xs font-bold dark:text-slate-300">Request Message</Label>
                    <Input
                        {...register("requestMessage", { required: "Message is required" })}
                        placeholder="Explain why blood is needed..."
                        className={'w-full dark:bg-white/17'}
                    />
                    <FieldError>{errors.requestMessage?.message}</FieldError>
                </TextField>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 mt-4">

                    <div className='relative group p-1 rounded-lg overflow-hidden w-full sm:w-auto'>
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#E11D48_50%,#E2E8F0_100%)]"
                        />
                        <Button
                            type="submit"
                            className="relative bg-[#db0000] hover:bg-[#db00008b] text-white font-semibold text-base h-12 px-8 rounded-lg transition-all flex items-center justify-center gap-2 w-full"
                            isLoading={submitting}
                        >
                            Update Request
                        </Button>
                    </div>

                    <Button
                        className={'text-black dark:text-white rounded-lg h-12 px-8 w-full sm:w-auto border border-slate-200 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}
                        type="button"
                        variant="secondary"
                        onClick={() => router.push(`/dashboard/${user.role}/my-donation-requests`)}
                    >
                        Cancel
                    </Button>

                </div>
            </Form>
        </div>
    );
};

export default EditRequestForm;