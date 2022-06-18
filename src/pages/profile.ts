import { Block } from 'core';
import { validationField, ValidationRuleEnum } from '../helpers/validator';
import '../styles/pages/profile.scss';

interface IProfilePageProps {}

class ProfilePage extends Block {
    static componentName = 'ProfilePage';

    constructor(props: IProfilePageProps) {
        super({
            ...props,
            onSubmit: (e: SubmitEvent) => {
                e.preventDefault();

                const inputs = this.element?.querySelectorAll('.profile__input') as NodeList;
                let isValid = true;
                const data = {};

                if (inputs.length) {
                    inputs.forEach((input: HTMLInputElement) => {
                        const { value, name } = input;
                        const errorMessage = validationField(ValidationRuleEnum[name], value);

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
            <main class="profile">
                <div class="profile-avatar">
                    {{#if photo}}
                        <img src="{{photo}}" alt="avatar">
                    {{else}}
                        <div class="profile-avatar__placeholder"></div>
                    {{/if}}
                    <input type="file" accept="image/*" value="" class="profile-avatar__input">
                </div>
                <h4 class="profile__name">Колтунов Александр</h4>
                <form class="profile-form" id="profile-form" onsubmit="return false;">
                    <div class="profile-fields">
                        {{{ ControlledInput 
                                name="Email" 
                                ref="Email" 
                                id="email" 
                                label="Почта" 
                                validationRule="${ValidationRuleEnum.Email}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                        {{{ ControlledInput 
                                name="Login" 
                                ref="Login" 
                                id="login" 
                                label="Логин" 
                                validationRule="${ValidationRuleEnum.Login}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                        {{{ ControlledInput 
                                name="FirstName" 
                                ref="FirstName" 
                                id="first_name" 
                                label="Имя" 
                                validationRule="${ValidationRuleEnum.FirstName}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                        {{{ ControlledInput 
                                name="SecondName" 
                                ref="SecondName" 
                                id="second_name" 
                                label="Фамилия" 
                                validationRule="${ValidationRuleEnum.SecondName}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                        {{{ ControlledInput 
                                name="DisplayName" 
                                ref="DisplayName" 
                                id="display_name" 
                                label="Имя в чате" 
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                        {{{ ControlledInput 
                                type="tel" 
                                name="Phone" 
                                ref="Phone" 
                                id="phone" 
                                label="Телефон" 
                                validationRule="${ValidationRuleEnum.Phone}"
                                classes="profile__input" 
                                wrapperClasses="profile__control"
                        }}}
                    </div>
                    <div>
                        {{{ Button variant="line" text="Изменить данные" onClick=onSubmit }}}
                        {{{ Button variant="line" text="Изменить пароль" }}}
                        <a href="#" class="profile-form__btn profile-form__btn_danger">
                            Выйти
                        </a>
                    </div>
                </form>
            </main>
        `;
    }
}

export default ProfilePage;
