import { Block, Router } from 'core';
import { validationField, ValidationRuleEnum } from '../helpers/validator';
import '../styles/pages/auth.scss';

interface IAuthPageProps {}

class AuthPage extends Block {
    static componentName = 'AuthPage';

    constructor(props: IAuthPageProps) {
        super({
            ...props,
            events: {
                submit: (e: SubmitEvent) => {
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
            },
            onClick: () => new Router('#app').go('/reg'),
        });
    }

    render() {
        // language=hbs
        return `
            <main class="main">
                <form class="form">
                    <div>
                        <h2 class="form__title">Вход</h2>
                        <div class="form-fields">
                            {{{ControlledInput 
                                name="Login"
                                ref="Login"
                                validationRule="${ValidationRuleEnum.Login}"
                                placeholder="Логин" 
                                classes="form__input"
                            }}}
                            {{{ControlledInput 
                                type="password" 
                                ref="Password"
                                validationRule="${ValidationRuleEnum.Password}"
                                name="Password" 
                                placeholder="Пароль" 
                                classes="form__input"
                            }}}
                        </div>
                    </div>
                    <div class="form-footer">
                        {{{ Button type="submit" text="Авторизоваться" classes="form__btn" }}}
                        {{{ Button text="Нет аккаунта?" variant="transparent" classes="form__btn" onClick=onClick }}}
                    </div>
                </form>
            </main>
        `;
    }
}

export default AuthPage;
