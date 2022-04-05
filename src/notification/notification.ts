export type Notification = {
    notificationId: number;
    key: number;
    title: number;
    type: string;
    readAt?: Date;
    content?: string;
    route?: number;
}; 