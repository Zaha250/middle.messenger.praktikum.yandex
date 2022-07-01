import { Block } from 'core';
import { validationField, ValidationRuleEnum } from '../helpers/validator';
import {RootStateType, store} from "../store";
import {connect, withRouter} from 'HOC';
import {logout} from "services/AuthService";
import Router from "core/Router";
import {changeProfile} from "../services/UserService";
import '../styles/pages/profile.scss';

interface IProfilePageProps {
    router: typeof Router
}

class ProfilePage extends Block {
    static componentName = 'ProfilePage';

    constructor(props: IProfilePageProps) {
        super({
            ...props,
            onSubmit: (e: SubmitEvent) => {
                e.preventDefault();

                const inputs = this.element?.querySelectorAll('.profile__input') as NodeList;
                let isValid = true;
                const data: Record<string, string> = {};

                if (inputs.length) {
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
                    store.dispatch(changeProfile, data);
                }
            },
        });

        this.setProps({
            onLogout: () => this.onLogout(),
            showChangePasswordModal: () => this.showChangePasswordModal()
        })

    }

    onLogout = () => {
        store.dispatch(logout);
    }

    showChangePasswordModal = () => {
        store.dispatch({
            changePassword: { show: true }
        });
    }

    render() {
        const user = this.props.user
        // language=hbs
        return `
            <main class="profile">
                <div class="profile-avatar">
                    {{#if user.avatar}}
                        <img src="{{user.avatar}}" alt="avatar">
                    {{else}}
                        <div class="profile-avatar__placeholder"></div>
                    {{/if}}
                    <input type="file" accept="image/*" value="" class="profile-avatar__input">
                </div>
                <h4 class="profile__name">${user?.displayName || user?.firstName}</h4>
                <form class="profile-form" id="profile-form">
                    <div class="profile-fields">
                        {{{ ControlledInput 
                                name="email" 
                                ref="email" 
                                id="Email" 
                                label="Почта" 
                                value="${user?.email}"
                                validationRule="${ValidationRuleEnum.Email}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                        {{{ ControlledInput 
                                name="login" 
                                ref="login" 
                                id="Login" 
                                label="Логин"
                                value="${user?.login}"
                                validationRule="${ValidationRuleEnum.Login}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                        {{{ ControlledInput 
                                name="first_name" 
                                ref="first_name" 
                                id="FirstName" 
                                label="Имя"
                                value="${user?.firstName}"
                                validationRule="${ValidationRuleEnum.FirstName}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                        {{{ ControlledInput 
                                name="second_name" 
                                ref="second_name" 
                                id="SecondName" 
                                label="Фамилия"
                                value="${user?.secondName}"
                                validationRule="${ValidationRuleEnum.SecondName}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                        {{{ ControlledInput 
                                name="display_name" 
                                ref="display_name" 
                                id="DisplayName" 
                                label="Имя в чате"
                                value="${user?.displayName || ''}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                        {{{ ControlledInput 
                                type="tel" 
                                name="phone" 
                                ref="phone" 
                                id="Phone" 
                                label="Телефон"
                                value="${user?.phone}"
                                validationRule="${ValidationRuleEnum.Phone}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                    </div>
                    {{{Error text=error}}}
                    <div>
                        {{{ Button variant="line" text="Изменить данные" onClick=onSubmit }}}
                        {{{ Button variant="line" text="Изменить пароль" onClick=showChangePasswordModal }}}
                        {{{ Button 
                                variant="line" 
                                classes="profile-form__btn profile-form__btn_danger" 
                                text="Выйти" 
                                onClick=onLogout 
                        }}}
                    </div>
                </form>
                {{{ChangePasswordModal}}}
            </main>
        `;
    }
}

function mapStateToProps(state: RootStateType) {
    return {
        user: state.user.profile
    }
}

export default withRouter(connect(mapStateToProps)(ProfilePage));
