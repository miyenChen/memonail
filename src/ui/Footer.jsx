import styled from 'styled-components';
import LogoGroup from './LogoGroup';
import Flex from './Flex';
import { Link } from 'react-router-dom';

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
    border-top: 1px solid var(--color-border);
    width: 100%;
    margin: 2rem;
    padding: 1rem;
    gap: 0.5rem;

    & div:first-child {
        margin-bottom: 1rem;
    }
`;
const StyledLink = styled(Link)`
    color: var(--color-gray-500);
    &:hover {
        color: var(--color-cyan-500);
        text-decoration: underline;
    }
`;
function Footer() {
    return (
        <StyledFooter>
            <LogoGroup />
            <Flex $justifyC="center">
                <StyledLink>關於我們</StyledLink>
                <StyledLink>服務條款</StyledLink>
                <StyledLink>常見問答</StyledLink>
                <StyledLink to="https://github.com/miyenChen/memonail" target="_blank">
                    Github
                </StyledLink>
            </Flex>
            <p>&copy; Copyright {new Date().getFullYear()} by Memonail Inc.</p>
        </StyledFooter>
    );
}
export default Footer;
