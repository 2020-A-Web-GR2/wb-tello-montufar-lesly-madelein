import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {stringify} from "querystring";

@Entity('db_zoologico')

export class ZoologicoEntity {

    //Genera un id autoincremental
    @PrimaryGeneratedColumn()
    id: number


    @Column({
        name:'nombre',
        nullable:false,
        length:'100'
    })
    nombre:string

    @Column({
        name:'familia',
        nullable:false,
        length:'100'
    })
    familia:string

    @Column({
        name:'clase',
        nullable:false,
        length:'100'
    })
    clase:string

    @Column({
        name:'alimentacion',
        nullable:true,
        length:'100'
    })
    alimentacion?:string

    @Column({
        name:'peso',
        nullable:true,
        type:"decimal"
    })
    peso?:number




}