import { Variants } from "motion";

export const profileVariants: Variants = {
    initialLeft: {
        x: -100,
        opacity: 0,
    },
    initialRight: {
        x: 100,
        opacity: 0,
    },
    readyInfo: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.5,
            ease: 'easeOut',
        },
    },
    readySettings: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 1,
            ease: 'easeOut',
        },
    },
    readyStats: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 1.5,
            ease: 'easeOut',
        },
    },
    readySecurity: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 2,
            ease: 'easeOut',
        },
    },
};

