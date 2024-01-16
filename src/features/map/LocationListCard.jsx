import { useSelector } from 'react-redux';

function LocationListCard({ location }) {
    const memos = useSelector((state) => state.memos.memos);

    const {
        name = location.name,
        rating = location.rating,
        tags = location.tags,
        link = location.memosID,
    } = location;

    const LinkMemos = link.length > 0 ? memos.filter((memo) => memo.id.includes(link)) : '';

    return (
        <div>
            <p>{name}</p>
            <div>{rating}</div>
            <div>{tags}</div>
            <div>{LinkMemos && LinkMemos.map((memolink) => memolink.content)}</div>
        </div>
    );
}
export default LocationListCard;
