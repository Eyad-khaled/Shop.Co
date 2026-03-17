"use client"
import TuneIcon from '@mui/icons-material/Tune';
import { useEffect, useRef, useState } from 'react';
import FilterBar from './filterBar';

import { useRouter, useSearchParams } from 'next/navigation';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import ResetFilters from './ResetFilters';
interface Props {
    subcategories: string[];
}

const FilterMobile = ({ subcategories }: Props) => {
    const [isVisible, setIsVisible] = useState(false)
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
    const FilterRef = useRef<HTMLLIElement | null>(null);
    useEffect(() => {
        console.log(window.innerWidth)
        if (isVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isVisible]);
    const handlePriceCommitted = (_: Event, newValue: number[]) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("price", `${newValue[0]}-${newValue[1]}`);
        params.set("page", "1");
        setTimeout(() => {
            setIsVisible(false)
        }, 500)
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

        setTimeout(() => {

            setIsVisible(false)
        }, 500)
        router.push(`?${params.toString()}`, { scroll: false });
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                FilterRef.current &&
                !FilterRef.current.contains(event.target as Node)
            ) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className='left-0'>
            {isVisible && (
                <div className="fixed inset-0 z-[999999999999] ">

                    {/* DARK / BLUR BACKDROP */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsVisible(false)}
                    />

                    {/* FILTER PANEL */}
                    <div
                        /* @ts-ignore */
                        ref={FilterRef}
                        className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 animate-[slide-in-bottom_0.4s_ease]"
                    >
                        {/* content */}
                    </div>

                </div>
            )}
            <div className="" onClick={() => setIsVisible(!isVisible)}>

                <TuneIcon />
            </div>
            {/* @ts-ignore */}
            <div ref={FilterRef} className={`${isVisible ? ' animate-[slide-in-bottom_0.6s_ease-in-out_forwards] ' : ' animate-[slide-out-bottom_0.6s_ease-in-out_forwards]'} absolute w-full h-full bg-white shadow-lg py-4 px-8 z-[9999999999999] rounded-[20px] left-0`}>
                <div className="flex justify-between items-center w-full">
                    <h1 className="font-bold text-lg"> Filter</h1>
                </div>
                <div className="h-px w-full bg-black/10 self-stretch my-6" />
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
                <div className="h-px w-full bg-black/10 self-stretch my-6" />
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
                        valueLabelFormat={(val) => `$${val}`}
                        valueLabelDisplay="auto"
                    />
                </div>
                <div className="h-px w-full bg-black/10 self-stretch my-2" />
                <ResetFilters />
                {/* <button onClick={handleReset} className="w-full h-[50px] bg-black text-white rounded-[50px] mt-10">Clear Filters</button> */}
            </div>
        </div>
    );
};

export default FilterMobile;