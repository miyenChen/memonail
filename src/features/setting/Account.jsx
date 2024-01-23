import Form from '../../ui/Form';
import FormTitle from '../../ui/FormTitle';
import Section from '../../ui/Section';
import Button from '../../ui/Button';
import styled from 'styled-components';

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
    gap: 0.5rem;
`;
function Account() {
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormTitle>帳戶管理</FormTitle>
                <Section>
                    <Wrapper>
                        <Flex>
                            <p>密碼</p>
                            <Button $size="small">更改密碼</Button>
                        </Flex>
                        <Flex>
                            <p>信箱</p>
                            <p>example@gmail.com</p>
                        </Flex>
                    </Wrapper>
                </Section>
            </Form>
        </>
    );
}
export default Account;
