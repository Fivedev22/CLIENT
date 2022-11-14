export class IRestablecerContrasenia {
     reset_token: string;
     new_password: string;


    constructor( reset_token: string,  new_password: string) {
        this. reset_token =  reset_token;
        this. new_password =  new_password
    }
}