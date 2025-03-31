import { Repository } from 'typeorm';
import { AppDataSource } from '../index';
import { Produto } from '../entities/produto';
import inquirer from 'inquirer';

export async function menuProdutos() {
  const produtoRepository: Repository<Produto> = AppDataSource.getRepository(Produto);

  try {
    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcao',
        message: 'Escolha uma ação para produtos:',
        choices: [
          'Criar Produto',
          'Listar Produtos',
          'Atualizar Produto',
          'Remover Produto',
          'Voltar',
        ],
      },
    ]);

    switch (resposta.opcao) {
      case 'Criar Produto':
        await criarProduto(produtoRepository);
        break;
      case 'Listar Produtos':
        await listarProdutos(produtoRepository);
        break;
      case 'Atualizar Produto':
        await atualizarProduto(produtoRepository);
        break;
      case 'Remover Produto':
        await removerProduto(produtoRepository);
        break;
      case 'Voltar':
        return;
    }

    await menuProdutos();
  } catch (error) {
    console.error('Erro ao executar o menu de produtos:', error instanceof Error ? error.message : error);
  }
}

async function criarProduto(produtoRepository: Repository<Produto>) {
  try {
    const resposta = await inquirer.prompt([
      { type: 'input', name: 'nome', message: 'Nome do produto:' },
      { type: 'input', name: 'descricao', message: 'Descrição do produto:' },
      { type: 'input', name: 'preco', message: 'Preço do produto:' },
      { type: 'input', name: 'quantidade', message: 'Quantidade disponível:' },
      { type: 'input', name: 'categoriaId', message: 'ID da categoria:' },
      { type: 'confirm', name: 'ativo', message: 'O produto está ativo?', default: true },
    ]);

    const preco = parseFloat(resposta.preco);
    const quantidade = parseInt(resposta.quantidade, 10);
    const categoriaId = parseInt(resposta.categoriaId, 10);

    if (isNaN(preco) || isNaN(quantidade) || isNaN(categoriaId)) {
      console.log('Erro: Preço, quantidade e ID da categoria devem ser números válidos.');
      return;
    }

    const produto = produtoRepository.create({
      nome: resposta.nome,
      descricao: resposta.descricao,
      preco,
      quantidade,
      categoriaId,
      ativo: resposta.ativo,
    });

    await produtoRepository.save(produto);
    console.log('Produto criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar produto:', error instanceof Error ? error.message : error);
  }
}

async function listarProdutos(produtoRepository: Repository<Produto>) {
  try {
    const produtos = await produtoRepository.find();
    if (produtos.length === 0) {
      console.log('Nenhum produto cadastrado.');
      return;
    }

    console.log('\nProdutos cadastrados:');
    produtos.forEach((prod: Produto) => {
      console.log(
        `ID: ${prod.id} | Nome: ${prod.nome} | Preço: R$${Number(prod.preco).toFixed(2)} | Quantidade: ${prod.quantidade} | ` +
        `Categoria ID: ${prod.categoriaId} | Ativo: ${prod.ativo ? 'Sim' : 'Não'}`
      );
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error instanceof Error ? error.message : error);
  }
}

async function atualizarProduto(produtoRepository: Repository<Produto>) {
  try {
    const produtos = await produtoRepository.find();
    if (produtos.length === 0) {
      console.log('Nenhum produto cadastrado para atualizar.');
      return;
    }

    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Selecione o produto que deseja atualizar:',
        choices: produtos.map((prod: Produto) => ({ name: prod.nome, value: prod.id })),
      },
      { type: 'input', name: 'nome', message: 'Novo nome do produto:' },
      { type: 'input', name: 'descricao', message: 'Nova descrição do produto:' },
      { type: 'input', name: 'preco', message: 'Novo preço do produto:' },
      { type: 'input', name: 'quantidade', message: 'Nova quantidade disponível:' },
      { type: 'input', name: 'categoriaId', message: 'Novo ID da categoria:' },
      { type: 'confirm', name: 'ativo', message: 'O produto está ativo?', default: true },
    ]);

    const preco = parseFloat(resposta.preco);
    const quantidade = parseInt(resposta.quantidade, 10);
    const categoriaId = parseInt(resposta.categoriaId, 10);

    if (isNaN(preco) || isNaN(quantidade) || isNaN(categoriaId)) {
      console.log('Erro: Preço, quantidade e ID da categoria devem ser números válidos.');
      return;
    }

    const produto = await produtoRepository.findOneBy({ id: resposta.id });
    if (produto) {
      produto.nome = resposta.nome;
      produto.descricao = resposta.descricao;
      produto.preco = preco;
      produto.quantidade = quantidade;
      produto.categoriaId = categoriaId;
      produto.ativo = resposta.ativo;
      produto.dataAtualizacao = new Date();
      await produtoRepository.save(produto);
      console.log('Produto atualizado com sucesso!');
    } else {
      console.log('Produto não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error instanceof Error ? error.message : error);
  }
}

async function removerProduto(produtoRepository: Repository<Produto>) {
  try {
    const produtos = await produtoRepository.find();
    if (produtos.length === 0) {
      console.log('Nenhum produto cadastrado para remover.');
      return;
    }

    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Selecione o produto que deseja remover:',
        choices: produtos.map((prod: Produto) => ({ name: prod.nome, value: prod.id })),
      },
    ]);

    await produtoRepository.delete(resposta.id);
    console.log('Produto removido com sucesso!');
  } catch (error) {
    console.error('Erro ao remover produto:', error instanceof Error ? error.message : error);
  }
}