import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService {

    constructor(//Inyeccion de dependencias
        @InjectRepository(UsuarioEntity)
            private repositorio: Repository<UsuarioEntity>
    ) { }

    crearUno(nuevoUsuario:UsuarioEntity){


        return this.repositorio.save(nuevoUsuario) //promesa
    }

    buscarTodos(){
        return this.repositorio.find();
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id);

    }

    editarUno(usuario:UsuarioEntity){
        return this.repositorio.save(usuario)
    }

    eliminarUno(id:number){
        return this.repositorio.delete(id)
    }

    //usuario-- mascotas
    //mascota--vacunas


}

