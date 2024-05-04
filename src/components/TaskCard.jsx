import PropTypes from "prop-types";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function TaskCard({
  title,
  description,
  isDone,
  date_start,
  date_end,
  label,
  user_name,
  user_lastname,
  onStatusChange,
  onRemove,
}) {
  return (
    <div className="flex flex-col gap-5 shadow-lg p-2 w-full bg-neutral-100 dark:bg-[#2b2a2a] transition-transform hover:scale-105">
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <input
            checked={isDone}
            type="checkbox"
            onChange={onStatusChange}
            className="accent-indigo-600 size-[30px] rounded"
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-2xl"># {title}</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <IconEdit className="cursor-pointer hover:text-indigo-600" />
          <IconTrash
            onClick={onRemove}
            className="cursor-pointer hover:text-indigo-600"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col ">
          <div className="flex gap-3">
            <div className="flex flex-col">
              <span className="text-indigo-600">Nombre</span>
              <span>{user_name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-indigo-600">Apellido</span>
              <span>{user_lastname}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className="text-indigo-600">Descripción</span>
        <p>{description}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="flex flex-col">
            <span className="text-indigo-600">Fecha Inicio</span>
            <span>{date_start.slice(0, 10)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-indigo-600">Fecha Final</span>
            <span>{date_end.slice(0, 10)}</span>
          </div>
        </div>
        {label && (
          <div
            className="border relative rounded"
            style={{
              borderColor: label.color,
            }}
          >
            <span
              className="absolute w-full h-full"
              style={{
                backgroundColor: label.color,
                opacity: 0.5,
              }}
            />
            <div
              className="mx-2 my-1 cursor-pointer"
              style={{
                color: label.color,
              }}
            >
              {label.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  date_start: PropTypes.string.isRequired,
  date_end: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  label: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  user_name: PropTypes.string.isRequired,
  user_lastname: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
