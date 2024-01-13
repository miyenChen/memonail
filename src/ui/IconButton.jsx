import styled from 'styled-components';

const IconButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: 10rem;

    color: ${(props) => props.$color};
    box-shadow: ${(props) => (props.$shadow ? 'var(--box-shadow)' : '')};
    background-color: ${(props) => props.$bg || 'var(--color-none)'};

    &:hover {
        background-color: var(--color-gray-100);
        cursor: pointer;
    }
    & svg {
        width: 1.5rem;
        height: 1.5rem;
    }
`;
export default IconButton;
