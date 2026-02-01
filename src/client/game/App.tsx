import {Board} from './Board';
import { Layout } from '../UI/Layout';

export const App = () => {
  return (
    <Layout className="overflow-hidden" image="water">
      <Board initialData={null} mode='practice' />
    </Layout>
  );
};
