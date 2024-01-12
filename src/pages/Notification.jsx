import styled from 'styled-components';
import { FiBell } from 'react-icons/fi';
import CardList from '../ui/CardList';

const StyledNotification = styled.main`
    width: min(700px, 100%);
    margin: auto;
    height: 100%;
    & h2 {
        margin-bottom: 1rem;
    }
`;
const EmptyNotification = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-gray-400);
    text-align: center;
    height: calc(100dvh - 10rem);
    gap: 2rem;

    & svg {
        width: 3rem;
        height: 3rem;
    }
`;
function Notification() {
    return (
        <StyledNotification>
            <h2>通知</h2>
            <CardList>
                <EmptyNotification>
                    <FiBell />
                    <p>
                        邀請朋友一起編輯旅程 <br />
                        共同編輯的旅程更新會顯示在這邊
                    </p>
                </EmptyNotification>
            </CardList>
        </StyledNotification>
    );
}
export default Notification;
