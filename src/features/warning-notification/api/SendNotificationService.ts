import { handleResponse } from "@/shared/api/handleResponse";

export class SendNotificationService {

    static async sendWarningNotification(userId: string | undefined, message: string) {

        // Запрос идет через Proxy next.config.ts поэтому нет необходимости в указании http
        const response = await fetch(`/notifications/admin-warning`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, message })
        });

        const data = await handleResponse<{ success: true }>(response, 'Notification failed');
        return data
    }
}