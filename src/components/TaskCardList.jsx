import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import emptyImageDark from "../assets/detective-night.png";
import emptyImageLight from "../assets/detective-light.png";
import TaskCard from "./TaskCard";

export function Spinner() {
  return (
    <div className="w-full flex mt-10 justify-center items-center">
      <div className="animate-spin size-[25px] border border-4  border-indigo-600 border-t-slate-300 rounded-full" />
    </div>
  );
}

const API_URL =
  "https://almacenadora-kinal-backend-a1957ef7f11d.herokuapp.com/api/task";

export default function TaskList({ isDark, shouldUpdate }) {
  const [state, setState] = useState({
    tasks: [],
    isLoading: true,
  });
  useEffect(() => {
    if (!shouldUpdate) return;
    console.log("WTF");
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (!response.ok) {
          toast("Error loading tasks", { type: "error" });
        }

        setState({
          tasks: data.data,
          isLoading: false,
        });
        toast("Tasks loaded", { type: "success" });
      } catch (error) {
        toast("Error loading tasks", { type: "error" });
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchTasks();
  }, [shouldUpdate]);

  if (state.isLoading) {
    return <Spinner />;
  }

  if (state.tasks.length === 0) {
    return (
      <div className="p-5 flex flex-col items-center justify-center gap-3">
        <img
          src={isDark ? emptyImageDark : emptyImageLight}
          alt="Empty"
          className="mx-auto mb-3"
        />
        <span>Empty ...</span>
      </div>
    );
  }

  return (
    <div className="w-full grow py-10 flex flex-col gap-3 px-4 overflow-y-scroll">
      {state.tasks.map(
        ({
          _id,
          title,
          description,
          isDone,
          date_start,
          date_end,
          label,
          user_name,
          user_lastname,
        }) => (
          <TaskCard
            onStatusChange={() => {
              async function updateTask() {
                console.log({ isDone, _id });
                const response = await fetch(`${API_URL}/${_id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ isDone: !isDone }),
                });

                if (!response.ok) {
                  toast("Error updating task", { type: "error" });
                  return;
                }
                console.log({ response: await response.json() });

                const taskIndex = state.tasks.findIndex(
                  // eslint-disable-next-line no-underscore-dangle
                  (task) => task._id === _id,
                );
                state.tasks[taskIndex] = {
                  ...state.tasks[taskIndex],
                  isDone: !isDone,
                };
                setState({ ...state, tasks: [...state.tasks] });
                toast("Task updated", { type: "success" });
              }

              updateTask();
            }}
            onRemove={() => {
              async function removeTask() {
                const response = await fetch(`${API_URL}/${_id}`, {
                  method: "DELETE",
                });

                if (!response.ok) {
                  toast("Error removing task", { type: "error" });
                  return;
                }
                console.log({ response: await response.json() });

                const taskIndex = state.tasks.findIndex(
                  // eslint-disable-next-line no-underscore-dangle
                  (task) => task._id === _id,
                );
                state.tasks.splice(taskIndex, 1);
                setState({ ...state, tasks: [...state.tasks] });
                toast("Task removed", { type: "success" });
              }

              removeTask();
            }}
            key={_id}
            title={title}
            description={description}
            isDone={isDone}
            date_start={date_start}
            date_end={date_end}
            label={label}
            user_name={user_name}
            user_lastname={user_lastname}
          />
        ),
      )}
    </div>
  );
}

TaskList.propTypes = {
  isDark: PropTypes.bool.isRequired,
  shouldUpdate: PropTypes.bool.isRequired,
};
