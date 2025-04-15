import { z } from "zod";

export const userRegisterValidation = z.object({
    username: z.string({
        required_error: "Username is required",
    })
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username cannot exceed 30 characters")
        .trim(),
    
    email: z.string({
        required_error: "Email is required",
    })
        .email("Invalid email address")
        .toLowerCase()
        .trim(),
    
    fullName: z.string({
        required_error: "Full name is required",
    })
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name cannot exceed 50 characters")
        .trim(),
    
    password: z.string({
        required_error: "Password is required",
    })
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password cannot exceed 64 characters")
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"),
    
    avatar: z.string({
        required_error: "Avatar is required",
    }),
    
    coverImage: z.string()
    .optional(),
});


