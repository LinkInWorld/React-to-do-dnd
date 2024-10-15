import React, {FC, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import styles from './style.module.scss';
import {v4 as uuidv4} from 'uuid';
import {toast} from "react-toastify";

interface ICreateTask {
    addTask: (value: {id: string, name: string, status: string}) => void
}

const CreateTask: FC <ICreateTask> = ({addTask}) => {

    return (
        <Formik
            initialValues={{
                name: ""
            }}
            validationSchema={
                Yup.object({
                    name: Yup.string().required('Напишите название задачи'),
                })
            }
            onSubmit={(values, { resetForm }) => {
                addTask({id: uuidv4(), name: values.name, status: 'todo'});
                toast.success('Задача добавлена!')
                resetForm();
            }}
        >
            {() => (
                <Form className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <label className={styles.labelFormik}>Название задачи
                        <Field
                            type="name"
                            name="name"
                            className={styles.inputFormik}
                        /></label>
                        <ErrorMessage name="name">{(mes: string) => <p className={styles.errorMessage}>{mes}</p>}</ErrorMessage>
                    </div>
                    <div>
                        <button type="submit"
                                className={styles.button}>
                            Сохранить
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateTask;