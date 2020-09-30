import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ImagenProductoEntity} from "../imagen-producto/imagen-producto.entity";
import {CategoriaEntity} from "../categoria/category.entity";


@Entity('producto')
export class ProductoEntity{

    @PrimaryGeneratedColumn({


        comment:'Identificador del rol',
        name:'id_producto'}

    )
    id:number

    @Column({
        name:'codigo_producto',
        type:'varchar',
        length:20,
        nullable:true
        }

    )
    codigo:string


    @Column({
        name:'nombre_producto',
        type:'varchar',
        length:50,
        nullable:false
    })

    nombre:string


    @Column({
        name:'descripcion_producto',
        type:'varchar',
        length:100,
        nullable:true
        }

    )
    descripcion:string

    @Column({
        type:'float',
        name:'precio_producto',
        nullable:false
    })
    precio:number

    @Column({
        type:'int',
        name:'cantidad_producto',
        nullable:true
    })
    cantidad:number

    @Column({
        type:'datetime',
        name:'fecha_inicio',
        nullable:true
    })
    fechaInicio:string

    @Column({
        type:'datetime',
        name:'fecha_fin',
        nullable:true
    })
    fechaFin:string


    @OneToMany(
        type => ImagenProductoEntity,
        imagenProducto=>imagenProducto.producto

    )
    imagenes:ImagenProductoEntity[]



    @ManyToOne(
        type => CategoriaEntity,
        categoria=> categoria.productos
    )
    @JoinColumn({name: 'id_categoria'})
    categoria:CategoriaEntity





}