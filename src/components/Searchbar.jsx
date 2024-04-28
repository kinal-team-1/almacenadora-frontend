import { IconSearch } from "@tabler/icons-react";

export default function Searchbar() {
  return (
    <div className="border border-indigo-600 rounded p-2 flex gap-2 grow shrink">
      <input
        type="text"
        placeholder="Search note..."
        className="outline-none placeholder:text-neutral-600 grow shrink min-w-[10ch] w-1 bg-inherit"
      />
      <IconSearch className="text-indigo-600" />
    </div>
  );
}
