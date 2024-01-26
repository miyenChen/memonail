import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Intro from './pages/Intro';
import AuthLayout from './pages/AuthLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import Notification from './pages/Notification';
import Setting from './pages/Setting';
import Profile from './features/setting/Profile';
import Account from './features/setting/Account';
import Map from './features/map/Map';
import LocationForm from './features/map/LocationForm';
import Location from './features/map/Location';
import ItineraryInfo from './features/itinerary/ItineraryInfo';

function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Intro />} />
                    <Route path="user" element={<AuthLayout />}>
                        <Route index element={<Navigate to="/" replace />} />
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login />} />
                    </Route>
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
                    <Route path="map" element={<Map />}>
                        <Route index element={<Navigate to="location" replace />} />
                        <Route path="location" element={<LocationForm />} />
                        <Route path="location/:id" element={<Location />} />
                        <Route path="itinerary/:id" element={<ItineraryInfo />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
