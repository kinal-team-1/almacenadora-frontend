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
}) {
  return (
    <div className="flex flex-col gap-5 border p-2">
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <input
            checked={isDone}
            type="checkbox"
            className="accent-indigo-600 size-[30px]"
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-2xl"># {title}</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <IconEdit />
          <IconTrash />
        </div>
        {/* <span>{description}</span> */}
        {/* <span>{String(isDone)}</span> */}
        {/* <span>{created_at}</span> */}
        {/* <span>{last_updated_at}</span> */}
        {/* <span>{date_start}</span> */}
        {/* <span>{date_end}</span> */}
        {/* <div className="flex gap-4"> */}
        {/* <span>{label.name}</span> */}
        {/* <span>{label.color}</span> */}
        {/* </div> */}
        {/* <span>{user_name}</span> */}
        {/* <span>{user_lastname}</span> */}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col ">
          <div className="flex gap-3 text-red-700 dark:text-blue-500">
            <span>Nombre</span>
            <span>Apellido</span>
          </div>
          <div className="flex gap-3">
            <span>{user_name}.</span>
            <span>{user_lastname}.</span>
          </div>
        </div>
      </div>
      <div>
        <span className="text-red-600 dark:text-blue-600">Descripcion</span>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae
          ut adipisci dicta quaerat perspiciatis, aperiam nulla, quisquam
          maiores suscipit itaque ducimus sequi modi ratione natus minima
          voluptas distinctio libero? Amet expedita qui maxime harum aliquid
          iure tempora quasi, aut quos!
        </p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <span>{date_start}</span>
          <span>{date_end}</span>
        </div>
        <div
          style={{
            borderColor: label.color,
            border: `1px ${label.color} solid`,
          }}
          className="relative rounded"
        >
          <span
            className="absolute w-full h-full px-2 py-2"
            style={{
              backgroundColor: label.color,
              opacity: 0.3,
            }}
          />
          <span
            style={{
              color: label.color,
            }}
          >
            {label.name}
          </span>
        </div>
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
  label: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  user_name: PropTypes.string.isRequired,
  user_lastname: PropTypes.string.isRequired,
};
