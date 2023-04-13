import Image from "next/image";
import search from "../../../public/search.svg";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  handleSearch: () => Promise<void>;
}

const SearchInput = ({ value, onChange, handleSearch }: SearchInputProps) => (
  <div className="mb-2 flex">
    <input
      className="w-48 h-9 px-2 rounded-s-xl text-black outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <div className="w-10 flex justify-center items-center rounded-e-xl bg-white">
      <Image
        src={search}
        alt="search icon"
        width={25}
        height={25}
        onClick={handleSearch}
        className="hover:cursor-pointer select-none"
        draggable={false}
      />
    </div>
  </div>
);

export default SearchInput;
