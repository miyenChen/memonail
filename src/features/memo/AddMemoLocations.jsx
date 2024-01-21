import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LocationListCard from '../map/LocationListCard';
import styled from 'styled-components';

const StyledList = styled.ul`
    display: grid;
    gap: 0.5rem;

    & li {
        list-style: none;
    }
`;
function AddMemoLocations({ onSetSelected }) {
    const locations = useSelector((state) => state.locations.locations);
    const [selectedLocations, setSelectedLocations] = useState([]);

    function handleSelectCards(id) {
        setSelectedLocations((cardID) => {
            const isSelected = cardID.includes(id);

            if (isSelected) {
                return cardID.filter((selectedId) => selectedId !== id);
            } else {
                return [...cardID, id];
            }
        });
    }
    useEffect(() => {
        let selectedData = locations.filter((location) => selectedLocations.includes(location.id));
        onSetSelected(selectedData);
        // console.log(selectedData);
    }, [selectedLocations]);

    return (
        <div>
            <StyledList>
                {locations.map((location) => (
                    <LocationListCard
                        key={location.id}
                        location={location}
                        onClick={() => handleSelectCards(location.id)}
                        selected={selectedLocations.includes(location.id)}
                        $border="1px solid var(--color-gray-300)"
                    />
                ))}
            </StyledList>
        </div>
    );
}
export default AddMemoLocations;
