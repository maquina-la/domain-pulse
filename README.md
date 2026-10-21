# ⚡ PulseDomain (Domain-pulse)

> Chrome Extension (Manifest V3 + Side Panel API) + API Gateway & Orchestrator para auditoría de salud de dominios web en tiempo real con un solo clic.

---

## 🚀 Visión General

**PulseDomain** reemplaza el flujo fragmentado de herramientas aisladas (WHOIS, DNS checkers, SSL Labs, MXToolbox), centralizando en el **Side Panel nativo de Chrome** un diagnóstico integral y en tiempo real de cualquier dominio web activo:

1. **📋 Registro & Delegación:** Registrador, fechas de alta y expiración, días restantes (con alerta < 30 días), estado RDAP y nameservers.
2. **🌐 Infraestructura DNS:** Registros A (IPv4) y AAAA (IPv6), detección de CDN/Hosting (Cloudflare, AWS Route 53, Vercel, Google Cloud, etc.).
3. **🔒 Seguridad SSL/TLS:** Autoridad emisora, vigencia, días restantes (alerta < 14 días), protocolo TLS (TLS 1.3) y cabecera HTTP Strict-Transport-Security (HSTS).
4. **✉️ Entregabilidad de Email:** Proveedor de correo (Google Workspace, Microsoft 365, Fastmail, Proton, etc.), registros MX con prioridad, política SPF (`-all` vs `~all`) y política DMARC (`reject`, `quarantine`, `none`).
5. **🎯 Domain Health Score (0 - 100):** Semáforo visual automatizado con desglose de deducciones y advertencias accionables.
6. **📋 Exportación en 1-Clic:** Botón para volcar la auditoría completa en formato Markdown estructurado al portapapeles.

---

## 🏗️ Arquitectura del Monorepo (`pnpm`)

```
domain-pulse/
├── packages/
│   └── shared/               # Tipos TypeScript, Algoritmo de Score y Generador Markdown
│       ├── src/types.ts      # Schema de datos OpenAPI / JSON de auditoría
│       ├── src/score.ts      # Algoritmo de salud ponderado (Sección 6)
│       ├── src/markdown.ts   # Exportador estructurado de reportes Markdown
│       └── dist/
├── apps/
│   ├── server/               # Gateway & Orchestrator (Node.js + Hono)
│   │   ├── src/services/doh.ts        # Fan-out DoH Cloudflare (A, AAAA, MX, TXT, DMARC, NS)
│   │   ├── src/services/rdap.ts       # Protocolo RDAP para WHOIS oficial
│   │   ├── src/services/tls.ts        # Inspección TLS handshake puerto 443
│   │   ├── src/services/hsts.ts       # Detección de encabezado Strict-Transport-Security
│   │   ├── src/services/providers.ts  # Clasificación heurística de hosting y correo
│   │   ├── src/services/cache.ts      # Edge Cache LRU con TTL de 2 horas (FR-08)
│   │   ├── src/services/rate-limit.ts # Rate limiting de 30 peticiones/minuto (FR-09)
│   │   └── src/index.ts               # Endpoint GET /v1/audit?domain={domain}
│   │
│   └── extension/            # Extensión de Chrome Manifest V3 (React 18 + TypeScript + Tailwind + shadcn)
│       ├── public/
│       │   ├── manifest.json # Configuración MV3 con sidePanel y service_worker
│       │   └── icons/        # Iconos 16x16, 48x48 y 128x128
│       ├── src/
│       │   ├── background.ts # Service Worker: detección de pestañas activas y apertura HUD
│       │   ├── lib/domain.ts # Extracción de Apex Domain con Public Suffix List (tldts)
│       │   ├── components/   # Componentes HUD estilo shadcn (ScoreGauge, Cards, Warnings)
│       │   └── App.tsx       # Side Panel HUD interactivo, selector de temas y búsqueda
│       ├── sidepanel.html    # Entrada nativa para chrome.sidePanel
│       └── index.html        # Vista web interactiva para desarrollo y pruebas
```

---

## ⚡ Guía de Inicio Rápido

### Prerrequisitos
- Node.js >= 20 (probado en Node.js v24)
- `pnpm` (versión 11 o superior)

### 1. Instalar dependencias y compilar
```bash
# Instalar todas las dependencias del monorepo
pnpm install

# Compilar todos los paquetes (@domain-pulse/shared, server y extension)
pnpm build
```

---

### 2. Iniciar el API Gateway / Backend

El backend se encarga del fan-out paralelo (Cloudflare DoH, RDAP Whois, handshake TLS e inspección HSTS):

```bash
pnpm dev:server
```
El servidor quedará disponible en: `http://localhost:3000`

#### Pruebas del Endpoint:
```bash
# Auditar un dominio en tiempo real
curl "http://localhost:3000/v1/audit?domain=github.com"

# Verificar estado del servicio
curl "http://localhost:3000/health"
```

---

### 3. Cargar la Extensión en Google Chrome

Para usar PulseDomain como extensión con Side Panel nativo:

1. Asegúrate de haber ejecutado `pnpm build` o `pnpm build:extension`.
2. Abre Google Chrome y ve a `chrome://extensions/`.
3. Activa el interruptor **Modo de desarrollador** (Developer mode) en la esquina superior derecha.
4. Haz clic en **Cargar descomprimida** (Load unpacked).
5. Selecciona la carpeta:
   ```
   /Users/carlos/code/domain-pulse/apps/extension/dist
   ```
6. Haz clic en el icono de **PulseDomain** en la barra de herramientas de Chrome. El **Side Panel HUD** se abrirá automáticamente auditando la pestaña activa.

---

### 4. Modo de Desarrollo Web (Preview en Navegador)

También puedes probar y estilizar la interfaz directamente en cualquier navegador web:

```bash
pnpm dev:extension
```
Abre en tu navegador `http://localhost:5173`. Tendrás acceso al HUD con presets inmediatos (`github.com`, `cloudflare.com`, `vercel.com`, `google.com`, etc.) y buscador manual.

---

## 🎯 Algoritmo del Domain Health Score (Sección 6)

El índice se calcula de 0 a 100 de acuerdo a las siguientes penalizaciones:
- **Base:** 100 puntos.
- **Falta de certificado HTTPS válido:** -40 pts
- **Certificado SSL vence en < 14 días:** -15 pts
- **Dominio vence en < 30 días:** -20 pts
- **Sin política DMARC:** -15 pts
- **DMARC en modo permisivo (`p=none`):** -5 pts
- **Sin registro SPF o mal configurado:** -10 pts
- **Falta de soporte IPv6 (sin registros AAAA):** -5 pts
- **Sin cabecera HSTS detectada:** -5 pts

---

## 🧪 Pruebas y Verificación

Para ejecutar las pruebas de integración del pipeline DoH, RDAP y TLS:
```bash
pnpm --filter @domain-pulse/server test
```
