import inquirer from 'inquirer';
import { categorias, produtos } from './data';
import { Categoria } from './models';

export async function menuServicos() {
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma ação para serviços:',
      choices: [
        'Criar Serviço',
        'Listar Serviços',
        'Buscar Serviço',
        'Atualizar Serviço',
        'Remover Serviço',
        'Voltar'
      ]
    }
  ]);

  switch (resposta.opcao) {
    case 'Criar Serviço':
      await criarServico();
      break;
    case 'Listar Serviços':
      listarServicos();
      break;
    case 'Buscar Serviço':
      await buscarServico();
      break;
    case 'Atualizar Serviço':
      await atualizarServico();
      break;
    case 'Remover Serviço':
      await removerServico();
      break;
    case 'Voltar':
      return;
  }

  await menuServicos();
}

async function criarServico() {
  const resposta = await inquirer.prompt([
    { type: 'input', name: 'nome', message: 'Nome do serviço:' },
    { type: 'input', name: 'descricao', message: 'Descrição do serviço:' }
  ]);

  const novaCategoria = new Categoria(
    categorias.length + 1,
    resposta.nome,
    resposta.descricao
  );
  categorias.push(novaCategoria);
  console.log('Serviço criado com sucesso!');
}

function listarServicos() {
  console.log('\nServiços cadastrados:');
  if (categorias.length === 0) {
    console.log('Nenhum serviço cadastrado.');
    return;
  }
  categorias.forEach(cat => {
    console.log(`ID: ${cat.id}, Nome: ${cat.nome}, Descrição: ${cat.descricao}`);
  });
}

async function buscarServico() {
  const resposta = await inquirer.prompt([
    { type: 'input', name: 'termo', message: 'Digite o ID ou nome do serviço:' }
  ]);

  const resultado = categorias.find(
    cat =>
      cat.id === Number(resposta.termo) || cat.nome.toLowerCase() === resposta.termo.toLowerCase()
  );

  if (resultado) {
    console.log(`ID: ${resultado.id}, Nome: ${resultado.nome}, Descrição: ${resultado.descricao}`);
  } else {
    console.log('Serviço não encontrado.');
  }
}

async function atualizarServico() {
  if (categorias.length === 0) {
    console.log('Nenhum serviço cadastrado para atualizar.');
    return;
  }

  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecione o serviço que deseja atualizar:',
      choices: categorias.map(cat => ({ name: cat.nome, value: cat.id }))
    },
    { type: 'input', name: 'nome', message: 'Novo nome do serviço:' },
    { type: 'input', name: 'descricao', message: 'Nova descrição do serviço:' }
  ]);

  const categoria = categorias.find(cat => cat.id === resposta.id);
  if (categoria) {
    categoria.nome = resposta.nome;
    categoria.descricao = resposta.descricao;
    console.log('Serviço atualizado com sucesso!');
  }
}

async function removerServico() {
  if (categorias.length === 0) {
    console.log('Nenhum serviço cadastrado para remover.');
    return;
  }

  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Selecione o serviço que deseja remover:',
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
    console.log('Serviço removido com sucesso!');
  }
}