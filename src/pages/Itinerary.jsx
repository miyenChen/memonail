import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import ItineraryCard from '../features/itinerary/ItineraryCard';
import CardList from '../ui/CardList';
import TabList from '../ui/TabList';
import Tab from '../ui/Tab';
import AddCard from '../ui/AddCard';
import { updateDataType } from '../features/itinerary/itinerarySlice';

const StyledItinerary = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const TabGroup = styled(Tab)`
    & span:last-child {
        margin-left: 0.25rem;
    }
`;

const tabMapping = {
    'all': '全部',
    'todo': '計畫中',
    'finish': '已完成',
    'favorite': '我的收藏',
};

function filterItinerary(itinerarys, filterBy) {
    switch (filterBy) {
        case 'all':
            return itinerarys;
        case 'todo':
            return itinerarys.filter((item) => item.status === 'Todo');
        case 'finish':
            return itinerarys.filter((item) => item.status === 'Finish');
        case 'favorite':
            return itinerarys.filter((item) => item.favorite === true);
        default:
            return itinerarys;
    }
}

function Itinerary() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const itinerarys = useSelector((state) => state.itinerarys.itinerarys);
    const [tabActive, setTabActive] = useState('all');
    const [data, setData] = useState(itinerarys);
    const [tabCount, setTabCount] = useState(0);

    //監控 itinerarys 變化，即時更新
    useEffect(() => {
        const filteredData = filterItinerary(itinerarys, tabActive);
        setData(filteredData);

        setTabCount({
            all: itinerarys.length,
            todo: filterItinerary(itinerarys, 'todo').length,
            finish: filterItinerary(itinerarys, 'finish').length,
            favorite: filterItinerary(itinerarys, 'favorite').length,
        });
    }, [itinerarys, tabActive]);

    function handleChangeTab(tab) {
        setTabActive(tab);
        setData(filterItinerary(itinerarys, tab));
    }

    function handleAddItinerary() {
        const id = uuidv4();
        dispatch(updateDataType('new'));
        navigate(`/map/itinerary/${id}`);
    }

    return (
        <StyledItinerary>
            <h2>我的行程</h2>
            <TabList>
                {Object.keys(tabMapping).map((tab) => (
                    <TabGroup
                        key={tab}
                        className={tabActive === tab ? 'active' : ''}
                        onClick={() => handleChangeTab(tab)}>
                        <span>{tabMapping[tab]}</span>
                        <span>{tabCount[tab]}</span>
                    </TabGroup>
                ))}
            </TabList>

            <div>
                <CardList $col={4}>
                    <AddCard onClick={() => handleAddItinerary()} />
                    {data.map((itinerary) => (
                        <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                    ))}
                </CardList>
            </div>
        </StyledItinerary>
    );
}
export default Itinerary;
