import Swal from "sweetalert2";

export const showResultAlert = (status: 'success' | 'error', title: string, text: string) => {
    Swal.fire({
        title: `${title}`,
        text: `${text}`,
        icon: `${status}`,
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
    }).then((res) => {
        if (res.isConfirmed) {
            window.location.reload();
        }
    }).catch(() => {
        window.location.reload();
    });
}