import React from "react";
import { WhiteBlock } from "./white-block";
import CheckoutItemDetails from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";

interface Props {
    loading?: boolean;
    totalAmount: number;
    className?: string;
}
const VAT = 2;
const DELIVERY_PRICE = 120;

const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
    const vatPrice = (totalAmount * VAT) / 100;

    const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;
    return (
        <WhiteBlock className={cn("p-6 sticky top-4", className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                {loading ? (
                    <Skeleton className="h-11 w-48 bg-slate-200" />
                ) : (
                    <span className="text-4xl font-extrabold h-11">{totalPrice} &#8372;</span>
                )}
            </div>
            <CheckoutItemDetails
                title={
                    <div className="flex items-center gap-2">
                        <Package size={18} className=" text-gray-400" />
                        Стоимость товаров:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-6 w-16 bg-slate-200 rounded-[6px]" />
                    ) : (
                        <> {totalAmount} &#8372;</>
                    )
                }
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center gap-2">
                        <Percent size={18} className=" text-gray-400" />
                        Налоги:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-6 w-16 bg-slate-200 rounded-[6px]" />
                    ) : (
                        <> {vatPrice} &#8372;</>
                    )
                }
            />

            <CheckoutItemDetails
                title={
                    <div className="flex items-center gap-2">
                        <Truck size={18} className=" text-gray-400" />
                        Доставка:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-6 w-16 bg-slate-200 rounded-[6px]" />
                    ) : (
                        <>{DELIVERY_PRICE} &#8372;</>
                    )
                }
            />

            <Button
                type="submit"
                loading={loading}
                className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    );
};

export default CheckoutSidebar;
