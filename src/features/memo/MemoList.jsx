import styled from 'styled-components';
import MemoListCard from './MemoListCard';
import CardList from '../../ui/CardList';
import AddCard from '../../ui/AddCard';

function MemoList() {
    return (
        <CardList $col={3}>
            <AddCard />
            <MemoListCard />
        </CardList>
    );
}
export default MemoList;
