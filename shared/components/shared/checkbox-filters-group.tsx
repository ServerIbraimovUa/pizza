"use client";
import React, { useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";
import { it } from "node:test";

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    selected?: Set<string>;
    className?: string;
    name?: string;
}

const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = "Поиск...",
    className,
    loading,
    onClickCheckbox,
    selected,
    name,
}) => {
    const [showAll, setShowAll] = useState(false);
    const [search, setSearch] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>

                {...Array(limit)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton className="w-full h-6 mb-4 rounded-[8px]" key={index} />
                    ))}
                <Skeleton className="w-28 h-6 mb-4 rounded-[8px] " />
            </div>
        );
    }

    const list = showAll
        ? items.filter((item) => item.text.toLowerCase().includes(search.toLowerCase()))
        : (defaultItems || items).slice(0, limit);
    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input
                        onChange={handleSearch}
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                    />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {/* filter checkbox */}
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selected?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        name={name}
                    />
                ))}
            </div>
            {items.length > limit && (
                <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
                    <button className="mt-3 text-primary" onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Скрыть" : "+ Показать все"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckboxFiltersGroup;