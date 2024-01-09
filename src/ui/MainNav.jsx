import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiBell, FiBriefcase, FiSettings } from 'react-icons/fi';

const StyledMainNav = styled.nav`
    height: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #8ffee4;

    & span {
        display: none;
    }

    @media screen and (min-width: 768px) {
        flex-direction: column;
        height: 100%;
        width: 4rem;
    }
    @media screen and (min-width: 1280px) {
        height: 100%;
        width: 15rem;
    }
`;
const Icon = styled.div`
    padding: 0.25rem;
`;
function MainNav() {
    return (
        <StyledMainNav>
            <NavLink to="home">
                <Icon>
                    <FiHome />
                </Icon>
                <span>首頁</span>
            </NavLink>
            <NavLink to="itinerary">
                <Icon>
                    <FiBriefcase />
                </Icon>
                <span>行程</span>
            </NavLink>
            <NavLink to="notification">
                <Icon>
                    <FiBell />
                </Icon>
                <span>通知</span>
            </NavLink>
            <NavLink to="setting">
                <Icon>
                    <FiSettings />
                </Icon>
                <span>設定</span>
            </NavLink>
        </StyledMainNav>
    );
}
export default MainNav;
