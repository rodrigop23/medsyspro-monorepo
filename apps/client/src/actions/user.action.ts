"use server";

import envs from "@/config/envs";
import {
  ILoginResponse,
  IRegisterResponse,
} from "@/interface/generic.interface";
import { getSessionToken, setSessionTokenCookie } from "@/lib/session";
import { LoginUserType, RegisterUserType } from "@/lib/zod-schemas/user-schema";
import { cache } from "react";

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

    if (data.session && data.token) {
      setSessionTokenCookie(data.token, new Date(data.session.expiresAt));
    }

    return data;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Algo salió mal. Intente de nuevo.",
    };
  }
};

export const loginUserAction = async (
  userData: LoginUserType
): Promise<ILoginResponse> => {
  try {
    const url = new URL("/api/auth/login", envs.NEXT_PUBLIC_AUTH_MS);

    const dataToSend = {
      email: userData.email,
      password: userData.password,
    };

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dataToSend }),
    });

    const data = await response.json();

    if (data.session && data.token) {
      setSessionTokenCookie(data.token, new Date(data.session.expiresAt));
    }
    return data;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Algo salió mal. Intente de nuevo.",
    };
  }
};

export const getCurrentUserAction = cache(async () => {
  try {
    const url = new URL("/api/auth/me", envs.NEXT_PUBLIC_AUTH_MS);

    const sessionToken = getSessionToken();

    if (!sessionToken) {
      return { session: null, user: null };
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return {
      session: null,
      user: null,
    };
  }
});
