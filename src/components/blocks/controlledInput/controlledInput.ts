import { Block } from 'core';
import { IInputProps } from 'components/ui/Input/input';
import { validationField, ValidationRuleEnum } from 'helpers/validator';
import './controlledInput.scss';

interface IControlledInputProps extends IInputProps {
    label?: string;
    onChange?: () => void;
    validationRule?: ValidationRuleEnum;
}

export class ControlledInput extends Block {
    static componentName = 'ControlledInput';

    constructor({ label, validationRule, ...props }: IControlledInputProps) {
        super({
            ...props,
            label,
            onBlur: (e: FocusEvent) => {
                const { value } = e.target as HTMLInputElement;

                if (validationRule) {
                    const errorMessage = validationField(validationRule, value);
                    this.refs.error.setProps({ text: errorMessage });
                }
            },
        });
    }

    render() {
        // language=hbs
        return `
            <div class="controlled-input {{wrapperClasses}}">
                <div class="label">{{label}}</div>
                {{{Input 
                    id=id 
                    name=name 
                    type=type
                    placeholder=placeholder 
                    value=value 
                    classes=classes 
                    onBlur=onBlur 
                    onFocus=onFocus
                    onChange=onChange
                }}}
                {{{Error ref="error"}}}
            </div>
        `;
    }
}
