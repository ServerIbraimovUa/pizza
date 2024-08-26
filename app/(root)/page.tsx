import Filters from "@/shared/components/shared/filters";
import ProductsGroupList from "@/shared/components/shared/products-group-list";
import { Title } from "@/shared/components/shared/title";
import TopBar from "@/shared/components/shared/top-bar";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";
import Stories from "@/shared/components/shared/stories";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
    const categories = await findPizzas(searchParams);
    return (
        <>
            <Stories />
            <div className="container mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </div>
            <TopBar categories={categories.filter((category) => category.products.length > 0)} />

            <div className="container mt-9 pb-14">
                <div className="flex gap-[80px]">
                    {/* filters */}
                    <div className="w-[250px]">
                        <Suspense>
                            <Filters />
                        </Suspense>
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
