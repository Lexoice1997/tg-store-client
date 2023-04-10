import { Route, Routes } from 'react-router-dom';
import Form from '../pages/Form/Form';
import Home from '../pages/Home';

function RoutesComponent() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="form" element={<Form />} />
    </Routes>
  );
}

export default RoutesComponent;
