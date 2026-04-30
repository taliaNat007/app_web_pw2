import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('produtos')
export class Produto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 120 })
    nome!: string;

    @Column({ type: 'text', nullable: true })
    descricao?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco!: number;

    @Column({ type: 'boolean', default: true })
    ativo!: boolean;

    @CreateDateColumn({ name: 'criado_em' })
    criadoEm!: Date;

    @UpdateDateColumn({ name: 'atualizado_em', nullable: true })
    atualizadoEm!: Date;
}