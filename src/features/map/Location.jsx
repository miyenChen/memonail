import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Rating from '../../ui/Rating';
import TagList from '../../ui/TagList';
import Tag from '../../ui/Tag';
import Flex from '../../ui/Flex';
import Button from '../../ui/Button';
import DisplayMemos from './DisplayMemos';
import { setCurPosition } from './mapsSlice';
import { deleteLocation } from './locationsSlice';
import { deleteLocationsID } from '../memo/memosSlice';

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
const StyledBtns = styled(Flex)`
    position: absolute;
    top: -2rem;
    right: 0;
`;
const DeleteBtn = styled(Button)`
    background-color: var(--color-gray-400);
`;

function Location() {
    const navigate = useNavigate();
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

    function handleDelete() {
        window.confirm('確認刪除');
        if (confirm('確認刪除') == true) {
            //deleteLocation刪除地點本身，deleteLocationsID刪除 memo 中的地點
            dispatch(deleteLocation(id));
            dispatch(deleteLocationsID(id));

            window.alert('刪除成功，將導向至首頁');
            navigate('/home', { replace: true });
        } else {
            console.log('取消');
        }
    }
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
            <StyledBtns>
                <DeleteBtn $size="small" onClick={handleDelete}>
                    刪除
                </DeleteBtn>
                <Button $size="small">編輯</Button>
            </StyledBtns>
        </StyledLocation>
    );
}
export default Location;
