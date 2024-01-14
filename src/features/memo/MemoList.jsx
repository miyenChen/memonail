import AddCard from '../../ui/AddCard';
import CardList from '../../ui/CardList';
import MemoListCard from './MemoListCard';
import TagList from '../../ui/TagList';
import Tag from '../../ui/tag';

function MemoList({ tags = [], onOpenAdd }) {
    return (
        <>
            <h1>我的筆記</h1>
            <TagList $padding="0.5rem" $margin="0.75rem 0">
                <Tag>ALL</Tag>
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </TagList>

            <CardList $col={2}>
                <AddCard onClick={onOpenAdd} />
                <MemoListCard
                    dateCreated="2021.12.10"
                    content="🌟 Exploring new horizons and embracing the! 🗺️✨ "
                    locations={['高雄', '新北']}
                />
                <MemoListCard
                    dateCreated="2021.12.10"
                    content="🌟 Exploring new horizons and embracing the #adventurelife! 🗺️✨ #Wanderlust #ExploreMore #TravelDiaries #DiscoverYourWorld"
                    locations={[]}
                />
                <MemoListCard
                    dateCreated="2021.12.10"
                    content="感受大自然的擁抱，用心感受生活的每一個色彩，每一刻都是獨一無二的畫面。 走在城市中，尋找那一抹被遺忘的美好。 #陽明山"
                    locations={['台北擎天崗']}
                />
            </CardList>
        </>
    );
}
export default MemoList;
