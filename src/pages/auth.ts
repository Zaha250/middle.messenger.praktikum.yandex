import { ValidationRuleEnum } from '../helpers/validator';
import { Block } from '../core';
import '../styles/pages/auth.scss';

interface IAuthPageProps {}

class AuthPage extends Block {
    constructor(props: IAuthPageProps) {
        super({
            ...props,
            onBlur: () => console.log('blur'),
            onChange: () => console.log('change'),
            onFocus: () => console.log('focus'),
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
                                name="login"
                                id="login"
                                placeholder="Логин" 
                                classes="form__input"
                                onChange=onChange
                                onFocus=onFocus
                            }}}
                            {{{ControlledInput 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Пароль" 
                                classes="form__input"
                                onChange=onChange
                                onFocus=onFocus
                            }}}
                        </div>
                    </div>
                    <div class="form-footer">
                        <button class="btn btn_primary form__btn">Авторизоваться</button>
                        <a href="./reg.hbs" class="form__link">Нет аккаунта?</a>
                    </div>
                </form>
            </main>
        `;
    }
}

export default AuthPage;
