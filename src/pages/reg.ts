import { Block } from 'core';
import { connect, withRouter } from 'HOC';
import { RootStateType, store } from 'store';
import { UserStateType } from 'store/user/initialState';
import { createUser } from 'services/AuthService';
import { validationField, ValidationRuleEnum } from '../helpers/validator';
import '../styles/pages/auth.scss';

interface IRegPageProps {
    user: UserStateType
}

class RegPage extends Block {
    static componentName = 'RegPage';

    constructor(props: IRegPageProps) {
        super({
            ...props,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();

                    const inputs = this.element?.querySelectorAll('input');
                    let isValid = true;
                    const data: Record<string, string | number> = {};

                    if (inputs) {
                        inputs.forEach((input) => {
                            const { value, name, id } = input as HTMLInputElement;
                            const errorMessage = validationField(
                                ValidationRuleEnum[id as keyof typeof ValidationRuleEnum],
                                value,
                            );

                            if (errorMessage) {
                                isValid = false;
                                this.refs[name].refs.error.setProps({ text: errorMessage });
                            } else if (name) {
                                data[name] = value;
                            }
                        });
                    }

                    if (isValid) {
                        console.log(data);
                        store.dispatch(createUser, data);
                    }
                },
            },
        });

        this.setProps({
            navigateToLogin: () => this.props.router.go('/'),
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
                                id="Email" 
                                name="email" 
                                ref="email" 
                                placeholder="Почта"
                                validationRule="${ValidationRuleEnum.Email}"
                                classes="form__input"
                            }}}
                            {{{ ControlledInput 
                                id="Login" 
                                name="login" 
                                ref="login" 
                                placeholder="Логин"
                                validationRule="${ValidationRuleEnum.Login}"
                                classes="form__input" 
                            }}}
                            {{{ ControlledInput 
                                id="FirstName" 
                                name="first_name" 
                                ref="first_name" 
                                placeholder="Имя"
                                validationRule="${ValidationRuleEnum.FirstName}"
                                classes="form__input" 
                            }}}
                            {{{ ControlledInput 
                                id="SecondName" 
                                name="second_name" 
                                ref="second_name" 
                                placeholder="Фамилия"
                                validationRule="${ValidationRuleEnum.SecondName}"
                                classes="form__input" 
                            }}}
                            {{{ ControlledInput 
                                type="phone" 
                                id="Phone" 
                                name="phone" 
                                ref="phone" 
                                placeholder="Телефон"
                                validationRule="${ValidationRuleEnum.Phone}"
                                classes="form__input" 
                            }}}
                            {{{ ControlledInput 
                                type="password" 
                                id="Password" 
                                name="password" 
                                ref="password" 
                                placeholder="Пароль"
                                validationRule="${ValidationRuleEnum.Password}"
                                classes="form__input" 
                            }}}
                            {{{ ControlledInput 
                                type="password" 
                                placeholder="Пароль (ещё раз)" 
                                classes="form__input" 
                            }}}
                        </div>
                    </div>
                    {{{Error text=error}}}
                    <div class="form-footer">
                        {{{ Button 
                                type="submit" 
                                classes="form__btn" 
                                text="Зарегистрироваться" 
                                isLoad=isLoad
                        }}}
                        {{{ Button text="Войти" variant="transparent" onClick=navigateToLogin }}}
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

export default withRouter(connect(mapUserToProps)(RegPage));
