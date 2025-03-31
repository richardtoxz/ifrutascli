import inquirer from 'inquirer';
import { categorias } from './data';
import { Categoria } from './interfaces';

export async function menuCategorias() {
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma ação para categorias:',
      choices: ['Criar Categoria', 'Listar Categorias', 'Voltar']
    }
  ]);

  switch (resposta.opcao) {
    case 'Criar Categoria':
      await criarCategoria();
      break;
    case 'Listar Categorias':
      listarCategorias();
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

  const novaCategoria: Categoria = {
    id: categorias.length + 1,
    nome: resposta.nome,
    descricao: resposta.descricao,
    dataCriacao: new Date()
  };

  categorias.push(novaCategoria);
  console.log('Categoria criada com sucesso!');
}

function listarCategorias() {
  console.log('\nCategorias cadastradas:');
  categorias.forEach(cat => {
    console.log(`ID: ${cat.id}, Nome: ${cat.nome}, Descrição: ${cat.descricao}`);
  });
}