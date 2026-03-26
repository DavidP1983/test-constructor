import { Variants } from "motion";

export const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06
        }
    }
};

export const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.25,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -15,
        scale: 0.95,
        transition: {
            duration: 0.2
        }
    }
};