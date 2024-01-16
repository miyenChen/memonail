import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddCard from '../../ui/AddCard';
import CardList from '../../ui/CardList';
import LocationListCard from './LocationListCard';
import AllTagsList from '../../ui/AllTagsList';

function LocationList() {
    const navigate = useNavigate();
    const allTags = useSelector((state) => state.locations.allTags);
    const locations = useSelector((state) => state.locations.locations);

    const [selected, setSelected] = useState('ALL');

    const filteredLocations =
        selected === 'ALL'
            ? locations
            : locations.filter((location) => location.tags.includes(selected));

    function handleAddLocation() {
        navigate('/map/location', { replace: true });
    }
    return (
        <>
            <h1>我的地點</h1>

            <AllTagsList allTags={allTags} onSetActived={setSelected} />
            <CardList $col={3}>
                <AddCard onClick={handleAddLocation} />
                {filteredLocations.map((location) => (
                    <LocationListCard key={location.id} location={location} />
                ))}
            </CardList>
        </>
    );
}
export default LocationList;
