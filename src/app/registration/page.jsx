"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Form,
    TextField,
    Label,
    Input,
    Button,
    FieldError,
    Description,
} from "@heroui/react";
import Image from "next/image";
import { uploadImagebb } from "@/lib/action/uploadimgbb";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other"];

export default function RegistrationForm() {
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const selectedDistrict = watch("district");
    const selectedBloodGroup = watch("bloodGroup");

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
                toast.error("Failed to load location data", error);
            }
        };

        loadData();
    }, []);

    const filteredUpazilas = upazilas.filter(
        (u) => u.district_id === selectedDistrict
    );

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const districtName = districts.find(
            (districtss) => districtss.id === data.district
        )?.name;

        const upazilaName = upazilas.find(
            (upazilass) => upazilass.id === data.upazila
        )?.name;

        const imageFile = data.image[0];
        const image = await uploadImagebb(imageFile);

        const userData = {
            name: data.fullName,
            email: data.email,
            password: data.password,
            image: image.url,
            district: districtName,
            upazila: upazilaName,
            bloodGroup: data.bloodGroup,
            gender: data.gender,
        };

        const { data: resdata, error } = await authClient.signUp.email({
            ...userData,
            role: "donor",
            status: "active",
        });

        await fetch(`${baseurl}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: resdata?.user?.id,
                name: data.fullName,
                email: data.email,
                image: image.url,
                district: districtName,
                upazila: upazilaName,
                bloodGroup: data.bloodGroup,
                gender: data.gender,
                role: "donor",
                status: "active",
            }),
        });

        if (resdata) {
            toast.success("Verification complete. Welcome to Bloodconnect");
            redirect("/");
        }
        if (error) {
            toast.error(error);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white font-sans">

            {/* Left Side */}
            <div className="relative flex w-full flex-col justify-center px-8 py-12 md:w-1/2 lg:px-24">


                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-5 pointer-events-none mix-blend-multiply"
                    style={{
                        backgroundImage: "url('https://i.ibb.co.com/JjtCjy4m/Screenshot-2026-06-19-at-11-15-06-PM.png')"
                    }}
                />

                <div className="mx-auto w-full max-w-xl text-left z-50">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Join the Community
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Create your account to connect with donors and help save lives.
                    </p>
                </div>

                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mx-auto mt-8 z-40 flex w-full max-w-xl flex-col gap-5"
                    validationBehavior="native"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-slate-700">Full Name</Label>
                            <TextField isRequired isInvalid={!!errors.fullName} className="w-full">
                                <Input
                                    variant="bordered"
                                    radius="md"
                                    placeholder="John Doe"
                                    {...register("fullName", { required: true })}
                                />
                                {errors.fullName && <FieldError className="mt-1 text-xs text-red-500">Name required</FieldError>}
                            </TextField>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-slate-700">Email Address</Label>
                            <TextField
                                isRequired
                                isInvalid={!!errors.email}
                                className="w-full"
                                validate={(value) => {
                                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return "Please enter a valid email address";
                                    }
                                    return null;
                                }}
                            >
                                <Input
                                    type="email"
                                    variant="bordered"
                                    radius="md"
                                    placeholder="user@example.com"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <FieldError className="mt-1 text-xs text-red-500">Email required</FieldError>}
                                <FieldError />
                            </TextField>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-slate-700">Profile Image</Label>
                            <TextField isRequired className="w-full">
                                <input
                                    className="w-full border border-gray-200 px-3 py-2 text-sm rounded-xl focus:outline-none  focus:ring-2 focus:ring-[#db0000]"
                                    name="image"
                                    type="file"
                                    {...register("image", { required: true })}
                                />
                            </TextField>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-slate-700">Gender</Label>
                            <Controller
                                isRequired
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="w-full border border-gray-200 bg-transparent px-3 py-2 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#db0000]"
                                    >
                                        <option value="">Select gender</option>
                                        {GENDERS.map((gender) => (
                                            <option key={gender} value={gender}>
                                                {gender}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-slate-700">District</Label>
                            <Controller
                                isRequired
                                name="district"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="w-full border border-gray-200 bg-transparent px-3 py-2 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#db0000]"
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

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-slate-700">Upazila</Label>
                            <Controller
                                isRequired
                                name="upazila"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="w-full border border-gray-200 bg-transparent px-3 py-2 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#db0000]"
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

                    <div className="flex flex-col gap-1.5 w-full">
                        <Label className="text-xs font-semibold text-slate-700">Blood Group</Label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-1">
                            {BLOOD_GROUPS.map((bloodgroup) => (
                                <button
                                    key={bloodgroup}
                                    type="button"
                                    onClick={() => setValue("bloodGroup", bloodgroup)}
                                    className={`rounded-md border py-2 text-center text-sm font-semibold transition-all hover:cursor-pointer ${selectedBloodGroup === bloodgroup
                                        ? "border-[#114b5f] bg-[#114b5f] text-white"
                                        : "border-gray-200 bg-white text-slate-600 hover:border-[#114b5f] hover:text-[#114b5f]"
                                        }`}
                                >
                                    {bloodgroup}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mt-2">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-slate-700">Password</Label>
                            <TextField
                                isRequired
                                minLength={8}
                                name="password"
                                className="w-full"
                                validate={(value) => {
                                    if (value.length < 8) return "Min 8 characters required";
                                    if (!/[A-Z]/.test(value)) return "Need 1 uppercase letter";
                                    if (!/[0-9]/.test(value)) return "Need 1 number";
                                    return null;
                                }}
                            >
                                <Input
                                    type="password"
                                    variant="bordered"
                                    radius="md"
                                    placeholder="Enter password"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <FieldError className="mt-1 text-xs text-red-500">Invalid password format</FieldError>}
                                <Description className="text-[9px]">Must be at least 8 characters with 1 uppercase and 1 number</Description>
                                <FieldError />
                            </TextField>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-slate-700">Confirm Password</Label>
                            <TextField isRequired className="w-full">
                                <Input
                                    type="password"
                                    variant="bordered"
                                    radius="md"
                                    placeholder="Confirm password"
                                    {...register("confirmPassword", { required: true })}
                                />
                            </TextField>
                        </div>
                    </div>
                    <div className=" relative overflow-hidden p-1 rounded-lg">
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#E11D48_50%,#E2E8F0_100%)]"
                        />
                        <Button
                            type="submit"
                            className="relative bg-[#db0000] hover:bg-[#db00008b] text-white font-semibold text-base h-12 px-8 rounded-lg transition-all flex items-center justify-center gap-2 w-full "
                            size="lg"
                            radius="md"
                        >
                            Create Account
                        </Button>
                    </div>

                    <div className="mt-2 text-center text-xs font-medium text-slate-500">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-[#db0000] hover:underline">
                            Log In
                        </Link>
                    </div>
                </Form>
            </div>

            {/* Right Side*/}
            <div className="sticky top-0 hidden h-screen w-1/2 md:block">
                <Image
                    src="https://i.ibb.co.com/F4MDJq4w/Chat-GPT-Image-Jun-29-2026-at-05-04-51-AM.png"
                    alt="Registration Banner"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

        </div>
    );
}