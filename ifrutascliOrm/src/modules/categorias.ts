import { AppDataSource } from '../index';
import { Categoria } from '../entities/categoria';
import { Repository } from 'typeorm';
import inquirer from 'inquirer';

export async function menuCategorias() {
  const categoriaRepository: Repository<Categoria> = AppDataSource.getRepository(Categoria);

  try {
    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcao',
        message: 'Escolha uma opção:',
        choices: [
          'Listar Categorias',
          'Adicionar Categoria',
          'Atualizar Categoria',
          'Remover Categoria',
          'Voltar',
        ],
      },
    ]);

    switch (resposta.opcao) {
      case 'Listar Categorias':
        await listarCategorias(categoriaRepository);
        break;
      case 'Adicionar Categoria':
        await adicionarCategoria(categoriaRepository);
        break;
      case 'Atualizar Categoria':
        await atualizarCategoria(categoriaRepository);
        break;
      case 'Remover Categoria':
        await removerCategoria(categoriaRepository);
        break;
      case 'Voltar':
        return;
    }

    await menuCategorias();
  } catch (error) {
    console.error('Erro ao executar o menu de categorias:', error instanceof Error ? error.message : error);
  }
}

async function listarCategorias(categoriaRepository: Repository<Categoria>) {
  try {
    const categorias = await categoriaRepository.find();
    if (categorias.length === 0) {
      console.log('Nenhuma categoria cadastrada.');
      return;
    }

    console.log('\nCategorias cadastradas:');
    categorias.forEach((categoria: Categoria) => {
      console.log(
        `ID: ${categoria.id} | Nome: ${categoria.nome} | Descrição: ${categoria.descricao} | ` +
        `Data Criação: ${categoria.dataCriacao.toLocaleDateString()}`
      );
    });
  } catch (error) {
    console.error('Erro ao listar categorias:', error instanceof Error ? error.message : error);
  }
}

async function adicionarCategoria(categoriaRepository: Repository<Categoria>) {
  try {
    const resposta = await inquirer.prompt([
      { type: 'input', name: 'nome', message: 'Nome da categoria:' },
      { type: 'input', name: 'descricao', message: 'Descrição da categoria:' },
    ]);

    const categoria = categoriaRepository.create({
      nome: resposta.nome,
      descricao: resposta.descricao,
    });

    await categoriaRepository.save(categoria);
    console.log('Categoria adicionada com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error instanceof Error ? error.message : error);
  }
}

async function atualizarCategoria(categoriaRepository: Repository<Categoria>) {
  try {
    const categorias = await categoriaRepository.find();
    if (categorias.length === 0) {
      console.log('Nenhuma categoria cadastrada para atualizar.');
      return;
    }

    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Selecione a categoria que deseja atualizar:',
        choices: categorias.map((categoria: Categoria) => ({ name: categoria.nome, value: categoria.id })),
      },
      { type: 'input', name: 'nome', message: 'Novo nome da categoria:' },
      { type: 'input', name: 'descricao', message: 'Nova descrição da categoria:' },
    ]);

    const categoria = await categoriaRepository.findOneBy({ id: resposta.id });
    if (categoria) {
      categoria.nome = resposta.nome;
      categoria.descricao = resposta.descricao;
      await categoriaRepository.save(categoria);
      console.log('Categoria atualizada com sucesso!');
    } else {
      console.log('Categoria não encontrada.');
    }
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error instanceof Error ? error.message : error);
  }
}

async function removerCategoria(categoriaRepository: Repository<Categoria>) {
  try {
    const categorias = await categoriaRepository.find();
    if (categorias.length === 0) {
      console.log('Nenhuma categoria cadastrada para remover.');
      return;
    }

    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Selecione a categoria que deseja remover:',
        choices: categorias.map((categoria: Categoria) => ({ name: categoria.nome, value: categoria.id })),
      },
    ]);

    await categoriaRepository.delete(resposta.id);
    console.log('Categoria removida com sucesso!');
  } catch (error) {
    console.error('Erro ao remover categoria:', error instanceof Error ? error.message : error);
  }
}