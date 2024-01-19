import { useState } from 'react';
import TagList from './TagList';
import Tag from './Tag';

function AllTagsList({ allTags, onSetActived }) {
    const [activedTag, setActivedTag] = useState('ALL');

    function handleActived(tag) {
        setActivedTag(tag);
        onSetActived(tag);
    }
    return (
        <TagList $padding="0.5rem" $margin="0.75rem 0">
            <Tag
                className={activedTag === 'ALL' ? 'active' : ''}
                onClick={() => handleActived('ALL')}>
                ALL
            </Tag>
            {allTags.map((tag, index) => (
                <Tag
                    className={activedTag === tag ? 'active' : ''}
                    onClick={() => handleActived(tag)}
                    key={index}
                    $hover>
                    {tag}
                </Tag>
            ))}
        </TagList>
    );
}
export default AllTagsList;
