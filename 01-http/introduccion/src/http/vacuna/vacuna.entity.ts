import {Column, Entity, Index, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";


@Entity('db_vacuna') //nombre de la tabla
export class VacunaEntity{

    //Genera un id autoincremental
    @PrimaryGeneratedColumn({
        unsigned:true,
        comment:'Identificador',
        name:'id'

    })
    id:number

  @Column()
    nombre:string


    @ManyToOne(
        type => MascotaEntity,
        mascota=> mascota.vacunas
    )
    mascota:MascotaEntity


}