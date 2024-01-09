import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../ui/Header';
import Button from '../ui/Button';
import Form from '../ui/Form';
import InputGroup from '../ui/InputGroup';
import Input from '../ui/Input';

const StyledAuth = styled.div`
    display: flex;
    flex-direction: column;
    height: 100dvh;

    & main {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        gap: 1rem;

        & a {
            color: var(--color-cyan-500);
            font-weight: 700;
        }
    }
`;
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <StyledAuth>
            <Header />
            <main>
                <h1>登入</h1>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <label htmlFor="email">信箱</label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.email)}
                            placeholder="e-mail"
                        />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="password">密碼</label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setEmail(e.target.password)}
                            placeholder="密碼"
                        />
                    </InputGroup>
                    <Button>登入</Button>
                </Form>
                <p>
                    還不是會員嗎? <Link to="/register">立即註冊</Link>
                </p>
            </main>
        </StyledAuth>
    );
}
export default Login;
