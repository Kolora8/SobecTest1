import { useState, useMemo, useEffect } from 'react';
import Table from './components/Table/Table';
import Pagination from './components/Pagination/Pagination';
import Dropdown from './components/Dropdown/Dropdown';
import Search from './components/Search/Search';
import AddUserButton from './components/AddUserButton/AddUserButton';
import Modal from './components/Modal/Modal';
import UserForm from './components/UserForm/UserForm';
import Footer from './components/Footer/Footer';
import { users as initialUsers } from './data';
import './App.css';

// Ключ для localStorage
const STORAGE_KEY = 'users_data';

function App() {
    // Загружаем пользователей из localStorage или используем начальные данные
    const [users, setUsers] = useState(() => {
        try {
            const savedUsers = localStorage.getItem(STORAGE_KEY);
            if (savedUsers) {
                return JSON.parse(savedUsers);
            }
        } catch (error) {
            console.error('Ошибка загрузки данных из localStorage:', error);
        }
        return initialUsers;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Сохраняем пользователей в localStorage при изменении
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        } catch (error) {
            console.error('Ошибка сохранения данных в localStorage:', error);
        }
    }, [users]);

    // Функция добавления пользователя
    const handleAddUser = (newUser) => {
        // Генерируем уникальный ID на основе времени и случайного числа
        const userWithId = {
            ...newUser,
            id: Math.max(...users.map(u => u.id), 0) + 1 // Находим максимальный ID и увеличиваем на 1
        };

        setUsers([userWithId, ...users]); // Добавляем в начало
        setIsModalOpen(false);
        setCurrentPage(1);
    };

    // Функция сброса к начальным данным
    const handleResetData = () => {
        if (window.confirm('Вы уверены, что хотите сбросить данные к начальному состоянию? Это удалит всех добавленных пользователей.')) {
            setUsers(initialUsers);
            setCurrentPage(1);
            setSearchTerm('');
        }
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
            <div className="main-content">
                <div className="header-actions">
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

                    <button
                        className="reset-button"
                        onClick={handleResetData}
                        title="Сбросить данные к начальному состоянию"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.65 2.35C12.2 0.9 10.21 0 8 0C3.58 0 0 3.58 0 8s3.58 8 8 8c3.03 0 5.63-1.71 6.94-4.2l-1.5-1.5C12.46 11.39 10.35 12.5 8 12.5c-2.49 0-4.5-2.01-4.5-4.5S5.51 3.5 8 3.5c1.28 0 2.44.52 3.29 1.36L9 7h7V0l-2.35 2.35z"
                                  fill="#ff6b35"/>
                        </svg>
                    </button>
                </div>

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
              <span className="storage-info"> (данные сохранены в localStorage)</span>
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

            <Footer />
        </div>
    );
}

export default App;