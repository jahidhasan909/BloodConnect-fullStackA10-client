"use client";

import { authClient } from "@/lib/auth-client";
import { Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";

export function DonationConfirmeModal({ donationRequest }) {


    const { data, isPending } = authClient.useSession()

    const user = data?.user

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
                            <Button className="w-full" slot="close">
                                Confrim
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}