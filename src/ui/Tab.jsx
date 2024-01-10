import styled from 'styled-components';

const Tab = styled.button`
    background-color: var(--color-gray-200);
    color: var(--color-gray-400);
    border: none;
    border-radius: 0.5rem;
    text-align: center;
    font-weight: 700;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;

    &:hover {
        cursor: pointer;
    }
    &.active {
        background-color: var(--color-gray-0);
        color: var(--color-cyan-500);
        box-shadow: var(--box-shadow);
    }
`;

export default Tab;
