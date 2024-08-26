import { CartItemDTO } from "@/shared/services/dto/cart.dto";

interface Props {
    orderId: number;
    items: CartItemDTO[];
}

export const OrderSuccess: React.FC<Props> = ({ orderId, items }) => (
    <div>
        <h1>Спасибо за покупку!</h1>

        <p>Ваш заказ #${orderId} оплачен. Список товаров:</p>

        <hr />

        <ul>
            $
            {items
                .map((item) => {
                    return `<li>${item.productItem.product.name} | (${item.productItem.price}₽ x ${item.quantity} шт.)</li>`;
                })
                .join("")}
        </ul>
    </div>
);
