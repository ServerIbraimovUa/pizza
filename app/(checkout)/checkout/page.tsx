"use client";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutSidebar from "@/shared/components/shared/checkout-sidebar";
import { Title } from "@/shared/components/shared/title";
import { useCart } from "@/shared/hooks";
import {
    CheckoutAddressForm,
    CheckoutCart,
    CheckoutPersonalForm,
} from "@/shared/components/shared/checkout";
import { checkoutFormSchema } from "@/shared/schemas";
import { CheckoutFormValues } from "@/shared/schemas/checkout-form-schemas";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
    const { totalAmount, items, loading, removeCartItem, onClickCountButton } = useCart();
    const [submitting, setSubmitting] = React.useState(false);
    const { data: session } = useSession();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: "",
        },
    });
    React.useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullName.split(" ");

            form.setValue("firstName", firstName);
            form.setValue("lastName", lastName);
            form.setValue("email", data.email);
        }

        if (session) {
            fetchUserInfo();
        }
    }, [form, session]);

    const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
        try {
            setSubmitting(true);

            const url = await createOrder(data);

            toast.error("Заказ успешно оформлен! 📝 Переход на оплату...", {
                icon: "✅",
            });

            if (url) {
                location.href = url;
            }
        } catch (error) {
            console.log(error);
            setSubmitting(false);
            return toast.error("Не удалось оформить заказ! 😢", {
                icon: "❌",
            });
        }
    };

    return (
        <section>
            <div className="container mt-10">
                <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-10 flex-1 mb-20">
                                <CheckoutCart
                                    items={items}
                                    onClickCountButton={onClickCountButton}
                                    removeCartItem={removeCartItem}
                                    loading={loading}
                                />

                                <CheckoutPersonalForm
                                    className={loading ? "opacity-50 pointer-events-none" : ""}
                                />

                                <CheckoutAddressForm
                                    className={loading ? "opacity-50 pointer-events-none" : ""}
                                />
                            </div>
                            <div className="w-[450px]">
                                <CheckoutSidebar
                                    totalAmount={totalAmount}
                                    loading={loading || submitting}
                                />
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
}
