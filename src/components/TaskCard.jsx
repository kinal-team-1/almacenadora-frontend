import { useState, useEffect } from "react";

const API_URL = "aksldasjdkasjd";

export default function TaskCard () {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json();
        setTasks(data);
        setLoading(false); 
      } catch (e) {
        console.error("Error fetching tasks", e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-lg">Loading...</div>
    </div>
  );

  if (tasks.length === 0) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="../public/image/BODY (Claroscuro).png" alt="Loading"/>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white shadow rounded p-4">
          <div className="font-semibold">{task.title}</div>
          <div className="text-white-500">Funcionando</div>{" "}
          {/* Aquí puedes ajustar según la estructura de tu tarea */}
        </div>
      ))}
    </div>
  );
};
