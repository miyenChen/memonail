import AddCard from '../../ui/AddCard';
import CardList from '../../ui/CardList';
import TagList from '../../ui/TagList';
import Tag from '../../ui/tag';

function LocationList({ onOpenAdd, tags = [] }) {
    return (
        <>
            <h1>我的地點</h1>

            <TagList $padding="0.5rem" $margin="0.75rem 0">
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </TagList>
            <CardList $col={3}>
                <AddCard onClick={onOpenAdd} />
            </CardList>
        </>
    );
}
export default LocationList;
