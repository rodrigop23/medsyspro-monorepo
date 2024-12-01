"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "../lib/utils";

type Props = {
  placeholder: string;
  className?: string;
};

const SearchInput = ({ placeholder, className }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleInputChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex-1">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        type="text"
        className={cn(className, "pl-10")}
        placeholder={placeholder}
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
