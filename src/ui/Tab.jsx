import styled, { css } from 'styled-components';

const size = {
    sm: css`
        font-size: 1rem;
        padding: 0.25rem 0.5rem;
    `,
    md: css`
        font-size: 1.2rem;
        padding: 0.25rem 0.5rem;
    `,
    lg: css`
        font-size: 1.4rem;
        padding: 0.25rem 0.5rem;
    `,
};

const Tab = styled.button`
    background-color: var(--color-bg);
    color: var(--color-gray-400);
    border: none;
    border-radius: 0.25rem;
    text-align: center;
    font-weight: 700;

    &:hover {
        background-color: var(--color-gray-200);
    }
    &.active {
        color: var(--color-cyan-500);
    }

    ${(props) => size[props.size]}
`;
Tab.defaultProps = {
    size: 'md',
};
export default Tab;
