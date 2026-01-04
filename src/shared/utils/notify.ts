import Swal from 'sweetalert2';


export const notify = (status: "success" | "error", notificationTitle: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    return Toast.fire({
        icon: status,
        title: notificationTitle
    });
}

