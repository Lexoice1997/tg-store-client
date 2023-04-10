import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { useTelegram } from './helpers/hooks/useTelegram';
import RoutesComponent from './routes/Routes';

function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="app">
      {/* <Header /> */}
      <RoutesComponent />
    </div>
  );
}

export default App;
