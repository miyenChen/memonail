import styled from 'styled-components';

const IconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 10rem;
    box-shadow: ${(props) => (props.$shadow ? 'var(--box-shadow)' : undefined)};
    background-color: var(--color-gray-0);

    &:hover {
        background-color: var(--color-gray-100);
    }
    & svg {
        width: 1.25rem;
        height: 1.25rem;
    }
`;
export default IconButton;
