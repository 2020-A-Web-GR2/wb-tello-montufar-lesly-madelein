import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductoEntity} from "../producto/producto.entity";

@Entity('imagen_producto')
export class ImagenProductoEntity{

    @PrimaryGeneratedColumn({
        name:'id_imagen_producto',
        type:'int'
    })
    id:number

    @Column({
        type:'varchar',
        length:'200',
        name:'url_Foto'
    })
    url:string

    @ManyToOne(
        type => ProductoEntity,
        producto=>producto.imagenes
    )
    @JoinColumn({name: 'id-producto'})
    producto:ProductoEntity
}