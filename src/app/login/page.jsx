"use client";

import React, { useState } from "react";
import { Button, Form, Input, FieldError, TextField, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function DonorLogin() {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {



        const userData = {
            email: data.email,
            password: data.password,
        };


        const { data: resdata, error } = await authClient.signIn.email({
            ...userData,
        })

        if (resdata) {
            router.push('/')
        }

        console.log(error);
        console.log(resdata);

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans">

            <div className="relative flex w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-white shadow-sm max-md:flex-col">



                <div className="relative flex w-1/2 flex-col items-center justify-between bg-[#E5E5E5] px-8 py-14 text-center max-md:w-full max-md:py-10 overflow-hidden">




                    <div className="relative  z-10 ">

                        <Image
                            height={300}
                            width={200}
                            src="https://i.ibb.co.com/BVS6nPjG/1530-Photoroom-removebg-preview.png"
                            alt="Blood"
                            className="w-full animate-floating"
                        />
                    </div>
                </div>


                <div className="flex w-1/2 flex-col justify-center px-12 py-14 max-md:w-full max-md:px-6 max-md:py-10">
                    <div className="mx-auto w-full max-w-sm text-center z-50">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Please enter your details to access your donor dashboard.
                        </p>
                    </div>


                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center opacity-6 pointer-events-none mix-blend-multiply"
                        style={{
                            backgroundImage: "url('https://i.ibb.co.com/JjtCjy4m/Screenshot-2026-06-19-at-11-15-06-PM.png')"
                        }}
                    />


                    <Form
                        className="mx-auto mt-8 z-40 flex w-full max-w-sm flex-col gap-5"
                        onSubmit={handleSubmit(onSubmit)}
                        validationBehavior="native"
                    >

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                                Email Address
                            </Label>
                            <TextField
                                isRequired
                                name="email"
                                type="email"
                                validate={(value) => {
                                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return "Please enter a valid email address";
                                    }
                                    return null;
                                }}
                            >
                                <Input
                                    id="email"
                                    placeholder="user@example.com"
                                    variant="bordered"
                                    radius="md"
                                    className="w-full"
                                    {...register("email", { required: true })}
                                />
                                <FieldError className="mt-1 text-xs text-red-500" />
                            </TextField>
                        </div>


                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                                    Password
                                </Label>

                            </div>
                            <TextField
                                isRequired
                                minLength={8}
                                name="password"
                                validate={(value) => {
                                    if (value.length < 8) return "Password must be at least 8 characters";
                                    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                                    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                                    return null;
                                }}
                            >
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    variant="bordered"
                                    radius="md"
                                    className="w-full"
                                    {...register("password", { required: true })}
                                />
                                <FieldError className="mt-1 text-xs text-red-500" />
                            </TextField>
                        </div>


                        <Button
                            type="submit"
                            className="mt-2 w-full bg-[#db0000] font-semibold text-white shadow-md shadow-red-200 hover:bg-[#c91e2c]"
                            size="lg"
                            radius="md"
                        >
                            Log In
                        </Button>


                        <div className="mt-4 text-center text-xs font-medium text-slate-500">
                            Don t have an account?{" "}
                            <Link href="/registration" className="font-semibold text-[#db0000] hover:underline">
                                Register to donate
                            </Link>
                        </div>


                    </Form>
                </div>

            </div>
        </div>
    );
}