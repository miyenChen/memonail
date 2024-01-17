import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import Rating from '../../ui/Rating';
import TagList from '../../ui/TagList';
import Tag from '../../ui/tag';
import Card from '../../ui/Card';
import IconButton from '../../ui/IconButton';

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;

    & h3 {
        margin-bottom: 0.25rem;
    }
`;
const TagContainer = styled(TagList)`
    margin: 0.25rem 0 0.5rem;
    & li {
        color: var(--color-amber-400);
        border-color: var(--color-amber-400);
    }
`;
const StyledDisplay = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    color: var(--color-cyan-500);
    margin-top: 0.5rem;

    & p {
        flex: 1;
    }
`;
const CountedLinks = styled.span`
    color: ${(props) => (props.$color ? 'var(--color-amber-500)' : 'var(--color-gray-400)')};
`;
const LinkedMemosContainer = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & li {
        list-style: none;
        border-radius: 0.5rem;
        border: 1px solid var(--color-border);
        padding: 0.5rem;

        &:hover {
            box-shadow: var(--box-shadow);
        }
    }
`;
function LocationListCard({ location }) {
    const {
        name = location.name,
        rating = location.rating,
        tags = location.tags,
        links = location.memosID,
    } = location;
    const memos = useSelector((state) => state.memos.memos);
    const [linkedMemos, setLinkedMemos] = useState('');
    const [showMemos, setShowMemos] = useState(false);

    useEffect(() => {
        setLinkedMemos(memos.filter((memo) => links.includes(memo.id)));
    }, []);

    function handleShowedMemos() {
        setShowMemos(!showMemos);
    }

    return (
        <StyledCard>
            <TagContainer>
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </TagContainer>
            <h3>{name}</h3>
            <div>
                <Rating defaultRating={rating} />
            </div>
            <StyledDisplay onClick={handleShowedMemos}>
                <p>Memos Link</p>
                <CountedLinks $color={links.length > 0 ? true : false}>{links.length}</CountedLinks>
                <IconButton>
                    <FiPlus />
                </IconButton>
            </StyledDisplay>
            {showMemos ? (
                <LinkedMemosContainer>
                    {linkedMemos.map((memolink, index) => (
                        <li key={index}>{memolink.content}</li>
                    ))}
                </LinkedMemosContainer>
            ) : null}
        </StyledCard>
    );
}
export default LocationListCard;
