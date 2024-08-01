"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import { Title } from "../title";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
    product: Product;
    className?: string;
}

const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
                    className
                )}
            >
                <Title text="Choose product" />
            </DialogContent>
        </Dialog>
    );
};

export default ChooseProductModal;
