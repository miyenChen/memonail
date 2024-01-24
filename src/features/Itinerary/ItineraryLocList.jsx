import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import Flex from '../../ui/Flex';
import Button from '../../ui/Button';
import Tag from '../../ui/Tag';
import TagList from '../../ui/TagList';

const StyledTitle = styled(Flex)`
    & a {
        color: var(--color-cyan-500);
    }
`;
const StyledLocList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0.25rem;
    flex: 1 0 0;
    overflow: auto;
    gap: 0.5rem;
`;
const StyledLoc = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--color-gray-0);
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;

    border: ${(props) => {
        if (props.$selected) {
            return '1px solid var(--color-cyan-500)'; // Selected state
        } else {
            return '1px solid var(--color-gray-300)'; // Default state
        }
    }};
    &:hover {
        border: 1px solid var(--color-amber-500);
    }
    & p {
        margin-top: 0.25rem;
        font-weight: 700;

        color: ${(props) => {
            if (props.$selected) {
                return ' var(--color-cyan-500)'; // Selected state
            } else {
                return ' var(--color-gray-500)'; // Default state
            }
        }};
    }
    & li {
        color: var(--color-gray-0);
        background-color: var(--color-gray-300);
        border: 1px solid var(--color-gray-0);
    }
`;

function ItineraryLocList({ activeDay, setSchedules, onSetMode }) {
    const locations = useSelector((state) => state.locations.locations);
    const [selected, setSelected] = useState([]);

    function handleAddLoc() {
        selected.forEach((id) => {
            const cardID = uuidv4();
            const newLoc = locations.find((loc) => loc.id === id);
            setSchedules((pre) => [
                ...pre,
                { cardID, day: activeDay, time: '無', locInfo: newLoc },
            ]);
        });
        setSelected([]);
        onSetMode('edit');
    }
    function handleSelectCards(id) {
        setSelected((cardID) => {
            const isSelected = cardID.includes(id);

            if (isSelected) {
                return cardID.filter((selectedId) => selectedId !== id);
            } else {
                return [...cardID, id];
            }
        });
    }

    return (
        <>
            <StyledTitle>
                <h3>我的地點</h3>
                <Link to="/map/location">自訂地點</Link>
            </StyledTitle>
            <StyledLocList>
                {locations.map((location) => (
                    <StyledLoc
                        key={location.id}
                        onClick={() => handleSelectCards(location.id)}
                        $selected={selected.includes(location.id)}>
                        <TagList>
                            {location.tags.map((tag, index) => (
                                <Tag key={index}> {tag}</Tag>
                            ))}
                        </TagList>
                        <p>{location.name}</p>
                    </StyledLoc>
                ))}
            </StyledLocList>
            <Flex $margin=".75rem 0 0">
                <Button onClick={() => onSetMode('edit')} $variation="secound" $w100>
                    取消
                </Button>
                <Button onClick={handleAddLoc} $w100>
                    新增地點
                </Button>
            </Flex>
        </>
    );
}
export default ItineraryLocList;
