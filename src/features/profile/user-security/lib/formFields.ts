
type TFields = 'label' | 'type' | 'attr' | 'placeholder' | 'id';
export type Fields = Record<TFields, string>[];

export const formFields = [
    { label: "Email address", type: "email", attr: "email", placeholder: "Email address", id: "swal-input1" },
    { label: "Enter your new password", type: "password", attr: "newPassword", placeholder: "Enter your new password", id: "swal-input2" },
    { label: "Repeat your password", type: "password", attr: "repeatPassword", placeholder: "Repeat your password", id: "swal-input3" }
];
