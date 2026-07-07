import { Search } from "pixelarticons/react";

export const SearchBar = () => {
  return (
    <div className="flex border-3 p-3 border-purple bg-surface items-center gap-2 ">
      <Search className="text-purple" />
      <input
        className="text-black flex items-center text-2xl outline-0"
        placeholder="Search Champions..."
      />
    </div>
  );
};
