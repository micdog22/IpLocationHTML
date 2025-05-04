# Projeto PHP IP Locator

Este projeto é uma aplicação web simples criada com PHP. Ele exibe o endereço IP público do visitante e informações de geolocalização (país, região, cidade) após um clique inicial na página.

## Funcionalidades

*   Tela inicial com a mensagem "CLICK TO ENTER...".
*   Ao clicar, busca e exibe o IP e a localização do visitante usando JavaScript e um script PHP backend.
*   Utiliza a API `ipinfo.io` para obter os dados de geolocalização no backend PHP.
*   Interface simples e escura.

## Estrutura do Projeto

```
php_ip_locator/
├── static/
│   ├── style.css     # Folha de estilos CSS
│   └── script.js     # Script JavaScript para interação
├── index.php         # Arquivo HTML/PHP principal
└── get_ip_info.php   # Script PHP backend para obter IP e localização
```

## Como Executar Localmente

Para executar este projeto, você precisa de um servidor web com suporte a PHP (como Apache ou Nginx com PHP-FPM, ou o servidor embutido do PHP para desenvolvimento).

1.  **Descompacte o arquivo:** Extraia o conteúdo do arquivo `php_ip_locator.zip` para um diretório dentro do seu servidor web (por exemplo, `htdocs` no XAMPP/MAMP, `www` no WAMP, ou qualquer diretório que você configure).

2.  **Navegue até o diretório:** Certifique-se de que seu servidor web esteja rodando.

3.  **Acesse no navegador:** Abra seu navegador e visite o URL correspondente ao local onde você colocou os arquivos. Por exemplo:
    *   Se você colocou na raiz do servidor: `http://localhost/`
    *   Se você colocou em uma subpasta `php_ip_locator`: `http://localhost/php_ip_locator/`

4.  Clique na tela para ver suas informações de IP e localização.

**Alternativa (Usando o Servidor Embutido do PHP - Apenas para Desenvolvimento):**

1.  Descompacte o arquivo.
2.  Abra um terminal ou prompt de comando na pasta `php_ip_locator`.
3.  Execute o comando (requer PHP instalado no seu sistema):
    ```bash
    php -S localhost:8000
    ```
4.  Acesse `http://localhost:8000` no seu navegador.

## Como Subir para o GitHub

Siga os passos que detalhei anteriormente para usar os comandos `git init`, `git add .`, `git commit`, `git remote add origin ...`, e `git push ...` dentro da pasta `php_ip_locator` no seu computador.

## Observações

*   A precisão da geolocalização depende da API `ipinfo.io`.
*   O script `get_ip_info.php` tenta detectar o IP real mesmo atrás de proxies comuns.
*   Para que o PHP consiga fazer requisições externas (`file_get_contents` para `ipinfo.io` e `api.ipify.org`), a configuração `allow_url_fopen` precisa estar habilitada no seu `php.ini` (geralmente está por padrão).
*   Este é um exemplo simples e pode precisar de ajustes para ambientes de produção (melhor tratamento de erros, segurança, etc.).

