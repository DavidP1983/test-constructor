import Swal from "sweetalert2";
import { Fields } from "./formFields";

interface FormKey {
    email: string;
    newPassword: string;
    repeatPassword: string;
}

interface Response {
    confirm: boolean;
    data: FormKey | null;
}


export const notifyForm = async (formFields: Fields, mode: string): Promise<Response> => {
    let res: Response = { confirm: false, data: null };

    const html = formFields.map(f =>
        `            
        <label for=${f.id}>${f.label}</label>
        <input 
        type=${f.type} 
        id=${f.id} 
        class="swal2-input"
        data-attr=${f.attr} 
        placeholder=${f.placeholder} 
        style="width:73%;margin-bottom:20px;">

        `
    ).join('');

    await Swal.fire<FormKey>({
        title: "Enter your data",
        html: html,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            const inputs = document.querySelectorAll<HTMLInputElement>('[data-attr]')
            const data: FormKey = { email: '', newPassword: '', repeatPassword: '' };

            inputs.forEach((input) => {
                data[input.dataset.attr as keyof typeof data] = input.value.trim()
            });

            const isSameFieldEmpty =
                mode === 'delete'
                    ?
                    !data.email
                    :
                    Object.values(data).some(v => !v);

            if (isSameFieldEmpty) {
                Swal.showValidationMessage("Please fill out all fields");
                return;
            }

            if (data?.newPassword !== data?.repeatPassword) {
                Swal.showValidationMessage("Passwords do not match");
                return;
            }
            res = {
                confirm: true,
                data
            }
        }
    });
    return res
}

