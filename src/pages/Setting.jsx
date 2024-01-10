import styled from 'styled-components';
import Aside from '../features/setting/Aside';
import { Outlet } from 'react-router-dom';

const StyledSetting = styled.div`
    display: flex;
    flex-direction: column;
    width: min(700px, 100%);
    margin: auto;
`;
const Container = styled.div`
    display: flex;
    margin-top: 1rem;
    gap: 1rem;
`;
const Main = styled.main`
    flex: 1 0 0;
`;

function Setting() {
    return (
        <StyledSetting>
            <header>
                <h1>設定</h1>
            </header>
            <Container>
                <Main>{<Outlet />}</Main>
                <Aside />
            </Container>
        </StyledSetting>
    );
}
export default Setting;
