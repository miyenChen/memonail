import { useState } from 'react';
import styled from 'styled-components';
import TabList from '../ui/TabList';
import Tab from '../ui/Tab';
import TagList from '../ui/TagList';
import Tag from '../ui/tag';
import CardList from '../ui/CardList';
import AddCard from '../ui/AddCard';
import { Dialog } from '../ui/Dialog';
import MemoListCard from '../features/memo/MemoListCard';
import AddMemo from '../features/memo/AddMemo';

const tags = ['Kr', '台南', '屏東', 'JP', '台南', '屏東'];

const Main = styled.main`
    margin-top: 1rem;
`;
const Title = styled.h1`
    border-bottom: 1px solid var(--color-gray-400);
`;
const TagListWrapper = styled.div`
    padding: 0.5rem;
    margin: 0.75rem 0;
`;
function Home() {
    const [toggleList, setToggleList] = useState(1);
    const [openAddCard, setOpenAddCard] = useState(false);

    const handleAddCard = () => {
        setOpenAddCard(true);
    };

    return (
        <>
            <TabList>
                <Tab onClick={(e) => setToggleList(1)} className={toggleList === 1 ? 'active' : ''}>
                    筆記
                </Tab>
                <Tab onClick={(e) => setToggleList(2)} className={toggleList === 2 ? 'active' : ''}>
                    地點
                </Tab>
            </TabList>
            <Main>
                {toggleList === 1 && (
                    <>
                        <Title>我的筆記</Title>
                        <TagListWrapper>
                            <TagList>
                                <Tag>ALL</Tag>
                                {tags.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </TagList>
                        </TagListWrapper>
                        <CardList $col={2}>
                            <AddCard onClick={handleAddCard} />
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
                        <AddMemo openAddCard={openAddCard} onClose={setOpenAddCard} />
                    </>
                )}
                {toggleList === 2 && (
                    <>
                        <Title>我的地點</Title>
                        <TagListWrapper>
                            <TagList>
                                {tags.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </TagList>
                        </TagListWrapper>
                        <CardList $col={3}>
                            <AddCard onClick={handleAddCard} />
                        </CardList>
                        <Dialog isOpened={openAddCard} onClose={setOpenAddCard}>
                            <div>添加地點</div>
                        </Dialog>
                    </>
                )}
            </Main>
        </>
    );
}
export default Home;
