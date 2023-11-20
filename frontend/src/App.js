import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Learning from './pages/Learning';
import Login from './pages/Login';
import GTest from './pages/GTest';
import GTest2 from './pages/GTest2';
import Appointment from './pages/Appointment';

function App() {



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Learning />} />
                <Route path="/login" element={<Login />} />
                <Route path="/gtest" element={<GTest />} />
                <Route path="/gtest2" element={<GTest2 />} />
                <Route path="/admin" element={<Appointment />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
