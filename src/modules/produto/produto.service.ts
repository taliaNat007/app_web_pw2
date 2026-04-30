import { Injectable } from "@nestjs/common";
import { Produto } from "./produto.entity";

@Injectable()
export class ProdutoService {
        
    async findAll(): Promise<Produto[]> {
        return Produto.find();
    }

    async findOne(id: number): Promise<Produto | null> {
        return Produto.findOne({
            where: { id }
        });
    }

    async create(dados: any): Promise<Produto> {
        const preco = dados.preco.replace('.', '').replace(',', '.');
        
        const produto = Produto.create({ ...dados, preco });

        return produto.save();
    }

    async update(id: number, dados: any): Promise<Produto | null> {
        const produto = await this.findOne(id);

        if(!produto) {
            return null;
        }

        const preco = dados.preco.replace('.', '').replace(',', '.');

        Object.assign(produto, { ...dados, preco });

        return produto.save(); 
    }

    async remove(id: number): Promise<Produto | null> {
        const produto = await this.findOne(id)

        if(!produto) {
            return null;
        }

        return produto.remove();
    }
}