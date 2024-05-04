import { useEffect, useState } from "react";
import PropTypes from "prop-types";
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

export default function TaskList({ isDark }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTasks(data.data);
        console.log({ task: data.data });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (tasks.length === 0) {
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
      {tasks.map(
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

                if (!response.ok) return;
                console.log({ response: await response.json() });

                // eslint-disable-next-line no-underscore-dangle
                const taskIndex = tasks.findIndex((task) => task._id === _id);
                tasks[taskIndex] = { ...tasks[taskIndex], isDone: !isDone };
                setTasks([...tasks]);
              }

              updateTask();
            }}
            onRemove={() => {
              async function removeTask() {
                const response = await fetch(`${API_URL}/${_id}`, {
                  method: "DELETE",
                });

                if (!response.ok) return;
                console.log({ response: await response.json() });

                // eslint-disable-next-line no-underscore-dangle
                const taskIndex = tasks.findIndex((task) => task._id === _id);
                tasks.splice(taskIndex, 1);
                setTasks([...tasks]);
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
};
