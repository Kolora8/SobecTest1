import SortIcon from '../SortIcon/SortIcon';
import './Table.css';

const TableHeader = ({ column, sortConfig, onSort }) => {
    const handleClick = () => {
        onSort(column.key);
    };

    return (
        <th onClick={handleClick} className="sortable-header">
            {column.label}
            {sortConfig.key === column.key && (
                <SortIcon direction={sortConfig.direction} />
            )}
        </th>
    );
};

export default TableHeader;