import inquirer from 'inquirer';
import { menuCategorias } from './categorias';
import { menuProdutos } from './produtos';

async function mainMenu() {
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma opção:',
      choices: [
        'Gerenciar Categorias',
        'Gerenciar Produtos',
        'Sair'
      ]
    }
  ]);

  switch (resposta.opcao) {
    case 'Gerenciar Categorias':
      await menuCategorias();
      break;
    case 'Gerenciar Produtos':
      await menuProdutos();
      break;
    case 'Sair':
      console.log('Encerrando o sistema...');
      return;
  }

  await mainMenu();
}

mainMenu();