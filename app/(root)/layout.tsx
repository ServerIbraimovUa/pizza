import type { Metadata } from "next";
import Header from "@/shared/components/shared/header";

export const metadata: Metadata = {
    title: "Next pizza",
    description: "Generated by Next pizza",
};

export default function HomeLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
                {modal}
            </main>
        </>
    );
}
