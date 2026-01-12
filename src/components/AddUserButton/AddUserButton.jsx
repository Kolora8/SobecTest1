import './AddUserButton.css';

const AddUserButton = ({ onClick }) => {
    return (
        <button className="add-user-button" onClick={onClick}>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
            >
                <path
                    d="M8 1v14M1 8h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
            Добавить пользователя
        </button>
    );
};

export default AddUserButton;