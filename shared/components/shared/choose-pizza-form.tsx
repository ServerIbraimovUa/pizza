"use client";

import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";
import ProductImage from "./product-image";
import GroupVariants from "./group-variants";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { IngredientItem } from "./ingredient-item";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAddCart?: VoidFunction;
    className?: string;
}

const ChoosePizzaForm: FC<Props> = ({
    imageUrl,
    name,
    ingredients,
    items,
    onClickAddCart,
    className,
}) => {
    const {
        size,
        type,
        selectedIngredients,
        availablePizzaSizes,
        addIngredient,
        setSize,
        setType,
    } = usePizzaOptions(items);

    const { totalPrice, textDetails } = getPizzaDetails(
        type,
        size,
        items,
        ingredients,
        selectedIngredients
    );

    const handleAddToCart = () => {
        onClickAddCart?.();

        console.log({
            size,
            type,
            ingredients: selectedIngredients,
        });
    };
    return (
        <div className={cn("flex flex-1", className)}>
            <ProductImage imageUrl={imageUrl} size={size} />
            <div className="w-[490px] bg-[#f7f6f6] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetails}</p>
                <div className="flex flex-col gap-3 mt-5">
                    <GroupVariants
                        items={availablePizzaSizes}
                        value={String(size)}
                        onClick={(value) => setSize(Number(value) as PizzaSize)}
                    />
                    <GroupVariants
                        items={pizzaTypes}
                        value={String(type)}
                        onClick={(value) => setType(Number(value) as PizzaType)}
                    />
                </div>
                <div className="bg-gray-50 p-5 mt-5 rounded-md h-[380px] overflow-auto scrollbar">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                imageUrl={ingredient.imageUrl}
                                price={ingredient.price}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>
                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} &#8372;
                </Button>
            </div>
        </div>
    );
};

export default ChoosePizzaForm;
