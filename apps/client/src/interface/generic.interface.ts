export interface IGenericResponse {
  ok: boolean;
  message: string;
}

export interface IRegisterResponse extends IGenericResponse {
  duplicated?: boolean;
}

export interface ILoginResponse extends IGenericResponse {
  email?: boolean;
  password?: boolean;
}
