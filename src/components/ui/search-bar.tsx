import { cn } from "@/utils/cn";
import { Search } from "pixelarticons/react";
import { forwardRef, useState, type FormEvent } from "react";

type SearchBarProps = {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      placeholder = "Search Champions...",
      disabled,
      onChange,
      onSubmit,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const inputValue = value ?? internalValue;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(inputValue);
    };

    const handleChange = (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    };

    return (
      <form
        className={cn(
          "flex border-3 p-3 border-purple bg-surface items-center gap-2",
          disabled ? "border-gray-300 bg-gray-100" : "border-purple bg-surface",
        )}
        onSubmit={handleSubmit}
      >
        <Search className={disabled ? "text-gray-300" : "text-purple"} />
        <input
          ref={ref}
          className="text-black flex items-center text-2xl outline-0 w-full disabled:opacity-60"
          placeholder={placeholder}
          value={inputValue}
          disabled={disabled}
          onChange={(event) => handleChange(event.target.value)}
        />
      </form>
    );
  },
);
