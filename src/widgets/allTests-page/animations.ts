import { Variants } from "motion";

export const tableVariants: Variants = {
    initial: {
        y: 30,
        opacity: 0,
    },
    ready: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 1.5,
            ease: 'easeOut',
        },
    },
    placeholder: {
        y: 0,
        opacity: 0.5,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
};

