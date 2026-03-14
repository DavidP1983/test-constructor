import { SelectFieldsType } from "../types/feedback-types";

export const socialLinks = [
    { href: "https://t.me/ILDS_Montreal", title: "Telegram", icon: 'icon-telegram', id: 1 },
    { href: "https://www.linkedin.com/in/david-piruzashvili", icon: 'icon-linkedin', title: "Linkedin", id: 2 },
    { href: "https://github.com/DavidP1983", icon: 'icon-github-circled', title: "GitHub", id: 3 }
];



export const selectFields: SelectFieldsType[] = [
    { label: "User type", type: "who", id: 1 },
    { label: "How easy was the interface to use?", type: "ux", id: 2 },
    { label: "Time loading speed", type: "speed", id: 3 },
]