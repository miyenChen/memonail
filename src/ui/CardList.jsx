import styled from 'styled-components';

// 最多欄位預設為1欄
const CardList = styled.ul.attrs((props) => {
    $col: props.$col || 1;
})`
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(${(props) => Math.min(props.$col, 1)}, 1fr);

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(${(props) => Math.min(props.$col, 2)}, 1fr);
    }

    @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(${(props) => Math.min(props.$col, 3)}, 1fr);
    }

    @media screen and (min-width: 1280px) {
        /* 最多只能擁有4欄 */
        grid-template-columns: repeat(${(props) => Math.min(props.$col, 4)}, 1fr);
    }
`;

export default CardList;
