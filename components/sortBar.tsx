"use client";

import { useRouter, useSearchParams } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SortBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort") ?? "";

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }

        params.set("page", "1"); // reset pagination
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex justify-end flex justify-center items-center gap-2">
            <h1> Sort By :</h1>
            <Select
                size="small"
                value={currentSort}
                displayEmpty
                onChange={(e) => handleChange(e.target.value)}
            >
                <MenuItem value="">Most Popular</MenuItem>
                <MenuItem value="price-asc">Price low → high</MenuItem>
                <MenuItem value="price-desc">Price high → low</MenuItem>
                <MenuItem value="rating-desc">Top rated</MenuItem>
                <MenuItem value="title-asc">Name A → Z</MenuItem>
            </Select>
        </div>
    );
};

export default SortBar;