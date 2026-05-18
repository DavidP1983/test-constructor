import { Variants } from "motion";

export const animationVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.02
        }
    }
};
