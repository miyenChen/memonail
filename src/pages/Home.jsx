import styled from 'styled-components';
import MemoList from '../features/memo/MemoList';
import TabList from '../ui/TabList';
import Tab from '../ui/Tab';
import TagList from '../ui/TagList';
import Tag from '../ui/tag';

const tags = ['ALL', 'Kr', '台南', '屏東', 'JP'];

const Main = styled.main`
    margin-top: 1rem;
`;
const Title = styled.h1`
    border-bottom: 1px solid var(--color-gray-400);
`;
const TagListPadding = styled.div`
    padding: 0.5rem;
    margin: 0.75rem 0;
`;
function Home() {
    return (
        <>
            <TabList>
                <Tab className="active">筆記</Tab>
                <Tab>地點</Tab>
            </TabList>
            <Main>
                <div>
                    <Title>我的筆記</Title>
                    <TagListPadding>
                        <TagList>
                            {tags.map((tag, index) => (
                                <Tag key={index}>{tag}</Tag>
                            ))}
                        </TagList>
                    </TagListPadding>
                    <MemoList />
                </div>
            </Main>
        </>
    );
}
export default Home;
