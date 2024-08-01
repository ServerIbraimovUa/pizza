import Categories from "@/components/shared/categories";
import Filters from "@/components/shared/filters";
import ProductCard from "@/components/shared/product-card";
import ProductsGroupList from "@/components/shared/products-group-list";
import SortPopup from "@/components/shared/sort-popup";
import { Title } from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    ingredients: true,
                    items: true,
                },
            },
        },
    });
    return (
        <>
            <div className="container mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </div>
            <TopBar categories={categories.filter((category) => category.products.length > 0)} />

            <div className="container mt-9 pb-14">
                <div className="flex gap-[80px]">
                    {/* filters */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>

                    {/* product list */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(
                                (category) =>
                                    category.products.length > 0 && (
                                        <ProductsGroupList
                                            key={category.id}
                                            title={category.name}
                                            categoryId={category.id}
                                            items={category.products}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
