import { Note } from "src/note/entities/note.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Commentaire')
export class Commentaire {

    @PrimaryGeneratedColumn()
    idCommentaire: number;

    @Column({ unique: false })
    @OneToOne(() => Note, { onDelete: 'CASCADE' })
    @JoinColumn({name : 'idNote'})
    idNote : Note

    @Column()
    contenu : string;

    @Column('date') 
    dateCommentaire : Date
}
