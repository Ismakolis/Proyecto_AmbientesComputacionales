export class Usuarios {
    _id?: number;
    correo: string;
    contrasena: string;
    
    constructor(correo: string, contrasena: string) {
        this.correo = correo;
        this.contrasena = contrasena;
    }
}