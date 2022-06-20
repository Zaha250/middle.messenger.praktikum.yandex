export enum ValidationRuleEnum {
    Login = 'login',
    Password = 'password',
    Phone = 'phone',
    Email = 'email',
    Message = 'message',
    FirstName = 'first_name',
    SecondName = 'second_name',
}

export function validationField(rule: ValidationRuleEnum, value: string) {
    const inputValue = value.trim();

    switch (rule) {
    case ValidationRuleEnum.Login: {
        const isValid = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/.test(inputValue);
        return isValid ? '' : 'Введите корректный логин';
    }
    case ValidationRuleEnum.Password: {
        const isValid = /^((?=.*[0-9])|(?=.*[A-Za-z]+))(?=.*[A-Z])(?!.*\s)(?!.*[а-яёА-ЯЁ]).{8,40}$/.test(inputValue);
        return isValid ? '' : 'Недопустимый пароль';
    }
    case ValidationRuleEnum.Email: {
        const isValid = /.+@[^@]+[a-z]+\.[^@]{2,}/.test(inputValue);
        return isValid ? '' : 'Введите корректный email';
    }
    case ValidationRuleEnum.Phone: {
        const isValid = /((\\+7|7|8)+([0-9]){10})$|\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\b/.test(inputValue);
        return isValid ? '' : 'Введите корректный номер';
    }
    case ValidationRuleEnum.Message: {
        return inputValue.length ? '' : 'Сообщение не может быть пустым';
    }
    case ValidationRuleEnum.FirstName: {
        const isValid = /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/.test(inputValue);
        return isValid ? '' : 'Неверное имя';
    }

    case ValidationRuleEnum.SecondName: {
        const isValid = /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/.test(inputValue);
        return isValid ? '' : 'Неверная фамилия';
    }

    default:
        return '';
    }
}
