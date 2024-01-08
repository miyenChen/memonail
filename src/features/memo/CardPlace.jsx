import styled from 'styled-components';
import { FiChevronRight } from 'react-icons/fi';
import TagList from '../../ui/TagList';
import Tag from '../../ui/tag';

const tags = ['台南', '屏東', 'JP'];

const Place = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--color-gray-200);
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
function CardPlace() {
    return (
        <>
            <Place>
                <div>
                    <FiChevronRight />
                    <p>地點名稱</p>
                </div>
                <span>10</span>
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
