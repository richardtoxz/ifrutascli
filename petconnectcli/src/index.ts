import inquirer from 'inquirer';
import { menuServicos } from './modules/servicos';
import { menuProdutos } from './modules/produtos';

async function mainMenu() {
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma opção:',
      choices: [
        'Gerenciar Serviços',
        'Gerenciar Produtos',
        'Sair'
      ]
    }
  ]);

  switch (resposta.opcao) {
    case 'Gerenciar Serviços':
      await menuServicos();
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