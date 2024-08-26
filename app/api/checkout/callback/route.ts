import { NextRequest } from "next/server";
import { OrderStatus } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderSuccess } from "@/shared/components/shared/email-templetes/order-success";

type PaymentCallbackData = {
    type: string;
    event: string;
    object: {
        id: string;
        status: string;
        amount: { value: string; currency: "RUB" };
        income_amount: { value: string; currency: "RUB" };
        description: string;
        recipient: { account_id: string; gateway_id: string };
        payment_method: {
            type: string;
            id: string;
            saved: boolean;
            title: string;
        };
        captured_at: string;
        created_at: string;
        test: boolean;
        refunded_amount: { value: string; currency: "RUB" };
        paid: boolean;
        refundable: true;
        metadata: { order_id: string };
        authorization_details: {
            rrn: string;
            auth_code: string;
        };
    };
};

export async function POST(req: NextRequest) {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
        where: {
            id: Number(body.object.metadata.order_id),
        },
        include: {
            user: true,
        },
    });

    const isSucceeded = body.object.status === "succeeded";

    if (order && order.user) {
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
            },
        });

        const items = JSON.parse(order.items as string) as CartItemDTO[];

        if (isSucceeded) {
            await sendEmail(
                order.user.email,
                `Next Pizza / Заказ #${order.id} оплачен!`,
                OrderSuccess({ orderId: order.id, items })
            );
        } else {
            await sendEmail(
                order.user.email,
                `Next Pizza / Заказ #${order.id} отменен!`,
                OrderSuccess({ orderId: order.id, items })
            );
        }
    }

    return new Response(null, {
        status: 200,
    });
}
