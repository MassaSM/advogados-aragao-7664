export const FIRM = {
  name: "Aragão & Vasconcelos",
  short: "A&V",
  legalName: "Aragão & Vasconcelos Sociedade de Advogados",
  tagline: "Estratégia jurídica de alto padrão.",
  oab: "OAB/RJ 12.847",
  cnpj: "00.000.000/0001-00",
  email: "contato@aragaovasconcelos.adv.br",
  phoneDisplay: "+55 (24) 99882-5644",
  phoneHref: "+5524998825644",
  whatsapp: "5524998825644",
  address: {
    street: "Av. Barão do Rio Branco, 1.200 — 14º andar",
    district: "Centro",
    city: "Volta Redonda",
    state: "RJ",
    zip: "27295-000",
    country: "BR",
  },
  hours: "Seg — Sex, 09h às 19h",
  linkedin: "https://www.linkedin.com/",
  instagram: "https://www.instagram.com/",
  url: "https://aragaovasconcelos.adv.br",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${FIRM.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "O Escritório", href: "#escritorio" },
  { label: "Áreas de Atuação", href: "#areas" },
  { label: "Estratégia", href: "#estrategia" },
  { label: "Insights", href: "#insights" },
  { label: "Contato", href: "#contato" },
] as const;

export type PracticeArea = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "empresarial",
    index: "01",
    title: "Empresarial & Societário",
    subtitle: "Estruturas que sustentam crescimento",
    description:
      "Assessoria permanente a empresas e sócios em governança, reorganizações societárias, M&A, acordos de acionistas e contratos complexos — com leitura de risco antes de cada decisão relevante.",
    highlights: [
      "Fusões, aquisições e due diligence",
      "Acordos de sócios e governança familiar",
      "Contratos estratégicos e negociações",
    ],
    image: "/images/area-empresarial.webp",
  },
  {
    id: "tributario",
    index: "02",
    title: "Tributário & Aduaneiro",
    subtitle: "Eficiência fiscal com segurança jurídica",
    description:
      "Planejamento tributário legítimo, defesa em autuações fiscais, recuperação de créditos e contencioso administrativo e judicial em todas as instâncias, incluindo tribunais superiores.",
    highlights: [
      "Defesas administrativas e judiciais",
      "Recuperação de créditos e teses de repetição",
      "Planejamento e reforma tributária",
    ],
    image: "/images/area-tributario.webp",
  },
  {
    id: "penal",
    index: "03",
    title: "Penal Econômico",
    subtitle: "Defesa técnica em investigações complexas",
    description:
      "Atuação em crimes econômicos, tributários e contra a administração pública, desde a fase investigativa até a sustentação oral nos tribunais, com discrição absoluta e gestão de crise reputacional.",
    highlights: [
      "Investigações e acordos de colaboração",
      "Defesa em ações penais e habeas corpus",
      "Gestão de crise e exposição de imagem",
    ],
    image: "/images/area-penal.webp",
  },
  {
    id: "trabalhista",
    index: "04",
    title: "Trabalhista Estratégico",
    subtitle: "Passivo sob controle, operação preservada",
    description:
      "Prevenção e contencioso trabalhista para empresas, com auditoria de passivo, desenho de modelos de contratação, negociação sindical e defesa em ações individuais e coletivas.",
    highlights: [
      "Auditoria e contenção de passivo",
      "Negociação coletiva e sindical",
      "Defesa em ações individuais e coletivas",
    ],
    image: "/images/area-trabalhista.webp",
  },
  {
    id: "familia",
    index: "05",
    title: "Família & Sucessões",
    subtitle: "Patrimônio protegido entre gerações",
    description:
      "Planejamento sucessório e patrimonial, holdings familiares, inventários, divórcios e conflitos societários familiares conduzidos com sensibilidade, sigilo e visão de longo prazo.",
    highlights: [
      "Holdings e planejamento sucessório",
      "Inventários e partilhas complexas",
      "Divórcios de alta exposição patrimonial",
    ],
    image: "/images/area-familia.webp",
  },
  {
    id: "compliance",
    index: "06",
    title: "Compliance & Investigações",
    subtitle: "Integridade como ativo de mercado",
    description:
      "Implantação e auditoria de programas de integridade, investigações internas, adequação à LGPD e à Lei Anticorrupção, além de representação em processos sancionatórios.",
    highlights: [
      "Programas de integridade e treinamento",
      "Investigações internas independentes",
      "LGPD e proteção de dados",
    ],
    image: "/images/area-compliance.webp",
  },
];

