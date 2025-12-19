import { Options } from "@/shared/types/test-type";

export const hasRadioConflict = (currentOption: Options[], newAnswer: boolean) => {
    if (!newAnswer) return false;
    const res = currentOption.find(item => item.answer === newAnswer)
    return res;
}