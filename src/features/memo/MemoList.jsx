import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddCard from '../../ui/AddCard';
import CardList from '../../ui/CardList';
import MemoListCard from './MemoListCard';
import AllTagsList from '../../ui/AllTagsList';
import AddMemo from './AddMemo';

function MemoList() {
    const memos = useSelector((state) => state.memos.memos);
    const allTags = useSelector((state) => state.memos.allTags);
    const [selected, setSelected] = useState('ALL');
    const [openAddCard, setOpenAddCard] = useState(false);

    const handleAddCard = () => {
        setOpenAddCard(true);
    };

    const filteredMemos =
        selected === 'ALL' ? memos : memos.filter((memo) => memo.tags.includes(selected));

    return (
        <>
            <div>
                <h1>我的筆記</h1>
                <AllTagsList allTags={allTags} onSetActived={setSelected} />
                <CardList $col={2}>
                    <AddCard onClick={handleAddCard} />
                    {filteredMemos.map((memo) => (
                        <MemoListCard key={memo.id} memo={memo} img={memo.img} />
                    ))}
                </CardList>
            </div>
            <AddMemo isOpened={openAddCard} onClose={setOpenAddCard} />
        </>
    );
}
export default MemoList;
