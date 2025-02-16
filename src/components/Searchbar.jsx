import { IconSearch } from "@tabler/icons-react";
import PropTypes from "prop-types";

export default function Searchbar({ setSearchInput }) {
  return (
    <div className="border border-indigo-600 rounded p-2 flex gap-2 grow shrink">
      <input
        type="text"
        placeholder="Search note..."
        className="outline-none placeholder:text-neutral-600 grow shrink min-w-[10ch] w-1 bg-inherit"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <IconSearch className="text-indigo-600" />
    </div>
  );
}

Searchbar.propTypes = {
  setSearchInput: PropTypes.func.isRequired,
};
