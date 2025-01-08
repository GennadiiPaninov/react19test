import { useEffect, useState,} from "react";
import axios from "axios";
import {Users} from "./users/Users";


export const UseOptimisticUpdateReactHook = () => {

    const [users, setUsers] = useState<{ name: string, id: string }[]>([])


     const addUserCallback = async  (name: string) =>{

        try {
            const response = await axios.post("http://localhost:8080/api",
                {user: {name: name, id: Math.random().toString(36).substring(2, 9)}}
            );
            setUsers(response.data.users);
        } catch (error) {
            console.error("Ошибка при обновлении данных:", error);
        }
    }


    useEffect(() => {
        const fetchAPI = async () => {
            const response = await axios.get('http://localhost:8080/api')
            setUsers(response.data.users)
        };

        fetchAPI()

    }, [])

    return <Users users={users} addUserCallback={addUserCallback}/>
};

