import {Block} from "core";
import {validationField, ValidationRuleEnum} from "../../../helpers/validator";
import {connect} from "HOC";
import {RootStateType, store} from "store";
import {changePassword} from "services/UserService";
import './modal.scss';

interface IChangePasswordModalProps {
    isLoad: boolean;
    success: boolean;
    show: boolean;
    error: Nullable<string>;
}

class ChangePasswordModal extends Block {
    static componentName = 'ChangePasswordModal';

    constructor(props: IChangePasswordModalProps) {
        super({
            ...props
        });

        this.setState({
            changePassword: () => this.changePassword(),
            hideChangePasswordModal: () => this.hideChangePasswordModal()
        })
    }

    changePassword = () => {
        const inputs = this.element?.querySelectorAll('[type="password"]') as NodeList;
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
            store.dispatch(changePassword, data);
        }
    }

    hideChangePasswordModal = () => {
        store.dispatch({
            changePassword: { show: false }
        });
    }

    render() {
        // language=hbs
        return `
            <div class="modal backdrop ${this.props.show ? 'show' : ''}">
                <div class="modal-dialog sm ${this.props.show ? 'show' : ''}">
                    <div class="modal-header">
                        <h5 class=modal__title>Смена пароля</h5>
                        {{{Close onClick=hideChangePasswordModal}}}
                    </div>

                    <div class="modal-content">
                        {{#if success}}
                            <h3>Пароль успешно изменен</h3>
                            {{else}}
                            {{{ ControlledInput
                                    type="password"
                                    name="oldPassword"
                                    ref="oldPassword"
                                    placeholder="Старый пароль"
                                    classes="form__input"
                            }}}
                            {{{ ControlledInput
                                    type="password"
                                    id="Password"
                                    name="newPassword"
                                    ref="newPassword"
                                    placeholder="Новый пароль"
                                    validationRule="${ValidationRuleEnum.Password}"
                                    classes="form__input"
                            }}}
                            {{{Error text=error}}}
                            {{{ Button
                                    classes="form__btn"
                                    text="Сохранить"
                                    isLoad=isLoad
                                    onClick=changePassword
                            }}}
                        {{/if}}
                    </div>
                </div>
            </div>
        `;
    }
}

function mapStateToProps(state: RootStateType) {
    return {
        show: state.changePassword.show,
        success: state.changePassword.success,
        error: state.changePassword.error,
        isLoad: state.changePassword.isLoad
    }
}

export default connect(mapStateToProps)(ChangePasswordModal);