import { useState } from 'react';
import styled from 'styled-components';
import TabList from '../ui/TabList';
import Tab from '../ui/Tab';
import MemoList from '../features/memo/MemoList';
import LocationList from '../features/map/LocationList';

const Main = styled.main`
    margin-top: 1rem;
    & h1:first-child {
        border-bottom: 1px solid var(--color-gray-400);
    }
`;
function Home() {
    const [toggleList, setToggleList] = useState(1);

    return (
        <>
            <TabList>
                <Tab onClick={(e) => setToggleList(1)} className={toggleList === 1 ? 'active' : ''}>
                    筆記
                </Tab>
                <Tab onClick={(e) => setToggleList(2)} className={toggleList === 2 ? 'active' : ''}>
                    地點
                </Tab>
            </TabList>
            <Main>
                {toggleList === 1 && <MemoList />}
                {toggleList === 2 && <LocationList />}
            </Main>
        </>
    );
}
export default Home;
