import { Block, Router } from 'core';
import '../styles/pages/auth.scss';

interface IAuthPageProps {}

class AuthPage extends Block {
    static componentName = 'AuthPage';

    constructor(props: IAuthPageProps) {
        super({
            ...props,
            onBlur: () => console.log('blur'),
            onChange: () => console.log('change'),
            onFocus: () => console.log('focus'),
            onClick: () => new Router().push('/reg'),
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
                        {{{ Button text="Авторизоваться" classes="form__btn" }}}
                        {{{ Button text="Нет аккаунта?" variant="transparent" classes="form__btn" onClick=onClick }}}
                    </div>
                </form>
            </main>
        `;
    }
}

export default AuthPage;
