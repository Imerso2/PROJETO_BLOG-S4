# Criar um git

## Configuração inicial

``` bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@example.com"
```
# Inicializar o Json server
### sempre inicializar antes de testar algo para não gerar problema

```bash
npm run server
``` 
# Se editar algo
### sempre lembre de fazer um
```bash
git commit -m "Mensagem do commit"
```

# Mexer em um branch

### digite isso no terminal para criar
```bash
git branch nome-do-branch
```
### digite isso no terminal para acessar
```bash
git checkout -b nome-do-branch

```
### digite isso no terminal para commit no branch
```bash
git push -u origin nome-da-branch
```
# Fazer merge

## digite essa sequência de comandos

### entrar no main
```bash
git checkout main
```

### Trazer as mudanças remotas
```bash
git pull
```
### Faça o merge(apregar os dois)

```bash
git merge nome-da-branch
```
### Adicionar

```bash
git push
```