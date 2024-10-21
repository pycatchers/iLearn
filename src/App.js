import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import SessionHandler from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SessionHandler />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
