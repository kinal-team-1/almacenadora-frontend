import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import emptyImageDark from "../assets/detective-night.png";
import emptyImageLight from "../assets/detective-light.png";
import TaskCard from "./TaskCard";
import FormAddTask from "./FormAddTask";
import { API_URL } from "../config";

export function Spinner() {
  return (
    <div className="w-full flex mt-10 justify-center items-center">
      <div className="animate-spin size-[25px] border-4  border-indigo-600 border-t-slate-300 rounded-full" />
    </div>
  );
}
export default function TaskList({
  isDark,
  shouldUpdate,
  onEdit,
  searchInput,
  labelFilter,
}) {
  const [showPortalById, setShowPortalById] = useState(null);
  const [state, setState] = useState({
    tasks: [],
    isLoading: true,
  });

  useEffect(() => {
    if (!shouldUpdate) return;
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/task`);
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

  const filteredTasks = state.tasks
    .filter(({ title }) =>
      title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    .filter((task) => {
      if (!labelFilter) return true;
      return task.label?.name === labelFilter;
    });

  if (filteredTasks.length === 0) {
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
    <>
      {showPortalById &&
        createPortal(
          <FormAddTask
            onSubmit={(formData) => {
              async function updateTask() {
                const updatedTask = {
                  _id: showPortalById,
                  isDone: !formData.status,
                  title: formData.taskName,
                  description: formData.description,
                  date_start: formData.startDate,
                  date_end: formData.endDate,
                  user_name: formData.firstName,
                  user_lastname: formData.lastName,
                  // put valid mongo Id that points to nothing lol
                  label: formData?.label || "000000000000000000000000",
                };

                const response = await fetch(
                  `${API_URL}/task/${showPortalById}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTask),
                  },
                );

                if (!response.ok) {
                  toast("Error updating task", { type: "error" });
                  return;
                }
                toast("Task updated", { type: "success" });
                onEdit(updatedTask);
                setShowPortalById(null);
              }

              updateTask();
            }}
            onCancel={() => setShowPortalById(null)}
            onLoad={(setForm) => {
              const {
                title,
                description,
                isDone,
                date_start,
                date_end,
                label,
                user_name,
                user_lastname,
                // eslint-disable-next-line no-underscore-dangle
              } = state.tasks.find((x) => x._id === showPortalById);

              setForm({
                taskName: title,
                description,
                startDate: date_start.slice(0, 10),
                endDate: date_end.slice(0, 10),
                // eslint-disable-next-line no-underscore-dangle
                label: label?._id || null,
                status: isDone ? "DONE" : "TODO",
                firstName: user_name,
                lastName: user_lastname,
              });
            }}
          />,
          document.body,
        )}
      <div className="w-full grow py-10 flex flex-col gap-3 px-4 overflow-y-scroll">
        {filteredTasks.map(
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
                  const response = await fetch(`${API_URL}/task/${_id}`, {
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
                  const response = await fetch(`${API_URL}/task/${_id}`, {
                    method: "DELETE",
                  });

                  if (!response.ok) {
                    toast("Error removing task", { type: "error" });
                    return;
                  }
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
              onEdit={() => {
                setShowPortalById(_id);
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
    </>
  );
}

TaskList.propTypes = {
  isDark: PropTypes.bool.isRequired,
  shouldUpdate: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  labelFilter: PropTypes.string.isRequired,
};
