import { Transform } from "class-transformer";
import { Acteur } from "src/acteur/entities/acteur.entity";
import { Categorie } from "src/categorie/entities/categorie.entity";
import { Realisateur } from "src/realisateur/entities/realisateur.entity";
import { TypeFilm } from "src/typefilm/entities/typefilm.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({length: 2048})
    synopsis : string

    @Column()
    duree : number

    @Column({type : "date"}) 
    dateSortie : Date

    @ManyToMany(type => Categorie, categorie => categorie.films)
    @JoinTable({
        name: "estDeCategorie",
        joinColumn: {
            name: "idFilm",
            referencedColumnName: "idFilm",
        },
        inverseJoinColumn: {
            name: "idCategorie",
            referencedColumnName: "idCategorie",
        },
    })
    categories: Categorie[]

    @ManyToMany(type => Acteur, acteur => acteur.films)
    @JoinTable({
        name: "estActeurDans",
        joinColumn: {
            name: "idFilm",
            referencedColumnName: "idFilm",
        },
        inverseJoinColumn: {
            name: "idActeur",
            referencedColumnName: "idActeur",
        },
    })
    acteurs: Acteur[]

    @ManyToMany(type => Realisateur, realisateur => realisateur.films)
    @JoinTable({
        name: "estRealisePar",
        joinColumn: {
            name: "idFilm",
            referencedColumnName: "idFilm",
        },
        inverseJoinColumn: {
            name: "idRealisateur",
            referencedColumnName: "idRealisateur",
        },
    })
    realisateurs: Realisateur[]
}
