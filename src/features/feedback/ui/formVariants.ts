import { Variants } from "motion";

export const formVariants: Variants = {
    hidden: { rotateY: -90, opacity: 0 },
    visible: {
        rotateY: 0,
        opacity: 1,
        transition: { duration: 0.7, ease: "easeOut" }
    }
}