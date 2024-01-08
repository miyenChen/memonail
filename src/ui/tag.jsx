import { render } from 'react-dom';
import styled from 'styled-components';

const Tag = styled.li`
    /* border: 1px solid var(--color-cyan-500); */
    border: 1px solid var(--color-gray-400);
    color: var(--color-gray-400);
    border-radius: 1rem;
    list-style: none;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.1rem 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: var(--color-gray-200);
    }
    &.active {
        border: 1px solid var(--color-cyan-500);
        background-color: var(--color-cyan-500);
        color: var(--color-gray-0);

        &:hover {
            background-color: var(--color-cyan-600);
        }
    }
`;

export default Tag;
