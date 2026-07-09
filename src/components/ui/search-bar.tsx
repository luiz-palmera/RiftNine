import { Search } from "pixelarticons/react";
import type { FormEvent } from "react";
import { useState } from "react";

type SearchBarProps = {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export const SearchBar = ({
  value,
  placeholder = "Search Champions...",
  disabled,
  onChange,
  onSubmit,
}: SearchBarProps) => {
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
      className="flex border-3 p-3 border-purple bg-surface items-center gap-2"
      onSubmit={handleSubmit}
    >
      <Search className="text-purple" />
      <input
        className="text-black flex items-center text-2xl outline-0 w-full disabled:opacity-60"
        placeholder={placeholder}
        value={inputValue}
        disabled={disabled}
        onChange={(event) => handleChange(event.target.value)}
      />
    </form>
  );
};
