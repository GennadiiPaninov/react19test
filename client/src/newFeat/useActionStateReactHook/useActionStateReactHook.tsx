import {useEffect, useState} from "react";
import axios from "axios";
import s from './useActiontyle.module.scss'

export const UseActionStateReactHook = () => {
    const [users, setUsers] = useState<{ name: string, id: string }[]>([])
    const [userName, setUserName] = useState('');
    const fetchAPI = async () => {
        const response = await axios.get('http://localhost:8080/api')
        setUsers(response.data.users)
        console.log(response.data.users)
    };
    useEffect(() => {
        fetchAPI()
    }, [])
    const handleAddUser = async  (event: React.FormEvent) =>{
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api",
                {user: {name: userName, id: Math.random().toString(36).substr(2, 9)}}
            );
            setUsers(response.data.users); // Обновляем состояние клиента
            setUserName(''); // Сбрасываем поле ввода
        } catch (error) {
            console.error("Ошибка при обновлении данных:", error);
        }
    }
    return (
        <div>
            {users.map(el => {
                return <div key={el.id}>{el.name}</div>
            })}
            <div className={s.container} >
                <h2>Add User Async</h2>
                <form className={s.userForm} onSubmit={handleAddUser}>
                    <input type="text" placeholder="Enter user name" required onChange={(e) => setUserName(e.target.value)} value={userName}/>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};
