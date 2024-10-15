import React, {FC, useEffect, useState} from 'react';
import SectionList from "./SectionList";
import {useDrop} from "react-dnd";

interface IListTasks {
    tasks: any,
    setTasks: (value: any) => any
}

const ListTasks: FC <IListTasks> = ({tasks, setTasks}) => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);

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
            {statuses.map((status: string, index: number) => {
                return <SectionList key={index}
                             status={status}
                             tasks={tasks}
                             setTasks={(value: any) => setTasks(value)}
                             todos={todos}
                             inProgress={inProgress}
                             closed={closed}
                />
            })}
        </div>
    );
};

export default ListTasks;