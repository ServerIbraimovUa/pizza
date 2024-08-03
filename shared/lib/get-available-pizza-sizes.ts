import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

/**
 *
 * @param type тип теста выбранной пиццы
 * @param items список вариаций
 * @returns mассив доступных размеров пиццы
 */

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
    const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
    }));
};
