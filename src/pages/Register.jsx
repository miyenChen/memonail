import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../ui/Header';
import Button from '../ui/Button';
import Form from '../ui/Form';
import InputGroup from '../ui/InputGroup';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';

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
function Register() {
    const [username, setUsername] = useState('');
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
                        <label htmlFor="username">用戶名</label>
                        <Input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setEmail(e.target.username)}
                            placeholder="用戶名"
                        />
                    </InputGroup>
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
                    <Checkbox>
                        我已經閱讀過且同意<a href="">服務條款</a>
                    </Checkbox>
                    <Button>登入</Button>
                </Form>
                <p>
                    已經有帳號了? <Link to="/login">立即登入</Link>
                </p>
            </main>
        </StyledAuth>
    );
}
export default Register;
