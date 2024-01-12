import styled, { css } from 'styled-components';

const variations = {
    'primary': css`
        border: 1px solid var(--color-gray-300);
        background-color: var(--color-none);
        color: var(--color-gray-700);
    `,
    'error': css`
        background-color: var(--color-err-bg);
        border: 1px solid var(--color-err-border);
        color: var(--color-err-text);
    `,
};

const Alert = styled.div`
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;

    ${(props) => variations[props.$variation]};
`;

Alert.defaultProps = {
    $variation: 'primary',
};

export default Alert;
