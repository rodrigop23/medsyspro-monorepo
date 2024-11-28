"use server";

import envs from "@/config/envs";
import { IRegisterResponse } from "@/interface/generic.interface";
import { RegisterUserType } from "@/lib/zod-schemas/user-schema";

export const registerUserAction = async (
  userData: RegisterUserType
): Promise<IRegisterResponse> => {
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

    console.log(data);

    // setTokenCookie(data.jwt);

    return data;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Algo salió mal. Intente de nuevo.",
    };
  }
};
