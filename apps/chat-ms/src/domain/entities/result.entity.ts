export class Result {
    constructor(
      public id: string,
      public patientId: string,
      public type: string, // 'LAB_RESULT' | 'MEDICAL_IMAGE'
      public filePath: string,
      public nombre: string,
      public descripcion: string,
      public createdAt: Date,
    ) {}
  
  }
  