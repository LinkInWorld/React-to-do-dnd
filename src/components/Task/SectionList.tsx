import React, {FC, useEffect, useState} from 'react';
import HeaderSection from "./HeaderSection";
import Task from "./Task";
import {useDrop} from "react-dnd";
import {toast} from "react-toastify";
import {ITask} from "../models/ITask";

interface ISectionList{
    status: string,
    tasks: ITask[],
    setTasks: (value: any) => any,
    todos: ITask[],
    inProgress: ITask[],
    closed : ITask[],
}

const SectionList: FC <ISectionList> = ({status , tasks, setTasks, todos, inProgress, closed}) => {
    const [text, setText] = useState<string>("Новые");
    const [color, setColor] = useState<string>("bg-gray-500");
    const [tasksToMap, setTasksToMap] = useState(todos);

    useEffect(() => {
        switch (status) {
            case 'todo': {
                setText('Новые');
                setColor('bg-gray-500');
                setTasksToMap(todos);
                break;
            }
            case 'inprogress': {
                setText('В работе');
                setColor('bg-orange-500');
                setTasksToMap(inProgress);
                break;
            }
            case 'closed': {
                setText('Завершенные');
                setColor('bg-green-500');
                setTasksToMap(closed);
                break
            }
            default: {
                toast.error(`Статус задачи не найден ${status}`);
            }
        }
    },[todos, inProgress, closed, status])

    const [{isOver}, drop] = useDrop(() => ({
        accept: "task",
        drop: (item: any) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }))

    const addItemToSection = (id: string) => {
        setTasks((prev: any) => {

            const newTasks = prev.map((t: any) => {
                if(t.id === id){
                    return {...t, status: status}
                }
                return  t
            })
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            toast.success("Статус задачи изменен");

            return newTasks;
        })
    }

    return (
        <div ref={drop} className={`w-64 mt-5 p-2 rounded-md min-h-60 ${isOver ? "bg-slate-200" : ""}`}>
            <HeaderSection text={text} bg={color} count={tasksToMap.length} />
            {
                tasksToMap.map((task) => <Task key={task.id} task={task} tasks={tasks}
                                                                          setTasks={(value: any) => setTasks(value)}></Task>)
            }

        </div>
    );
};

export default SectionList;