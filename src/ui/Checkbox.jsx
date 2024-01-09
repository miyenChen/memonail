import styled from 'styled-components';

const StyledCheckbox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;

    & label {
        font-size: 0.75rem;
    }
    & input {
        height: 1rem;
        width: 1rem;
        transform-origin: 0;
        accent-color: var(--color-gray-600);
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
