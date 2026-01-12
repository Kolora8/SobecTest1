import { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        role: 'Админ',
        name: '',
        login: '',
        position: '',
        contacts: '',
        email: '',
        phone: '',
        city: ''
    });

    const [phoneError, setPhoneError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Особенная обработка для телефона
        if (name === 'phone') {
            handlePhoneChange(value);
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handlePhoneChange = (input) => {
        // Удаляем все нецифровые символы кроме + и -
        let digits = input.replace(/[^\d+]/g, '');

        // Если начинается с 7 или 8, заменяем на +7
        if (digits.startsWith('7')) {
            digits = '+' + digits;
        } else if (digits.startsWith('8')) {
            digits = '+7' + digits.substring(1);
        }

        // Ограничиваем длину: +7 и максимум 10 цифр
        if (digits.startsWith('+7') && digits.length > 12) {
            digits = digits.substring(0, 12);
        }

        // Форматируем номер с дефисами
        let formatted = digits;
        if (digits.startsWith('+7') && digits.length > 2) {
            const cleanDigits = digits.substring(2); // Убираем +7

            // Форматируем: +7-999-999-99-99
            if (cleanDigits.length <= 3) {
                formatted = `+7-${cleanDigits}`;
            } else if (cleanDigits.length <= 6) {
                formatted = `+7-${cleanDigits.substring(0, 3)}-${cleanDigits.substring(3)}`;
            } else if (cleanDigits.length <= 8) {
                formatted = `+7-${cleanDigits.substring(0, 3)}-${cleanDigits.substring(3, 6)}-${cleanDigits.substring(6)}`;
            } else {
                formatted = `+7-${cleanDigits.substring(0, 3)}-${cleanDigits.substring(3, 6)}-${cleanDigits.substring(6, 8)}-${cleanDigits.substring(8)}`;
            }
        }

        // Проверяем валидность
        const phoneRegex = /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/;
        if (formatted === '+7-' || formatted === '+7') {
            setPhoneError('');
        } else if (!phoneRegex.test(formatted) && formatted.length > 3) {
            setPhoneError('Формат: +7-999-999-99-99');
        } else {
            setPhoneError('');
        }

        setFormData({
            ...formData,
            phone: formatted
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Пожалуйста, введите корректный email адрес');
            return;
        }

        // Валидация телефона
        const phoneRegex = /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert('Пожалуйста, введите телефон в формате: +7-999-999-99-99');
            return;
        }

        onSubmit(formData);

        // Сброс формы после отправки
        setFormData({
            role: 'Админ',
            name: '',
            login: '',
            position: '',
            contacts: '',
            email: '',
            phone: '',
            city: ''
        });
        setPhoneError('');
    };

    const handleCancel = () => {
        setFormData({
            role: 'Админ',
            name: '',
            login: '',
            position: '',
            contacts: '',
            email: '',
            phone: '',
            city: ''
        });
        setPhoneError('');
        onCancel();
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">Роль *</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-input"
                        required
                    >
                        <option value="Админ">Админ</option>
                        <option value="Разработчик">Разработчик</option>
                        <option value="Дизайнер">Дизайнер</option>
                        <option value="Менеджер">Менеджер</option>
                        <option value="Аналитик">Аналитик</option>
                        <option value="Тестировщик">Тестировщик</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Имя *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Введите имя"
                        required
                        minLength="2"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">Логин *</label>
                    <input
                        type="text"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Введите логин"
                        required
                        minLength="3"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Должность *</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Введите должность"
                        required
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Контакты (Telegram)</label>
                <input
                    type="text"
                    name="contacts"
                    value={formData.contacts}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="@username"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="user@example.com"
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">Телефон *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className={`form-input ${phoneError ? 'error' : ''}`}
                        placeholder="+7-999-999-99-99"
                        required
                    />
                    {phoneError && <div className="error-message">{phoneError}</div>}
                </div>

                <div className="form-group">
                    <label className="form-label">Город *</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Введите город"
                        required
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="form-cancel" onClick={handleCancel}>
                    Отмена
                </button>
                <button type="submit" className="form-submit">
                    Добавить пользователя
                </button>
            </div>
        </form>
    );
};

export default UserForm;