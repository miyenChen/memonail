import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddCard from '../../ui/AddCard';
import CardList from '../../ui/CardList';
import MemoListCard from './MemoListCard';
import TagList from '../../ui/TagList';
import Tag from '../../ui/tag';

function MemoList({ onOpenAdd }) {
    const memos = useSelector((state) => state.memos.memos);
    const allTags = useSelector((state) => state.memos.allTags);
    const [activeTag, setActiveTag] = useState('ALL');

    const filteredMemos =
        activeTag === 'ALL' ? memos : memos.filter((memo) => memo.tags.includes(activeTag));

    function handleTagsList(tag) {
        setActiveTag(tag);
    }

    return (
        <>
            <h1>我的筆記</h1>
            <TagList $padding="0.5rem" $margin="0.75rem 0">
                <Tag
                    className={activeTag === 'ALL' ? 'active' : ''}
                    onClick={() => handleTagsList('ALL')}>
                    ALL
                </Tag>
                {allTags.map((tag, index) => (
                    <Tag
                        key={index}
                        className={activeTag === tag ? 'active' : ''}
                        onClick={() => handleTagsList(tag)}>
                        {tag}
                    </Tag>
                ))}
            </TagList>
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
