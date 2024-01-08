import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MainNav from '../ui/MainNav';

const StyledLayout = styled.div`
    height: 100dvh;
    display: flex;
    flex-direction: column-reverse;
    position: relative;

    @media screen and (min-width: 768px) {
        flex-direction: row;
    }
`;
const Container = styled.div`
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: var(--color-bg);
    padding: 2rem;
`;

function Layout() {
    return (
        <StyledLayout>
            <MainNav />
            <Container>
                <Outlet />
            </Container>
        </StyledLayout>
    );
}
export default Layout;
