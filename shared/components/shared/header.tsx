"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import CartButton from "./cart-button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal";

interface Props {
    hasCart?: boolean;
    hasSearch?: boolean;
    className?: string;
}

const Header = ({ hasCart = true, hasSearch = true, className }: Props) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = useState(false);

    useEffect(() => {
        if (searchParams.has("paid")) {
            setTimeout(() => {
                toast.success("Заказ успешно оплачен", {
                    icon: "✅",
                });
            }, 500);

            router.push("/");
        }
        if (searchParams.has("verified")) {
            setTimeout(() => {
                toast.success("Почта успнешно подтверждена!", {
                    icon: "✅",
                });
            }, 500);

            router.push("/");
        }
    }, []);

    return (
        <header className={cn("border border-b", className)}>
            <div className="container flex items-center justify-between py-8">
                <Link href="/" className="flex items-center gap-4">
                    <Image src="/logo.png" alt="logo" width="35" height="35" />
                    <div>
                        <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                        <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                    </div>
                </Link>

                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickOpenModal={() => setOpenAuthModal(true)} />

                    {hasCart && <CartButton />}
                </div>
            </div>
        </header>
    );
};

export default Header;
