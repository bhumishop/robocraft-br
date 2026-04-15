# Guia Robô DIY Brasil

> Guia completo e gratuito para montar robots com inteligência artificial no Brasil.
> Com links reais de compra do Mercado Livre, passo a passo de montagem e ideias de uso.

**[🌐 Ver o Guia Online](https://SEU_USUARIO.github.io/guia-robot-brasil)**

---

## O que é?

Um guia visual e interativo criado com Vue.js que ensina brasileiros a montar robots com IA,
usando peças disponíveis no Mercado Livre Brasil.

### Tipos de Robot Incluídos

| Robot | Custo | Complexidade | Ideal Para |
|-------|-------|-------------|------------|
| 🤖 **Cabeça Animatrônica** | R$ 150-400 | Fácil | Templos, recepções, exposições |
| 🚗 **Robot de Rodas 2WD** | R$ 400-700 | Médio | Casa, patrulha, mapeamento |
| 🐕 **Quadrúpede** | R$ 600-1.500 | Difícil | Demonstrações, pesquisa |
| 🦾 **Braço Robótico** | R$ 300-800 | Médio | Educação, arte |
| 🚁 **Drone Agente** | R$ 500-2.000 | Difícil | Eventos, filmagens |
| 💡 **Ultra Barato (ESP32)** | R$ 175-295 | Médio | Iniciantes, educação |

### Tecnologia

- **Vue.js 3** - Framework reativo
- **DimOS** - Sistema operacional para robôs (open-source)
- **Modal GLM-5.1** - Inteligência artificial via API
- **Mercado Livre** - Todas as peças com links reais

---

## Deploy no GitHub Pages

### Opção 1: Automático (Recomendado)

1. Crie um repositório no GitHub com o nome `guia-robot-brasil`
2. Faça push dos arquivos deste projeto:
   ```bash
   git init
   git add .
   git commit -m "Guia Robô DIY Brasil"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/guia-robot-brasil.git
   git push -u origin main
   ```
3. Vá em **Settings > Pages > Source** e selecione `GitHub Actions`
4. O workflow em `.github/workflows/deploy.yml` fará o deploy automático

### Opção 2: Manual

1. Crie o repositório e faça push
2. Vá em **Settings > Pages > Source** e selecione a branch `main`
3. O site estará disponível em: `https://SEU_USUARIO.github.io/guia-robot-brasil`

### Customizar o domínio

1. Em **Settings > Pages > Custom domain**, adicione seu domínio
2. Crie um arquivo `CNAME` com o domínio:
   ```
   guiarobot.com.br
   ```

---

## Estrutura do Projeto

```
guia-robot-brasil/
├── index.html              # Página principal
├── style.css               # Estilos (dark theme)
├── app.js                  # Vue.js app com todo o conteúdo
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions workflow
├── README.md               # Este arquivo
└── CNAME                   # (Opcional) Custom domain
```

---

## Conteúdo do Guia

### Para cada tipo de robot:

- ✅ **Lista de peças completa** com preços reais
- ✅ **Links de busca** no Mercado Livre
- ✅ **Diagrama de conexão** detalhado
- ✅ **Código pronto** para copiar e colar
- ✅ **Passo a passo** de montagem

### Ideias de uso incluídas:

- 🛕 Guia de templo budista
- 🎭 Recepção de centro cultural
- 🏠 Vigia noturno de casa
- 👴 Companheiro para idosos
- 🎨 Instalação artística interativa
- 📚 Professor de robótica
- 🧘 Assistente de meditação
- 🎵 DJ robótico
- E mais...

---

## Desenvolvimento Local

Para testar localmente:

```bash
# Opção 1: Python
python3 -m http.server 8080

# Opção 2: Node
npx serve .

# Opção 3: PHP
php -S localhost:8080
```

Abra `http://localhost:8080` no navegador.

---

## Contribuir

Contribuições são bem-vindas! Sugestões:

- Adicionar novos tipos de robot
- Atualizar preços
- Adicionar mais ideias de uso
- Traduzir para outros idiomas
- Melhorar o design

---

## Licença

MIT License - Sinta-se livre para usar, modificar e compartilhar.

---

## Links Úteis

- [DimOS GitHub](https://github.com/dimensionalOS/dimos)
- [Modal.com](https://modal.com)
- [Discord DimOS](https://discord.gg/dimos)
- [Mercado Livre Brasil](https://www.mercadolivre.com.br)

---

Feito com ❤️ para a comunidade maker brasileira.
