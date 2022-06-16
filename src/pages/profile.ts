import { Block } from '../core';
import '../styles/pages/profile.scss';

class ProfilePage extends Block {
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
                <form class="profile-form" id="profile-form">
                    <div class="profile-fields">
                        {{{ Input name="email" id="email" label="Почта" value="123" classes="profile__input" }}}
                        {{{ Input name="login" id="login" label="Логин" value="" classes="profile__input" }}}
                        {{{ Input name="first_name" id="first_name" label="Имя" value="" classes="profile__input" }}}
                        {{{ Input name="second_name" id="second_name" label="Фамилия" value="" classes="profile__input" }}}
                        {{{ Input name="display_name" id="display_name" label="Имя в чате" value="" classes="profile__input" }}}
                        {{{ Input type="tel" name="phone" id="phone" label="Телефон" value="" classes="profile__input" }}}
                    </div>
                    <div>
                        <button type="submit" class="profile-form__btn">
                            Изменить данные
                        </button>
                        <button class="profile-form__btn" id="change_password">
                            Изменить пароль
                        </button>
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
