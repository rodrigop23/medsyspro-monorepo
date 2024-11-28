import { z } from "zod";

export const registerUserSchema = z
  .object({
    documentType: z.string().min(2, {
      message: "Selecciona una opción",
    }),
    documentNumber: z.string().min(8, {
      message: "Ingrese un número de documento válido",
    }),
    name: z.string().min(3, {
      message: "Ingrese su nombre completo",
    }),
    firstSurname: z.string().min(3, {
      message: "Ingrese su apellido paterno",
    }),
    secondSurname: z.string().min(3, {
      message: "Ingrese su apellido materno",
    }),
    email: z.string().email({
      message: "Ingrese un correo electrónico válido",
    }),
    gender: z.string().min(1, {
      message: "Seleccione una opción",
    }),
    birthdate: z.date({
      message: "Seleccione una fecha",
    }),
    phone: z.string().min(9, {
      message: "Ingrese un teléfono válido",
    }),
    termsAccepted: z.boolean({
      required_error: "Debe aceptar los términos y condiciones",
    }),
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
      })
      .max(16, {
        message: "La contraseña debe tener como máximo 16 caracteres",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "La contraseña debe contener al menos una letra mayúscula",
      })
      .refine((value) => /\d/.test(value), {
        message: "La contraseña debe contener al menos un número",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "La contraseña debe contener al menos un carácter especial",
      }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      });
    }
  });

export const loginUserSchema = z.object({
  email: z.string().email({
    message: "Ingresa un correo electrónico válido",
  }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(16, {
      message: "La contraseña debe tener como máximo 16 caracteres",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .refine((value) => /\d/.test(value), {
      message: "La contraseña debe contener al menos un número",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "La contraseña debe contener al menos un carácter especial",
    }),
  remember: z.boolean().optional(),
});

export type LoginUserType = z.infer<typeof loginUserSchema>;
export type RegisterUserType = z.infer<typeof registerUserSchema>;
