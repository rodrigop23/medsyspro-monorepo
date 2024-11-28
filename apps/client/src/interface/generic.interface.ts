export interface IGenericResponse {
  ok: boolean;
  message: string;
}

export interface IRegisterResponse extends IGenericResponse {
  duplicated?: boolean;
}
