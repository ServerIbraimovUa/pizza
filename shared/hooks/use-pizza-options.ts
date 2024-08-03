import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    availablePizzaSizes: Variant[];
    addIngredient: (id: number) => void;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

    const availablePizzaSizes = getAvailablePizzaSizes(type, items);

    useEffect(() => {
        const isAvailableSize = availablePizzaSizes.find(
            (item) => Number(item.value) === size && !item.disabled
        );
        const availableSize = availablePizzaSizes.find((item) => !item.disabled);
        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);

    return {
        size,
        type,
        selectedIngredients,
        availablePizzaSizes,
        addIngredient,
        setSize,
        setType,
    };
};
