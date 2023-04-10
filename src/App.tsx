import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './helpers/hooks/useTelegram';
import RoutesComponent from './routes/Routes';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="app">
      <RoutesComponent />
    </div>
  );
}

export default App;
