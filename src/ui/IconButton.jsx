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
    background-color: ${(props) => props.$bg || 'var(--color-none)'};
    box-shadow: ${(props) => (props.$shadow ? 'var(--box-shadow)' : '')};
    position: ${(props) => props.$position || ''};

    &:hover {
        background-color: var(--color-gray-100);
        cursor: pointer;
    }
    & svg {
        width: ${(props) => props.$iconSize || '1.5rem'};
        height: ${(props) => props.$iconSize || '1.5rem'};
    }
`;
export default IconButton;
