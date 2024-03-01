
# Automações 

Mensageiro -> Processador -> Publicador
    |              |             | 
 (Handler)      (Handler)     (Handler)

Handler -> Front-end 

Como saber quais estão executando?

<!-- início -->
Usuário inicia processo 
Máquina inicia processo

Inicialização:
* Mensageiro inicia
* Mensageiro comunica ao Handler (inicializando)
* Handler comunica ao Front-end (inicializando)
* Mensageiro envia mensagem ao Processador

Processamento:
* Processador recebe mensagem do Mensageiro
* Processador comunica ao Handler (processando)
* Handler comunica ao Front-end (processando)
* Processador estabelece conexão (socket) com Handler para enviar resultados de cada processo (Empresa Processada)

Em cada processo individual:
* Processador processa
    [] Erro (Empresa)
        * Processador comunica ao Handler (erro no processamento)
    [] Erro (Sistema)
        * Processador comunica ao Handler (erro no processamento)
        <!-- fim -->
    [] Sucesso
        * Processador comunida ao Handler (processado com sucesso)
        * Processador envia mensagem ao Publicador
        * Processador comunica ao Handler (enviado para publicação)

Publicação:
* Publicador recebe mensagem do Processador
* Publicador comunica ao Handler (publicando)
* Publicador publica
    [] Erro (Empresa)
        * Publicador comunica ao Handler (erro na publicação)
    [] Erro (Sistema)
        * Publicador comunica ao Handler (erro na publicação)
        <!-- fim -->
    [] Sucesso 
        * Publicador comunica ao Handler (publicado com sucesso)
<!-- fim -->




