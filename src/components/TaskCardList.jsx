import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import emptyImageDark from "../assets/detective-night.png";
import emptyImageLight from "../assets/detective-light.png";

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-5 w-full">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white shadow rounded p-4 w-full">
          <div className="font-semibold">{task.title}</div>
          <div className="text-white-500">Funcionando</div>
        </div>
      ))}
    </div>
  );
}

TaskList.propTypes = {
  isDark: PropTypes.bool.isRequired,
};
