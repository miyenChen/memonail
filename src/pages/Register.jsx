import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Terms from '../features/auth/Terms';
import Button from '../ui/Button';
import Form from '../ui/Form';
import InputGroup from '../ui/InputGroup';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import { Dialog, DialogCloseBtn, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
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
    padding: 1.5rem;
    font-size: 0.75em;
    & h1,
    h2,
    h3 {
        &:not(:first-child) {
            margin-top: 0.75rem;
        }
    }
`;

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [openTerms, setOpenTerms] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleTerms = (e) => {
        setIsChecked(e.target.checked);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setErrorMsg('請確實填寫所有表格');
            return;
        } else if (password.length < 6) {
            setErrorMsg('密碼不得低於6位數');
        } else if (!isChecked) {
            setErrorMsg('請閱讀服務條款後，勾選以表示同意內容');
        } else {
            navigate('/home');
        }
    };
    return (
        <main>
            <h1>註冊</h1>
            <Form onSubmit={handleSubmit} $padding="0.75rem">
                {errorMsg && <Alert $variation="error">{errorMsg}</Alert>}
                <InputGroup>
                    <label htmlFor="username">用戶名</label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleUsername}
                        placeholder="用戶名"
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <label htmlFor="email">信箱</label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleEmail}
                        placeholder="e-mail"
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <label htmlFor="password">密碼</label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handlePassword}
                        placeholder="密碼不得低於6位數"
                        required
                    />
                </InputGroup>
                <Checkbox id="terms" checked={isChecked} onChange={handleTerms}>
                    (必須)我已經閱讀過且同意
                    <Span
                        onClick={() => {
                            setOpenTerms(true);
                        }}>
                        服務條款
                    </Span>
                </Checkbox>
                <Button type="submit">註冊</Button>
            </Form>
            <p>
                已經有帳號了? <Link to="/user/login">立即登入</Link>
            </p>
            <Dialog isOpened={openTerms} onClose={setOpenTerms}>
                <DialogHeader>
                    <DialogTitle>服務條款</DialogTitle>
                    <DialogCloseBtn isOpened={openTerms} onClose={setOpenTerms} />
                </DialogHeader>
                <DialogContent>
                    <TermsText>
                        <Terms />
                    </TermsText>
                </DialogContent>
            </Dialog>
        </main>
    );
}
export default Register;
