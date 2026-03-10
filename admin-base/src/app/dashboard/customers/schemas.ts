
import { z } from "zod"

export const customerSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    type: z.enum(["personal", "business"], {
        required_error: "Selecione o tipo de cliente",
    }),
    status: z.enum(["active", "inactive", "pending"], {
        required_error: "Selecione o status",
    }),
    role: z.string().optional(),
    company: z.string().optional(),
    avatar: z.any().optional(), // Pode ser string (url) ou File
    createdAt: z.date().optional(),
})

export type Customer = z.infer<typeof customerSchema>
