"use client";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    totalPages: number;
}

const PaginationBar = ({ totalPages }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", value.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <Stack alignItems="center" mt={6}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
            />
        </Stack>
    );
};

export default PaginationBar;