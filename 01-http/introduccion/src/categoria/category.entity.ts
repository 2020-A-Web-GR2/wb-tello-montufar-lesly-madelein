import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductoEntity} from "../producto/producto.entity";

@Entity('categoria')
export class CategoriaEntity{

    @PrimaryGeneratedColumn({
        name:'id_categoria',
        type:'int'
    })
    id:number

    @Column({
        type:'varchar',
        length:'100',
        name:'nombre_categoria'
    })
    nombre:string

    @OneToMany(
        type => ProductoEntity,
        producto=>producto.categoria
    )
    productos:ProductoEntity[]
}