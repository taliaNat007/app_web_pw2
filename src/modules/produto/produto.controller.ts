import { Body, Controller, Get, Post, Redirect, Render, Param } from "@nestjs/common";
import { ProdutoService } from "./produto.service";

@Controller('produtos')
export class ProdutoController {

    constructor(private produtoService: ProdutoService) {}

    @Get()
    @Render('produto/inicial')
    async inicial(): Promise<object> {
        const listaProdutos = await this.produtoService.findAll();

        return {
            titulo: 'Consulta de Produtos',
            produtos: listaProdutos
        }
    }

    @Get('criar')
    @Render('produto/formulario')
    async formularioCriar(): Promise<object> {
        return {
            titulo: 'Novo produto',
        };
    }

    @Post('criar')
    @Redirect('/produtos')
    async formularioCriarSalvar(@Body() dados: any): Promise<void> {
        await this.produtoService.create(dados);
    }

    @Get(':id/editar')
    @Render('produto/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const produto = await this.produtoService.findOne(id);

        if(!produto) {
            throw new Error('Produto não encontrado!');            
        }
        
        return {
            titulo: 'Edição de Produto',
            subtitulo: `Atualização do produto: ${produto.nome}`,
            produto,
        };
    }

    @Post(':id/editar')
    @Redirect('/produtos')
    async formEditarSalvar(@Param('id') id: number, @Body() dados: any): Promise<void>{
        await this.produtoService.update(id, dados);
    }

    @Get(':id/remove')
    @Render('produto/remove')
    async formRemove(@Param('id') id: number): Promise<object> {
        const produto = await this.produtoService.findOne(id);

        if(!produto) {
            throw new Error('Produto não encontrado!');            
        }
        
        return {
            titulo: 'Exclusão de Produto',
            subtitulo: `Atualização do produto: ${produto.nome}`,
            produto,
        };
    }

    @Post(':id/remove')
    @Redirect('/produtos')
    async formRemoveProduto(@Param('id') id: number, @Body() dados: any): Promise<void>{
        await this.produtoService.remove(id);
    }
    
}