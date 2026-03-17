"use client"
import { useRouter, useSearchParams } from "next/navigation";

interface ResetFiltersProps {
    /* props here */
}
const ResetFilters = ({ }: ResetFiltersProps) => {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleReset = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('sub');   // correct param name
        params.delete('price');


        router.push(`?${params.toString()}`);
        
    };
    return (
        <button onClick={handleReset} className="w-full h-[50px] bg-black text-white rounded-[50px] mt-10">Clear Filters</button>

    );
};

export default ResetFilters;