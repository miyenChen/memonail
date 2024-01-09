import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';
import intro from '../assets/team.png';
import Icon from '../ui/Icon';
import LogoGroup from '../ui/LogoGroup';
import Button from '../ui/Button';

const StyledIntro = styled.div`
    & a {
        font-size: 1rem;
        font-weight: 700;
        padding: 0.25rem;
        font-weight: 700;
        padding: 0.25rem;

        &:visited {
            color: var(--color-gray-500);
        }
    }
`;
const Header = styled.header`
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;

    & nav {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
`;
const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin: auto;
`;
const Hero = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    & h1 {
        text-align: center;
        position: relative;
        top: 80px;
    }
`;
const HeroButton = styled(Button)`
    display: flex;
    align-items: center;
    position: relative;
    bottom: 12rem;
    background-color: var(--color-amber-400);

    &:hover {
        background-color: var(--color-amber-500);
        box-shadow: var(--box-shadow);
    }
`;
const IntroCards = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;

    @media screen and (min-width: 768px) {
        flex-direction: row;
    }
`;
const IntroCardItem = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    border: 2px solid var(--color-cyan-500);
    border-radius: 0.5rem;
    padding: 1rem;
    height: 300px;
    width: 100%;
`;
function Intro() {
    return (
        <StyledIntro>
            <Header>
                <LogoGroup />
                <nav>
                    <Link to="register">註冊</Link>
                    <Link to="login">
                        <Button>登入帳號</Button>
                    </Link>
                </nav>
            </Header>
            <Main>
                <Hero>
                    <h1>
                        Write, plan, share
                        <br />
                        Memonail 更簡單的開始你的旅程
                    </h1>
                    <img src={intro} alt="intro img" />
                    <Link to="register">
                        <HeroButton size="large">
                            免費開始
                            <Icon>
                                <FiArrowRight color="white" />
                            </Icon>
                        </HeroButton>
                    </Link>
                </Hero>
                <IntroCards>
                    <IntroCardItem>
                        <h3>筆記</h3>
                    </IntroCardItem>
                    <IntroCardItem>
                        <h3>地圖</h3>
                    </IntroCardItem>
                    <IntroCardItem>
                        <h3>計畫</h3>
                    </IntroCardItem>
                </IntroCards>
            </Main>
        </StyledIntro>
    );
}
export default Intro;
