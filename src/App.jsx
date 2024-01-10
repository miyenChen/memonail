import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Intro from './pages/Intro';
import GlobalStyles from './GlobalStyles';
import Itinerary from './pages/Itinerary';
import Notification from './pages/Notification';
import Setting from './pages/Setting';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './features/setting/Profile';
import Account from './features/setting/Account';

function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Intro />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="home" element={<Home />} />
                        <Route path="itinerary" element={<Itinerary />} />
                        <Route path="notification" element={<Notification />} />
                        <Route path="setting" element={<Setting />}>
                            <Route index element={<Navigate to="profile" replace />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="account" element={<Account />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
