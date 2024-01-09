import styled, { css } from 'styled-components';

const size = {
    20: css`
        width: 1.25rem;
        height: 1.25rem;
    `,
    24: css`
        width: 1.5rem;
        height: 1.5rem;
    `,
};
const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) => size[props.size]}
`;

Icon.defaultProps = {
    size: 24,
};
export default Icon;
