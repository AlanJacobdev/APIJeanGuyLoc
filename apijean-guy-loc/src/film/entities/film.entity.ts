import { TypeFilm } from "src/typefilm/entities/typefilm.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Film')
export class Film {

    @PrimaryGeneratedColumn()
    idFilm : number

    @OneToOne(() => TypeFilm, {
        eager: true
      })
    @JoinColumn()
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

    @Column()
    dateSortie : Date



}
