import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import ListCard from './view/ListCard';
import './App.css';

function App() {
  return (
    <ReduxProvider store={store}>
      <ListCard/>
    </ReduxProvider>
  );
}

export default App;
