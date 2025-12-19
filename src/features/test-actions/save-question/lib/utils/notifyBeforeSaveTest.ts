import Swal from 'sweetalert2';


export const notifyBeforeSaveTest = async () => {
    const { value: name } = await Swal.fire({
        title: "Add test name",
        input: "text",
        inputLabel: "Type test name",
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return "You need to write something!";
            }
        }
    });
    return name
}