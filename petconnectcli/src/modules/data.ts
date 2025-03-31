import { Categoria, Produto } from './models';

export const categorias: Categoria[] = [
    new Categoria(1, 'Frutas Cítricas', 'Frutas com alto teor de ácido cítrico e sabor ácido'),
    new Categoria(2, 'Frutas Vermelhas', 'Frutas pequenas e de sabor agridoce'),
    new Categoria(3, 'Frutas Tropicais', 'Frutas típicas de regiões tropicais com sabor doce e exótico'),
];

export const produtos: Produto[] = [
  new Produto(1, 'Maçã', 'Maçã vermelha fresca', 5.0, 100, 3),
  new Produto(2, 'Suco de Laranja', 'Suco de laranja natural', 8.0, 30, 1),
  new Produto(3, 'Banana', 'Banana prata fresca', 3.0, 150, 3),
];