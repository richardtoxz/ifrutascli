export interface ICategoria {
    id: number;
    nome: string;
    descricao: string;
    dataCriacao: Date;
    dataAtualizacao?: Date;
  }
  
  export interface IProduto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoriaId: number;
    dataCriacao: Date;
    dataAtualizacao?: Date;
  }