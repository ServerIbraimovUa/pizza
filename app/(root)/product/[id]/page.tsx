import GroupVariants from "@/shared/components/shared/group-variants";
import ProductImage from "@/shared/components/shared/product-image";
import { Title } from "@/shared/components/shared/title";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({ where: { id: Number(id) } });
    if (!product) {
        return notFound();
    }

    return (
        <div className="container mt-10 flex flex-col my-10">
            <div className="flex flex-1">
                <ProductImage imageUrl={product.imageUrl} size={30} />

                <div className="w-[490px] bg-[#f7f6f6] p-7">
                    <Title text={product.name} size="md" className="font-extrabold mb-1" />

                    <p className="text-gray-400">
                        Lorem ipsum, dolor sit amet consectetur adipisicing{" "}
                    </p>

                    <GroupVariants
                        value="2"
                        items={[
                            { name: "Маленькая", value: "1" },
                            { name: "Средняя", value: "2" },
                            { name: "Большая", value: "3", disabled: true },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
