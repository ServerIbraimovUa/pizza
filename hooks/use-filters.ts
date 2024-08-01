import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}
interface QueryFilters extends PriceProps {
    sizes: string;
    pizzaTypes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    //   filter ingredients
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get("ingredients")?.split(","))
    );

    //   filter sizes
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : [])
    );

    //   filter pizzaTypes
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(
            searchParams.has("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",") : []
        )
    );

    //   filter prices
    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        selectedIngredients,
        sizes,
        pizzaTypes,
        prices,
        setSizes: toggleSizes,
        setPizzaTypes: togglePizzaTypes,
        setIngredients: toggleIngredients,
        setPrices: updatePrice,
    };
};
