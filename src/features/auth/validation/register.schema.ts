import { z } from 'zod'

export const registerSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, 'Ingresa tu nombre completo.')
    .max(100, 'El nombre es demasiado largo.'),
  email: z.string().trim().email('Ingresa un correo electrónico válido.'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .max(72, 'La contraseña no puede superar 72 caracteres.')
    .regex(/[A-Z]/, 'Incluye al menos una letra mayúscula.')
    .regex(/[0-9]/, 'Incluye al menos un número.'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
