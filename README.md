# IP Locator💻🧠

Uma interface de rastreamento visual estilo terminal hacker, feita 100% com **HTML, CSS e JavaScript**, sem PHP, sem backend.

## ✅ Funcionalidades

- 🔍 Consulta de IP (via [ipinfo.io](https://ipinfo.io))
- 📍 Localização GPS real com precisão (se permitido)
- 💾 Informações do sistema (RAM, CPU, plataforma, resolução, idioma, cookies)
- 🔊 Música de fundo automática ao clicar
- ⌨️ Efeito de digitação linha a linha (terminal retrô)
- ⏱️ Duração da sessão exibida em tempo real
- 📡 Compatível com desktop e mobile
- 💯 Totalmente client-side (sem PHP ou servidor)

---

## 🚀 Como usar

1. Clone ou baixe este repositório.
2. Coloque um arquivo MP3 em `/music/hacking.mp3` (ou use o original).
3. Abra `index.html` em um navegador ou publique no GitHub Pages.

---

## 📁 Estrutura do Projeto

```
📦 ip-locator/
├── index.html            ← Arquivo principal da interface
├── music/                ← Pasta de músicas
│   └── hacking.mp3       ← Música de fundo (MP3)
└── static/               ← Pasta de estilos
    └── style.css         ← Estilo visual "hacker"
```

---

## 🛠 Tecnologias

- HTML5
- CSS3 (tema verde neon)
- JavaScript (puro, sem frameworks)
- API: [ipinfo.io](https://ipinfo.io)

---

## ⚠️ Observações

- O navegador **solicitará permissão para acesso à geolocalização**.
- Sem permissão, o GPS real será substituído pela localização baseada em IP.
- A API gratuita da ipinfo.io tem um limite de ~1.000 requisições/dia sem token.

---

## 🧠 Demonstração

> **Recomendado hospedar via GitHub Pages**:  
> Vá em *Settings > Pages* no repositório e selecione a branch e pasta `/root`.

---

## 👨‍💻 Desenvolvido por

**MicDog**  
---

© 2025 - Projeto open-source para fins educacionais.