export const STRATEGY_STEPS = [
  {
    step: "01",
    title: "Diagnóstico profundo",
    text: "Antes de qualquer petição, mapeamos fatos, documentos, riscos e cenários. Cada caso começa com uma leitura completa do problema — jurídica, econômica e reputacional.",
  },
  {
    step: "02",
    title: "Tese e arquitetura",
    text: "Construímos a tese central e a arquitetura processual: onde atacar, quando, em qual foro e com quais provas. Estratégia definida no papel antes de existir no processo.",
  },
  {
    step: "03",
    title: "Execução cirúrgica",
    text: "Peças autorais, sustentação oral e negociação conduzidas por sócios. Nada é terceirizado ao acaso: quem desenha a estratégia é quem a executa.",
  },
  {
    step: "04",
    title: "Monitoramento contínuo",
    text: "Acompanhamento em tempo real, relatórios objetivos e revisão de rota sempre que o cenário muda. O cliente nunca descobre um movimento depois do adversário.",
  },
  {
    step: "05",
    title: "Resultado e legado",
    text: "Encerramos o caso e deixamos estrutura: precedentes, cláusulas e processos internos que evitam a repetição do mesmo litígio.",
  },
] as const;

export const DIFFERENTIALS = [
  {
    icon: "shield",
    metric: "100%",
    title: "Condução por sócios",
    text: "Cada caso é acompanhado diretamente por um sócio, do primeiro diagnóstico à decisão final.",
  },
  {
    icon: "scale",
    metric: "48h",
    title: "Resposta estratégica",
    text: "Plano de ação preliminar entregue em até 48 horas após a reunião de diagnóstico.",
  },
  {
    icon: "lock",
    metric: "Sigilo",
    title: "Discrição absoluta",
    text: "Protocolos de confidencialidade, ambientes segregados e comunicação criptografada.",
  },
  {
    icon: "globe",
    metric: "12",
    title: "Alcance nacional",
    text: "Atuação em 12 estados e nos tribunais superiores em Brasília, com rede de correspondentes selecionados.",
  },
] as const;

export const STATS = [
  { value: 27, suffix: "", label: "anos de atuação" },
  { value: 2400, suffix: "+", label: "casos conduzidos" },
  { value: 94, suffix: "%", label: "de êxito em teses centrais" },
  { value: 12, suffix: "", label: "estados com atuação" },
] as const;

export const INSIGHTS = [
  {
    tag: "Tributário",
    date: "12 ago 2026",
    title: "Reforma tributária: o que muda no caixa das empresas em 2027",
    excerpt:
      "A transição para o IBS e a CBS exige revisão de contratos de longo prazo e reprecificação imediata. Mapeamos os pontos de atenção que já impactam o fluxo de caixa.",
    image: "/images/insight-1.webp",
    readTime: "8 min",
  },
  {
    tag: "Societário",
    date: "29 jul 2026",
    title: "Acordo de sócios: as sete cláusulas que evitam uma disputa bilionária",
    excerpt:
      "Conflitos societários raramente nascem do nada. Eles nascem de lacunas contratuais previsíveis — e quase sempre evitáveis com um desenho correto.",
    image: "/images/insight-2.webp",
    readTime: "6 min",
  },
  {
    tag: "Penal Econômico",
    date: "03 jul 2026",
    title: "Investigação interna: como preservar a empresa antes da autoridade chegar",
    excerpt:
      "O momento entre o indício e a instauração formal define o desfecho. Protocolos de investigação interna bem executados mudam a posição da empresa perante o Estado.",
    image: "/images/insight-3.webp",
    readTime: "9 min",
  },
] as const;

export const FAQS = [
  {
    q: "Como funciona a primeira reunião com o escritório?",
    a: "A reunião inicial é conduzida por um sócio, presencialmente ou por videoconferência, e tem como objetivo o diagnóstico completo do caso: fatos, documentos, riscos e cenários possíveis. Ao final, você recebe uma leitura honesta sobre viabilidade, prazos e estratégia recomendada.",
  },
  {
    q: "O escritório atende empresas e pessoas físicas?",
    a: "Sim. Atendemos empresas de médio e grande porte em demandas societárias, tributárias, trabalhistas e de compliance, e também pessoas físicas em questões patrimoniais, sucessórias e de defesa penal econômica.",
  },
  {
    q: "Quais são as formas de honorários?",
    a: "Trabalhamos com honorários fixos por projeto, assessoria mensal (retainer) e honorários de êxito, isolados ou combinados. A modalidade é definida após o diagnóstico, sempre por contrato escrito, com previsibilidade total de custos.",
  },
  {
    q: "O escritório atua fora do Rio de Janeiro?",
    a: "Sim. Atuamos em 12 estados e nos tribunais superiores em Brasília, com equipe própria em deslocamento e uma rede selecionada de correspondentes auditados pelo escritório.",
  },
  {
    q: "Como é garantida a confidencialidade do caso?",
    a: "Além do sigilo profissional previsto no Estatuto da Advocacia, adotamos protocolos internos de segregação de informações, acesso restrito por caso, canais de comunicação criptografados e acordos de confidencialidade com toda a equipe.",
  },
  {
    q: "Em quanto tempo recebo uma resposta após o contato?",
    a: "Mensagens enviadas pelo formulário ou pelo WhatsApp são respondidas em até 24 horas úteis. Situações urgentes — prisões, buscas e apreensões, prazos judiciais iminentes — têm atendimento imediato pelo telefone de plantão.",
  },
] as const;
