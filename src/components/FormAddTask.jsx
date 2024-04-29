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
    <div className="modal-container">
      <div className="modal">
        <h2>New Note</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="startDate"
            placeholder="Start Date (YYYY-MM-DD)"
            value={formData.startDate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="endDate"
            placeholder="End Date (YYYY-MM-DD)"
            value={formData.endDate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            value={formData.taskName}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
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
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
