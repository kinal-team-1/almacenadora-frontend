import { useState } from "react";

export default function NewNoteModal() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs" >
        <h2 className="text-xl font-semibold mb-1">New Note</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="startDate"
            placeholder="Start Date (YYYY-MM-DD)"
            value={formData.startDate}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            name="endDate"
            placeholder="End Date (YYYY-MM-DD)"
            value={formData.endDate}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            value={formData.taskName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            <option value="">Select Status</option>
            <option value="TODO">TODO</option>
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
          <input
            type="text"
            name="label"
            placeholder="Label"
            value={formData.label}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
