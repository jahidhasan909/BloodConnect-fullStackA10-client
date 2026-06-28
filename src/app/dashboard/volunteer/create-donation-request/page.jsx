"use client";

import { Check } from "@gravity-ui/icons";
import {
    Button,
    Form,
    Input,
    Label,
    TextField,
    FieldError,
    Select,
    ListBox,
    DatePicker,
    Calendar,
    DateField,
    TextArea,

} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Loader from "@/Components/Shared/Loading";
import toast from "react-hot-toast";



export default function CreateDonationRequestvolunteer() {



    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
        reset
    } = useForm();




    const selectedDistrict = watch("district");


    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);



    useEffect(() => {
        const loadData = async () => {
            try {
                const [districtRes, upazilaRes] = await Promise.all([
                    fetch("/districts.json"),
                    fetch("/upazilas.json"),
                ]);

                const districtData = await districtRes.json();
                const upazilaData = await upazilaRes.json();


                setDistricts(districtData?.[2]?.data || []);
                setUpazilas(upazilaData?.[2]?.data || []);
            } catch (error) {
                toast.error("Failed to load location", error);
            }
        };

        loadData();
    }, []);


    const filteredUpazilas = upazilas.filter(
        (u) => u.district_id === selectedDistrict
    );


    const { data: userData, isPending } = authClient.useSession()

    if (isPending) {
        return <Loader></Loader>
    }

    const user = userData?.user

    if (user.status === 'block' || user.status === 'blocked') {
        return <div className=" text-red-500">you are blocked user </div>
    }

    const formatTime12Hour = (time24) => {
        let [hour, minute] = time24.split(":");
        hour = Number(hour);

        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;

        return `${hour}:${minute} ${ampm}`;
    };


    const formatDate = (date) => {
        const dates = new Date(date);
        return dates.toISOString().split("T")[0];
    };


    const baseurl = process.env.NEXT_PUBLIC_BASE_URL

    const onSubmit = async (data) => {



        const districtName = districts.find((districtss) => districtss.id === data.district
        )?.name;

        const upazilaName = upazilas.find((upazilass) => upazilass.id === data.upazila
        )?.name;




        const requestInfo = {
            requesterName: user?.name,
            requesterEmail: user?.email,
            recipientDistrict: districtName,
            recipientUpazila: upazilaName,
            bloodGroup: data.bloodGroup,
            recipientName: data.recipientName,
            hospitalName: data.hospitalName,
            fullAddressLine: data.fullAddressLine,
            donationDate: formatDate(data.donationDate),
            donationTime: formatTime12Hour(data.donationTime),
            requestMessage: data.requestMessage,
            donationStatus: 'pending'
        };


        const res = await fetch(`${baseurl}/api/donationrequest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...requestInfo })
        })

        const requestData = await res.json()

        if (requestData.insertedId) {

            toast.success('Blood donation request created successfully!')
            reset();
        }







    };












    return (
        <div className="bg-white/10 min-h-screen py-10">

        <div className="relative  max-w-7xl mx-auto ">


            <div className="relative z-10 w-full  rounded-[2rem] bg-white dark:bg-white/20 p-8 shadow-xl border border-slate-100 md:p-12">
                <div className="mb-8 border-b border-slate-100 pb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        Create Blood Donation Request
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-gray-300">
                        Please update the structural recipient and medical terminal attributes to locate compatible donors.
                    </p>
                </div>



                <Form className="flex flex-col gap-6 w-full " onSubmit={handleSubmit(onSubmit)} validationBehavior="native">



                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center opacity-5 pointer-events-none mix-blend-multiply w-full rounded-2xl"
                        style={{
                            backgroundImage: "url('https://i.ibb.co.com/JjtCjy4m/Screenshot-2026-06-19-at-11-15-06-PM.png')"
                        }}
                    />


                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2  p-4 rounded-xl border border-slate-100 z-50">
                        <TextField isReadOnly name="requesterName" defaultValue={user?.name}>
                            <Label className="text-xs font-semibold ">Requester Name</Label>
                            <Input className=" cursor-not-allowed dark:bg-white/17" variant="bordered" radius="md" />
                        </TextField>

                        <TextField isReadOnly name="requesterEmail" defaultValue={user?.email}>
                            <Label className="text-xs font-semibold ">Requester Email</Label>
                            <Input className=" cursor-not-allowed dark:bg-white/17" variant="bordered" radius="md" />
                        </TextField>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 z-50">
                        <TextField isRequired name="recipientName">
                            <Label className="text-xs font-semibold text-slate-700 dark:text-gray-300">Recipient Name</Label>
                            <Input {...register("recipientName", { required: true })} placeholder="Enter patient name" className={'dark:bg-white/17'} variant="bordered" radius="md" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>


                        <div className="flex flex-col gap-1 z-50">
                            <Label className="text-xs font-semibold text-slate-700 dark:text-gray-300">Blood Group</Label>
                            <Controller
                            
                                name="bloodGroup"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                    
                                        selectedKey={field.value}
                                        onSelectionChange={field.onChange}
                                        className="w-full "
                                        placeholder="Select blood group"
                                        variant="bordered"
                                        radius="md"

                                        popoverProps={{
                                            placement: "bottom",
                                            portalContainer: typeof document !== 'undefined' ? document.body : undefined
                                        }}
                                    >
                                        <Select.Trigger className={'dark:bg-white/17'}>
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>

                                        <Select.Popover>
                                            <ListBox className="dark:bg-white/17">
                                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                                                    <ListBox.Item key={group} id={group}>
                                                        {group}
                                                    </ListBox.Item>
                                                ))}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                )}
                            />
                            {errors.bloodGroup && <FieldError className="text-xs text-red-500 mt-1">Blood group is required</FieldError>}
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 z-50">
                        <div className="flex flex-col gap-1">
                            <Label>District</Label>
                            <Controller
                                isRequired
                                name="district"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="w-full border border-gray-100 rounded-xl  p-2 bg-white dark:bg-white/17"
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setValue("upazila", "");
                                        }}
                                    >
                                        <option value="">Select district</option>
                                        {districts.map((district) => (
                                            <option key={district.id} value={district.id}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-50">
                            <Label>Upazila</Label>
                            <Controller
                                isRequired
                                name="upazila"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="w-full border rounded-xl dark:bg-white/17     border-gray-100 p-2 bg-white"
                                    >
                                        <option value="">Select upazila</option>
                                        {filteredUpazilas.map((upazila) => (
                                            <option key={upazila.id} value={upazila.id}>
                                                {upazila.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 z-50">
                        <TextField isRequired name="hospitalName">
                            <Label className="text-xs font-semibold text-slate-700 dark:text-gray-300">Hospital Name</Label>
                            <Input {...register("hospitalName", { required: true })} placeholder="e.g., Dhaka Medical College Hospital" className={'dark:bg-white/17'} variant="bordered" radius="md" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>

                        <TextField isRequired name="fullAddressLine">
                            <Label className="text-xs font-semibold text-slate-700 dark:text-gray-300">Full Address Line</Label>
                            <Input {...register("fullAddressLine", { required: true })} placeholder="e.g., Zahir Raihan Rd, Dhaka" className={'dark:bg-white/17'} variant="bordered" radius="md" />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-end z-50">

                        <div className="flex flex-col gap-1 z-50">

                            <Label className="text-xs font-semibold text-slate-700 dark:text-gray-300">Donation Date</Label>

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

                                        <DateField.Group className="border dark:bg-white/17 rounded-lg h-[42px] px-3 flex items-center bg-white">
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
                            {errors.donationDate && <FieldError className="text-xs text-red-500">{errors.donationDate.message}</FieldError>}
                        </div>

                        <TextField className={'z-50'}>

                            <Label className="text-xs font-semibold dark:text-gray-300 text-slate-700">Donation Time</Label>
                            <input
                                type="time"
                                {...register("donationTime", {
                                    required: "Donation time is required",
                                })}
                                className="w-full h-[42px] px-3 rounded-xl dark:bg-white/17 bg-white border border-gray-100 z-50"
                            />
                        </TextField>

                    </div>

















                    <div className="flex flex-col gap-1.5 z-50">
                        <label htmlFor="requestMessage" className="text-xs font-semibold dark:text-gray-300 text-slate-700">
                            Request Message (Detailed Medical Necessity Reason)
                        </label>
                        <TextArea
                            {...register("requestMessage", { required: true })}
                            required
                            id="requestMessage"
                            name="requestMessage"
                            rows={4}
                            placeholder="Provide situational details on why emergency blood is requested..."
                            className="w-full p-3 rounded-xl border dark:bg-white/17 border-slate-100 bg-transparent text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none z-50 bg-white"
                        />
                    </div>


                    <div className="mt-4 flex w-full">
                        <Button
                            type="submit"
                            className="w-full sm:w-full px-8 bg-[#E32636] text-white font-semibold shadow-lg shadow-red-100 hover:bg-[#c91e2c]"
                        >
                            <Check className="mr-2 h-4 w-4" />
                            Request Blood Donation
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
        </div>
    );
}