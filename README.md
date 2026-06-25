# Instituto Claara Coelho — Site

Site institucional completo, pronto para publicação.

## Estrutura de arquivos

```
claara-site/
├── index.html              ← Página principal
├── privacidade.html        ← Política de privacidade (LGPD)
├── assets/
│   ├── css/
│   │   └── style.css       ← Todo o CSS (tokens, layout, responsivo)
│   ├── js/
│   │   └── main.js         ← JS: nav mobile, scroll, formulário→WhatsApp
│   └── images/
│       ├── logo.jpeg       ← Logo principal
│       ├── recepcao.png    ← Foto da recepção (hero)
│       ├── pilates.png     ← Sala de Pilates
│       ├── relaxamento.png ← Sala de relaxamento/estética
│       └── escalda.png     ← Sala de escalda-pés
└── README.md
```

## Como publicar

### Opção 1 — Netlify (recomendado, gratuito)
1. Acesse https://www.netlify.com e crie uma conta gratuita
2. Arraste a pasta `claara-site` inteira para a área de deploy no painel
3. O site fica online em segundos com URL gerada automaticamente
4. Para usar o domínio próprio: vá em **Domain settings** → **Add custom domain**
5. Aponte o DNS do domínio para os nameservers da Netlify

### Opção 2 — Vercel (gratuito)
1. Acesse https://vercel.com e crie conta com GitHub
2. Suba a pasta para um repositório GitHub
3. Importe o repositório no Vercel — deploy automático

### Opção 3 — Servidor de hospedagem tradicional (GoDaddy, HostGator, Locaweb)
1. Acesse o painel do seu plano de hospedagem
2. Abra o **Gerenciador de Arquivos** ou use FTP (FileZilla)
3. Faça upload de todo o conteúdo da pasta `claara-site` para `public_html/`
4. O site estará acessível pelo domínio configurado

### Opção 4 — GitHub Pages (gratuito)
1. Crie um repositório público no GitHub
2. Suba todos os arquivos para a branch `main`
3. Em **Settings → Pages**, selecione branch `main` e pasta `/` (root)
4. URL gerada: `https://seuusuario.github.io/nome-do-repo`

---

## Checklist antes de publicar

- [ ] Confirmar horários de atendimento na seção de contato (`index.html`)
- [ ] Verificar número de WhatsApp em todos os links (`55 11 45568632`)
- [ ] Atualizar link do Instagram no footer para o perfil real
- [ ] Adicionar foto real da Claara (substituir silhueta no hero — linha ~130 do index.html)
- [ ] Substituir `escalda.png` por nova foto sem filtro verde
- [ ] Configurar Google Analytics ou Meta Pixel (opcional)
- [ ] Enviar sitemap para Google Search Console após publicar

## Personalização rápida

### Trocar cores
Edite as variáveis no topo de `assets/css/style.css`:
```css
:root {
  --ouro:       #C49A2A;   /* dourado principal */
  --ouro-claro: #E8C96A;   /* dourado claro (textos em fundo escuro) */
  --preto:      #0D0D0D;   /* preto do fundo */
}
```

### Trocar texto do hero
Edite `index.html`, seção `<section class="hero">`.

### Adicionar depoimentos
Copie um bloco `<blockquote class="dep">` na seção `.dep-grid` do `index.html`.

### Formulário para e-mail em vez de WhatsApp
Substitua a função `enviar()` em `main.js` por uma chamada à API de e-mail
(ex.: Formspree — https://formspree.io, gratuito até 50 envios/mês).

---

## Tecnologias utilizadas

- HTML5 semântico com atributos ARIA (acessibilidade)
- CSS3 com custom properties (sem frameworks)
- JavaScript vanilla (sem bibliotecas externas)
- Fontes: Playfair Display + Inter (Google Fonts)
- Dados estruturados (Schema.org — MedicalBusiness) para SEO
- Política de privacidade em conformidade com LGPD (Lei 13.709/2018)

Nenhuma dependência de CDN para o CSS/JS principal — o site funciona
mesmo com conexão lenta.
