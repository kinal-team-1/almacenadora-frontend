import {
  IconChevronDown,
  IconMoon,
  IconPlus,
  IconSun,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import Searchbar from "./components/Searchbar";
import TaskCard from "./components/TaskCard";

export default function App() {
  const body = useRef(null);
  if (!body.current) {
    body.current = document.querySelector("body");
  }

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (body.current.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-center dark:bg-[#252525] dark:text-neutral-200">
      <div className="w-full md:max-w-[80%] xl:max-w-[60%] py-5 px-2 h-full relative">
        <button
          type="button"
          className="bg-indigo-600 text-white p-3 rounded-full absolute bottom-5 right-2"
          aria-label="Add new item"
        >
          <IconPlus />
        </button>
        <h1 className="font-bold text-3xl w-full text-center">TODO LIST</h1>
        <div className="flex gap-3">
          <Searchbar />
          <button
            type="button"
            className="bg-indigo-600 text-white px-3 py-2 rounded flex gap-3 items-center"
          >
            <span>All</span>
            <IconChevronDown />
          </button>
          <button
            type="button"
            className="bg-indigo-600 text-white px-3 py-2 rounded"
            aria-label="Toggle dark mode"
            onClick={() => {
              body.current.classList.toggle("dark");
              setIsDark(!isDark);
            }}
          >
            {isDark && <IconSun />}
            {!isDark && <IconMoon />}
          </button>
        </div>
        <div className="mt-5">
          <TaskCard
            title="JAZHJAKSDHJA"
            description="ASKLDJ"
            isDone
            created_at="2024-04-29"
            last_updated_at="2024-04-09"
            date_start="2024-04-05"
            date_end="2024-04-28"
            label={{
              name: "KJFAS",
              color: "red",
            }}
            user_lastname="aklsdj"
            user_name="ajsdlkas"
          />
        </div>
        {/* CONTAINER OF TASK LIST */}
      </div>
    </div>
  );
}
