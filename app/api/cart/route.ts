import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                token,
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                        ingredients: true,
                    },
                },
            },
        });

        return NextResponse.json(userCart);
    } catch (error) {
        console.log("[CART_GET] Server error", error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        let cartToken = req.cookies.get("cartToken")?.value;

        if (!cartToken) {
            cartToken = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(cartToken);

        const data = (await req.json()) as CreateCartItemValues;

        // Проверка, есть ли ингредиенты
        const ingredientsCondition =
            data.ingredients && data.ingredients.length > 0
                ? {
                      ingredients: { every: { id: { in: data.ingredients } }, some: {} },
                  }
                : {}; // Пустое условие если ингредиентов нет

        // Ищем товар в корзине
        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                ...ingredientsCondition, // Добавляем условие для ингредиентов если они есть
            },
        });

        // Если товар найден, увеличиваем количество
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                },
            });
        } else {
            // Создаем новый элемент в корзине
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients:
                        data.ingredients && data.ingredients.length > 0
                            ? { connect: data.ingredients.map((id) => ({ id })) }
                            : undefined, // Не добавляем ингредиенты если их нет
                },
            });
        }

        const updatedUserCart = await updateCartTotalAmount(cartToken);
        const resp = NextResponse.json(updatedUserCart);

        resp.cookies.set("cartToken", cartToken);

        return resp;
    } catch (error) {
        console.log("[CART_POST] Server error", error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
