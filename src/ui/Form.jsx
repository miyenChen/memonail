import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;

    padding: ${(props) => props.$padding};
`;
export default Form;
