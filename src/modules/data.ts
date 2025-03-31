import { Categoria, Produto } from './models';
import { CategoriaTipo } from './enum';

export const categorias: Categoria[] = [
    new Categoria(1, 'Produtos do Petshop', 'Produtos relacionados ao petshop'),
    new Categoria(2, 'Serviços do Petshop', 'Serviços oferecidos pelo petshop'),
];

export const produtos: Produto[] = [
    new Produto(1, 'Ração para cães', 'Ração premium para cães', 150.0, 10, 1),
    new Produto(2, 'Shampoo para gatos', 'Shampoo especial para gatos', 50.0, 5, 2),
    new Produto(3, 'Coleira para cães', 'Coleira ajustável para cães', 30.0, 20, 1),
];