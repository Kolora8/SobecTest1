import { useState } from 'react';
import './Dropdown.css';

const Dropdown = ({ options, value, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container">
            {label && <span className="dropdown-label">{label}</span>}
            <div className="dropdown">
                <button
                    className="dropdown-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {value}
                    <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
                </button>

                {isOpen && (
                    <div className="dropdown-menu">
                        {options.map((option) => (
                            <button
                                key={option}
                                className={`dropdown-item ${option === value ? 'selected' : ''}`}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;