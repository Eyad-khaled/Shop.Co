"use client";
import TuneIcon from "@mui/icons-material/Tune";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import ResetFilters from "./ResetFilters";

interface Props {
  subcategories: string[];
}

const FilterMobile = ({ subcategories }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const FilterRef = useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useState<number[]>([]);
  const DEFAULT_PRICE: [number, number] = [0, 4000];

  useEffect(() => {
    const priceParam = searchParams.get("price");

    if (!priceParam) {
      setValue(DEFAULT_PRICE);
      return;
    }

    const [min, max] = priceParam.split("-").map(Number);

    if (isNaN(min) || isNaN(max)) {
      setValue(DEFAULT_PRICE);
      return;
    }

    setValue([min, max]);
  }, [searchParams]);

  useEffect(() => {
    if (isVisible) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [isVisible]);

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

  const handlePriceCommitted = (_: Event, newValue: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("price", `${newValue[0]}-${newValue[1]}`);
    params.set("page", "1");
    setIsVisible(false);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const activeSubs = searchParams.get("sub")?.split(",") ?? [];

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

    params.set("page", "1");
    setIsVisible(false);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="left-0">
      {/* Trigger button */}
      <div className="cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
        <TuneIcon />
      </div>

      {/* Only mount the panel when visible — prevents click interception */}
      {isVisible && (
        <div className="fixed h-screen inset-0 z-[9999]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          />

          {/* Filter panel — single ref, conditionally rendered */}
          <div
            ref={FilterRef}
            className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 animate-[slide-in-bottom_0.4s_ease]"
          >
            <div className="flex justify-between items-center w-full">
              <h1 className="font-bold text-lg">Filter</h1>
              <button
                onClick={() => setIsVisible(false)}
                className="text-sm text-gray-500 underline"
              >
                Close
              </button>
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
              <h1 className="font-bold text-lg">Price</h1>
              <div className="py-2">
                <h1 className="text-lg font-semibold">
                  ${value[0]} — ${value[1]}
                </h1>
              </div>
              <Slider
                className="my-2"
                min={0}
                max={5000}
                value={value}
                onChange={(_, v) => setValue(v as number[])}
                onChangeCommitted={handlePriceCommitted as any}
                valueLabelFormat={(val) => `$${val}`}
                valueLabelDisplay="auto"
              />
            </div>

            <div className="h-px w-full bg-black/10 self-stretch my-2" />
            <ResetFilters />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMobile;
