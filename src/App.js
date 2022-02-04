import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './containers/home-page';
import LoginPage from './features/auth/login-page';
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from './features/auth/authSlice';
import NotFound from './containers/not-found';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => isAuth(dispatch, state));

  return (
    <Routes>
      <Route path="/" element={!auth ? <Navigate to="/login" /> : <HomePage />} />
      <Route path="/login" element={auth ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="not-found" element={<NotFound />} />
      <Route path='*' element={ <Navigate to="/not-found" />}/>
    </Routes>
  );
}

export default App;
