import inquirer from 'inquirer';
import { categorias, produtos } from './data';
import { Categoria } from './models';

export async function menuCategorias() {
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma ação para categorias:',
      choices: [
        'Criar Categoria',
        'Listar Categorias',
        'Buscar Categoria',
        'Atualizar Categoria',
        'Remover Categoria',
        'Voltar'
      ]
    }
  ]);

  switch (resposta.opcao) {
    case 'Criar Categoria':
      await criarCategoria();
      break;
    case 'Listar Categorias':
      listarCategorias();
      break;
    case 'Buscar Categoria':
      await buscarCategoria();
      break;
    case 'Atualizar Categoria':
      await atualizarCategoria();
      break;
    case 'Remover Categoria':
      await removerCategoria();
      break;
    case 'Voltar':
      return;
  }

  await menuCategorias();
}

async function criarCategoria() {
  const resposta = await inquirer.prompt([
    { type: 'input', name: 'nome', message: 'Nome da categoria:' },
    { type: 'input', name: 'descricao', message: 'Descrição da categoria:' }
  ]);

  const novaCategoria = new Categoria(
    categorias.length + 1,
    resposta.nome,
    resposta.descricao,
    new Date()
  );
  categorias.push(novaCategoria);
  console.log('Categoria criada com sucesso!');
}

function listarCategorias() {
  console.log('\nCategorias cadastradas:');
  if (categorias.length === 0) {
    console.log('Nenhuma categoria cadastrada.');
    return;
  }
  categorias.forEach(cat => {
    console.log(
      `ID: ${cat.id}, Nome: ${cat.nome}, Descrição: ${cat.descricao}, ` +
      `Data de Criação: ${cat.dataCriacao.toLocaleDateString()}`
    );
  });
}

async function buscarCategoria() {
  const resposta = await inquirer.prompt([
    { type: 'input', name: 'termo', message: 'Digite o ID ou nome da categoria:' }
  ]);

  const resultado = categorias.find(
    cat =>
      cat.id === Number(resposta.termo) || cat.nome.toLowerCase().includes(resposta.termo.toLowerCase())
  );

  if (resultado) {
    console.log(`ID: ${resultado.id}, Nome: ${resultado.nome}, Descrição: ${resultado.descricao}`);
  } else {
    console.log('Categoria não encontrada.');
  }
}

async function atualizarCategoria() {
  if (categorias.length === 0) {
    console.log('Nenhuma categoria cadastrada para atualizar.');
    return;
  }

  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecione a categoria que deseja atualizar:',
      choices: categorias.map(cat => ({ name: cat.nome, value: cat.id }))
    },
    { type: 'input', name: 'nome', message: 'Novo nome da categoria:' },
    { type: 'input', name: 'descricao', message: 'Nova descrição da categoria:' }
  ]);

  const categoria = categorias.find(cat => cat.id === resposta.id);
  if (categoria) {
    categoria.nome = resposta.nome;
    categoria.descricao = resposta.descricao;
    console.log('Categoria atualizada com sucesso!');
  }
}

async function removerCategoria() {
  if (categorias.length === 0) {
    console.log('Nenhuma categoria cadastrada para remover.');
    return;
  }

  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecione a categoria que deseja remover:',
      choices: categorias.map(cat => ({ name: cat.nome, value: cat.id }))
    }
  ]);

  const categoria = categorias.find(cat => cat.id === resposta.id);
  if (categoria) {
    const produtosAssociados = produtos.some(prod => prod.categoriaId === categoria.id);
    if (produtosAssociados) {
      console.log('Não é possível remover a categoria. Existem produtos associados a ela.');
      return;
    }

    const index = categorias.indexOf(categoria);
    categorias.splice(index, 1);
    console.log('Categoria removida com sucesso!');
  }
}