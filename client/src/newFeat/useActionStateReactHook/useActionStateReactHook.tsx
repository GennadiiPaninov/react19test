import {useActionState, useEffect, useState,} from "react";
import axios from "axios";
import s from './useActiontyle.module.scss'

export const UseActionStateReactHook = () => {
    const [users, setUsers] = useState<{ name: string, id: string }[]>([])
    const [userName, setUserName] = useState('');
    const handleAddUser = async  (prev: string | null, FormData: {}) =>{

        console.log(prev, typeof FormData)
        try {
            const response = await axios.post("http://localhost:8080/api",
                {user: {name: userName, id: Math.random().toString(36).substring(2, 9)}}
            );
            setUsers(response.data.users); // Обновляем состояние клиента
            setUserName(''); // Сбрасываем поле ввода
            return "User создан"
        } catch (error) {
            console.error("Ошибка при обновлении данных:", error);
            return "User не создан"
        }
    }
    //
    // const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
    // Возвращает
    // state = начальное состояние, которое установлено на основе указанного начального состояния, а потом то, что возвращено из fn
    // formState = действие, которое устанавливается в action prop для form или в formAction для button
    // -- внутри себя она вызывает fn
    // -- пока fn исполняется isPending будет true
    // isPending = состояние ожидания boolean, в момент обработки нашего действия formState
    // Принимает
    // fn = функция действия, она принимает prev значение или начальное состояние, если вызывается впервые, а также FormData(все аргументы, которые передаются при действии)
    // initialState = начальное состояние
    //

    const [state, formState, isPending ]=useActionState(handleAddUser, null)

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await axios.get('http://localhost:8080/api')
            setUsers(response.data.users)
        };

        fetchAPI()

    }, [])
    console.log(state)
    return (
        <div>
            {users.map(el => {
                return <div key={el.id}>Name: {el.name}, Id: {el.id}</div>
            })}

            <p>{state}</p>
            <div className={s.container}>
                <h2>Add User Async</h2>
                <form className={s.userForm}>
                    <input type="text" placeholder="Enter user name" required onChange={(e) => setUserName(e.target.value)} value={userName} name={'name'}/>
                    <button type="submit" formAction={formState}>{isPending ? "...loading": "add"}</button>
                </form>
            </div>
        </div>
    );
};
