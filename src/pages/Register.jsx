import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Terms from '../features/auth/Terms';
import Button from '../ui/Button';
import Form from '../ui/Form';
import InputGroup from '../ui/InputGroup';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Dialog from '../ui/Dialog';
import Alert from '../ui/Alert';

const Span = styled.span`
    color: var(--color-cyan-500);
    font-weight: 700;

    &:hover {
        text-decoration: underline;
        text-underline-offset: 0.25rem;
    }
`;
const TermsText = styled.div`
    margin: 1.5rem 0.5rem;
    font-size: 0.75em;
    height: 50vh;
    overflow: auto;
    & h1,
    h2,
    h3 {
        &:not(:first-child) {
            margin-top: 0.75rem;
        }
    }
`;

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, seterrorMsg] = useState('');
    const [openTerms, setOpenTerms] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <main>
            <h1>註冊</h1>
            <Form onSubmit={handleSubmit}>
                {errorMsg && <Alert>{errorMsg}</Alert>}
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
                <Checkbox id="terms">
                    我已經閱讀過且同意
                    <Span
                        onClick={() => {
                            setOpenTerms(true);
                        }}>
                        服務條款
                    </Span>
                </Checkbox>
                <Button>註冊</Button>
            </Form>
            <p>
                已經有帳號了? <Link to="/user/login">立即登入</Link>
            </p>
            <Dialog isOpened={openTerms} onClose={setOpenTerms}>
                <TermsText>
                    <Terms />
                </TermsText>
            </Dialog>
        </main>
    );
}
export default Register;
