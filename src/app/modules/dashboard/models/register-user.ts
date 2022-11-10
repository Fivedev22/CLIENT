export class IRegisterUser {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  documento: string;
  extranjero: boolean;
  provincia: string;
  genero: string;
  tipoDocumento: string;

  constructor(
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    documento: string,
    extranjero: boolean,
    provincia: string,

    genero: string,
    tipoDocumento: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
    this.documento = documento;
    this.extranjero = extranjero;
    this.provincia = provincia;

    this.genero = genero;
    this.tipoDocumento = tipoDocumento;
  }
}
