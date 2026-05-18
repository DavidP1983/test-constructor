import { SelectOptions } from "@/shared/types/select.types";
import { Language } from "../types/select.types";

const languageOptions: SelectOptions<Language>[] = [
    { value: 'ru', label: 'ru' },
    { value: 'en', label: 'en' },
    { value: 'fr', label: 'fr' },

];

export default languageOptions;