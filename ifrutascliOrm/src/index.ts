import 'reflect-metadata'; 
import { DataSource } from 'typeorm';
import inquirer from 'inquirer';
import { menuCategorias } from './modules/categorias';
import { menuProdutos } from './modules/produtos';
import { Categoria } from './entities/categoria';
import { Produto } from './entities/produto';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306, 
  username: 'root', 
  password: 'c@tolic@', 
  database: 'ifrutas', 
  synchronize: true,
  logging: false,
  entities: [Categoria, Produto],
  migrations: ['./migrations/*.ts'],
  subscribers: [],
});

async function mainMenu() {
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma opção:',
      choices: [
        'Gerenciar Categorias',
        'Gerenciar Produtos',
        'Sair',
      ],
    },
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
      process.exit(0);
  }

  await mainMenu();
}

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    mainMenu();
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });