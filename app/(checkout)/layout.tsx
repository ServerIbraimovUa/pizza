import Header from "@/shared/components/shared/header";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Next Pizza | Корзина",
    description: "Корзина",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense>
                {" "}
                <Header hasCart={false} hasSearch={false} className="border-gray-200" />
            </Suspense>
            <main className="min-h-screen bg-[#F4F1EE]">{children}</main>
        </>
    );
}
