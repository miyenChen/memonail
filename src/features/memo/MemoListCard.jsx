import styled from 'styled-components';
import CardPlace from './CardPlace';
import Card from '../../ui/Card';

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
        <Card>
            <h3>title</h3>
            <p>date</p>
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sed, libero
                temporibus beatae autem inventore voluptas eius sequi rem illo aut aperiam. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Ipsam sed, libero temporibus
                beatae autem inventore voluptas eius sequi rem illo aut aperiam.
            </Text>
            <CardPlace />
        </Card>
    );
}
export default MemoListCard;
