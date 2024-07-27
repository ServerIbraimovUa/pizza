import Categories from "@/components/shared/categories";
import Filters from "@/components/shared/filters";
import ProductCard from "@/components/shared/product-card";
import ProductsGroupList from "@/components/shared/products-group-list";
import SortPopup from "@/components/shared/sort-popup";
import { Title } from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";

export default function Home() {
    return (
        <>
            <div className="container mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </div>
            <TopBar />

            <div className="container mt-9 pb-14">
                <div className="flex gap-[80px]">
                    {/* filters */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>

                    {/* product list */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="Пиццы"
                                items={[
                                    {
                                        id: 1,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif",
                                        items: [
                                            {
                                                id: 1,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 2,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 3,
                                                name: "Пицца",
                                                price: 100,
                                            },
                                        ],
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif",
                                        items: [
                                            {
                                                id: 1,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 2,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 3,
                                                name: "Пицца",
                                                price: 100,
                                            },
                                        ],
                                    },
                                    {
                                        id: 3,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif",
                                        items: [
                                            {
                                                id: 1,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 2,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 3,
                                                name: "Пицца",
                                                price: 100,
                                            },
                                        ],
                                    },
                                    {
                                        id: 4,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif",
                                        items: [
                                            {
                                                id: 1,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 2,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 3,
                                                name: "Пицца",
                                                price: 100,
                                            },
                                        ],
                                    },
                                ]}
                                categoryId={1}
                            />
                            <ProductsGroupList
                                title="Комбо"
                                items={[
                                    {
                                        id: 1,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif",
                                        items: [
                                            {
                                                id: 1,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 2,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 3,
                                                name: "Пицца",
                                                price: 100,
                                            },
                                        ],
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif",
                                        items: [
                                            {
                                                id: 1,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 2,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 3,
                                                name: "Пицца",
                                                price: 100,
                                            },
                                        ],
                                    },
                                    {
                                        id: 3,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif",
                                        items: [
                                            {
                                                id: 1,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 2,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 3,
                                                name: "Пицца",
                                                price: 100,
                                            },
                                        ],
                                    },
                                    {
                                        id: 4,
                                        name: "Пицца",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif",
                                        items: [
                                            {
                                                id: 1,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 2,
                                                name: "Пицца",
                                                price: 120,
                                            },
                                            {
                                                id: 3,
                                                name: "Пицца",
                                                price: 100,
                                            },
                                        ],
                                    },
                                ]}
                                categoryId={2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
