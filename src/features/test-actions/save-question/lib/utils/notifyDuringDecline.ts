import Swal from 'sweetalert2';


export const notifyDuringDecline = (title: string) => {
    return Swal.fire({
        title,
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Leave`
    })
}