"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import ChooseProductForm from "../choose-product-form";
import { IProduct } from "@/@types/prisma";
import ChoosePizzaForm from "../choose-pizza-form";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";
import ProductForm from "../product-form";
interface Props {
    product: IProduct;
    className?: string;
}

const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                aria-describedby={undefined}
                className={cn(
                    "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
                    className
                )}
            >
                <ProductForm product={product} onSubmitModal={() => router.back()} />
            </DialogContent>
        </Dialog>
    );
};

export default ChooseProductModal;
