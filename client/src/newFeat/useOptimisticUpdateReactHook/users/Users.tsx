import s from '../useOptimisticUpdateReactHook.module.scss';
import { useOptimistic, useRef } from 'react';

type Props = {
  users: { name: string; id: string }[];
  addUserCallback: (name: string) => void;
};
export const Users = ({ users, addUserCallback }: Props) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const addUser = async (formData: FormData) => {
    addOptimisticUser({ name: formData.get('name') as string, id: '123' });
    formRef.current?.reset();
    await addUserCallback(formData.get('name') as string);
  };

  // const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
  // показ оптимистично обновленного состояния во время выполнения async действия

  // возвращает
  // optimisticState - результат состояния во время запроса
  // addOptimistic - вызывается для обновления, принимает аргумент с данными
  // принимает
  // state - значения возвращающееся изначально и всякий раз, когда нет ожидающихся действий
  // updateFn - принимает текущее состояние и новый элемент для обновления состояния, возвращает новое состояние

  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (state, newUser: { name: string; id: string }) => [...state, newUser],
  );

  return (
    <div>
      {optimisticUsers.map((el) => {
        return (
          <div key={el.id}>
            Name: {el.name}, Id: {el.id}
          </div>
        );
      })}

      <div className={s.container}>
        <h2>Add User Async</h2>
        <form className={s.userForm} ref={formRef} action={addUser}>
          <input
            type="text"
            placeholder="Enter user name"
            required
            name={'name'}
          />
          <button type="submit">add user</button>
        </form>
      </div>
    </div>
  );
};
