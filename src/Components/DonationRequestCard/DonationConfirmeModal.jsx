"use client";

import { authClient } from "@/lib/auth-client";
import { Rocket } from "@gravity-ui/icons";
import { Button, Input, Modal } from "@heroui/react";
import Loader from "../Shared/Loading";
import { motion } from 'framer-motion'
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function DonationConfirmeModal({ donationRequest }) {


    const { data, isPending } = authClient.useSession()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const user = data?.user

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL


    const handleDonorConfrim = async (id) => {
        try {
            setIsSubmitting(true);

            const res = await fetch(`${baseurl}/api/donationrequest/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    donationStatus: "inprogress",
                    donorName: user?.name,
                    donorEmail: user?.email,
                }),
            });

            const updatedData = await res.json();

            if (updatedData) {
                toast.success('Thank you! Your blood donation has been confirmed successfully.')
            }
           


        } catch (err) {
            toast.error(err)
            setIsSubmitting(false);
        }
    };

    if (user?.email == donationRequest?.requesterEmail) {
        return (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-700">
                <CircleAlert className="h-5 w-5" />
                <span className="font-medium">
                    This is your own blood request.
                </span>
            </div>
        );
    }

    if (isPending) {
        return <div><Loader></Loader></div>
    }



    return (
        <Modal>
            <div className="relative inline-block p-[2px] overflow-hidden rounded-md group">
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#E11D48_50%,#E2E8F0_100%)]"
                />


                <Button
                    className="relative font-bold bg-[#db0000] hover:bg-[#db00008b] text-white font-semibold text-base h-12 px-8 rounded-md transition-all flex items-center justify-center gap-2 w-full "
                >
                    <svg className="w-5 animate-pulse h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                    Donate Now
                </Button>
            </div>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <div className="text-center my-5">
                            <h1 className="text-center  text-xl font-bold">Confirm Blood Donation</h1>
                            <p className="text-gray-500 text-sm mt-1.5  text-center">You're about to become the donor.</p>

                        </div>
                        <Modal.Body className=" space-y-2">
                            <Input readOnly type="text" className="w-full" defaultValue={user?.name}></Input>
                            <Input readOnly type="text" className="w-full" defaultValue={user?.email}></Input>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                isDisabled={isSubmitting}
                                isLoading={isSubmitting}
                                onClick={() => handleDonorConfrim(donationRequest._id)}
                                className="w-full bg-[#db0000] font-bold"
                                slot="close"
                            >
                                {isSubmitting ? "Confirming..." : "Confirm Donation"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}