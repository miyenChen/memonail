import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AddCard from '../../ui/AddCard';
import CardList from '../../ui/CardList';
import AllTagsList from '../../ui/AllTagsList';
import LocationListCard from './LocationListCard';
import { updateCurLocID } from './locationsSlice';

function LocationList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allTags = useSelector((state) => state.locations.allTags);
    const locations = useSelector((state) => state.locations.locations);

    const [selected, setSelected] = useState('ALL');

    const filteredLocations =
        selected === 'ALL'
            ? locations
            : locations.filter((location) => location.tags.includes(selected));

    function handleAddLocation() {
        const newID = uuidv4();
        dispatch(updateCurLocID(newID));
        navigate('/map/location');
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
