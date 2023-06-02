export class Url {
    fotoPrincipal:String;
    fotoSecundariaU:String;
    fotoSecundariaD:String;
    id_producto:string;

    constructor(fotoPrincipal:string,fotoSecundariaU:string,fotoSecundariaD:string,id_producto:string){
        this.fotoPrincipal=fotoPrincipal;
        this.fotoSecundariaU=fotoSecundariaU;
        this.fotoSecundariaD=fotoSecundariaD;
        this.id_producto= id_producto;
    }

}
