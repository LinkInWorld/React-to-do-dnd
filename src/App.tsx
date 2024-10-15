import React, {useEffect, useState} from 'react';
import CreateTask from "./components/Task/CreateTask";
import ListTasks from "./components/Task/ListTasks";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ITask} from "./components/models/ITask";

function App() {
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem("tasks") ?? ''));
    }, [])

    const addTask = (task: ITask) => {
      setTasks((tasks) => {
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
            <ListTasks tasks={tasks} setTasks={(value) => setTasks(value)}/>
            <ToastContainer position="bottom-right" />
        </div>
      </DndProvider>
  );
}

export default App;
