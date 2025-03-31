import inquirer from 'inquirer';
import { menuCategorias } from './modules/categorias';
import { menuProdutos } from './modules/produtos';

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

console.log('Bem-vindo ao sistema IFrutas!');
mainMenu();