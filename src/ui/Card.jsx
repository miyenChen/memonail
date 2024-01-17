import styled from 'styled-components';

const Card = styled.li`
    list-style: none;
    background-color: var(--color-gray-0);
    border: 2px solid var(--color-gray-0);
    border-radius: 0.5rem;
    padding: 0.75rem;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 8px var(--color-gray-300);
    }
`;
export default Card;
