import { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        id: Date.now(), // Генерируем уникальный ID
        role: 'Админ',
        name: '',
        login: '',
        position: '',
        contacts: '',
        email: '',
        phone: '',
        city: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
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
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+7-999-999-99-99"
                        required
                    />
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
                <button type="button" className="form-cancel" onClick={onCancel}>
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