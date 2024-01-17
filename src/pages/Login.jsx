import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Form from '../ui/Form';
import InputGroup from '../ui/InputGroup';
import Input from '../ui/Input';
import Alert from '../ui/Alert';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            setErrorMsg('請確實填寫所有表格');
        } else {
            navigate('/home');
        }
    }
    return (
        <main>
            <h1>登入</h1>
            <Form onSubmit={handleSubmit} $padding="0.75rem">
                {errorMsg && <Alert $variation="error">{errorMsg}</Alert>}
                <InputGroup>
                    <label htmlFor="email">信箱</label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleEmail}
                        placeholder="e-mail"
                    />
                </InputGroup>
                <InputGroup>
                    <label htmlFor="password">密碼</label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handlePassword}
                        placeholder="密碼"
                    />
                </InputGroup>
                <Button type="submit">登入</Button>
            </Form>
            <p>
                還不是會員嗎? <Link to="/user/register">立即註冊</Link>
            </p>
        </main>
    );
}
export default Login;
