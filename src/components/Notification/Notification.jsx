import './Notification.css';

const Notification = ({ message, type = 'success' }) => {
    return (
        <div className={`notification notification-${type}`}>
            {message}
        </div>
    );
};

export default Notification;