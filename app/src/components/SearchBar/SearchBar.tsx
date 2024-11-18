import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

export const SearchBar = ({
  sortingOptions,
  searchFn,
}: {
  sortingOptions: { displayName: string; htmlValue: string }[];
  searchFn: (searchString: string) => unknown; //should return filtered data
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    searchFn(searchTerm);
  }, [searchTerm]);

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <select className="select select-bordered">
        {sortingOptions.map((option) => (
          <option key={option.htmlValue} value={option.htmlValue}>
            {option.displayName}
          </option>
        ))}
      </select>
      <div className="flex flex-row">
        <input
          className="input input-bordered"
          type="text"
          placeholder="Buscar usuário"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="flex flex-col justify-center">
          <MdSearch className="-ml-6" />
        </div>
      </div>
    </div>
  );
};
