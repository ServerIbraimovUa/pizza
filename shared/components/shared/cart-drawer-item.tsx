import React from "react";
import { Trash2Icon } from "lucide-react";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { cn } from "@/shared/lib/utils";

interface Props extends CartItemProps {
    onClickCountButton?: (type: "plus" | "minus") => void;
    removeCartItem?: () => void;
    className?: string;
}

const CartDrawerItem: React.FC<Props> = ({
    details,
    imageUrl,
    name,
    price,
    quantity,
    disabled,
    onClickCountButton,
    removeCartItem,
    className,
}) => {
    return (
        <div
            className={cn(
                "flex bg-white p-5 gap-6 mb-2",
                {
                    "opacity-50 pointer-events-none": disabled,
                },
                className
            )}
        >
            <CartItem.Image src={imageUrl} />

            <div className="flex-1">
                <CartItem.Info name={name} details={details} />

                <hr className="my-3" />

                <div className="flex items-center justify-between">
                    <CartItem.CountButton onClick={onClickCountButton} value={quantity} />

                    <div className="flex items-center gap-3">
                        <CartItem.Price value={price} />
                        <Trash2Icon
                            onClick={removeCartItem}
                            className="text-gray-400 cursor-pointer hover:text-gray-600"
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawerItem;
