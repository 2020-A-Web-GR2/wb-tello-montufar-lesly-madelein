import {InjectRepository} from "@nestjs/typeorm";
import {createQueryBuilder, Repository} from "typeorm";
import {ImagenProductoEntity} from "./imagen-producto.entity";


export class ImagenProductoService{
    constructor(@InjectRepository(ImagenProductoEntity)
                private repositorioImagenProducto: Repository<ImagenProductoEntity>) {
    }

    crearImagenProducto(imagenProducto:ImagenProductoEntity){
        return this.repositorioImagenProducto.save(imagenProducto)
    }

    buscarTodosImagenProducto(){
        return this.repositorioImagenProducto.find()
    }

    buscarUnaImagenProducto(id:number){
        return this.repositorioImagenProducto.findOne(id)
    }
    eliminarImagenProducto(id:number){
        return this.repositorioImagenProducto.delete(id)
    }

    modificarImagenProducto(imagenModificada:ImagenProductoEntity){
        return this.repositorioImagenProducto.save(imagenModificada)

    }

    eliminarImagenProductoPorProducto(id:number){
        const res=createQueryBuilder()
             .delete()
                .from(ImagenProductoEntity)
            .where("producto = :id", { id: id })
            .execute()


        return res



    }

}