import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config";

export default function Form({ onSubmit, onLoad, onCancel, _id }) {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    taskName: "",
    description: "",
    status: "",
    label: "",
    firstName: "",
    lastName: "",
  });
  const [fetchedLabels, setFetchedLabels] = useState({
    labels: [],
    isLoading: true,
  });
  const handleCancel = () => {
    onCancel(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    onLoad(setFormData);
  }, []);

  useEffect(() => {
    async function fetchLabels() {
      try {
        const response = await fetch(`${API_URL}/label`);
        if (!response.ok) {
          toast("Error fetching labels", { type: "error" });
          return;
        }

        const data = await response.json();
        setFetchedLabels({ labels: data.data, isLoading: false });
        toast("Labels fetched successfully", { type: "success" });
      } catch (error) {
        toast("Error fetching labels", { type: "error" });
      }
    }

    fetchLabels();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="dark:text-neutral-200 fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute w-full h-full bg-slate-700/50 -z-10" />
      <div
        className="dark:bg-[#252525] bg-white p-6 rounded-lg shadow-lg"
        style={{
          width: "500px",
          height: "650px",
          top: "118px",
          left: "450px",
          borderRadius: "16px",
        }}
      >
        <h2 className="text-xl font-semibold mb-1 text-center">New Note</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="startDate"
            placeholder="Start Date (YYYY-MM-DD)"
            value={formData.startDate}
            onChange={handleChange}
            className="border bg-inherit text-inherit border-indigo-600 rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            name="endDate"
            placeholder="End Date (YYYY-MM-DD)"
            value={formData.endDate}
            onChange={handleChange}
            className="border bg-inherit text-inherit border-indigo-600 rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            value={formData.taskName}
            onChange={handleChange}
            className="border bg-inherit text-inherit border-indigo-600 rounded px-4 py-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border bg-inherit text-inherit border-indigo-600 rounded px-4 py-2 w-full"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border bg-inherit text-inherit border-indigo-600 rounded px-4 py-2 w-full"
          >
            <option value="">Select Status</option>
            <option value="TODO">TODO</option>
            <option value="DONE">DONE</option>
          </select>
          {fetchedLabels.isLoading && <p>Loading labels...</p>}
          {!fetchedLabels.isLoading && (
            <select
              className="border text-inherit bg-inherit bg-inherit text-inherit border-indigo-600 rounded px-4 py-2 w-full"
              name="label"
              value={formData.label || ""}
              onChange={handleChange}
            >
              <option value="">Ninguna</option>
              {fetchedLabels.labels.map((label) => (
                <option
                  className="dark:bg-[#252525] text-indigo-600 outline-0 border-0"
                  key={label._id}
                  value={label._id}
                >
                  {label.name}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border bg-inherit text-inherit border-indigo-600 rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border bg-inherit text-inherit border-indigo-600 rounded px-4 py-2 w-full "
          />
          <div className="flex gap-3 w-full justify-between">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-3 py-2 rounded flex gap-3 items-center"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-indigo-600 text-white px-3 py-2 rounded flex gap-3 items-center"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
