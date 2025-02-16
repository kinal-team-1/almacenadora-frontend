import { IconMoon, IconPlus, IconSun } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { createPortal } from "react-dom";
import Searchbar from "./components/Searchbar";
import FormAddTask from "./components/FormAddTask";
import TaskCardList from "./components/TaskCardList";
import { API_URL } from "./config";
import DropDown from "./components/DropwDown";

async function loadLabels() {
  const defaultValue = "All";
  try {
    const response = await fetch(`${API_URL}/label`);
    console.log({ response });
    if (!response.ok) {
      return defaultValue;
    }
    const data = await response.json();
    const labels = data.data.map((label) => label.name);
    labels.unshift(defaultValue);
    return labels;
  } catch (error) {
    return defaultValue;
  }
}

export default function App() {
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [labels, setLabels] = useState(["All"]);
  const [selectedLabel, setSelectedLabel] = useState(labels[0]);
  const body = useRef(null);
  const portal = useRef(null);
  if (!body.current) {
    body.current = document.querySelector("body");
  }
  if (!portal.current) {
    portal.current = document.getElementById("portal");
  }

  const [isDark, setIsDark] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (body.current.classList.contains("dark")) {
      setIsDark(true);
    }
    loadLabels().then((labelsList) => {
      console.log({ labelsList });
      setLabels(labelsList);
    });
  }, []);

  const toggleFrom = () => {
    console.log("toggleForm");
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (shouldUpdate) {
      // makes sure to update the tasks only once
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

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
          <h1 className="font-bold text-3xl w-full text-center pb-3">
            ALMACENADORA
          </h1>
          <button
            type="button"
            className="bg-indigo-600 text-white p-3 rounded-full absolute bottom-5 z-50 right-2"
            aria-label="Add new item"
            onClick={toggleFrom}
          >
            <IconPlus />
          </button>
          <div className="flex gap-3 pb-3">
            <Searchbar setSearchInput={setSearchInput} />
            <DropDown
              onChange={(label) => setSelectedLabel(label)}
              options={labels}
              defaultOption="All"
            />
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
          <TaskCardList
            searchInput={searchInput}
            isDark={isDark}
            shouldUpdate={shouldUpdate}
            onEdit={() => {
              setShouldUpdate(true);
            }}
            labelFilter={selectedLabel !== "All" && selectedLabel}
          />
        </div>
      </div>
      {showForm &&
        createPortal(
          <FormAddTask
            onCancel={toggleFrom}
            onLoad={() => {}}
            onSubmit={(formData) => {
              const newTask = {
                title: formData.taskName,
                description: formData.description,
                date_start: formData.startDate,
                date_end: formData.endDate,
                user_name: formData.firstName,
                user_lastname: formData.lastName,
                label: formData.label,
                isDone: formData.status === "DONE",
              };
              async function addTask() {
                try {
                  const response = await fetch(`${API_URL}/task`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTask),
                  });

                  if (!response.ok) {
                    toast("Error adding task", { type: "error" });
                    return;
                  }

                  toast("Task added successfully", { type: "success" });
                } catch (error) {
                  toast("Error adding task", { type: "error" });
                }
              }
              addTask().then(() => {
                setShowForm(false);
                setShouldUpdate(true);
              });
            }}
          />,
          portal.current,
        )}
    </div>
  );
}
