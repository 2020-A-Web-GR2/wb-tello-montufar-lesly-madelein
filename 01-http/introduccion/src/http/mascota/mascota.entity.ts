import {Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";


@Entity() //nombre de la tabla
export class MascotaEntity{

    //Genera un id autoincremental
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombre?:string


@ManyToOne(
    type => UsuarioEntity,
    usuario=>usuario.mascotas
)
    usuario:UsuarioEntity


    @OneToMany(
    type => VacunaEntity,
    vacuna=> vacuna.mascota
    )
    vacunas:VacunaEntity[]


}
