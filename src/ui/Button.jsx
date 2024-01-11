import styled, { css } from 'styled-components';

const size = {
    'small': css`
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
    `,
    'normal': css`
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    `,
    'large': css`
        padding: 0.75rem 1.25rem;
        font-size: 1rem;
    `,
};

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-cyan-500);
    color: var(--color-gray-0);
    font-weight: 700;
    border: none;
    border-radius: 0.25rem;
    gap: 0.25rem;
    cursor: pointer;

    ${(props) => size[props.size]}
    ${(props) => (props.$w100 ? 'width: 100%;' : '')}

    &:hover {
        background-color: var(--color-cyan-600);
    }
`;
Button.defaultProps = {
    size: 'normal',
};
export default Button;
