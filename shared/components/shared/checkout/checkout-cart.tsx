import React from "react";
import { CheckoutItem } from "../checkout-item";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { getCartItemDetails } from "@/shared/lib";
import { WhiteBlock } from "../white-block";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { CheckoutItemSkeleton } from "../skeletons/checkout-item-skeleton";

interface Props {
    items: CartStateItem[];
    loading?: boolean;
    onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
    removeCartItem: (id: number) => void;
    className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
    items,
    loading,
    onClickCountButton,
    removeCartItem,
    className,
}) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                {loading
                    ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
                    : items.map((item) => (
                          <CheckoutItem
                              key={item.id}
                              id={item.id}
                              details={getCartItemDetails(
                                  item.ingredients,
                                  item.pizzaSize as PizzaSize,
                                  item.pizzaType as PizzaType
                              )}
                              disabled={item.disabled}
                              imageUrl={item.imageUrl}
                              name={item.name}
                              price={item.price}
                              quantity={item.quantity}
                              onClickCountButton={(type) =>
                                  onClickCountButton(item.id, item.quantity, type)
                              }
                              onClickRemove={() => removeCartItem(item.id)}
                          />
                      ))}
            </div>
        </WhiteBlock>
    );
};
