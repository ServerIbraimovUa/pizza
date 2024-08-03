import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
    const textDetails = `${size} cм, ${mapPizzaType[type]} пицца`;

    return {
        totalPrice,
        textDetails,
    };
};
