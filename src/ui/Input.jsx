import styled from 'styled-components';

const Input = styled.input`
    border: 1px solid var(--color-gray-400);
    border-radius: 0.25rem;
    padding: 0.5rem;

    font-size: ${(props) => props.$fz || ''};
    ${(props) => (props.$w100 ? 'width:100%;' : '')}

    &::placeholder {
        color: var(--color-gray-400);
    }
    &:hover {
        border: 1px solid var(--color-cyan-500);
    }
    &:focus {
        outline: none;
        border: 1px solid var(--color-cyan-500);
    }
`;
export default Input;
