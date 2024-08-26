import { prisma } from "@/prisma/prisma-client";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";

export const useCategories = (id: number) => {
    const [category, setCategory] = useState<Category[]>([]);
    useEffect(() => {
        const fetchCategory = async () => {
            const fetchCategory = await prisma.category.findFirst({
                where: { id },
                include: {
                    products: {
                        include: {
                            items: true,
                        },
                    },
                },
            });

            if (fetchCategory) {
                setCategory([fetchCategory]);
            }
        };

        fetchCategory();
    }, [id]);
    return category;
};
