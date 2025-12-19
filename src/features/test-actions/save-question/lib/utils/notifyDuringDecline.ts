import Swal from 'sweetalert2';


export const notifyDuringDecline = () => {
    return Swal.fire({
        title: "Your changes will not be saved if you leave the page ?",
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Leave`
    })
}