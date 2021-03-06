import { Block, Router } from 'core';
import { validationField, ValidationRuleEnum } from '../helpers/validator';
import '../styles/pages/auth.scss';

class RegPage extends Block {
    static componentName = 'RegPage';

    constructor() {
        super({
            onClick: () => new Router().push('/auth'),
            onSubmit: (e: SubmitEvent) => {
                e.preventDefault();

                const inputs = this.element?.querySelectorAll('input');
                let isValid = true;
                const data: Record<string, string> = {};

                if (inputs) {
                    inputs.forEach((input) => {
                        const { value, name } = input as HTMLInputElement;
                        const errorMessage = validationField(ValidationRuleEnum[name as keyof typeof ValidationRuleEnum], value);

                        if (errorMessage) {
                            isValid = false;
                            this.refs[name].refs.error.setProps({ text: errorMessage });
                        } else {
                            data[name] = value;
                        }
                    });
                }

                if (isValid) {
                    console.log(data);
                }
            },
        });
    }

    render() {
        // language=hbs
        return `
            <main class="main">
                <form class="form form_reg">
                    <div>
                        <h2 class="form__title">Регистрация</h2>
                        <div class="form-fields">
                            {{{ ControlledInput 
                                name="Email" 
                                ref="Email" 
                                placeholder="Почта"
                                validationRule="${ValidationRuleEnum.Email}"
                                classes="form__input"
                                onChange=onChange
                                onFocus=onFocus
                            }}}
                            {{{ ControlledInput 
                                name="Login" 
                                ref="Login" 
                                placeholder="Логин"
                                validationRule="${ValidationRuleEnum.Login}"
                                classes="form__input" 
                                onChange=onChange
                                onFocus=onFocus
                            }}}
                            {{{ ControlledInput 
                                name="FirstName" 
                                ref="FirstName" 
                                placeholder="Имя"
                                validationRule="${ValidationRuleEnum.FirstName}"
                                classes="form__input" 
                                onChange=onChange
                                onFocus=onFocus
                            }}}
                            {{{ ControlledInput 
                                name="SecondName" 
                                ref="SecondName" 
                                placeholder="Фамилия"
                                validationRule="${ValidationRuleEnum.SecondName}"
                                classes="form__input" 
                                onChange=onChange
                                onFocus=onFocus
                            }}}
                            {{{ ControlledInput 
                                type="phone" 
                                name="Phone" 
                                ref="Phone" 
                                placeholder="Телефон"
                                validationRule="${ValidationRuleEnum.Phone}"
                                classes="form__input" 
                                onChange=onChange
                                onFocus=onFocus
                            }}}
                            {{{ ControlledInput 
                                type="password" 
                                name="Password" 
                                ref="Password" 
                                placeholder="Пароль"
                                validationRule="${ValidationRuleEnum.Password}"
                                classes="form__input" 
                                onChange=onChange
                                onFocus=onFocus
                            }}}
                            {{{ ControlledInput 
                                type="password" 
                                name="Password" 
                                placeholder="Пароль (ещё раз)" 
                                classes="form__input" 
                                onChange=onChange
                                onFocus=onFocus
                            }}}
                        </div>
                    </div>
                    <div class="form-footer">
                        {{{ Button type="submit" classes="form__btn" text="Зарегистрироваться" onClick=onSubmit}}}
                        {{{ Button text="Войти" variant="transparent" onClick=onClick }}}
                    </div>
                </form>
            </main>
        `;
    }
}

export default RegPage;
