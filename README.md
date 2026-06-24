# 🎮 PROJECT GAMEHOUSE

Projeto de vitrine e catálogo de jogos construído com Next.js, consumindo a API da RAWG para listar títulos, exibir detalhes e simular funcionalidades de loja como busca, filtro e carrinho.

## DESCRIÇÃO

O GameHouse foi pensado como uma experiência inspirada em lojas de jogos digitais. A página inicial exibe a listagem de jogos, com busca por nome e filtro por gênero. Cada card leva para uma página de detalhes, onde o usuário encontra informações resumidas do jogo, preço calculado dinamicamente, requisitos mínimos de PC e comentários simulados.

O projeto também inclui uma navegação superior com acesso ao perfil do usuário e ao carrinho, além de um drawer lateral para revisar os itens adicionados. A interface prioriza uma estética escura, com contraste forte, remetendo à Steam.

## TECNOLOGIAS

- Next.js
- React 18
- TypeScript
- React Query
- Zustand
- Tailwind CSS
- Lucide React
- RAWG API

## ARQUITETURA

O projeto segue uma arquitetura simples e separada por responsabilidade:

- pages: rotas principais da aplicação, incluindo home, detalhes do jogo e perfil do usuário.
- components: componentes reaproveitáveis, divididos em screens, ui/elements e ui/layout.
- services: camada de acesso à API externa, concentrando as requisições para a RAWG.
- store: estado global com Zustand para carrinho, busca, lista de jogos e controle do drawer.
- utils: funções auxiliares para cálculo de preço, extração de requisitos e filtros.
- types: contratos TypeScript para manter consistência entre telas, componentes e estado.

Fluxo principal:

1. A home faz a consulta de jogos via React Query.
2. Os dados recebidos são normalizados antes de entrarem no estado global.
3. O usuário pode filtrar por gênero e buscar por nome usando o estado compartilhado.
4. O card do jogo leva para a página de detalhes, que busca informações específicas pelo id.
5. O carrinho é controlado globalmente e pode ser aberto de qualquer tela do layout.

## DECISÕES DE DESIGN DE PROJETO

- Estado remoto e estado local foram separados: React Query cuida da sincronização com a API e Zustand concentra as interações do usuário.
- A UI usa um tema escuro consistente, com cores e contrastes semelhantes a de lojas de games já consolidadas no mercado.
- A lista e os detalhes são montados a partir de uma camada de normalização, reduzindo acoplamento com o formato bruto da API.
- O preço dos jogos é calculado no cliente com base na data de lançamento, o que ajuda a manter a experiência visual sem depender de backend próprio.
- Os requisitos mínimos de PC são extraídos de texto bruto da API e convertidos para uma apresentação mais legível.
- O perfil do usuário e os comentários são para fins demonstrativos, servindo como simulação básica de funcionalidades de comunidade.

## CONSIDERAÇÕES FINAIS

O GameHouse é um projeto de front-end focado em catálogo, navegação e interação visual. Ele mostra uma base sólida para evoluir em direção a um e-commerce mais completo, caso seja necessário adicionar autenticação, persistência de carrinho, checkout real e paginação de resultados.

Para executar localmente, é necessário configurar a variável de ambiente `NEXT_PUBLIC_RAWG_API_KEY` com uma chave válida da RAWG API.

Comandos úteis:

```bash
npm install
npm run dev
```