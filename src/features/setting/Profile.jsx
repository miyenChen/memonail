import { useState } from 'react';
import styled from 'styled-components';
import Form from '../../ui/Form';
import FormTitle from '../../ui/FormTitle';
import Section from '../../ui/Section';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

const Flex = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & p:first-child {
        width: 4rem;
    }
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
`;
function Profile() {
    const [name, setName] = useState('小美');
    const [gender, setGender] = useState('male'); // 初始狀態為'male'

    const genderOptions = [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' },
        { value: 'undisclosed', label: '不透露' },
    ];
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <>
            <Form>
                <FormTitle>個人檔案</FormTitle>
                <Section>
                    <Wrapper>
                        <Flex>
                            <p>用戶名</p>
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </Flex>
                        <Flex>
                            <p>性別</p>
                            {genderOptions.map((option) => (
                                <label key={option.value}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option.value}
                                        checked={gender === option.value}
                                        onChange={handleGenderChange}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </Flex>
                        <Button $w100>更新個人檔案</Button>
                    </Wrapper>
                </Section>
            </Form>
        </>
    );
}
export default Profile;
