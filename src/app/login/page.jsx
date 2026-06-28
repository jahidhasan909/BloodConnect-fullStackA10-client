"use client";

import React, { useState } from "react";
import { Button, Form, Input, FieldError, TextField, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from 'framer-motion'

export default function DonorLogin() {
    const router = useRouter();

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
        });

        if (resdata) {
            toast.success('Welcome back, Mr/MST ! Great to see you again.');
            router.push('/');
        }

        if (error) {
            toast.error(error);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white font-sans">

            {/* Left Side */}
            <div className="relative flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-24">


                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-5 pointer-events-none mix-blend-multiply"
                    style={{
                        backgroundImage: "url('https://i.ibb.co.com/JjtCjy4m/Screenshot-2026-06-19-at-11-15-06-PM.png')"
                    }}
                />

                <div className="mx-auto w-full max-w-sm text-left z-50">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Welcome Back!
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to access your donor dashboard and continue your life-saving journey.
                    </p>
                </div>

                <Form
                    className="mx-auto mt-8 z-40 flex w-full max-w-sm flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                    validationBehavior="native"
                >
                    <div className="flex flex-col gap-1.5 w-full">
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

                    <div className="flex flex-col gap-1.5 w-full">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                                Password
                            </Label>

                            {/* <Link href="#" className="text-xs font-medium text-slate-500 hover:text-[#db0000]">
                                Forgot Password?
                            </Link> */}
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
                                type="password"
                                placeholder="Enter your password"
                                variant="bordered"
                                radius="md"
                                className="w-full"
                                {...register("password", { required: true })}
                            />
                            <FieldError className="mt-1 text-xs text-red-500" />
                        </TextField>
                    </div>

                    <div className="group relative block p-1 rounded-lg  overflow-hidden">
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
                            Log In
                        </Button>
                    </div>
















                    <div className="mt-4 text-center text-xs font-medium text-slate-500">
                        Don't have an account?{" "}
                        <Link href="/registration" className="font-semibold text-[#db0000] hover:underline">
                            Registration
                        </Link>
                    </div>
                </Form>
            </div>

            {/* Right Side*/}
            <div className="relative hidden w-1/2 md:block">
                <Image
                    src="https://i.ibb.co.com/gM725yXw/Chat-GPT-Image-Jun-29-2026-at-05-01-48-AM.png"
                    alt="Donor Journey Banner"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

        </div>
    );
}