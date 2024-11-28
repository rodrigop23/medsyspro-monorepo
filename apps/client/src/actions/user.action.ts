"use server";

import envs from "@/config/envs";
import { IGenericResponse } from "@/interface/generic.interface";
import { RegisterUserType } from "@/lib/zod-schemas/user-schema";

export const registerUserAction = async (
  userData: RegisterUserType
): Promise<IGenericResponse> => {
  try {
    const url = new URL("/api/auth/register", envs.NEXT_PUBLIC_AUTH_MS);

    const dataToSend = {
      documentType: userData.documentType,
      documentNumber: userData.documentNumber,
      name: userData.name,
      firstSurname: userData.firstSurname,
      secondSurname: userData.secondSurname,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      birthdate: userData.birthdate,
      gender: userData.gender,
    };

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dataToSend }),
    });

    const data = await response.json();

    if (!data) {
      throw new Error("Error en el servidor. Intente de nuevo.");
    }

    // setTokenCookie(data.jwt);

    return {
      ok: true,
      message: "Usuario creado con éxito",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Algo salió mal. Intente de nuevo.");
  }
};
