import inquirer from 'inquirer';
import { produtos, categorias } from './data';
import { Produto } from './interfaces';

export async function menuProdutos() {
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma ação para produtos:',
      choices: ['Criar Produto', 'Listar Produtos', 'Voltar']
    }
  ]);

  switch (resposta.opcao) {
    case 'Criar Produto':
      await criarProduto();
      break;
    case 'Listar Produtos':
      listarProdutos();
      break;
    case 'Voltar':
      return;
  }

  await menuProdutos();
}

async function criarProduto() {
  if (categorias.length === 0) {
    console.log('Nenhuma categoria cadastrada. Cadastre uma categoria primeiro.');
    return;
  }

  const resposta = await inquirer.prompt([
    { type: 'input', name: 'nome', message: 'Nome do produto:' },
    { type: 'input', name: 'descricao', message: 'Descrição do produto:' },
    { type: 'number', name: 'preco', message: 'Preço do produto:' },
    { type: 'number', name: 'quantidade', message: 'Quantidade em estoque:' },
    {
      type: 'list',
      name: 'categoriaId',
      message: 'Escolha uma categoria:',
      choices: categorias.map(cat => ({ name: cat.nome, value: cat.id }))
    }
  ]);

  const novoProduto: Produto = {
    id: produtos.length + 1,
    nome: resposta.nome,
    descricao: resposta.descricao,
    preco: resposta.preco,
    quantidade: resposta.quantidade,
    categoriaId: resposta.categoriaId,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  };

  produtos.push(novoProduto);
  console.log('Produto criado com sucesso!');
}

function listarProdutos() {
  console.log('\nProdutos cadastrados:');
  produtos.forEach(prod => {
    console.log(`ID: ${prod.id}, Nome: ${prod.nome}, Preço: ${prod.preco}, Quantidade: ${prod.quantidade}`);
  });
}