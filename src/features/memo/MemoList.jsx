import AddCard from '../../ui/AddCard';
import CardList from '../../ui/CardList';
import MemoListCard from './MemoListCard';
import TagList from '../../ui/TagList';
import Tag from '../../ui/tag';
import { useSelector } from 'react-redux';

const demoData = [
    {
        id: '123',
        dateCreated: '2021/01/14',
        tags: ['陽明山'],
        content:
            '感受大自然的擁抱，用心感受生活的每一個色彩，每一刻都是獨一無二的畫面。 走在城市中，尋找那一抹被遺忘的美好。',
        locations: ['台北', '擎天崗'],
        img: [
            {
                url: 'https://www.futureview360.com/wp-content/uploads/2019/02/800px-Taipei_101_2009_amk-642x1024.jpg',
                name: 'taipei 101',
            },
            {
                url: 'https://myjourney.tw/wp-content/uploads/20191026001621_9.jpg',
                name: 'Qingtiangang Grassland',
            },
        ],
    },
    {
        id: '456',
        dateCreated: '2022/12/31',
        tags: ['ArtisticSoul', 'CreativityUnleashed', 'ArtInspiration'],
        content: '🎨Embracing the beauty of imperfection in every brushstroke🎨',
        locations: ['Japan'],
        img: [],
    },
    {
        id: '5566',
        dateCreated: '2023/11/04',
        tags: ['台中', '咖啡廳', 'coffee'],
        content: ' 今天到草悟道走走，天氣真好! 🎃 ',
        locations: [],
        img: [
            {
                url: 'https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg',
                name: 'coffee',
            },
        ],
    },
];
function MemoList({ tags = [], onOpenAdd }) {
    const memos = useSelector((state) => state.memos.memos);
    const allTags = useSelector((state) => state.memos.allTags);
    return (
        <>
            <h1>我的筆記</h1>
            <TagList $padding="0.5rem" $margin="0.75rem 0">
                <Tag>ALL</Tag>
                {allTags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </TagList>

            <CardList $col={2}>
                <AddCard onClick={onOpenAdd} />
                {demoData.map((data) => (
                    <MemoListCard key={data.id} memo={data} img={data.img} />
                ))}
                {memos.map((memo) => (
                    <MemoListCard key={memo.id} memo={memo} />
                ))}
            </CardList>
        </>
    );
}
export default MemoList;
