import styled from 'styled-components';
import MemoListCard from './MemoListCard';

const StyledMemoList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

function MemoList() {
    return (
        <StyledMemoList>
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
            <MemoListCard />
        </StyledMemoList>
    );
}
export default MemoList;
