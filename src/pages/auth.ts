import { Block } from 'core';
import { validationField, ValidationRuleEnum } from '../helpers/validator';
import {RootStateType, store} from "../store";
import {connect, withRouter} from 'HOC';
import {login} from "services/AuthService";
import {UserStateType} from "../store/user/initialState";
import Router from "../core/Router";
import '../styles/pages/auth.scss';

interface IAuthPageProps {
    user: UserStateType;
    error: Nullable<string>;
    isLoad: boolean;
    router: typeof Router;
}

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
            onClick: () => this.props.router.go('/sign-up')
        })
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.router.go('/messenger');
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

export default withRouter(connect(mapUserToProps)(AuthPage));
