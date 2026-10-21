export type SupportedLocale = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'ja';

export interface LocaleDefinition {
  code: SupportedLocale;
  name: string;
  flag: string;
}

export const SUPPORTED_LOCALES: LocaleDefinition[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export const translations = {
  en: {
    // Header & Actions
    searchPlaceholder: 'Search domain (e.g. example.com)...',
    auditButton: 'Audit',
    cancel: 'Cancel',
    copyMarkdown: 'Markdown',
    copied: 'Copied',
    refresh: 'Reload audit',
    themeToggle: 'Toggle theme',
    settings: 'Gateway settings',
    shortcutHint: '⌘K',

    // Dropdown Views
    tabAll: 'Overview',
    tabTech: 'Tech Stack',
    tabSecurity: 'Security & Headers',
    tabSubdomains: 'Discovered Subdomains',
    tabDnsEmail: 'Email & DNS Infrastructure',
    tabAlerts: 'Diagnostics & Alerts',

    // Score Gauge
    optimalHealth: 'Optimal Health',
    attentionRequired: 'Attention Required',
    criticalState: 'Critical State',
    optimalDesc: 'TLS security, DNS records, and email authentication are in optimal condition.',
    warningDesc: 'Functional configuration with warnings in policies or certificates.',
    criticalDesc: 'Missing valid certificates or critical security vulnerabilities detected.',
    edgeCache: 'Edge Cache (2h)',
    deductions: 'Deductions applied',

    // Tech Stack
    techTitle: 'Detected Tech Stack',
    detectedCount: '{count} detected',
    framework: 'Framework / Backend',
    cms: 'CMS / Platform',
    frontendUi: 'Frontend & UI',
    webServer: 'Web Server',
    analytics: 'Analytics & Tracking',
    identifiedTechnologies: 'Identified technologies:',
    noTechFound: 'No public signatures or server headers detected.',

    // Security Headers
    securityTitle: 'Web Security Headers',
    protected: '{percent}% Protected',
    httpRedirect: 'HTTP ➔ HTTPS Redirect (Port 80)',
    redirectActive: '301/308 Redirect',
    noRedirect: 'No automatic redirect',
    hsts: 'Strict-Transport-Security (HSTS)',
    hstsDesc: 'Enforces automatic TLS connections',
    csp: 'Content-Security-Policy (CSP)',
    cspDesc: 'Mitigates XSS and code injection attacks',
    xframe: 'X-Frame-Options',
    xframeDesc: 'Prevents Clickjacking iframe attacks',
    xcontent: 'X-Content-Type-Options',
    xcontentDesc: 'Blocks MIME-type sniffing',
    referrer: 'Referrer-Policy',
    referrerDesc: 'Controls outbound URL leakage',
    present: 'Present',
    missing: 'Missing',
    configured: 'Configured',
    defaultVal: 'Default',
    nosniff: 'nosniff',

    // Subdomains
    subdomainsTitle: 'Real Subdomains',
    activeCount: '{active} of {total} active',
    filterSubdomains: 'Filter subdomains (e.g. admin, api, auth)...',
    noSubdomainsMatch: 'No subdomains match "{query}".',
    live: 'Live',
    offline: 'Offline',
    copyIp: 'Copy IP',
    openTab: 'Open in new tab',

    // Registration
    registrationTitle: 'Registration & Delegation',
    expiringSoon30: 'Expires in < 30 days',
    registrar: 'Registrar',
    privateHidden: 'Private / Protected',
    validity: 'Validity',
    daysRemaining: '{days} days remaining',
    created: 'Created',
    expires: 'Expires',
    nameservers: 'Delegated Nameservers:',
    moreNameservers: '+{count} more',
    activeStatus: 'Active',

    // DNS & DNSSEC
    dnsTitle: 'DNS Infrastructure & Security',
    dnssec: 'Cryptographic Signature (DNSSEC)',
    dnssecEnabled: 'Enabled',
    dnssecDisabled: 'Disabled',
    caa: 'Issuance Restriction (CAA)',
    caaConfigured: 'Configured ({count})',
    noCaa: 'No CAA records',
    ipv6Support: 'IPv6 Support (AAAA)',
    available: 'Available',
    noAaaa: 'No AAAA records',
    aRecords: 'A Records (IPv4)',
    aaaaRecords: 'AAAA Records (IPv6)',
    hostsCount: '{count} host(s)',
    noARecords: 'No A records detected',

    // SSL
    sslTitle: 'SSL / TLS Security',
    validCert: 'Valid TLS',
    invalidCert: 'Invalid Certificate',
    issuer: 'Issuer (CA)',
    remainingValidity: 'Remaining Validity',
    valid: 'Valid',
    invalid: 'Invalid',
    unknown: 'Unknown',
    hstsActive: 'HSTS Header Active',
    hstsNotDetected: 'Not detected',

    // Email
    emailTitle: 'Email Deliverability & Auth',
    spf: 'SPF Authentication',
    spfLookups: '{count}/10 DNS lookups used',
    spfStrict: 'Strict SPF (-all)',
    spfSoft: 'Soft SPF (~all)',
    spfExceeded: '>10 Lookups (Fails)',
    noSpf: 'No SPF',
    dmarc: 'DMARC Policy',
    dmarcDesc: 'Identity and spoofing protection',
    noDmarc: 'No DMARC',
    dmarcPermissive: 'p=none (Permissive)',
    mtaSts: 'MTA-STS (RFC 8461)',
    mtaStsDesc: 'Strict TLS in transit',
    notConfigured: 'Not configured',
    bimi: 'BIMI (Verified Logo)',
    bimiDesc: 'Official avatar in mail inboxes',
    mxServers: 'Mail Servers (MX)',
    rawTxtToggle: 'Raw TXT records',

    // Diagnostics & Warnings
    diagnosticsTitle: 'Diagnostics & Recommendations',
    alertsSummary: '{count} alert(s)',
    noIssues: 'No configuration issues or warnings detected.',

    // Settings Modal
    settingsTitle: 'Gateway API Settings',
    gatewayUrlLabel: 'Endpoint URL',
    gatewayDesc: 'DoH, RDAP Whois, and TLS handshake orchestrator service.',
    testButton: 'Test',
    languageLabel: 'Language',
    languageAuto: 'Auto (Browser Language)',
    saveButton: 'Save',
    connectionSuccess: 'Gateway connection successful.',
    connectionError: 'Connection error. Ensure backend is running.',

    // Error
    auditFailedTitle: 'Failed to connect to Gateway',
    retry: 'Retry',
    footerLive: 'Domain Pulse',
  },

  es: {
    // Header & Actions
    searchPlaceholder: 'Buscar dominio (ej. ejemplo.com)...',
    auditButton: 'Auditar',
    cancel: 'Cancelar',
    copyMarkdown: 'Markdown',
    copied: 'Copiado',
    refresh: 'Recargar auditoría',
    themeToggle: 'Cambiar tema',
    settings: 'Ajustes de Gateway',
    shortcutHint: '⌘K',

    // Dropdown Views
    tabAll: 'Resumen General',
    tabTech: 'Stack Tecnológico',
    tabSecurity: 'Seguridad & Encabezados',
    tabSubdomains: 'Subdominios Descubiertos',
    tabDnsEmail: 'Email & Infraestructura DNS',
    tabAlerts: 'Diagnóstico & Alertas',

    // Score Gauge
    optimalHealth: 'Salud Óptima',
    attentionRequired: 'Atención Requerida',
    criticalState: 'Estado Crítico',
    optimalDesc: 'Seguridad TLS, registros DNS y autenticación de email en estado óptimo.',
    warningDesc: 'Configuración funcional pero con advertencias en políticas o certificados.',
    criticalDesc: 'Faltan certificados válidos o existen vulnerabilidades críticas detectadas.',
    edgeCache: 'Caché Edge (2h)',
    deductions: 'Deducciones aplicadas',

    // Tech Stack
    techTitle: 'Stack Tecnológico Detectado',
    detectedCount: '{count} detectado(s)',
    framework: 'Framework / Backend',
    cms: 'CMS / Plataforma',
    frontendUi: 'Frontend & UI',
    webServer: 'Servidor Web',
    analytics: 'Analítica & Rastreo',
    identifiedTechnologies: 'Tecnologías identificadas:',
    noTechFound: 'No se detectaron firmas públicas ni encabezados de servidor.',

    // Security Headers
    securityTitle: 'Encabezados de Seguridad Web',
    protected: '{percent}% Protegido',
    httpRedirect: 'Forzado HTTP ➔ HTTPS (Puerto 80)',
    redirectActive: 'Redirección 301/308',
    noRedirect: 'Sin redirección automática',
    hsts: 'Strict-Transport-Security (HSTS)',
    hstsDesc: 'Fuerza conexiones TLS automáticas',
    csp: 'Content-Security-Policy (CSP)',
    cspDesc: 'Mitiga ataques XSS e inyecciones',
    xframe: 'X-Frame-Options',
    xframeDesc: 'Previene secuestro de clics (Clickjacking)',
    xcontent: 'X-Content-Type-Options',
    xcontentDesc: 'Bloquea sniffing de tipos MIME',
    referrer: 'Referrer-Policy',
    referrerDesc: 'Control de telemetría de URLs salientes',
    present: 'Presente',
    missing: 'Ausente',
    configured: 'Configurado',
    defaultVal: 'Por defecto',
    nosniff: 'nosniff',

    // Subdomains
    subdomainsTitle: 'Subdominios Reales',
    activeCount: '{active} de {total} activos',
    filterSubdomains: 'Filtrar subdominios (ej. admin, api, auth)...',
    noSubdomainsMatch: 'No se encontraron subdominios que coincidan con "{query}".',
    live: 'Online',
    offline: 'Offline',
    copyIp: 'Copiar IP',
    openTab: 'Abrir en nueva pestaña',

    // Registration
    registrationTitle: 'Registro & Delegación',
    expiringSoon30: 'Expira en < 30 días',
    registrar: 'Registrador',
    privateHidden: 'Privado / Oculto',
    validity: 'Vigencia',
    daysRemaining: '{days} días restantes',
    created: 'Alta',
    expires: 'Vence',
    nameservers: 'Nameservers delegados:',
    moreNameservers: '+{count} más',
    activeStatus: 'Activo',

    // DNS & DNSSEC
    dnsTitle: 'Infraestructura DNS & Seguridad',
    dnssec: 'Firma Criptográfica (DNSSEC)',
    dnssecEnabled: 'Habilitado',
    dnssecDisabled: 'Deshabilitado',
    caa: 'Restricción de Emisión (CAA)',
    caaConfigured: 'Configurado ({count})',
    noCaa: 'Sin registros CAA',
    ipv6Support: 'Soporte IPv6 (AAAA)',
    available: 'Disponible',
    noAaaa: 'Sin registros AAAA',
    aRecords: 'Registros A (IPv4)',
    aaaaRecords: 'Registros AAAA (IPv6)',
    noARecords: 'Sin registros A detectados',
    hostsCount: '{count} host(s)',

    // SSL
    sslTitle: 'Seguridad SSL / TLS',
    validCert: 'TLS Válido',
    invalidCert: 'Certificado Inválido',
    issuer: 'Emisor (CA)',
    remainingValidity: 'Vigencia Restante',
    valid: 'Válido',
    invalid: 'Inválido',
    unknown: 'Desconocido',
    hstsActive: 'Cabecera HSTS Activa',
    hstsNotDetected: 'No detectada',

    // Email
    emailTitle: 'Email Deliverability & Autenticación',
    spf: 'Autenticación SPF',
    spfLookups: '{count}/10 consultas DNS usadas',
    spfStrict: 'SPF Estricto (-all)',
    spfSoft: 'SPF Suave (~all)',
    spfExceeded: '>10 Lookups (Fallo)',
    noSpf: 'Sin SPF',
    dmarc: 'Política DMARC',
    dmarcDesc: 'Protección de identidad y spoofing',
    noDmarc: 'Sin DMARC',
    dmarcPermissive: 'p=none (Permisivo)',
    mtaSts: 'MTA-STS (RFC 8461)',
    mtaStsDesc: 'Cifrado TLS estricto en tránsito',
    notConfigured: 'No configurado',
    bimi: 'BIMI (Logo Verificado)',
    bimiDesc: 'Avatar oficial en bandejas de correo',
    mxServers: 'Servidores de Correo (MX)',
    rawTxtToggle: 'Registros TXT brutos',

    // Diagnostics & Warnings
    diagnosticsTitle: 'Diagnóstico & Recomendaciones',
    alertsSummary: '{count} alerta(s)',
    noIssues: 'Sin problemas ni advertencias de configuración detectadas.',

    // Settings Modal
    settingsTitle: 'Ajustes de Gateway API',
    gatewayUrlLabel: 'Endpoint URL',
    gatewayDesc: 'Servicio orquestador DoH, RDAP Whois y handshake TLS.',
    testButton: 'Probar',
    languageLabel: 'Idioma',
    languageAuto: 'Automático (Idioma del Navegador)',
    saveButton: 'Guardar',
    connectionSuccess: 'Conexión exitosa con el Gateway.',
    connectionError: 'Error de conexión. Verifica que el backend esté activo.',

    // Error
    auditFailedTitle: 'Fallo al conectar con el Gateway',
    retry: 'Reintentar',
    footerLive: 'Domain Pulse',
  },

  pt: {
    // Header & Actions
    searchPlaceholder: 'Pesquisar domínio (ex. exemplo.com)...',
    auditButton: 'Auditar',
    cancel: 'Cancelar',
    copyMarkdown: 'Markdown',
    copied: 'Copiado',
    refresh: 'Recarregar auditoria',
    themeToggle: 'Alternar tema',
    settings: 'Configurações de Gateway',
    shortcutHint: '⌘K',

    // Dropdown Views
    tabAll: 'Visão Geral',
    tabTech: 'Stack Tecnológico',
    tabSecurity: 'Segurança & Cabeçalhos',
    tabSubdomains: 'Subdomínios Descobertos',
    tabDnsEmail: 'Email & Infraestrutura DNS',
    tabAlerts: 'Diagnóstico & Alertas',

    // Score Gauge
    optimalHealth: 'Saúde Ótima',
    attentionRequired: 'Atenção Necessária',
    criticalState: 'Estado Crítico',
    optimalDesc: 'Segurança TLS, DNS e autenticação de email em perfeitas condições.',
    warningDesc: 'Configuração funcional com alertas em políticas ou certificados.',
    criticalDesc: 'Faltam certificados válidos ou existem vulnerabilidades críticas detectadas.',
    edgeCache: 'Cache Edge (2h)',
    deductions: 'Deduções aplicadas',

    // Tech Stack
    techTitle: 'Stack Tecnológico Detectado',
    detectedCount: '{count} detectado(s)',
    framework: 'Framework / Backend',
    cms: 'CMS / Plataforma',
    frontendUi: 'Frontend & UI',
    webServer: 'Servidor Web',
    analytics: 'Analytics & Rastreamento',
    identifiedTechnologies: 'Tecnologias identificadas:',
    noTechFound: 'Nenhuma assinatura pública ou cabeçalho de servidor detectado.',

    // Security Headers
    securityTitle: 'Cabeçalhos de Segurança Web',
    protected: '{percent}% Protegido',
    httpRedirect: 'Forçar HTTP ➔ HTTPS (Porta 80)',
    redirectActive: 'Redirecionamento 301/308',
    noRedirect: 'Sem redirecionamento automático',
    hsts: 'Strict-Transport-Security (HSTS)',
    hstsDesc: 'Força conexões TLS automáticas',
    csp: 'Content-Security-Policy (CSP)',
    cspDesc: 'Mitiga ataques XSS e injeção de código',
    xframe: 'X-Frame-Options',
    xframeDesc: 'Previne ataques de Clickjacking',
    xcontent: 'X-Content-Type-Options',
    xcontentDesc: 'Bloqueia interpretação incorreta de MIME',
    referrer: 'Referrer-Policy',
    referrerDesc: 'Controle de vazamento de URLs externas',
    present: 'Presente',
    missing: 'Ausente',
    configured: 'Configurado',
    defaultVal: 'Padrão',
    nosniff: 'nosniff',

    // Subdomains
    subdomainsTitle: 'Subdomínios Reais',
    activeCount: '{active} de {total} ativos',
    filterSubdomains: 'Filtrar subdomínios (ex. admin, api, auth)...',
    noSubdomainsMatch: 'Nenhum subdomínio corresponde a "{query}".',
    live: 'Online',
    offline: 'Offline',
    copyIp: 'Copiar IP',
    openTab: 'Abrir em nova aba',

    // Registration
    registrationTitle: 'Registro & Delegação',
    expiringSoon30: 'Expira em < 30 dias',
    registrar: 'Registrador',
    privateHidden: 'Privado / Oculto',
    validity: 'Validade',
    daysRemaining: '{days} dias restantes',
    created: 'Criação',
    expires: 'Expiração',
    nameservers: 'Nameservers delegados:',
    moreNameservers: '+{count} mais',
    activeStatus: 'Ativo',

    // DNS & DNSSEC
    dnsTitle: 'Infraestrutura DNS & Segurança',
    dnssec: 'Assinatura Criptográfica (DNSSEC)',
    dnssecEnabled: 'Habilitado',
    dnssecDisabled: 'Desabilitado',
    caa: 'Restrição de Emissão (CAA)',
    caaConfigured: 'Configurado ({count})',
    noCaa: 'Sem registros CAA',
    ipv6Support: 'Suporte IPv6 (AAAA)',
    available: 'Disponível',
    noAaaa: 'Sem registros AAAA',
    aRecords: 'Registros A (IPv4)',
    aaaaRecords: 'Registros AAAA (IPv6)',
    noARecords: 'Nenhum registro A detectado',
    hostsCount: '{count} host(s)',

    // SSL
    sslTitle: 'Segurança SSL / TLS',
    validCert: 'TLS Válido',
    invalidCert: 'Certificado Inválido',
    issuer: 'Emissor (CA)',
    remainingValidity: 'Validade Restante',
    valid: 'Válido',
    invalid: 'Inválido',
    unknown: 'Desconhecido',
    hstsActive: 'Cabeçalho HSTS Ativo',
    hstsNotDetected: 'Não detectado',

    // Email
    emailTitle: 'Email Deliverability & Autenticação',
    spf: 'Autenticação SPF',
    spfLookups: '{count}/10 consultas DNS usadas',
    spfStrict: 'SPF Estrito (-all)',
    spfSoft: 'SPF Suave (~all)',
    spfExceeded: '>10 Lookups (Falha)',
    noSpf: 'Sem SPF',
    dmarc: 'Política DMARC',
    dmarcDesc: 'Proteção de identidade e anti-spoofing',
    noDmarc: 'Sem DMARC',
    dmarcPermissive: 'p=none (Permissivo)',
    mtaSts: 'MTA-STS (RFC 8461)',
    mtaStsDesc: 'Criptografia TLS em trânsito',
    notConfigured: 'Não configurado',
    bimi: 'BIMI (Logo Verificado)',
    bimiDesc: 'Avatar oficial nas caixas de entrada',
    mxServers: 'Servidores de Email (MX)',
    rawTxtToggle: 'Registros TXT brutos',

    // Diagnostics & Warnings
    diagnosticsTitle: 'Diagnóstico & Recomendações',
    alertsSummary: '{count} alerta(s)',
    noIssues: 'Nenhum problema ou aviso de configuração detectado.',

    // Settings Modal
    settingsTitle: 'Configurações de Gateway API',
    gatewayUrlLabel: 'URL do Endpoint',
    gatewayDesc: 'Serviço orquestrador DoH, RDAP Whois e handshake TLS.',
    testButton: 'Testar',
    languageLabel: 'Idioma',
    languageAuto: 'Automático (Idioma do Navegador)',
    saveButton: 'Salvar',
    connectionSuccess: 'Conexão com Gateway bem-sucedida.',
    connectionError: 'Erro de conexão. Verifique se o backend está ativo.',

    // Error
    auditFailedTitle: 'Falha ao conectar ao Gateway',
    retry: 'Tentar novamente',
    footerLive: 'Domain Pulse',
  },

  fr: {
    // Header & Actions
    searchPlaceholder: 'Rechercher un domaine (ex. exemple.com)...',
    auditButton: 'Auditer',
    cancel: 'Annuler',
    copyMarkdown: 'Markdown',
    copied: 'Copié',
    refresh: 'Recharger audit',
    themeToggle: 'Changer de thème',
    settings: 'Paramètres Gateway',
    shortcutHint: '⌘K',

    // Dropdown Views
    tabAll: 'Vue Générale',
    tabTech: 'Stack Technique',
    tabSecurity: 'Sécurité & En-têtes',
    tabSubdomains: 'Sous-domaines Découverts',
    tabDnsEmail: 'Email & Infrastructure DNS',
    tabAlerts: 'Diagnostic & Alertes',

    // Score Gauge
    optimalHealth: 'Santé Optimale',
    attentionRequired: 'Attention Requise',
    criticalState: 'État Critique',
    optimalDesc: 'Sécurité TLS, DNS et authentification email en excellent état.',
    warningDesc: 'Configuration fonctionnelle avec alertes sur certificats ou politiques.',
    criticalDesc: 'Certificats invalides ou failles de sécurité critiques détectées.',
    edgeCache: 'Cache Edge (2h)',
    deductions: 'Déductions appliquées',

    // Tech Stack
    techTitle: 'Stack Technique Détectée',
    detectedCount: '{count} détecté(s)',
    framework: 'Framework / Backend',
    cms: 'CMS / Plateforme',
    frontendUi: 'Frontend & UI',
    webServer: 'Serveur Web',
    analytics: 'Analytics & Suivi',
    identifiedTechnologies: 'Technologies identifiées :',
    noTechFound: 'Aucune signature publique ni en-tête serveur détecté.',

    // Security Headers
    securityTitle: 'En-têtes de Sécurité Web',
    protected: '{percent}% Protégé',
    httpRedirect: 'Forçage HTTP ➔ HTTPS (Port 80)',
    redirectActive: 'Redirection 301/308',
    noRedirect: 'Pas de redirection automatique',
    hsts: 'Strict-Transport-Security (HSTS)',
    hstsDesc: 'Impose les connexions TLS sécurisées',
    csp: 'Content-Security-Policy (CSP)',
    cspDesc: 'Protège contre XSS et injections',
    xframe: 'X-Frame-Options',
    xframeDesc: 'Empêche les attaques de Clickjacking',
    xcontent: 'X-Content-Type-Options',
    xcontentDesc: 'Bloque le reniflage de types MIME',
    referrer: 'Referrer-Policy',
    referrerDesc: 'Contrôle la fuite des URLs sortantes',
    present: 'Présent',
    missing: 'Absent',
    configured: 'Configuré',
    defaultVal: 'Défaut',
    nosniff: 'nosniff',

    // Subdomains
    subdomainsTitle: 'Sous-domaines Réels',
    activeCount: '{active} sur {total} actifs',
    filterSubdomains: 'Filtrer sous-domaines (ex. admin, api, auth)...',
    noSubdomainsMatch: 'Aucun sous-domaine ne correspond à "{query}".',
    live: 'En ligne',
    offline: 'Hors ligne',
    copyIp: 'Copier IP',
    openTab: 'Ouvrir nouvel onglet',

    // Registration
    registrationTitle: 'Enregistrement & Délégation',
    expiringSoon30: 'Expire dans < 30 jours',
    registrar: 'Registraire',
    privateHidden: 'Privé / Masqué',
    validity: 'Validité',
    daysRemaining: '{days} jours restants',
    created: 'Créé',
    expires: 'Expire',
    nameservers: 'Serveurs de noms délégués :',
    moreNameservers: '+{count} de plus',
    activeStatus: 'Actif',

    // DNS & DNSSEC
    dnsTitle: 'Infrastructure DNS & Sécurité',
    dnssec: 'Signature Cryptographique (DNSSEC)',
    dnssecEnabled: 'Activé',
    dnssecDisabled: 'Désactivé',
    caa: 'Restriction d\'Émission (CAA)',
    caaConfigured: 'Configuré ({count})',
    noCaa: 'Aucun enregistrement CAA',
    ipv6Support: 'Support IPv6 (AAAA)',
    available: 'Disponible',
    noAaaa: 'Pas d\'enregistrement AAAA',
    aRecords: 'Enregistrements A (IPv4)',
    aaaaRecords: 'Enregistrements AAAA (IPv6)',
    noARecords: 'Aucun enregistrement A détecté',
    hostsCount: '{count} hôte(s)',

    // SSL
    sslTitle: 'Sécurité SSL / TLS',
    validCert: 'TLS Valide',
    invalidCert: 'Certificat Invalide',
    issuer: 'Émetteur (CA)',
    remainingValidity: 'Validité Restante',
    valid: 'Valide',
    invalid: 'Invalide',
    unknown: 'Inconnu',
    hstsActive: 'En-tête HSTS Actif',
    hstsNotDetected: 'Non détecté',

    // Email
    emailTitle: 'Délivrabilité Email & Authentification',
    spf: 'Authentification SPF',
    spfLookups: '{count}/10 requêtes DNS utilisées',
    spfStrict: 'SPF Strict (-all)',
    spfSoft: 'SPF Souple (~all)',
    spfExceeded: '>10 Requêtes (Échec)',
    noSpf: 'Sans SPF',
    dmarc: 'Politique DMARC',
    dmarcDesc: 'Protection d\'identité et anti-usurpation',
    noDmarc: 'Sans DMARC',
    dmarcPermissive: 'p=none (Permissif)',
    mtaSts: 'MTA-STS (RFC 8461)',
    mtaStsDesc: 'Chiffrement TLS strict en transit',
    notConfigured: 'Non configuré',
    bimi: 'BIMI (Logo Vérifié)',
    bimiDesc: 'Avatar officiel dans les boîtes de réception',
    mxServers: 'Serveurs Mail (MX)',
    rawTxtToggle: 'Enregistrements TXT bruts',

    // Diagnostics & Warnings
    diagnosticsTitle: 'Diagnostic & Recommandations',
    alertsSummary: '{count} alerte(s)',
    noIssues: 'Aucun problème ou avertissement de configuration détecté.',

    // Settings Modal
    settingsTitle: 'Paramètres Gateway API',
    gatewayUrlLabel: 'URL du Point d\'accès',
    gatewayDesc: 'Service d\'orchestration DoH, RDAP Whois et handshake TLS.',
    testButton: 'Tester',
    languageLabel: 'Langue',
    languageAuto: 'Automatique (Langue du Navigateur)',
    saveButton: 'Enregistrer',
    connectionSuccess: 'Connexion Gateway réussie.',
    connectionError: 'Erreur de connexion. Vérifiez que le backend est actif.',

    // Error
    auditFailedTitle: 'Échec de connexion au Gateway',
    retry: 'Réessayer',
    footerLive: 'Domain Pulse',
  },

  de: {
    // Header & Actions
    searchPlaceholder: 'Domain suchen (z.B. beispiel.de)...',
    auditButton: 'Prüfen',
    cancel: 'Abbrechen',
    copyMarkdown: 'Markdown',
    copied: 'Kopiert',
    refresh: 'Prüfung neu laden',
    themeToggle: 'Design wechseln',
    settings: 'Gateway-Einstellungen',
    shortcutHint: '⌘K',

    // Dropdown Views
    tabAll: 'Übersicht',
    tabTech: 'Technologie-Stack',
    tabSecurity: 'Sicherheit & Header',
    tabSubdomains: 'Gefundene Subdomains',
    tabDnsEmail: 'E-Mail & DNS-Infrastruktur',
    tabAlerts: 'Diagnose & Warnungen',

    // Score Gauge
    optimalHealth: 'Optimaler Zustand',
    attentionRequired: 'Aufmerksamkeit erforderlich',
    criticalState: 'Kritischer Zustand',
    optimalDesc: 'TLS-Sicherheit, DNS-Einträge und E-Mail-Authentifizierung sind in optimalem Zustand.',
    warningDesc: 'Funktionale Konfiguration mit Warnungen bei Richtlinien oder Zertifikaten.',
    criticalDesc: 'Ungültige Zertifikate oder kritische Schwachstellen entdeckt.',
    edgeCache: 'Edge-Cache (2h)',
    deductions: 'Angewandte Abzüge',

    // Tech Stack
    techTitle: 'Erkannter Tech-Stack',
    detectedCount: '{count} erkannt',
    framework: 'Framework / Backend',
    cms: 'CMS / Plattform',
    frontendUi: 'Frontend & UI',
    webServer: 'Webserver',
    analytics: 'Analytics & Tracking',
    identifiedTechnologies: 'Identifizierte Technologien:',
    noTechFound: 'Keine öffentlichen Signaturen oder Server-Header gefunden.',

    // Security Headers
    securityTitle: 'Web-Sicherheitsheader',
    protected: '{percent}% Geschützt',
    httpRedirect: 'HTTP ➔ HTTPS Weiterleitung (Port 80)',
    redirectActive: '301/308 Weiterleitung',
    noRedirect: 'Keine automatische Weiterleitung',
    hsts: 'Strict-Transport-Security (HSTS)',
    hstsDesc: 'Erzwingt automatische TLS-Verbindungen',
    csp: 'Content-Security-Policy (CSP)',
    cspDesc: 'Verhindert XSS- und Code-Injektionsangriffe',
    xframe: 'X-Frame-Options',
    xframeDesc: 'Schützt vor Clickjacking-Angriffen',
    xcontent: 'X-Content-Type-Options',
    xcontentDesc: 'Blockiert MIME-Typ-Sniffing',
    referrer: 'Referrer-Policy',
    referrerDesc: 'Kontrolliert das Weitergeben von URLs',
    present: 'Vorhanden',
    missing: 'Fehlt',
    configured: 'Konfiguriert',
    defaultVal: 'Standard',
    nosniff: 'nosniff',

    // Subdomains
    subdomainsTitle: 'Echte Subdomains',
    activeCount: '{active} von {total} aktiv',
    filterSubdomains: 'Subdomains filtern (z.B. admin, api, auth)...',
    noSubdomainsMatch: 'Keine Subdomain stimmt mit "{query}" überein.',
    live: 'Online',
    offline: 'Offline',
    copyIp: 'IP kopieren',
    openTab: 'In neuem Tab öffnen',

    // Registration
    registrationTitle: 'Registrierung & Delegation',
    expiringSoon30: 'Läuft in < 30 Tagen ab',
    registrar: 'Registrar',
    privateHidden: 'Privat / Geschützt',
    validity: 'Gültigkeit',
    daysRemaining: '{days} Tage verbleibend',
    created: 'Erstellt',
    expires: 'Läuft ab',
    nameservers: 'Delegierte Nameserver:',
    moreNameservers: '+{count} weitere',
    activeStatus: 'Aktiv',

    // DNS & DNSSEC
    dnsTitle: 'DNS-Infrastruktur & Sicherheit',
    dnssec: 'Kryptografische Signatur (DNSSEC)',
    dnssecEnabled: 'Aktiviert',
    dnssecDisabled: 'Deaktiviert',
    caa: 'Ausstellungseinschränkung (CAA)',
    caaConfigured: 'Konfiguriert ({count})',
    noCaa: 'Keine CAA-Einträge',
    ipv6Support: 'IPv6-Unterstützung (AAAA)',
    available: 'Verfügbar',
    noAaaa: 'Keine AAAA-Einträge',
    aRecords: 'A-Einträge (IPv4)',
    aaaaRecords: 'AAAA-Einträge (IPv6)',
    noARecords: 'Keine A-Einträge erkannt',
    hostsCount: '{count} Host(s)',

    // SSL
    sslTitle: 'SSL / TLS Sicherheit',
    validCert: 'Gültiges TLS',
    invalidCert: 'Ungültiges Zertifikat',
    issuer: 'Aussteller (CA)',
    remainingValidity: 'Verbleibende Gültigkeit',
    valid: 'Gültig',
    invalid: 'Ungültig',
    unknown: 'Unbekannt',
    hstsActive: 'HSTS-Header aktiv',
    hstsNotDetected: 'Nicht erkannt',

    // Email
    emailTitle: 'E-Mail-Zustellbarkeit & Authentifizierung',
    spf: 'SPF-Authentifizierung',
    spfLookups: '{count}/10 DNS-Abfragen verwendet',
    spfStrict: 'Striktes SPF (-all)',
    spfSoft: 'Weiches SPF (~all)',
    spfExceeded: '>10 Abfragen (Fehler)',
    noSpf: 'Kein SPF',
    dmarc: 'DMARC-Richtlinie',
    dmarcDesc: 'Identitätsschutz und Anti-Spoofing',
    noDmarc: 'Kein DMARC',
    dmarcPermissive: 'p=none (Permissiv)',
    mtaSts: 'MTA-STS (RFC 8461)',
    mtaStsDesc: 'Strikte TLS-Verschlüsselung im Transit',
    notConfigured: 'Nicht konfiguriert',
    bimi: 'BIMI (Verifiziertes Logo)',
    bimiDesc: 'Offizielles Logo im E-Mail-Postfach',
    mxServers: 'Mailserver (MX)',
    rawTxtToggle: 'Rohe TXT-Einträge anzeigen',

    // Diagnostics & Warnings
    diagnosticsTitle: 'Diagnose & Empfehlungen',
    alertsSummary: '{count} Warnung(en)',
    noIssues: 'Keine Konfigurationsprobleme oder Warnungen festgestellt.',

    // Settings Modal
    settingsTitle: 'Gateway-API-Einstellungen',
    gatewayUrlLabel: 'Endpunkt-URL',
    gatewayDesc: 'Orchestrator-Dienst für DoH, RDAP Whois und TLS-Handshakes.',
    testButton: 'Prüfen',
    languageLabel: 'Sprache',
    languageAuto: 'Automatisch (Browser-Sprache)',
    saveButton: 'Speichern',
    connectionSuccess: 'Verbindung mit Gateway erfolgreich.',
    connectionError: 'Verbindungsfehler. Bitte sicherstellen, dass das Backend läuft.',

    // Error
    auditFailedTitle: 'Verbindung zum Gateway fehlgeschlagen',
    retry: 'Erneut versuchen',
    footerLive: 'Domain Pulse',
  },

  ja: {
    // Header & Actions
    searchPlaceholder: 'ドメインを検索 (例: example.com)...',
    auditButton: '診断',
    cancel: 'キャンセル',
    copyMarkdown: 'Markdown',
    copied: 'コピー完了',
    refresh: '再診断',
    themeToggle: 'テーマ切替',
    settings: 'Gateway設定',
    shortcutHint: '⌘K',

    // Dropdown Views
    tabAll: '概要サマリー',
    tabTech: '技術スタック',
    tabSecurity: 'セキュリティ & ヘッダー',
    tabSubdomains: '検出されたサブドメイン',
    tabDnsEmail: 'メール & DNS基盤',
    tabAlerts: '診断 & 警告',

    // Score Gauge
    optimalHealth: '極めて良好',
    attentionRequired: '注意が必要',
    criticalState: '危機的状態',
    optimalDesc: 'TLS暗号化、DNSレコード、メール認証は良好な状態です。',
    warningDesc: '設定は動作していますが、ポリシーや証明書に警告があります。',
    criticalDesc: '有効な証明書がないか、重大なセキュリティ問題が検出されました。',
    edgeCache: 'Edgeキャッシュ (2時間)',
    deductions: '減点の内訳',

    // Tech Stack
    techTitle: '検出された技術スタック',
    detectedCount: '{count} 件検出',
    framework: 'フレームワーク / バックエンド',
    cms: 'CMS / プラットフォーム',
    frontendUi: 'フロントエンド & UI',
    webServer: 'Webサーバー',
    analytics: 'アクセス解析 & 追跡',
    identifiedTechnologies: '識別されたテクノロジー:',
    noTechFound: '公開シグネチャまたはサーバーヘッダーは検出されませんでした。',

    // Security Headers
    securityTitle: 'Webセキュリティヘッダー',
    protected: '{percent}% 保護済み',
    httpRedirect: 'HTTP ➔ HTTPS 強制リダイレクト (Port 80)',
    redirectActive: '301/308 リダイレクト確認',
    noRedirect: '自動リダイレクトなし',
    hsts: 'Strict-Transport-Security (HSTS)',
    hstsDesc: '安全な暗号化通信を強制',
    csp: 'Content-Security-Policy (CSP)',
    cspDesc: 'XSSおよびコード注入攻撃を防止',
    xframe: 'X-Frame-Options',
    xframeDesc: 'クリックジャッキング攻撃を防御',
    xcontent: 'X-Content-Type-Options',
    xcontentDesc: 'MIMEスニッフィングを遮断',
    referrer: 'Referrer-Policy',
    referrerDesc: '送信URL情報の漏洩を制御',
    present: '有効',
    missing: '未設定',
    configured: '設定済み',
    defaultVal: 'デフォルト',
    nosniff: 'nosniff',

    // Subdomains
    subdomainsTitle: '実在サブドメイン',
    activeCount: '{active} / {total} 件稼働中',
    filterSubdomains: 'サブドメインを絞り込み (例: admin, api)...',
    noSubdomainsMatch: '"{query}" に一致するサブドメインは見つかりませんでした。',
    live: '稼働中',
    offline: '停止',
    copyIp: 'IPコピー',
    openTab: '新規タブで開く',

    // Registration
    registrationTitle: '登録 & ネームサーバー',
    expiringSoon30: '30日以内に有効期限切れ',
    registrar: 'レジストラ',
    privateHidden: '非公開 / Whois保護',
    validity: '有効期間',
    daysRemaining: '残り {days} 日',
    created: '登録日',
    expires: '満了日',
    nameservers: '委託ネームサーバー:',
    moreNameservers: '他 +{count} 件',
    activeStatus: '有効',

    // DNS & DNSSEC
    dnsTitle: 'DNSインフラ & セキュリティ',
    dnssec: 'DNS暗号署名 (DNSSEC)',
    dnssecEnabled: '有効',
    dnssecDisabled: '無効',
    caa: '証明書発行制限 (CAA)',
    caaConfigured: '設定済み ({count})',
    noCaa: 'CAAレコードなし',
    ipv6Support: 'IPv6対応 (AAAA)',
    available: '利用可能',
    noAaaa: 'AAAAレコードなし',
    aRecords: 'Aレコード (IPv4)',
    aaaaRecords: 'AAAAレコード (IPv6)',
    noARecords: 'Aレコードは検出されませんでした',
    hostsCount: '{count} ホスト',

    // SSL
    sslTitle: 'SSL / TLS セキュリティ',
    validCert: '有効なTLS',
    invalidCert: '無効な証明書',
    issuer: '認証局 (CA)',
    remainingValidity: '有効期限の残日数',
    valid: '有効',
    invalid: '無効',
    unknown: '不明',
    hstsActive: 'HSTSヘッダー有効',
    hstsNotDetected: '未検出',

    // Email
    emailTitle: 'メール到達性 & 認証',
    spf: 'SPF認証',
    spfLookups: '{count}/10 DNS検索使用',
    spfStrict: '厳格なSPF (-all)',
    spfSoft: 'ソフトSPF (~all)',
    spfExceeded: '>10 検索 (エラー)',
    noSpf: 'SPF未設定',
    dmarc: 'DMARCポリシー',
    dmarcDesc: 'なりすましおよび偽装対策',
    noDmarc: 'DMARC未設定',
    dmarcPermissive: 'p=none (監視モード)',
    mtaSts: 'MTA-STS (RFC 8461)',
    mtaStsDesc: '送信中のTLS暗号化を強制',
    notConfigured: '未設定',
    bimi: 'BIMI (ブランドロゴ)',
    bimiDesc: '受信トレイに公式アイコンを表示',
    mxServers: 'メールサーバー (MX)',
    rawTxtToggle: '生のTXTレコードを表示',

    // Diagnostics & Warnings
    diagnosticsTitle: '診断結果 & 改善提案',
    alertsSummary: '{count} 件の警告',
    noIssues: '設定上の問題や警告は検出されませんでした。',

    // Settings Modal
    settingsTitle: 'Gateway API 設定',
    gatewayUrlLabel: 'エンドポイント URL',
    gatewayDesc: 'DoH、RDAP Whois、TLSハンドシェイクを担うオーケストレーターサービス。',
    testButton: 'テスト',
    languageLabel: '言語 (Language)',
    languageAuto: '自動 (ブラウザの言語設定)',
    saveButton: '保存',
    connectionSuccess: 'Gatewayとの接続に成功しました。',
    connectionError: '接続エラー。サーバーが起動しているか確認してください。',

    // Error
    auditFailedTitle: 'Gatewayへの接続に失敗しました',
    retry: '再試行',
    footerLive: 'Domain Pulse',
  },
};

export type TranslationKey = keyof typeof translations.en;

const STORAGE_KEY_LANG = 'pulse_domain_lang';

export function getSavedLocale(): SupportedLocale | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    if (saved && ['en', 'es', 'pt', 'fr', 'de', 'ja'].includes(saved)) {
      return saved as SupportedLocale;
    }
  }
  return null;
}

export function setSavedLocale(locale: SupportedLocale | null): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    if (locale) {
      localStorage.setItem(STORAGE_KEY_LANG, locale);
    } else {
      localStorage.removeItem(STORAGE_KEY_LANG);
    }
  }
}

/**
 * Detects browser language with fallback to English ('en')
 */
export function detectBrowserLanguage(): SupportedLocale {
  const saved = getSavedLocale();
  if (saved) return saved;

  if (typeof navigator !== 'undefined') {
    const raw = navigator.language || (navigator as any).userLanguage || 'en';
    const code = raw.toLowerCase().slice(0, 2);
    if (['en', 'es', 'pt', 'fr', 'de', 'ja'].includes(code)) {
      return code as SupportedLocale;
    }
  }

  // Fallback to English
  return 'en';
}

export function t(
  locale: SupportedLocale,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const dict: Record<string, string> = translations[locale] || translations.en;
  let text = dict[key] || (translations.en as Record<string, string>)[key] || String(key);

  if (params) {
    for (const [pKey, pVal] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
    }
  }

  return text;
}
