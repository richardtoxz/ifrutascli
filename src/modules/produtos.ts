import inquirer from 'inquirer';
import { produtos, categorias } from './data';
import { Produto } from './models';

export async function menuProdutos() {
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma ação para produtos:',
      choices: [
        'Criar Produto',
        'Listar Produtos',
        'Buscar Produto',
        'Atualizar Produto',
        'Remover Produto',
        'Voltar'
      ]
    }
  ]);

  switch (resposta.opcao) {
    case 'Criar Produto':
      await criarProduto();
      break;
    case 'Listar Produtos':
      listarProdutos();
      break;
    case 'Buscar Produto':
      await buscarProduto();
      break;
    case 'Atualizar Produto':
      await atualizarProduto();
      break;
    case 'Remover Produto':
      await removerProduto();
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
    { type: 'number', name: 'quantidade', message: 'Quantidade disponível:' },
    {
      type: 'list',
      name: 'categoriaId',
      message: 'Escolha a categoria do produto:',
      choices: categorias.map(c => ({ name: c.nome, value: c.id }))
    }
  ]);

  const novoProduto = new Produto(
    produtos.length + 1,
    resposta.nome,
    resposta.descricao,
    resposta.preco,
    resposta.quantidade,
    resposta.categoriaId
  );

  produtos.push(novoProduto);
  console.log('Produto criado com sucesso!');
}

function listarProdutos() {
  console.log('\nProdutos cadastrados:');
  if (produtos.length === 0) {
    console.log('Nenhum produto cadastrado.');
    return;
  }
  produtos.forEach(prod => {
    const categoria = categorias.find(c => c.id === prod.categoriaId);
    console.log(
      `ID: ${prod.id}, Nome: ${prod.nome}, Preço: R$${prod.preco}, Quantidade: ${prod.quantidade}, Categoria: ${categoria ? categoria.nome : 'Categoria não encontrada'}`
    );
  });
}

async function buscarProduto() {
  const resposta = await inquirer.prompt([
    { type: 'input', name: 'termo', message: 'Digite o ID, nome ou categoria do produto:' }
  ]);

  const resultado = produtos.filter(
    prod =>
      prod.id === Number(resposta.termo) ||
      prod.nome.toLowerCase().includes(resposta.termo.toLowerCase()) ||
      categorias.find(c => c.id === prod.categoriaId && c.nome.toLowerCase().includes(resposta.termo.toLowerCase()))
  );

  if (resultado.length > 0) {
    resultado.forEach(prod => {
      const categoria = categorias.find(c => c.id === prod.categoriaId);
      console.log(
        `ID: ${prod.id}, Nome: ${prod.nome}, Preço: R$${prod.preco}, Quantidade: ${prod.quantidade}, Categoria: ${categoria ? categoria.nome : 'Categoria não encontrada'}`
      );
    });
  } else {
    console.log('Produto não encontrado.');
  }
}

async function atualizarProduto() {
  if (produtos.length === 0) {
    console.log('Nenhum produto cadastrado para atualizar.');
    return;
  }

  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecione o produto que deseja atualizar:',
      choices: produtos.map(prod => ({ name: prod.nome, value: prod.id }))
    },
    { type: 'input', name: 'nome', message: 'Novo nome do produto:' },
    { type: 'input', name: 'descricao', message: 'Nova descrição do produto:' },
    { type: 'number', name: 'preco', message: 'Novo preço do produto:' },
    { type: 'number', name: 'quantidade', message: 'Nova quantidade disponível:' },
    {
      type: 'list',
      name: 'categoriaId',
      message: 'Escolha a nova categoria do produto:',
      choices: categorias.map(c => ({ name: c.nome, value: c.id }))
    }
  ]);

  const produto = produtos.find(prod => prod.id === resposta.id);
  if (produto) {
    produto.nome = resposta.nome;
    produto.descricao = resposta.descricao;
    produto.preco = resposta.preco;
    produto.quantidade = resposta.quantidade;
    produto.categoriaId = resposta.categoriaId;
    produto.dataAtualizacao = new Date();
    console.log('Produto atualizado com sucesso!');
  }
}

async function removerProduto() {
  if (produtos.length === 0) {
    console.log('Nenhum produto cadastrado para remover.');
    return;
  }

  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecione o produto que deseja remover:',
      choices: produtos.map(prod => ({ name: prod.nome, value: prod.id }))
    }
  ]);

  const index = produtos.findIndex(prod => prod.id === resposta.id);
  if (index !== -1) {
    const removido = produtos.splice(index, 1);
    console.log(`Produto "${removido[0].nome}" removido com sucesso!`);
  } else {
    console.log('Produto não encontrado.');
  }
}