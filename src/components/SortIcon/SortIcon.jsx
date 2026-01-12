import './SortIcon.css';

const SortIcon = ({ direction }) => {
    return (
        <span className={`sort-icon ${direction}`}>
      {direction === 'asc' ? '▲' : '▼'}
    </span>
    );
};

export default SortIcon;