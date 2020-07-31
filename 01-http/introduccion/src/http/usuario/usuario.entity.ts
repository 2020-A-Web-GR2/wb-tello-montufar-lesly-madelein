import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


//INDICES DE BUSQUEDA
@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento' //Nombres de las propiedades de la clase
])

//Creacion de indices compuestos

@Index([
    'nombre',
    'apellido',
    'cedula'
],

{unique:true})



@Entity('db_usuario') //nombre de la tabla
export class UsuarioEntity{

    //Genera un id autoincremental
    @PrimaryGeneratedColumn({
        unsigned:true,
        comment:'Identificador',
        name:'id'

    })
    id:number

    @Column({
        name:'nombre',
        type: 'varchar',
        length:'60',
        nullable:true
    })
    nombre?:string


    @Column({
        name:'apellido',
        type: 'varchar',
        length:'60',
        nullable:true
    })
    apellido:string


    @Column({
        name:'cedula',
        type: 'varchar',
        length:'18',
        nullable:false,
        unique:true
    })
    cedula:string


    @Column({
        name:'sueldo',
        type: "decimal",
        precision:10,//1000000000
        scale:4,//0.0001
        nullable:true,
     })
    sueldo:number


    @Column({
        name:'fecha_nacimiento',
        type: "date",
        nullable:true,
    })
    fechaNacimiento?:string

    @Column({
        name:'fecha_hora_nacimiento',
        type: "datetime",
    })
    fechaHoraNacimiento?:string


}
