import { notify } from "@/shared/utils/notify";
import Swal from "sweetalert2";
import { SendNotificationService } from "../api/SendNotificationService";
import { templateNotification } from "../const/templateNotification";


export const useSendWarningNotification = () => {

    const handleSendWarningNotification = async (id: string | undefined) => {

        const notificationData = await Swal.fire({
            input: "textarea",
            inputLabel: "Message",
            inputPlaceholder: 'Type your message here...',
            inputValue: `${templateNotification?.message ? templateNotification.message : ''}`,
            inputAttributes: {
                "aria-label": "Type your message here"
            },
            showCancelButton: true
        });

        if (!notificationData.isConfirmed || !notificationData.value?.trim() || !id) return;

        try {
            const response = await SendNotificationService.sendWarningNotification(id, notificationData.value);
            if (response?.success) {
                notify('success', 'Message sent successfully');
            }
        } catch {
            notify('error', 'Something went wrong, try again');
        }
    }
    return { handleSendWarningNotification }
}
