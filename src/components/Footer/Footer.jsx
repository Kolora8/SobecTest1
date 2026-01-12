import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Информация</h3>
                    <ul className="footer-links">
                        <li>Поддержка</li>
                        <li className="active">Пользователи</li>
                        <li>Клиенты</li>
                        <li>Реклама</li>
                        <li>Настройки Куки</li>
                        <li>Условия</li>
                        <li>Главная</li>
                        <li>Политика Конфиденциальности</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Дополнительно</h3>
                    <ul className="footer-links">
                        <li>О компании</li>
                        <li>Контакты</li>
                        <li>Вакансии</li>
                        <li>Партнеры</li>
                        <li>Документация</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Помощь</h3>
                    <ul className="footer-links">
                        <li>FAQ</li>
                        <li>Форум</li>
                        <li>Чат поддержки</li>
                        <li>Телефон: +7-999-999-99-99</li>
                        <li>Email: support@company.ru</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Компания. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;