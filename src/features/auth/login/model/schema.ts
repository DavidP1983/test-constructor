import * as z from "zod";

export const schema = z.object({
    name: z.
        string()
        .min(3, 'Name must be at least 3 characters')
        .trim(),
    email: z.email('Invalid email address'),
    password: z.string().min(4, 'Password must be at least 6 characters')
});
