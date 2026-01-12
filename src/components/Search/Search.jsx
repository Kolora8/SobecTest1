import './Search.css';

const Search = ({ value, onChange, placeholder }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const handleClear = () => {
        onChange('');
    };

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <svg
                    className="search-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M11.435 10.063h-.723l-.256-.247a5.92 5.92 0 0 0 1.437-3.87 5.946 5.946 0 1 0-5.947 5.947 5.92 5.92 0 0 0 3.87-1.437l.247.256v.723L14.637 16 16 14.637l-4.565-4.574zm-5.489 0a4.111 4.111 0 0 1-4.116-4.116 4.111 4.111 0 0 1 4.116-4.116 4.111 4.111 0 0 1 4.117 4.116 4.111 4.111 0 0 1-4.117 4.116z"
                        fill="#888"
                    />
                </svg>
                <input
                    type="text"
                    className="search-input"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
                {value && (
                    <button
                        className="search-clear"
                        onClick={handleClear}
                        aria-label="Очистить поиск"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default Search;