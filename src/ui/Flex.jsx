import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
    gap: ${(props) => props.$gap || '0.5rem'};

    align-items: ${(props) => (props.$justifyC ? props.$alignI : 'center')};
    justify-content: ${(props) => (props.$justifyC ? props.$justifyC : '')};
`;
export default Flex;