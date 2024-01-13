import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import TagList from '../../ui/TagList';
import Tag from '../../ui/tag';

const Place = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    border-top: var(--divider);
    padding-top: 0.25rem;

    & div {
        display: flex;
        align-items: center;
    }

    & p {
        padding: 0.25rem 0;
        font-size: 0.875rem;
    }
    & span {
        color: var(--color-amber-500);
        font-weight: 700;
    }
`;
function CardPlace({ tags, locations }) {
    return (
        <>
            <Place>
                {locations.map((loction, index) => (
                    <div>
                        <FiMapPin />
                        <p>{loction}</p>
                    </div>
                ))}
            </Place>
            <TagList>
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </TagList>
        </>
    );
}
export default CardPlace;
