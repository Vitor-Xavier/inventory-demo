import api from '../../services/api'

const services = {
    getNotifications(skip = 0, take = 10) {
        return api.get('/Notification', {
            params: {
                skip,
                take
            }
        });
    },
    getNotificationCount() {
        return api.get('/Notification/unread/count');
    },
    read(notificationId: number) {
        return api.put(`/Notification/${notificationId}/read`);
    },
}

export default services;