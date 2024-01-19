import { useNavigate } from 'react-router-dom';
import { FiMap } from 'react-icons/fi';
import styled from 'styled-components';
import Rating from '../../ui/Rating';
import TagList from '../../ui/TagList';
import Tag from '../../ui/Tag';
import Flex from '../../ui/Flex';
import Card from '../../ui/Card';
import IconButton from '../../ui/IconButton';
import DisplayMemos from './DisplayMemos';

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;

    border: ${(props) => {
        if (props.$selected) {
            return '1px solid var(--color-cyan-500)'; // Selected state
        } else if (props.$border) {
            return props.$border; // Custom state
        } else {
            return 'none'; // Default state
        }
    }};
`;
const TagContainer = styled(TagList)`
    margin: 0.25rem 0 0.5rem;
    & li {
        color: var(--color-amber-400);
        border-color: var(--color-amber-400);
    }
`;

function LocationListCard({ location, onClick, selected, $border }) {
    const navigate = useNavigate();
    const {
        id = location.id,
        name = location.name,
        rating = location.rating,
        tags = location.tags,
        links = location.memosID,
    } = location;

    return (
        <StyledCard onClick={onClick} $selected={selected} $border={$border}>
            <TagContainer>
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </TagContainer>
            <h3>{name}</h3>
            <Flex $justifyC="space-between">
                <Rating defaultRating={rating} />
                <IconButton
                    $color="var(--color-amber-500)"
                    $iconSize="1.2rem"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/map/location/${id}`);
                    }}>
                    <FiMap />
                </IconButton>
            </Flex>
            <DisplayMemos links={links} />
        </StyledCard>
    );
}
export default LocationListCard;
