import styled from 'styled-components';

const StyledCheckbox = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
    gap: 0.25rem;

    & label {
        font-size: 0.75rem;
    }
`;
function Checkbox({ checked, onChange, disabled = false, id, children }) {
    return (
        <StyledCheckbox>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <label htmlFor={!disabled ? id : ''}>{children}</label>
        </StyledCheckbox>
    );
}
export default Checkbox;
