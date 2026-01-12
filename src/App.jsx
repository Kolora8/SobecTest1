import { useState, useMemo } from 'react';
import Table from './components/Table/Table';
import Pagination from './components/Pagination/Pagination';
import Dropdown from './components/Dropdown/Dropdown';
import { users } from './data';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Сортировка данных
    const sortedData = useMemo(() => {
        const sortableData = [...users];
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
    }, [sortConfig]);

    // Пагинация
    const paginatedData = sortedData;
    const totalItems = 30000;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

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
                <h1>Найти пользователя</h1>
                <h2>Пользователи</h2>

                <div className="controls">
                    <Dropdown
                        options={[10, 20, 50, 100]}
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        label="Элементов на странице:"
                    />
                </div>

                <Table
                    data={paginatedData}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                />

                <div className="pagination-info">
                    Показано {(currentPage - 1) * itemsPerPage + 1}:{Math.min(currentPage * itemsPerPage, totalItems)} из {totalItems} пользователей
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default App;