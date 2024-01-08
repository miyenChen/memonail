import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Intro from './pages/Intro';
import GlobalStyles from './GlobalStyles';

function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Intro />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="home" element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
