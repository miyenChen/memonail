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
const variation = {
    'primary': css`
        background-color: var(--color-cyan-500);

        &:hover {
            background-color: var(--color-cyan-600);
        }
    `,
    'secound': css`
        background-color: var(--color-gray-400);

        &:hover {
            background-color: var(--color-cyan-600);
        }
    `,
};
const Button = styled.button`
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-gray-0);
    font-weight: 700;
    border: none;
    border-radius: 0.25rem;
    gap: 0.25rem;
    cursor: pointer;

    ${(props) => variation[props.$variation]}
    ${(props) => size[props.$size]}
    ${(props) => (props.$w100 ? 'width: 100%;' : '')}
`;
Button.defaultProps = {
    $size: 'normal',
    $variation: 'primary',
};
export default Button;
