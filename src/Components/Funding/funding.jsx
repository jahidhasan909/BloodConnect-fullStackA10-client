"use client";

import { useState } from "react";
import { Rocket } from "@gravity-ui/icons";
import { Button, Input, Modal } from "@heroui/react";

const Funding = ({ isOpen, onOpenChange }) => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDonate = async () => {
        if (!amount || Number(amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: Number(amount),
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; 
            } else {
                alert("Something went wrong with Stripe session generation.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Icon className="bg-red-50 text-red-600 dark:bg-red-950/40">
                                <Rocket className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Donate to Organization</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            <Input
                                type="number"
                                placeholder="Amount (USD)"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min="1"
                            />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                color="danger"
                                className="w-full font-bold bg-red-600 text-white"
                                onPress={handleDonate}
                                isLoading={loading}
                            >
                                Proceed to Pay
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default Funding;