import React, {useEffect, useState} from 'react';
import CreateTask from "./components/Task/CreateTask";
import ListTasks from "./components/Task/ListTasks";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [tasks, setTasks] = useState<any>([]);

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem("tasks") ?? ''));
    }, [])

    const addTask = (task: {id: string, name: string, status: string}) => {
      setTasks((tasks: any) => {
          const list = [...tasks, task];

          localStorage.setItem("tasks", JSON.stringify(list));
          setTasks(list)

          return list;
      })
    }

  return (
      <DndProvider backend={HTML5Backend}>
        <div className="border-gray-100 w-screen h-screen flex flex-col items-center">
        <CreateTask addTask={addTask}/>
        <ListTasks tasks={tasks} setTasks={(value: any) => setTasks(value)}/>
        <ToastContainer position="bottom-right" />
        </div>
      </DndProvider>
  );
}

export default App;
