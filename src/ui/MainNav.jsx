import styled from 'styled-components';

const StyledMainNav = styled.div`
    height: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #8ffee4;

    @media screen and (min-width: 768px) {
        height: 100%;
        width: 4rem;
    }
    @media screen and (min-width: 1280px) {
        height: 100%;
        width: 15rem;
    }
`;
function MainNav() {
    return <StyledMainNav>MainNav</StyledMainNav>;
}
export default MainNav;
