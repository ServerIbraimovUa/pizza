import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
}

const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className }) => {
    return (
        <li className={className}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-orange-100/90 rounded-lg h-[260px]">
                    <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
                </div>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

                <p className="text-sm text-gray-400">
                    Цыпленок,моццарела, моццарела, моццарела, моццарела, моццарела, моццарела,
                    моццарела
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        от <b>{price} &#8372;</b>
                    </span>

                    <Button variant="secondary" className="text-base font-bold">
                        <Plus size={20} className="mr-1" />
                        Добавить
                    </Button>
                </div>
            </Link>
        </li>
    );
};

export default ProductCard;
