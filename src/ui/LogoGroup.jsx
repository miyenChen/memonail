import styled from 'styled-components';
import logoText from '/logo-text.svg';
import logo from '/logo-icon.svg';

const StyledLogoGroup = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
`;
function LogoGroup() {
    return (
        <StyledLogoGroup href="/">
            <img src={logo} alt="logo" />
            <img src={logoText} alt="logo" />
        </StyledLogoGroup>
    );
}

export default LogoGroup;
