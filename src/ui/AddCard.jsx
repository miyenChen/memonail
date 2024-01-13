import { FiPlusCircle } from 'react-icons/fi';
import Card from '../ui/Card';
import styled from 'styled-components';

const StyledAddCard = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed var(--color-cyan-500);
    color: var(--color-cyan-500);
    background-color: var(--color-bg);
    gap: 0.25rem;
    &:hover {
        background-color: var(--color-gray-50);
    }

    & svg {
        width: 1.25rem;
        height: 1.25rem;
    }
    & span {
        font-weight: 700;
    }
`;
function AddCard({ onClick }) {
    return (
        <StyledAddCard onClick={onClick}>
            <FiPlusCircle />
            <span>新增</span>
        </StyledAddCard>
    );
}
export default AddCard;
