import './Table.css';

const TableRow = ({ user, isNew }) => {
    return (
        <tr className={isNew ? 'new-user' : ''}>
            <td>{user.id}</td>
            <td>{user.role}</td>
            <td>{user.name}</td>
            <td>{user.login}</td>
            <td>{user.position}</td>
            <td>{user.contacts}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.city}</td>
        </tr>
    );
};

export default TableRow;