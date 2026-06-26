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
    Select,
    ListBox,
} from "@heroui/react";
import Image from "next/image";
import { Camera, Person } from "@gravity-ui/icons";
import { uploadImagebb } from "@/lib/action/uploadimgbb";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Link from "next/link";

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
                console.error("Failed to load location data", error);
            }
        };

        loadData();
    }, []);


    const filteredUpazilas = upazilas.filter(
        (u) => u.district_id === selectedDistrict
    );


    const baseurl = process.env.NEXT_PUBLIC_BASE_URL



    const onSubmit = async (data) => {
     
        
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const districtName = districts.find((districtss) => districtss.id === data.district
        )?.name;

        const upazilaName = upazilas.find((upazilass) => upazilass.id === data.upazila
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
            status: 'active'

        })

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
                status: 'active'
            }),
        });


        if (resdata) {
            redirect('/')
        }

        console.log("Form Submitted:", resdata);
        console.log(error, 'error');

    };

    return (
        <div className="flex shadow-md max-w-7xl mx-auto mt-30 mb-10 border border-gray-100 rounded-2xl overflow-hidden">


            <Image
                height={700}
                width={700}
                src="https://i.ibb.co/XfGDt8gw/ndmn-wor5-220606.jpg"
                alt="ResImage"
                className="border-r border-gray-100"
            />


            <div className="flex w-full md:w-1/2 items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-xl bg-white p-8 rounded-r-2xl">


                    <div className="text-center mb-6">
                        <h1 className="font-bold text-2xl">
                            Join the BloodConnect Community
                        </h1>
                        <p className="text-sm text-gray-500 mt-2">
                            Create your account to connect with donors and help save lives.
                        </p>
                    </div>



                    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">







                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <TextField isRequired isInvalid={!!errors.fullName} >
                                <Label>Full Name</Label>
                                <Input {...register("fullName", { required: true })} placeholder="Jhon Deo" />
                                {errors.fullName && <span>Name required</span>}
                            </TextField>

                            <TextField isRequired isInvalid={!!errors.email} validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}>
                                <Label>Email</Label>
                                <Input type="email" {...register("email", { required: true })} placeholder="john@example.com" />
                                {errors.email && <span>Email required</span>}
                            </TextField>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <TextField isRequired type="file" variant="secondary" className={''}>
                                <Label>Image</Label>
                                <input className="border p-2 rounded-md" name="image" type="file" placeholder="Quantity" {...register("image", { required: true })} />
                            </TextField>

                            <div>
                                <Label>Gender</Label>
                                <Controller
                                    isRequired
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full border rounded-md p-2"
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


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                            <div>
                                <Label>District</Label>
                                <Controller
                                    isRequired
                                    name="district"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full border rounded-md p-2"
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


                            <div>
                                <Label>Upazila</Label>
                                <Controller
                                    isRequired
                                    name="upazila"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full border rounded-md p-2"
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


                        <div>
                            <Label>Blood Group</Label>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {BLOOD_GROUPS.map((bloodgroup) => (
                                    <button
                                        key={bloodgroup}
                                        type="button"
                                        onClick={() => setValue("bloodGroup", bloodgroup)}
                                        className={`rounded-lg border py-2 text-center text-sm font-medium transition-colors hover:cursor-pointer ${selectedBloodGroup === bloodgroup
                                            ? "border-red-500 bg-red-50 text-red-600 font-bold"
                                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        {bloodgroup}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <TextField
                                isRequired
                                minLength={8}
                                name="password"
                                type="password"
                                validate={(value) => {
                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters";
                                    }
                                    if (!/[A-Z]/.test(value)) {
                                        return "Password must contain at least one uppercase letter";
                                    }
                                    if (!/[0-9]/.test(value)) {
                                        return "Password must contain at least one number";
                                    }
                                    return null;
                                }}
                            >
                                <Label>Password</Label>
                                <Input type="password" {...register("password", { required: true })} placeholder="....." />
                                {errors.password && <span>Must be at least 8 characters with 1 uppercase and 1 number</span>}
                            </TextField>

                            <TextField isRequired>
                                <Label>Confirm Password</Label>
                                <Input type="password" {...register("confirmPassword", { required: true })} placeholder="......" />
                            </TextField>
                        </div>


                        <Button type="submit" className="w-full bg-red-600 text-white h-12">
                            Create Account
                        </Button>

                        <span className="text-center">Already have an account ? <Link className="text-rose-500" href={'/login'}>LogIn</Link></span>

                    </Form>
                </div>
            </div>
        </div>
    );
}