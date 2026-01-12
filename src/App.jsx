import { useState, useMemo } from 'react';
import Table from './components/Table/Table';
import Pagination from './components/Pagination/Pagination';
import Dropdown from './components/Dropdown/Dropdown';
import Search from './components/Search/Search';
import AddUserButton from './components/AddUserButton/AddUserButton';
import Modal from './components/Modal/Modal';
import UserForm from './components/UserForm/UserForm';
import { users as initialUsers } from './data';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState(initialUsers); // Теперь это состояние

    // Функция добавления пользователя
    const handleAddUser = (newUser) => {
        setUsers([newUser, ...users]); // Добавляем в начало
        setIsModalOpen(false);
        setCurrentPage(1); // Сбрасываем на первую страницу
    };

    // Функция поиска
    const filteredUsers = useMemo(() => {
        if (!searchTerm.trim()) return users;

        const lowercasedSearch = searchTerm.toLowerCase();
        return users.filter(user =>
            Object.values(user).some(value =>
                String(value).toLowerCase().includes(lowercasedSearch)
            )
        );
    }, [searchTerm, users]);

    // Сортировка данных
    const sortedData = useMemo(() => {
        const sortableData = [...filteredUsers];
        if (sortConfig.key) {
            sortableData.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [filteredUsers, sortConfig]);

    // Пагинация
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedData = sortedData.slice(startIndex, endIndex);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(Number(value));
        setCurrentPage(1);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="app">
            <div className="sidebar">
                <h2>Информация</h2>
                <ul>
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

            <div className="main-content">
                <h1 className="main-title">
                    <svg
                        className="title-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                            fill="#ff6b35"
                        />
                    </svg>
                    Найти пользователя
                </h1>
                <h2>Пользователи</h2>

                <div className="controls">
                    <Search
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Поиск по всем полям..."
                    />

                    <Dropdown
                        options={[10, 20, 50, 100]}
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        label="Элементов на странице:"
                    />

                    <AddUserButton onClick={handleOpenModal} />
                </div>

                <div className="table-header-info">
          <span className="total-users">
            Всего пользователей: {totalItems}
          </span>
                    {searchTerm && (
                        <span className="search-results">
              Найдено: {filteredUsers.length}
            </span>
                    )}
                </div>

                <Table
                    data={paginatedData}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                />

                <div className="pagination-info">
                    Показано {startIndex + 1}:{endIndex} из {totalItems} пользователей
                </div>

                {totalPages > 0 ? (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                ) : (
                    <div className="no-results">
                        Пользователи не найдены
                    </div>
                )}

                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title="Добавить нового пользователя"
                >
                    <UserForm
                        onSubmit={handleAddUser}
                        onCancel={handleCloseModal}
                    />
                </Modal>
            </div>
        </div>
    );
}

export default App;