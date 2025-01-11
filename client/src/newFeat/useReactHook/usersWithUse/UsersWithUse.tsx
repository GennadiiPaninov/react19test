import { use } from 'react';
import { fetchAPI } from '../../../helpers/fetchAPI';

// Чтобы не ругался React нужно кэшировать promise
// кэш обещаний
const promiseCache = new Map<string, Promise<unknown>>();
// Функция запроса
// Принимаем
// функцию, которая будет записывать promises
// key - для маркировки обещания
function useQuery<T>({ fn, key }: { fn: () => Promise<T>; key: string }) {
  // Если нет ключа, то создаем и запускаем promise
  if (!promiseCache.has(key)) {
    promiseCache.set(key, fn());
  }

  const promise = promiseCache.get(key) as Promise<T>;
  const result = use(promise);

  return result;
}
export const UsersWithUse = () => {
  // функция use автоматически интегрируется с Suspense и ErrorBoundary
  // когда promise находится в ожидании он запускает откат ближайшего блендера ожидания
  // если promise откланяется, то use запускает ближайшую границу ошибки

  const users1 = useQuery({ fn: () => fetchAPI(), key: 'f' });

  console.log(users1);
  return (
    <div>
      {users1?.map((el: { name: string; id: string }) => {
        return <div key={el.id}>{el.name}</div>;
      })}
    </div>
  );
};
