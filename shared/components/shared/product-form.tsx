"use client";

import React from "react";
import { IProduct } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";

import toast from "react-hot-toast";
import ChoosePizzaForm from "./choose-pizza-form";
import ChooseProductForm from "./choose-product-form";
// import { useCategories } from "@/shared/hooks/use-categories";

interface Props {
    product: IProduct;
    onSubmitModal?: VoidFunction;
    className?: string;
}

const ProductForm: React.FC<Props> = ({ product, onSubmitModal, className }) => {
    const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);
    // const categories = useCategories(product.categoryId);
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);
    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;

            await addCartItem({
                productItemId: itemId,
                ingredients,
            });

            toast.success(product.name + " добавлена в корзину");
            onSubmitModal?.();
        } catch (error) {
            toast.error(`Не удалось добавить ${product.name} в корзину`);
            console.log(error);
        }
    };

    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                ingredients={product.ingredients}
                items={product.items}
                onClickAddCart={onSubmit}
                loading={loading}
            />
        );
    }

    return (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onClickAdd={onSubmit}
            loading={loading}
        />
    );
};

export default ProductForm;
