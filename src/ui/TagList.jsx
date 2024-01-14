import styled from 'styled-components';

const TagList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.5rem;

    padding: ${(props) => props.$padding};
    margin: ${(props) => props.$margin};
`;

export default TagList;
