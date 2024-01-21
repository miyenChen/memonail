import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ItineraryCard from '../features/itinerary/ItineraryCard';
import CardList from '../ui/CardList';
import TabList from '../ui/TabList';
import Tab from '../ui/Tab';
import AddCard from '../ui/AddCard';

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

function Itinerary() {
    const navigate = useNavigate();
    return (
        <StyledItinerary>
            <h2>我的行程</h2>
            <TabList>
                <TabGroup className="active">
                    <span>計畫中</span>
                    <span>0</span>
                </TabGroup>
                <TabGroup>
                    <span>已完成</span>
                    <span>0</span>
                </TabGroup>
                <TabGroup>
                    <span>我的收藏</span>
                    <span>0</span>
                </TabGroup>
                <TabGroup>
                    <span>與我共用</span>
                    <span>0</span>
                </TabGroup>
            </TabList>

            <div>
                <CardList $col={4}>
                    <AddCard onClick={(e) => navigate('/map/itineraryEdit')} />

                    <ItineraryCard />
                    <ItineraryCard />
                </CardList>
            </div>
        </StyledItinerary>
    );
}
export default Itinerary;
