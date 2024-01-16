import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddCard from '../../ui/AddCard';
import CardList from '../../ui/CardList';
import MemoListCard from './MemoListCard';
import AllTagsList from '../../ui/AllTagsList';

function MemoList({ onOpenAdd }) {
    const memos = useSelector((state) => state.memos.memos);
    const allTags = useSelector((state) => state.memos.allTags);
    const [selected, setSelected] = useState('ALL');

    const filteredMemos =
        selected === 'ALL' ? memos : memos.filter((memo) => memo.tags.includes(selected));

    return (
        <>
            <h1>我的筆記</h1>
            <AllTagsList allTags={allTags} onSetActived={setSelected} />
            <CardList $col={2}>
                <AddCard onClick={onOpenAdd} />
                {filteredMemos.map((memo) => (
                    <MemoListCard key={memo.id} memo={memo} img={memo.img} />
                ))}
            </CardList>
        </>
    );
}
export default MemoList;
