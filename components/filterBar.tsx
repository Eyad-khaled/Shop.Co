"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Slider from "@mui/material/Slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import ResetFilters from "./ResetFilters";
interface Props {
    subcategories: string[];
}

const FilterBar = ({ subcategories }: Props) => {
    const searchParams = useSearchParams()

    const [value, setValue] = useState<number[]>([])
    const DEFAULT_PRICE: [number, number] = [0, 4000]

    useEffect(() => {
        const priceParam = searchParams.get("price")

        if (!priceParam) {
            setValue(DEFAULT_PRICE)
            return
        }

        const [min, max] = priceParam.split("-").map(Number)

        if (isNaN(min) || isNaN(max)) {
            setValue(DEFAULT_PRICE)
            return
        }

        setValue([min, max])
    }, [searchParams])
    const handlePriceCommitted = (_: Event, newValue: number[]) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("price", `${newValue[0]}-${newValue[1]}`);
        params.set("page", "1");

        router.push(`?${params.toString()}`, { scroll: false });
    };

    const router = useRouter();


    const activeSubs =
        searchParams.get("sub")?.split(",") ?? [];

    const handleChange = (sub: string) => {
        let newSubs = [...activeSubs];

        if (newSubs.includes(sub)) {
            newSubs = newSubs.filter((s) => s !== sub);
        } else {
            newSubs.push(sub);
        }

        const params = new URLSearchParams(searchParams.toString());

        if (newSubs.length === 0) {
            params.delete("sub");
        } else {
            params.set("sub", newSubs.join(","));
        }

        params.set("page", "1"); // reset pagination on filter change

        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div>
            <div className="flex justify-between items-center w-full">
                <h1 className="font-bold text-lg"> Filter</h1>
                <TuneIcon />
            </div>
            <div className="h-px w-full bg-black/10 self-stretch my-2" />
            <FormGroup>
                {subcategories.map((sub) => (
                    <FormControlLabel
                        key={sub}
                        control={
                            <Checkbox
                                size="small"
                                checked={activeSubs.includes(sub)}
                                onChange={() => handleChange(sub)}
                            />
                        }
                        label={sub}
                    />
                ))}
            </FormGroup>
            <div className="h-px w-full bg-black/10 self-stretch my-2" />
            <div className="price">
                <h1 className="font-bold text-lg "> Price</h1>
                <div className=" py-2">
                    <h1 className="text-lg font-semibold">${value[0]} , ${value[1]} </h1>
                </div>
                <Slider
                    className="my-2"
                    min={0}
                    max={5000}
                    value={value}
                    onChange={(_, v) => setValue(v as number[])}
                    //@ts-ignore
                    onChangeCommitted={handlePriceCommitted}
                    // valueLabelFormat={(val) => `$${val}`}
                    valueLabelDisplay="off"
                />
            </div>
            <div className="h-px w-full bg-black/10 self-stretch my-2" />
            <ResetFilters />
            {/* <button onClick={handleReset} className="w-full h-[50px] bg-black text-white rounded-[50px] mt-10">Clear Filters</button> */}
        </div>
    );
};

export default FilterBar;