import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Rating from '../../ui/Rating';
import TagList from '../../ui/TagList';
import Tag from '../../ui/Tag';
import { setCurPosition } from './mapsSlice';
import DisplayMemos from './DisplayMemos';

const StyledLocation = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const TagContainer = styled(TagList)`
    & li {
        color: var(--color-amber-400);
        border-color: var(--color-amber-400);
    }
`;

function Location() {
    const { id } = useParams();
    const locations = useSelector((state) => state.locations.locations);
    const data = locations.find((item) => id === item.id);
    const {
        position = data.position,
        name = data.name,
        rating = data.rating,
        tags = data.tags,
        links = data.memosID,
    } = data;

    const dispatch = useDispatch();
    dispatch(setCurPosition(position));

    return (
        <StyledLocation>
            <TagContainer>
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </TagContainer>
            <h3>{name}</h3>
            <Rating defaultRating={rating} />
            <DisplayMemos links={links} />
        </StyledLocation>
    );
}
export default Location;
