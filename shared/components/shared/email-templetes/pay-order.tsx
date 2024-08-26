interface Props {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => (
    <div>
        <h2>Заказ #{orderId}</h2>

        <p>
            Оплатите заказ на сумму <b>{totalAmount}</b> &#8372;. Перейдите
            <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
        </p>
    </div>
);
