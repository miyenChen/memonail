import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiBell, FiBriefcase, FiSettings } from 'react-icons/fi';
import LogoGroup from './LogoGroup';

const StyledMainNav = styled.nav`
    display: flex;
    height: 3rem;

    & span {
        display: none;
    }
    /* Hide the logo when screen width is below 768 */
    & div:first-child {
        display: none;
    }

    @media screen and (min-width: 768px) {
        flex-direction: column;
        justify-content: start;
        padding: 1rem 0.5rem 0 0.5rem;
        height: 100%;
        width: 4rem;

        & div:first-child {
            display: flex;
            margin: 0.5rem 0 1rem;
            gap: 0.25rem;

            /* Only display logo */
            & img:last-child {
                display: none;
            }
        }
    }
    @media screen and (min-width: 1280px) {
        width: 15rem;
        padding: 1rem;
        & span {
            display: inline-block;
            flex: 1 0 0;
            margin-left: 0.5rem;
        }
        & div:first-child {
            & img:last-child {
                display: block;
            }
        }
    }
`;

const Nav = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    border-top: var(--divider);
    width: 100%;

    @media screen and (min-width: 768px) {
        flex: 1 0 0;
        flex-direction: column;
        justify-content: start;
        align-self: stretch;
        border: none;
    }
`;
const StyledNavLink = styled(NavLink)`
    & svg {
        width: 1.25rem;
        height: 2.4rem;
        color: var(--color-gray-400);
        transition: all 0.3s;
    }
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-gray-400);
        font-weight: 700;
        border-radius: 0.25rem;
        padding: 0 0.5rem;
        margin: 0.25rem 0;
        transition: all 0.3s;
    }
    &:hover {
        background-color: var(--color-gray-100);
    }
    &:active,
    &.active:link,
    &.active:visited,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-cyan-500);
    }

    @media screen and (min-width: 768px) {
        justify-content: start;
        align-self: stretch;
    }
`;
function MainNav() {
    return (
        <StyledMainNav>
            <LogoGroup />

            <Nav>
                <StyledNavLink to="home">
                    <FiHome />
                    <span>首頁</span>
                </StyledNavLink>

                <StyledNavLink to="itinerary">
                    <FiBriefcase />

                    <span>行程</span>
                </StyledNavLink>

                <StyledNavLink to="notification">
                    <FiBell />

                    <span>通知</span>
                </StyledNavLink>
                <StyledNavLink to="setting">
                    <FiSettings />

                    <span>設定</span>
                </StyledNavLink>
            </Nav>
        </StyledMainNav>
    );
}
export default MainNav;
