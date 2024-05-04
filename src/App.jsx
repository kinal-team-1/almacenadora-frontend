import {
  IconChevronDown,
  IconMoon,
  IconPlus,
  IconSun,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import FormAddTask from './components/FormAddTask';
import TaskCardList from "./components/TaskCardList";

export default function App() {
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const body = useRef(null);
  if (!body.current) {
    body.current = document.querySelector("body");
  }

  const [isDark, setIsDark] = useState(false);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    if (body.current.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleFrom = () => {
    console.log("toggleForm");
    setShowForm(!showForm);
  };

  return (
    <div>
      <ToastContainer
        className="text-2xl"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="h-dvh flex flex-col items-center bg-slate-100 dark:bg-[#252525] dark:text-neutral-200 overflow-x-visible overflow-y-hidden">
        <div className="w-full md:max-w-[80%] xl:max-w-[60%] py-5 px-2 h-full relative flex flex-col">
          <h1 className="font-bold text-3xl w-full text-center">ALMACENADORA</h1>
          <button
            type="button"
            className="bg-indigo-600 text-white p-3 rounded-full absolute bottom-5 z-50 right-2"
            aria-label="Add new item"
            onClick={toggleFrom}
          >
            <IconPlus />
          </button>
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
          <TaskCardList isDark={isDark} shouldUpdate={shouldUpdate} />
        </div>
      </div>
      {showForm && <FormAddTask onTaskAdded={() => {
        setShouldUpdate(true)
        setTimeout(() => {
          setShouldUpdate(false);
        }, 500);
      }} />}
    </div>
  );
}
