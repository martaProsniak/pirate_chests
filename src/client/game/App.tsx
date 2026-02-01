import {Board} from './Board/Board';
import { Layout } from '../UI/Layout';

export const App = () => {
  return (
    <Layout className="overflow-hidden" image="water">
      <Board mode='daily' />
    </Layout>
  );
};
