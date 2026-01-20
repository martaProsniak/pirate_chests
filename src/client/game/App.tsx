import { useCounter } from '../hooks/useCounter';
import {Board} from './Board';

export const App = () => {
  const { username } = useCounter();
  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-md font-bold text-center text-gray-900 ">
          {username ? `Hey ${username} 👋` : ''}
        </h1>
      </div>
      <Board />
      <footer className="">
        Here footer
      </footer>
    </div>
  );
};
