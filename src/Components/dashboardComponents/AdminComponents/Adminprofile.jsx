"use client";

import { useState } from "react";
import {
    Button,
    Form,
    Input,
    Label,
    TextField,
    FieldError,
    Avatar
} from "@heroui/react";
import { Edit2, Save, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AdminProfile() {

    const { data: userData, isPending } = authClient.useSession()

    const user = userData?.user


    const [isEditable, setIsEditable] = useState(false);

    if (isPending) {
        return <div>loading...</div>
    }

    const onSubmit = (e) => {
        e.preventDefault();



    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl border border-slate-100 shadow-sm mt-10">

            {/* Profile Header & Toggle Control Button */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-5 mb-6">
                <div className="flex items-center gap-4">
                    <Avatar size="lg">
                        <Avatar.Image alt="userimage" src={user?.image} />
                        <Avatar.Fallback>{user?.name?.charAt(0, 2)}</Avatar.Fallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">{user.name}</h1>
                        <p className="text-sm text-slate-500 font-medium">Manage your profile details</p>
                    </div>
                </div>

                <div>
                    {!isEditable ? (
                        <Button
                            onPress={() => setIsEditable(true)}
                            className="bg-slate-900 text-white font-semibold flex items-center gap-2 rounded-xl px-4"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </Button>
                    ) : (
                        <Button
                            onPress={() => setIsEditable(false)}
                            variant="bordered"
                            className="border-slate-200 text-slate-600 font-semibold flex items-center gap-2 rounded-xl px-4"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </Button>
                    )}
                </div>
            </div>

            {/* Main Profile Form */}
            <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>

                {/* Full Name */}
                <TextField
                    isRequired
                    isDisabled={!isEditable}
                    name="name"
                    defaultValue={user.name}
                >
                    <Label className="text-slate-700 font-semibold">Full Name</Label>
                    <Input placeholder="Enter your full name" className="max-w-full" />
                    <FieldError />
                </TextField>

                {/* Email Address - Always disabled */}
                <TextField
                    isDisabled={true}
                    name="email"
                    type="email"
                    value={user.email}
                >
                    <Label className="text-slate-400 font-semibold">Email Address (Locked)</Label>
                    <Input className="bg-slate-50 text-slate-400 border-slate-200" />
                </TextField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* District */}
                    <TextField
                        isRequired
                        isDisabled={!isEditable}
                        name="district"
                        defaultValue={user.district}
                    >
                        <Label className="text-slate-700 font-semibold">District</Label>
                        <Input placeholder="e.g. Dhaka" />
                        <FieldError />
                    </TextField>

                    {/* Upazila */}
                    <TextField
                        isRequired
                        isDisabled={!isEditable}
                        name="upazila"
                        defaultValue={user.upazila}
                    >
                        <Label className="text-slate-700 font-semibold">Upazila</Label>
                        <Input placeholder="e.g. Mirpur" />
                        <FieldError />
                    </TextField>
                </div>

                {/* Blood Group */}
                <TextField
                    isRequired
                    isDisabled={!isEditable}
                    name="bloodGroup"
                    defaultValue={user.bloodGroup}
                    validate={(value) => {
                        const validGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
                        if (!validGroups.includes(value.trim().toUpperCase())) {
                            return "Please enter a valid blood group (e.g., O+, AB-)";
                        }
                        return null;
                    }}
                >
                    <Label className="text-slate-700 font-semibold">Blood Group</Label>
                    <Input placeholder="e.g. O+" />
                    <FieldError />
                </TextField>

                {/* Avatar URL String Input */}
                <TextField
                    isRequired
                    isDisabled={!isEditable}
                    name="avatar"
                    defaultValue={user.avatar}
                    type="url"
                >
                    <Label className="text-slate-700 font-semibold">Avatar Image URL</Label>
                    <Input placeholder="https://example.com/avatar.jpg" />
                    <FieldError />
                </TextField>

                {/* Save Changes Button Area */}
                {isEditable && (
                    <div className="flex gap-2 mt-2 pt-4 border-t border-slate-100">
                        <Button
                            type="submit"
                            className="bg-[#E11D48] text-white font-semibold flex items-center gap-2 rounded-xl px-5"
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