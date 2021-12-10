import { Transform } from "class-transformer";
import { TypeFilm } from "src/typefilm/entities/typefilm.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Film')
export class Film {

    @PrimaryGeneratedColumn()
    idFilm : number

    
    @Column({ unique: false })
    @ManyToOne(() => TypeFilm)
    @JoinColumn({name : 'idTypeFilm'})
    idTypeFilm : TypeFilm

    @Column()
    titre : string

    @Column()
    lienImage : string

    @Column()
    lienBandeAnnonce : string

    @Column()
    synopsis : string

    @Column()
    duree : number

    @Column('date') 
    dateSortie : Date



}
