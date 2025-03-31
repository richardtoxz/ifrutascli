import { CategoriaTipo } from './enum';
import { ICategoria, IProduto } from './interfaces';

export class Categoria implements ICategoria {
  constructor(
    public id: number,
    public nome: string,
    public descricao: string,
    public dataCriacao: Date = new Date(),
    public dataAtualizacao?: Date,
    public ativo: boolean = true
  ) {}
}

export class Produto implements IProduto {
  constructor(
    public id: number,
    public nome: string,
    public descricao: string,
    public preco: number,
    public quantidade: number,
    public categoriaId: number,
    public dataCriacao: Date = new Date(),
    public dataAtualizacao?: Date,
    public ativo: boolean = true
  ) {}
}