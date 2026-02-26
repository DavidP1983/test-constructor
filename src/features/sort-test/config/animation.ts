import { Variants } from "motion";

export const filterVariants: Variants = {
    initialLeft: {
        x: -20,
        opacity: 0,
    },
    ready: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.35,
            ease: "easeOut",
            delay: 0.1
        }
    },
    initialRight: {
        x: 20,
        opacity: 0
    },

}