import styled from 'styled-components';

import LogoGroup from '../ui/LogoGroup';

const StyledHeader = styled.header`
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
`;
function Header({ children }) {
    return (
        <StyledHeader>
            <LogoGroup />
            {children}
        </StyledHeader>
    );
}
export default Header;
