import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';
import intro from '../assets/team.png';
import locMapImg from '../assets/locMapImg.png';
import memoImg from '../assets/memoImg.png';
import itineraryImg from '../assets/itineraryImg.png';
import introTagsImg from '../assets/collaboration-3.png';
import memoTagsImg from '../assets/memoTagsImg.png';
import memoLocImg from '../assets/memoLocImg.png';
import memoAddImg from '../assets/memoAddImg.png';
import itineraryFullImg from '../assets/itineraryFullImg.png';
import onSiteWork from '../assets/on-site-work-2.png';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import Flex from '../ui/Flex';

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
        width: 80%;
    }
    @media screen and (min-width: 1280px) {
        width: 50%;
    }
`;
const IntroSection = styled.section`
    display: grid;
    margin-bottom: 4rem;
    width: 100%;
    gap: 1rem;
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
    & button {
        display: flex;
        align-items: center;
        position: relative;
        bottom: 12rem;
        background-color: var(--color-amber-400);

        &:hover {
            background-color: var(--color-amber-300);
            box-shadow: var(--box-shadow);
        }
    }
`;

const StyledOverview = styled(IntroSection)`
    & div.item {
        display: flex;
        justify-content: center;
        background-color: var(--color-gray-100);
        border: 1px solid var(--color-gray-100);
        border-radius: 0.5rem;
        padding: 1rem;
        width: 100%;

        &:hover {
            cursor: pointer;
            box-shadow: 0 0 8px var(--color-gray-300);
        }
    }
    & div.active {
        & h3 {
            color: var(--color-cyan-500);
        }
    }
`;

const StyledDetailIntro = styled(IntroSection)`
    grid-template-columns: 1fr;

    & div {
        background-color: var(--color-gray-100);
        border-radius: 0.5rem;
        padding: 2rem;

        & h2 {
            text-align: center;
        }

        & img {
            position: relative;
            border-radius: 1rem 1rem 0 0;
            bottom: -2.5rem;
            width: 100%;
        }
        & img.hidden {
            display: none;
        }
    }

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        & div.cross {
            grid-column: 1/3;
        }
        & div {
            & img {
                border-radius: 1rem 0 0 0;
                bottom: -2.5rem;
                right: -2rem;
                width: 100%;
            }
        }
    }
    @media screen and (min-width: 1000px) {
        & div.cross {
            & img.hidden {
                display: inline-block;
                width: 30%;
                margin-right: 10%;
            }
            & img {
                width: 60%;
            }
        }
    }
`;

const CardImg = styled.img`
    object-fit: cover;
    object-position: top left;
    border-radius: 0.5rem;
    width: ${(props) => props.$width || '100%'};
    height: ${(props) => props.$height || 'auto'};
`;
function Intro() {
    const [imgSrc, setImgSrc] = useState(memoImg);
    const [overviewIndex, setOverviewIndex] = useState(0);

    /* set overview section img from clicked index */
    function handleChangeImg(index) {
        const img = [memoImg, locMapImg, itineraryImg];
        if (index > img.length) {
            throw new Error('圖片與切換按鈕數量不符');
        }
        setOverviewIndex(index);
        setImgSrc(img[index]);
    }
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
                        Write, plan, clear
                        <br />
                        Memonail 更簡單的開始你的旅程
                    </h1>
                    <img src={intro} alt="intro img" />
                    <Link to="/user/register">
                        <Button $size="large">
                            免費開始
                            <Icon>
                                <FiArrowRight color="white" />
                            </Icon>
                        </Button>
                    </Link>
                </Hero>

                <StyledOverview>
                    <Flex>
                        <div
                            className={`item ${overviewIndex === 0 && 'active'}`}
                            onClick={() => handleChangeImg(0)}>
                            <h3>筆記</h3>
                        </div>
                        <div
                            className={`item ${overviewIndex === 1 && 'active'}`}
                            onClick={() => handleChangeImg(1)}>
                            <h3>地圖</h3>
                        </div>
                        <div
                            className={`item ${overviewIndex === 2 && 'active'}`}
                            onClick={() => handleChangeImg(2)}>
                            <h3>計畫</h3>
                        </div>
                    </Flex>
                    <CardImg src={imgSrc} alt="" $height="480px" $cover />
                </StyledOverview>
                <IntroSection>
                    <Flex $gap="4rem" $justifyC="center" $alignI="center">
                        <CardImg src={onSiteWork} $width="30%" />
                        <h2>
                            利用平時紀錄的地點和筆記
                            <br />
                            輕鬆建立想前往的旅程
                        </h2>
                    </Flex>
                    <CardImg src={itineraryFullImg} />
                </IntroSection>
                <StyledDetailIntro>
                    <div className="cross">
                        <h2>隨意、直覺的添加標籤，幫筆記做分類</h2>

                        <CardImg
                            src={introTagsImg}
                            alt="introTags"
                            className="hidden"
                            $width="30%"
                        />
                        <CardImg src={memoTagsImg} alt="introTags" $height="280px" />
                    </div>
                    <div>
                        <h2>同步更新地點紀錄</h2>
                        <CardImg src={memoLocImg} alt="memo location" $height="280px" />
                    </div>
                    <div>
                        <h2>添加圖片到筆記</h2>
                        <CardImg src={memoAddImg} alt="memo add img" $height="280px" />
                    </div>
                </StyledDetailIntro>

                <Footer />
            </Main>
        </>
    );
}
export default Intro;
