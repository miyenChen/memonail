import styled from 'styled-components';
import CardPlace from './CardPlace';

const Padding = styled.div`
    padding: 0.5rem;
    width: 100%;
    @media screen and (min-width: 768px) {
        width: 50%;
    }
    @media screen and (min-width: 1280px) {
        width: 33.33%;
    }
`;
const Card = styled.li`
    background-color: var(--color-gray-0);
    list-style: none;
    border: 2px solid var(--color-gray-0);
    border-radius: 0.5rem;
    padding: 0.75rem;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 8px var(--color-gray-300);
    }
`;
const Text = styled.p`
    max-height: none;

    @media screen and (min-width: 768px) {
        --max-lines: 3;
        --line-height: 1.5;
        max-height: calc(1em * var(--max-lines) * var(--line-height));
        overflow: hidden;
    }
`;

function MemoListCard() {
    return (
        <Padding>
            <Card>
                <h3>title</h3>
                <p>date</p>
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sed, libero
                    temporibus beatae autem inventore voluptas eius sequi rem illo aut aperiam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sed, libero
                    temporibus beatae autem inventore voluptas eius sequi rem illo aut aperiam.
                </Text>
                <CardPlace />
            </Card>
        </Padding>
    );
}
export default MemoListCard;
