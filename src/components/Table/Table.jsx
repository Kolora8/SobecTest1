import TableHeader from './TableHeader';
import TableRow from './TableRow';
import './Table.css';

const Table = ({ data, sortConfig, onSort }) => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'role', label: 'Роль' },
        { key: 'name', label: 'Имя' },
        { key: 'login', label: 'Логин' },
        { key: 'position', label: 'Должность' },
        { key: 'contacts', label: 'Контакты' },
        { key: 'email', label: 'Почта' },
        { key: 'phone', label: 'Телефон' },
        { key: 'city', label: 'Город' }
    ];

    return (
        <div className="table-container">
            <table className="users-table">
                <thead>
                <tr>
                    {columns.map((column) => (
                        <TableHeader
                            key={column.key}
                            column={column}
                            sortConfig={sortConfig}
                            onSort={onSort}
                        />
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((user, index) => (
                    <TableRow key={index} user={user} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;