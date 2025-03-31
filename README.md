# iFrutas CLI

Um aplicativo de linha de comando (CLI) simples para gerenciar produtos e categorias de uma frutaria.

## Visão Geral

Este projeto oferece duas versões:
- **ifrutascli**: Versão básica com armazenamento em memória
- **ifrutascliOrm**: Versão avançada com armazenamento em banco de dados MySQL

## Requisitos

- Node.js (versão 16 ou superior)
- MySQL (apenas para a versão com banco de dados)

## Instalação

### 1. Obtenha o código

**Opção A**: Clone o repositório via Git
```
git clone https://github.com/richardtoxz/ifrutascli.git
```

**Opção B**: Baixe como ZIP
- Acesse https://github.com/richardtoxz/ifrutascli
- Clique em "Code" e depois "Download ZIP"
- Extraia o arquivo baixado

### 2. Escolha uma versão

Navegue até a pasta da versão desejada:

```
cd ifrutascli       # Para versão sem banco de dados
```

OU

```
cd ifrutascliOrm    # Para versão com banco de dados
```

### 3. Instale as dependências

```
npm install
```

## Como Executar

### Versão Básica (ifrutascli)

Simplesmente execute:
```
npm start
```

### Versão com Banco de Dados (ifrutascliOrm)

1. Configure o MySQL
   - Abra seu aplicativo MySQL (MySQL Workbench)
   - Execute os seguintes comandos:
   ```sql
   CREATE DATABASE ifrutas;
   USE ifrutas;
   ```

2. Inicie o aplicativo
   ```
   npm start
   ```

## Uso do Aplicativo

Ao iniciar, você verá um menu com as seguintes opções:
- **Gerenciar Categorias**: Criar, listar, atualizar ou remover categorias de frutas
- **Gerenciar Produtos**: Criar, listar, atualizar ou remover produtos
- **Sair**: Encerrar o programa

Navegue usando as setas do teclado ↑↓ e pressione Enter para selecionar uma opção.

## Solução de Problemas

- **Erro de conexão com o banco de dados**: Verifique se o MySQL está rodando e se o usuário/senha no arquivo index.ts correspondem às suas configurações
- **Pacotes não encontrados**: Execute `npm install` novamente para garantir que todas dependências foram instaladas