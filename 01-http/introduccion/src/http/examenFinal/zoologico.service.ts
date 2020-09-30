import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {ZoologicoEntity} from "./zoologico.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()
export class ZoologicoService {
    constructor(
        @InjectRepository(ZoologicoEntity)
        private repositorioZoologico:Repository<ZoologicoEntity>
    ) {
    }

    buscarTodos(){
        return this.repositorioZoologico.find()
    }

    crearUno(animalNuevo:ZoologicoEntity){
        return this.repositorioZoologico.save(animalNuevo)
    }
    modificarUno(animalModificado:ZoologicoEntity){
        return this.repositorioZoologico.save(animalModificado)
    }

    eliminarUno(id:number){
        return this.repositorioZoologico.delete(id)
    }

    verUno(id:number){
        return this.repositorioZoologico.findOne(id)
    }

    b



    buscarPorFamilia(nombre:string){

        const consulta={
            where:{
                familia:Like(`${nombre}%`)
            }
        }

        return this.repositorioZoologico.find(consulta)
    }


    buscarPorNombre(nombre:string){

        const consulta={
            where:{
                nombre:Like(`${nombre}%`)
            }
        }

        return this.repositorioZoologico.find(consulta)
    }


    buscarPorClase(nombre:string){

        const consulta={
            where:{
                clase:Like(`${nombre}%`)
            }
        }

        return this.repositorioZoologico.find(consulta)
    }

    BusquedaPor3Parametros(nombre:string){

        const consulta:FindManyOptions<ZoologicoEntity>= {
            where: [
                {
                    familia: Like(`${nombre}%`)
                },
                {
                    nombre: Like(`${nombre}%`)
                },
                {
                    clase: Like(`${nombre}%`)
                }
            ]
        }

        return this.repositorioZoologico.find(consulta)



    }


}