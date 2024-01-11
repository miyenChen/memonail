import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';
import intro from '../assets/team.png';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Header from '../ui/Header';

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    & a {
        font-size: 1rem;
        font-weight: 700;
        padding: 0.25rem;

        &:not(:last-child):hover {
            box-shadow: 0px -2px 0px 0px var(--color-cyan-500) inset;
        }
        &:visited {
            color: var(--color-gray-500);
        }
    }
`;
const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: auto;
    @media screen and (min-width: 768px) {
        width: 70%;
    }
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
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 0.5rem;

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (min-width: 1280px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;
const IntroCardItem = styled.div`
    display: flex;
    justify-content: center;
    border: 2px solid var(--color-cyan-500);
    border-radius: 0.5rem;
    padding: 1rem;
    height: 300px;
`;
function Intro() {
    return (
        <>
            <Header>
                <Nav>
                    <Link to="user/register">註冊</Link>
                    <Link to="user/login">
                        <Button>登入帳號</Button>
                    </Link>
                </Nav>
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
        </>
    );
}
export default Intro;
