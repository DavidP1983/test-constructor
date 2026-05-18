
import { SelectOptions } from "@/shared/types/select.types";
import { Example } from "../types/select.types";

const exampleOptions: SelectOptions<Example>[] = [
    { value: 'code', label: 'code' },
    { value: 'text', label: 'text' },
    { value: 'formula', label: 'formula' },

];

export default exampleOptions;