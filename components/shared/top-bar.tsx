import { cn } from "@/lib/utils";
import React from "react";
import Categories from "./categories";
import SortPopup from "./sort-popup";
import { Category } from "@prisma/client";

interface Props {
    categories: Category[];
    className?: string;
}

const TopBar = ({ className, categories }: Props) => {
    return (
        <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
            <div className="container flex items-center justify-between">
                <Categories items={categories} />
                <SortPopup />
            </div>
        </div>
    );
};

export default TopBar;
