# Notas.md

Integrantes do grupo:

RICHARD RODRIGUES DE HOLANDA ANDRADE  //  uc23200634 <br>
MICHAEL GABRIEL DA CONCEIÇÃO COSTA    //  Uc23200045 <br>
MICAEL ARTHUR FERRO DOS SANTOS        //  uc23100001 <br>
PABLO HENRIQUE DOURADO MACEDO         //  Uc23102392 <br>
PEDRO HENRIQUE MARTINS BARBOSA        //             <br>
VINICIUS BORGES DE OLIVEIRA           // 

## TypeScript: Tipagem Adequada

No projeto IFrutas CLI, utilizamos TypeScript com tipagem para garantir maior segurança e legibilidade do código.

```typescript
// Exemplo de função com tipagem adequada
function calcularPrecoTotal(preco: number, quantidade: number): number {
  return preco * quantidade;
}

// Uso de Repository com tipagem específica
const categoriaRepository: Repository<Categoria> = AppDataSource.getRepository(Categoria);
```

## Modularização

O projeto está organizado seguindo princípios de modularização, separando responsabilidades em diferentes arquivos e pastas:

```
src/
├── entities/         # Definições de entidades para o TypeORM
│   ├── produto.ts
│   └── categoria.ts
├── modules/          # Módulos funcionais
│   ├── produtos.ts   # Lógica para gerenciamento de produtos
│   ├── categorias.ts # Lógica para gerenciamento de categorias
│   ├── models.ts     # Definições de modelos
│   ├── interfaces.ts # Definições de interfaces
│   ├── enum.ts       # Definições de enums
│   └── data.ts       # Dados iniciais
└── index.ts          # Ponto de entrada da aplicação
```

## Persistência em Memória vs TypeORM

O projeto evoluiu de uma implementação com persistência em memória para uma solução com banco de dados MySQL usando TypeORM:

### Persistência em Memória (implementação original):

```typescript
// Exemplo de persistência em memória (src/modules/data.ts)
export const produtos: Produto[] = [
    new Produto(1, 'Maçã', 'Maçã vermelha fresca', 5.0, 100, 1),
    new Produto(2, 'Suco de Laranja', 'Suco de laranja natural', 8.0, 30, 2),
    new Produto(3, 'Banana', 'Banana prata fresca', 3.0, 150, 1),
];
```

### Persistência com TypeORM (implementação atual):

```typescript
// Configuração do TypeORM (src/index.ts)
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

// Exemplo de operação CRUD com TypeORM
const produto = produtoRepository.create({
  nome: resposta.nome,
  descricao: resposta.descricao,
  preco,
  quantidade,
  categoriaId,
  ativo: resposta.ativo,
});

await produtoRepository.save(produto);
```

## Tipos Básicos e Anotações

O projeto utiliza diversos tipos básicos do TypeScript:

```typescript
// number - para representar valores numéricos
const preco: number = 5.0;

// string - para representar texto
const nome: string = 'Maçã';

// boolean - para representar valores verdadeiro/falso
const ativo: boolean = true;

// null e undefined
const semDados: null = null;
const naoDefinido: undefined = undefined;

// void - para funções sem retorno
function exibirMensagem(mensagem: string): void {
  console.log(mensagem);
}

// any - evitado quando possível, mas usado para tipos desconhecidos
function processarDados(dados: any): void {
  console.log(dados);
}
```

## Tipos Condicionais, Intersection e Union Types

```typescript
// Union type - pode ser um tipo OU outro
type ID = number | string;

// Intersection type - combina múltiplos tipos
type ProdutoBase = {
  nome: string;
  preco: number;
};

type ProdutoDetalhes = {
  descricao: string;
  quantidade: number;
};

type ProdutoCompleto = ProdutoBase & ProdutoDetalhes;

// Exemplo de uso de union type no projeto
function processarErro(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
```

## Interfaces e Tipos Personalizados

O projeto utiliza tanto `interface` quanto `type` para definir contratos:

```typescript
// Interface - ótima para definir contratos de objetos
interface IProduto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoriaId: number;
  dataCriacao: Date;
  dataAtualizacao?: Date; // Propriedade opcional
}

// Type - mais flexível e pode representar unions, intersections, etc.
type ProdutoOuCategoria = Produto | Categoria;
```

### Diferenças entre Type e Interface

- `interface` pode ser estendida e implementada por classes
- `type` permite unions, intersections e outros tipos mais avançados
- `interface` permite declaration merging (adicionar propriedades posteriormente)

## Interfaces com Propriedades Opcionais

```typescript
// Interface com propriedades opcionais
interface ICategoria {
  id: number;
  nome: string;
  descricao: string;
  dataCriacao: Date;
  dataAtualizacao?: Date; // Propriedade opcional com ?
  ativo?: boolean; // Outra propriedade opcional
}
```

