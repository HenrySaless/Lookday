# Project Plan — LookDay

## 1. Visão Geral

**LookDay** é uma plataforma que ajuda usuários a escolherem looks ideais para cada ocasião, sem perder tempo.  
Ele funciona através de:

- Upload de fotos de roupas do usuário.
- Análise automática para identificar peças e combinações possíveis.
- Conexão com Google Agenda para cruzar compromissos e sugerir looks.
- Consideração de profissão, ocasião e preferências pessoais.
- Criação de uma agenda de looks personalizada.

---

## 2. Funcionalidades Principais

1. Cadastro/login (email/senha + OAuth Google).
2. Upload de fotos dos looks do usuário.
3. Processamento automático de imagens para extrair peças e cores.
4. Conexão com Google Agenda (OAuth).
5. Geração de uma agenda de looks (diária/semanal).
6. Feedback do usuário sobre sugestões (para melhorar recomendações).
7. Perfil com profissão, preferências, medidas.
8. Interface simples e responsiva (mobile-first).

---

## 3. Arquitetura (alto nível)

**Front-end**:

- HTML5, CSS3, JavaScript (ou framework futuro como React/Vue).
- Páginas principais: Landing, Onboarding, Dashboard (Agenda), Uploads, Perfil.

**Back-end**:

- Node.js + Express (API REST).
- Serviços principais:
  - Auth Service (JWT + OAuth Google).
  - User Service (perfil, preferências).
  - Upload Service (S3/bucket).
  - Recommendation Service (combinador de looks).
  - Calendar Connector (Google Calendar API).
  - ML Service (Python ou TensorFlow.js) para embeddings de imagens.

**Banco de Dados**: PostgreSQL + extensão pgvector para embeddings.  
**Cache/Jobs**: Redis (BullMQ).  
**Storage**: S3 ou DigitalOcean Spaces para imagens.

---

## 4. Fluxo do Usuário

1. Usuário cria conta e conecta ao Google Agenda.
2. Faz upload de fotos das roupas.
3. O sistema processa e cria embeddings (ex.: CLIP/MobileNet).
4. Para cada compromisso do calendário → gera sugestões de looks.
5. Usuário aceita/troca/edita.
6. Feedback melhora futuras sugestões.

---

## 5. Modelo de Dados (simplificado)

### Tabelas principais

**users**

- id (pk)
- name
- email
- password_hash
- profession
- preferences (jsonb)
- created_at

**images**

- id (pk)
- user_id (fk)
- s3_key
- metadata (jsonb: {itens, cores})
- embedding (vector)
- created_at

**looks**

- id (pk)
- user_id (fk)
- name
- image_ids (array)
- tags (array)
- visibility

**events**

- id (pk)
- user_id (fk)
- google_event_id
- start
- end
- title
- location

**suggestions**

- id (pk)
- user_id (fk)
- event_id (fk)
- look_id (fk)
- score
- created_at

**feedback**

- id (pk)
- user_id (fk)
- look_id (fk)
- rating (int)
- comment
- created_at

---

## 6. Endpoints de API (exemplos)

**Auth**

- `POST /api/auth/signup` → cria conta
- `POST /api/auth/login` → retorna JWT
- `GET /api/auth/oauth/google` → conecta Google

**Uploads**

- `POST /api/users/:id/uploads` → envia fotos
- `GET /api/users/:id/looks` → lista looks

**Agenda**

- `POST /api/users/:id/schedule/generate` → gera agenda de looks
- `POST /api/users/:id/schedule/confirm` → confirma sugestão

**Feedback**

- `POST /api/users/:id/feedback` → registra avaliação

---

## 7. Design System (UI/UX)

**Princípios**: mobile-first, minimalista, visual limpo.

**Paleta**:

- Primária: `#0B6CF6` (azul vivo)
- Secundária: `#1F2937` (cinza escuro)
- Neutros: `#F7F7F8`, `#E5E7EB`

**Tipografia**: Inter (sans-serif, moderna).

**Componentes principais**:

- Card de look (imagem, peças detectadas, nível de formalidade, botões: usar/editar).
- Agenda com compromissos + sugestões embutidas.
- Upload (drag & drop com preview).
- Perfil (form simples para profissão, medidas, preferências).

**Acessibilidade**:

- Contraste adequado.
- Botões grandes (mín. 44px).
- Labels claros em inputs.

---

## 8. Backlog Inicial (MVP)

### Sprint 1

- Setup projeto (Node.js, Express, Postgres, HTML/CSS/JS básicos).
- Autenticação com JWT.
- Cadastro e login de usuários.

### Sprint 2

- Upload de imagens (armazenar em S3).
- API para listar looks.
- Interface de upload (drag & drop).

### Sprint 3

- Integração com Google Calendar.
- Estrutura de eventos no banco.

### Sprint 4

- Service de recomendações (regra simples: profissão + ocasião).
- API de geração de sugestões.
- Tela de agenda com cards de looks.

### Sprint 5

- Feedback de looks.
- Ajustes no design.
- Deploy básico (Heroku/Vercel/DigitalOcean).

---

## 9. Futuras Melhorias

- Sugestões baseadas em clima/localização.
- Editor de looks arrastando peças.
- Fine-tune de modelo ML com fotos do usuário.
- App mobile/PWA.
- Integração com e-commerce (compra de peças sugeridas).

---

## 10. Métricas de Sucesso

- % de sugestões aceitas.
- Nº médio de uploads por usuário.
- Retenção semanal (usuários que voltam ≥2x/semana).
- Tempo médio para gerar agenda.

---
