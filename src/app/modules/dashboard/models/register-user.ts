export class IRegisterUser {

  name: string;
	last_name: string;
	gender_type: number;
	phone_number: number;
	email: string;
	document: string;
	document_type: number;
	is_foreign: boolean;
	province: number;

  constructor(
    name: string,
    last_name: string,
    gender_type: number,
    phone_number: number,
    email: string,
    document: string,
    document_type: number,
    is_foreign: boolean,
    province: number
  ) {
    this.name = name;
    this.last_name = last_name;
    this.gender_type = gender_type;
    this.phone_number = phone_number;
    this.email = email;
    this.document = document;
    this.document_type = document_type;
    this.is_foreign = is_foreign;
    this.province = province;
  }
}
