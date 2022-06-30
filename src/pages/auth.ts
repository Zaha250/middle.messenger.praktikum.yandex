import { Block, Router } from 'core';
import { validationField, ValidationRuleEnum } from '../helpers/validator';
import {connect, RootStateType, store} from "../store";
import {login} from "services/AuthService";
import '../styles/pages/auth.scss';

interface IAuthPageProps {}

const router = new Router('#app');

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
                            const { value, name, id } = input as HTMLInputElement;
                            const errorMessage = validationField(ValidationRuleEnum[id as keyof typeof ValidationRuleEnum], value);

                            if (errorMessage) {
                                isValid = false;
                                this.refs[name].refs.error.setProps({ text: errorMessage });
                            } else {
                                data[name] = value;
                            }
                        });
                    }

                    if (isValid) {
                        store.dispatch(login, data);
                    }
                },
            }
        });

        this.setProps({
            onClick: () => router.go('/sign-up')
        })
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.user) {
            console.log(2)
            router.go('/messenger');
        }
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
                                id="Login"
                                name="login"
                                ref="login"
                                validationRule="${ValidationRuleEnum.Login}"
                                placeholder="Логин" 
                                classes="form__input"
                            }}}
                            {{{ControlledInput 
                                type="password" 
                                id="Password" 
                                name="password" 
                                ref="password"
                                validationRule="${ValidationRuleEnum.Password}"
                                placeholder="Пароль" 
                                classes="form__input"
                            }}}
                        </div>
                    </div>
                    {{{Error text=error}}}
                    <div class="form-footer">
                        {{{ Button
                                type="submit"
                                classes="form__btn"
                                text="Авторизоваться"
                                isLoad=isLoad
                        }}}
                        {{{ Button text="Нет аккаунта?" variant="transparent" classes="form__btn" onClick=onClick }}}
                    </div>
                </form>
            </main>
        `;
    }
}

function mapUserToProps(state: RootStateType) {
    return {
        user: state.user.profile,
        isLoad: state.user.isLoad,
        error: state.user.error,
    };
}

export default connect(mapUserToProps)(AuthPage);