## Funções em TypeScript

```typescript
// Declaração de função com parâmetros tipados e tipo de retorno
function listarProdutos(produtoRepository: Repository<Produto>): Promise<void> {
  // Implementação
}

// Função com parâmetro opcional
async function criarProduto(
  produtoRepository: Repository<Produto>, 
  ativarPorPadrao: boolean = true
): Promise<void> {
  // O segundo parâmetro é opcional
}

// Arrow function com tipos
const calcularTotal = (preco: number, quantidade: number): number => preco * quantidade;
```

## Classes, Herança e Modificadores de Acesso

```typescript
// Classe base com diferentes modificadores de acesso
class EntidadeBase {
  // Acessível apenas dentro da classe
  private _id: number;
  
  // Acessível dentro da classe e subclasses
  protected dataCriacao: Date;
  
  // Acessível de qualquer lugar
  public ativo: boolean;
  
  constructor(id: number) {
    this._id = id;
    this.dataCriacao = new Date();
    this.ativo = true;
  }
  
  // Getter para propriedade privada
  get id(): number {
    return this._id;
  }
}

// Herança
class ProdutoModel extends EntidadeBase {
  constructor(
    id: number,
    public nome: string,
    public preco: number
  ) {
    super(id);
  }
  
  // Sobrescrevendo método
  exibirDetalhes(): string {
    return `${this.nome}: R$ ${this.preco}`;
  }
}
```

## Generics

```typescript
// Função genérica para encontrar um item por ID
function encontrarPorId<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Exemplo de uso com diferentes tipos
const produto = encontrarPorId(produtos, 1);
const categoria = encontrarPorId(categorias, 2);

// Classes genéricas
class Repositorio<T> {
  private itens: T[] = [];
  
  adicionar(item: T): void {
    this.itens.push(item);
  }
  
  listar(): T[] {
    return this.itens;
  }
}

const repositorioProdutos = new Repositorio<Produto>();
```

## Enums e Mapeamento de Valores

```typescript
// Enum para categorias de produtos
export enum CategoriaTipo {
  FRUTA = 'Fruta',
  DERIVADO = 'Derivado',
}

// Uso do enum
function obterDescricaoCategoria(tipo: CategoriaTipo): string {
  switch (tipo) {
    case CategoriaTipo.FRUTA:
      return 'Frutas frescas disponíveis para venda';
    case CategoriaTipo.DERIVADO:
      return 'Produtos derivados de frutas';
    default:
      return 'Categoria não reconhecida';
  }
}
```

## Configuração do tsconfig.json

O arquivo tsconfig.json contém diversas configurações importantes:

```json
{
  "compilerOptions": {
    "target": "ES2020",                               // Versão do JavaScript de saída
    "experimentalDecorators": true,                   // Habilita uso de decoradores (necessário para TypeORM)
    "emitDecoratorMetadata": true,                    // Emite metadados para decoradores (necessário para TypeORM)
    "module": "commonjs",                             // Sistema de módulos usado
    "rootDir": "./src",                               // Diretório raiz do código-fonte
    "outDir": "./dist",                               // Diretório de saída para os arquivos compilados
    "esModuleInterop": true,                          // Facilita importação de módulos CommonJS
    "forceConsistentCasingInFileNames": true,         // Garante consistência no uso de maiúsculas/minúsculas em nomes de arquivos
    "strict": true,                                   // Habilita todas as verificações estritas
    "strictPropertyInitialization": false,            // Desabilita a verificação de inicialização de propriedades (necessário para TypeORM)
    "skipLibCheck": true                              // Pula a verificação de tipos em arquivos .d.ts
  }
}
```

## TypeORM

O TypeORM é utilizado para mapeamento objeto-relacional no projeto:

### Definição de Entidades

```typescript
// Entidade Produto (src/entities/produto.ts)
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column()
  quantidade: number;

  @Column()
  categoriaId: number;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  dataCriacao: Date;

  @UpdateDateColumn()
  dataAtualizacao: Date;
}
```

### Operações com Repositório

```typescript
// Obter repositório
const produtoRepository = AppDataSource.getRepository(Produto);

// Criar
const produto = produtoRepository.create({
  nome: "Maçã Gala",
  descricao: "Maçã gala fresca e selecionada",
  preco: 6.90,
  quantidade: 50,
  categoriaId: 1
});
await produtoRepository.save(produto);

// Buscar
const produtos = await produtoRepository.find();
const produtoPorId = await produtoRepository.findOneBy({ id: 1 });

// Atualizar
produtoPorId.preco = 7.90;
await produtoRepository.save(produtoPorId);

// Remover
await produtoRepository.delete(1);
```

### Configuração de Conexão

```typescript
// src/index.ts
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

// Inicialização da conexão
AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    mainMenu();
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
```

---
```
