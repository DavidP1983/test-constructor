import Swal from 'sweetalert2';

interface NotificationProps {
    title: string;
    text: string;
    icon: "success" | "error" | "warning" | "info" | "question";
    btnText: string;
}

export const notifyDuringOperation = ({ title, text, icon, btnText }: NotificationProps) => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: `${btnText}`,
        cancelButtonText: 'Cancel',
    });
};