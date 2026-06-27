"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    Form,
    Input,
    Label,
    TextField,
    FieldError,
    Avatar
} from "@heroui/react";
import { Edit2, Save, X, ShieldAlert, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Shared/Loading";

export default function ProfileDonor({ userData }) {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const genders = ["Male", "Female", "Other"];


    const { register, handleSubmit, reset: update, control, watch, setValue, formState: { errors } } = useForm();


    const selectedDistrictId = watch("district");

    useEffect(() => {
        const initializeProfileData = async () => {
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

                if (userData) {

                    const currentDistrictObj = fetchedDistricts.find(d => d.name === userData.district);
                    const currentUpazilaObj = fetchedUpazilas.find(u => u.name === userData.upazila);


                    update({
                        name: userData.name || "",
                        bloodGroup: userData.bloodGroup || "",
                        gender: userData.gender || "",
                        image: userData.image || "",
                        district: currentDistrictObj ? currentDistrictObj.id : "",
                        upazila: currentUpazilaObj ? currentUpazilaObj.id : "",
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to load profile settings:", error);
                setLoading(false);
            }
        };

        if (userData) {
            initializeProfileData();
        }
    }, [userData, update]);


    const filteredUpazilas = upazilas.filter(
        (upazila) => upazila.district_id === selectedDistrictId
    );


    const onFormSubmit = async (data) => {
        setSubmitting(true);


        const selectedDistrictObj = districts.find(d => d.id === data.district);
        const selectedUpazilaObj = upazilas.find(u => u.id === data.upazila);

        const finalPayload = {
            name: data.name,
            bloodGroup: data.bloodGroup,
            gender: data.gender,
            district: selectedDistrictObj ? selectedDistrictObj.name : data.district,
            upazila: selectedUpazilaObj ? selectedUpazilaObj.name : data.upazila,
        };

        try {

            const res = await fetch(`${baseurl}/api/own/edit/users?email=${userData?.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalPayload),
            });

            if (res.ok) {
                setIsEditable(false);
                router.refresh()
            } else {
                console.error("Failed to update profile request.");
            }
        } catch (error) {
            console.error("Error updating profile database:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div ><Loader></Loader></div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mt-10">


            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
                <div className="flex items-center gap-4">
                    <Avatar size="lg" className="w-16 h-16 ring-2 ring-red-100 dark:ring-slate-800">
                        <Avatar.Image alt="userimage" src={userData?.image} />
                        <Avatar.Fallback>{userData?.name?.substring(0, 2).toUpperCase()}</Avatar.Fallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{userData?.name}</h1>

                            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                                {userData?.role}
                            </span>

                            {userData?.status === "active" ? (
                                <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-md">
                                    <CheckCircle className="w-3 h-3" /> Active
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md">
                                    <ShieldAlert className="w-3 h-3" /> {userData?.status}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">Manage your profile and account details</p>
                    </div>
                </div>

                <div>
                    {!isEditable ? (
                        <Button
                            onPress={() => setIsEditable(true)}
                            className="bg-[#db0000] dark:bg-slate-100 text-white dark:text-slate-900 font-semibold flex items-center gap-2 rounded-xl px-4 h-10 text-sm"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </Button>
                    ) : (
                        <Button
                            onPress={() => {
                                setIsEditable(false);
                                router.refresh();
                            }}
                            variant="bordered"
                            className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold flex items-center gap-2 rounded-xl px-4 h-10 text-sm"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </Button>
                    )}
                </div>
            </div>

            {/* Main Profile Form */}
            <Form className="space-y-5" onSubmit={handleSubmit(onFormSubmit)}>

                {/* Full Name */}
                <TextField isInvalid={!!errors.name}>
                    <Label className="text-xs font-bold dark:text-slate-300">Full Name</Label>
                    <Input
                        disabled={!isEditable}
                        {...register("name", { required: "Name is required" })}
                        placeholder="Enter your full name"
                    />
                    <FieldError>{errors.name?.message}</FieldError>
                </TextField>

                {/* Email Address - Always Locked */}
                <div className="flex flex-col gap-1">
                    <Label className="text-xs font-bold text-slate-400">Email Address (Locked)</Label>
                    <input
                        type="email"
                        disabled={true}
                        value={userData?.email || ""}
                        className="w-full h-[42px] px-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-400 border border-slate-200 dark:border-slate-800 text-sm focus:outline-hidden"
                    />
                </div>

                {/* Location Grid Dropdowns */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* District Dropdown */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs font-bold dark:text-slate-300">District</Label>
                        <select
                            disabled={!isEditable}
                            {...register("district", {
                                required: "District is required",
                                onChange: () => {
                                    setValue("upazila", "");
                                }
                            })}
                            className="w-full h-[42px] border border-slate-200  rounded-lg p-2 bg-white"
                        >
                            <option defaultValue={userData?.district} value="">Select district</option>
                            {districts.map((district) => (
                                <option key={district.id} value={String(district.id)}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                        {errors.district && <span className="text-xs text-red-500">{errors.district.message}</span>}
                    </div>

                    {/* Upazila Dropdown */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs font-bold dark:text-slate-300">Upazila</Label>
                        <select
                            disabled={!isEditable}
                            {...register("upazila", { required: "Upazila is required" })}
                            className="w-full h-[42px] border border-slate-200  rounded-lg p-2 bg-white"
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

                {/* Blood Group & Gender Grid Dropdowns */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Blood Group Dropdown */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs font-bold dark:text-slate-300">Blood Group</Label>
                        <select
                            disabled={!isEditable}
                            {...register("bloodGroup", { required: "Blood group is required" })}
                            className="w-full h-[42px] border border-slate-200 rounded-lg p-2 bg-white "
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

                    {/* Gender Dropdown (Using Controller as requested) */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs font-bold dark:text-slate-300">Gender</Label>
                        <Controller
                            name="gender"
                            control={control}
                            rules={{ required: "Gender is required" }}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    disabled={!isEditable}
                                    className="w-full h-[42px] border border-slate-200"
                                >
                                    <option value="">Select gender</option>
                                    {genders.map((gender) => (
                                        <option key={gender} value={gender}>
                                            {gender}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        {errors.gender && <span className="text-xs text-red-500">{errors.gender.message}</span>}
                    </div>
                </div>



                {/* Save Changes Button Area */}
                {isEditable && (
                    <div className="flex gap-2 mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <Button
                            type="submit"
                            className="bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors rounded-xl px-5 h-10 text-sm"
                            isLoading={submitting}
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    );
}