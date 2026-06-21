"use client";

import { authClient } from "@/lib/auth-client";
import { Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";

export function DonationConfirmeModal({ donationRequest }) {


    const { data, isPending } = authClient.useSession()

    const user = data?.user

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL


    const handleDonorConfrim = async (id) => {
        const res = await fetch(`${baseurl}/api/donationrequest/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                donationStatus: 'inprogress',
                donorName: user?.name,
                donorEmail: user?.email
            })
        })
        const updatedData = await res.json()
        if (updatedData) {
            console.log(updatedData, 'updated');

        }
    }

    if (isPending) {
        return <div>loading...</div>
    }



    return (
        <Modal>
            <Button variant="secondary">Donate Now</Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Rocket className="size-5" />
                            </Modal.Icon>
                            <p>{user?.name}</p>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                {user?.email}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => handleDonorConfrim(donationRequest._id)} className="w-full" slot="close">
                                Confrim
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}