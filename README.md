#cadastro de carro

**RF**
Deve ser possível cadastrar um carro
Deve ser possível listar todas as categorias

**RN**
Não deve ser possível cadastrar um carro com a placa já existente
Não deve ser possível alterar a placa de um carro já cadastrado
O carro deve ser cadastrado, por padrão, com disponibilidade por padrão
O usuário responsável pelo cadastro deve ser um usuário administrador.

#Listagem de carros

**RF**
Deve ser possível listar os carros disponíveis
Deve ser possível listar os carros disponíveis pelo nome da categoria
Deve ser possível listar os carros disponíveis pelo noma da marca
Deve ser possível listar os carros disponíveis pelo noma do carro

**RN**
O usuário não precisar estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagem do carros

**RF**
Deve ser possível cadastrar a imagem do carro

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuario deve pode cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro


**RF**
Deve ser possível cadastrar um aluguel

**RNF**

**RN**
O aluguel deve ter duração minima de 24 hora
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
