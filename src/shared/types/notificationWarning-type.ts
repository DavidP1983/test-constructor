
export interface NotificationWarningType {
    sender: 'system' | 'admin';
    type: 'warning' | 'system' | 'info';
    message: string;
    isRead: boolean
    createdAt: string;
}
