import React, {FC, useEffect, useState} from 'react';
import SectionList from "./SectionList";
import {ITask} from "../models/ITask";

interface IListTasks {
    tasks: ITask[],
    setTasks: (value: ITask[]) => void
}

const ListTasks: FC <IListTasks> = ({tasks, setTasks}) => {
    const [todos, setTodos] = useState<ITask[]>([]);
    const [inProgress, setInProgress] = useState<ITask[]>([]);
    const [closed, setClosed] = useState<ITask[]>([]);

    useEffect(() => {
        const filterTodos = tasks.filter((task: any) => task.status === 'todo')
        const filterInProgress = tasks.filter((task: any) => task.status === 'inprogress')
        const filterClosed = tasks.filter((task: any) => task.status === 'closed')

        setTodos(filterTodos);
        setInProgress(filterInProgress)
        setClosed(filterClosed)

    }, [tasks])

    const statuses = ["todo", "inprogress", "closed"];

    return (
        <div className="flex gap-8" >
            {statuses.map((status, index) => {
                return <SectionList key={index}
                             status={status}
                             tasks={tasks}
                             setTasks={(value) => setTasks(value)}
                             todos={todos}
                             inProgress={inProgress}
                             closed={closed}
                />
            })}
        </div>
    );
};

export default ListTasks;