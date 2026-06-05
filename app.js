/* ============================================================
   HANDOVER HUB — app logic: SPA nav, filters, data rendering
   ============================================================ */

/* ---------- SPA navigation ---------- */
const pages = { home: 'Home', clientes: 'Clientes', time: 'Time', matriz: 'Matriz Geral', docs: 'Documentação' };
const navEl = document.getElementById('nav');
const crumbNow = document.getElementById('crumbNow');

navEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.nav-item');
  if (!btn) return;
  const page = btn.dataset.page;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n === btn));
  document.querySelectorAll('.page').forEach(p => p.hidden = (p.id !== 'page-' + page));
  crumbNow.textContent = pages[page];
  document.querySelector('.main').scrollTop = 0;
  window.scrollTo({ top: 0 });
});

/* ---------- helpers ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
// value or placeholder
const f = (val, ph = '[ preencher ]') => (val == null || val === '')
  ? `<span class="ph">${esc(ph)}</span>`
  : esc(val);

const riskMap = {
  'Alto':      { cls: 'red',    label: 'Risco alto',      color: 'var(--red)' },
  'Médio':     { cls: 'amber',  label: 'Risco médio',     color: 'var(--amber)' },
  'Baixo':     { cls: 'green',  label: 'Risco baixo',     color: 'var(--green)' },
  'A validar': { cls: 'slate',  label: 'Risco a validar', color: 'var(--slate)' },
};
const statusMap = {
  'Ativo em execução': 'green',
  'On going':          'blue',
  'Aguardando início': 'amber',
  'Em proposta':       'violet',
};

/* ---------- CLIENTS data ---------- */
const clients = [
  { name: 'Cyrela · On Going', tipo: 'Sustentação', status: 'On going', risk: 'Baixo',
    resp: 'Igor Souza', frente: 'Operação recorrente', time: null,
    proxima: 'Novo time de gestão WPP Commerce se apresentar ao time, posteriormente se apresentar ao cliente.',
    obs: 'Conta em sustentação.',
    valor: 'R$ 220.808',
    link: { label: 'Proposta comercial e controle de alocação', url: 'https://docs.google.com/spreadsheets/d/1VAIMxTyG8TMQTi3dOV2rdbSL9fXfTKI4HyUPWdvEVm0/edit?gid=1160930033#gid=1160930033' },
    stakeholders: ['Telma Page – CMO', 'Igor Silveira – Analista MKT', '+19 Stakeholders'],
    teamList: [
      { nome: 'Mario Zuany',       papel: 'Gerente de Desenvolvimento',          email: 'mario.zuany@jussi.com.br',        foto: 'assets/mario.jpeg' },
      { nome: 'Wagner Petri',       papel: 'Product Manager Dedicado',             email: 'wagner.petri@jussi.com.br',        foto: 'assets/wagner.jpeg' },
      { nome: 'Jacqueline Ferreira',papel: 'Product Owner em treinamento',         email: 'jacqueline.ferreira@jussi.com.br', foto: 'assets/jacque.png' },
      { nome: 'Julia Mazon',        papel: 'Estagiária de UXD',                    email: 'julia.mazon@jussi.com.br',         foto: 'assets/julia.png' },
      { nome: 'João Vasconcelos',   papel: 'Product Designer Senior',              email: 'joao.vasconcelos@jussi.com.br',    foto: 'assets/jones.jpeg' },
      { nome: 'Gustavo Novais',     papel: 'SEO Analítico e Técnico',              email: 'gustavo.novais@jussi.com.br',      foto: 'assets/gustavo.jpeg' },
      { nome: 'Nathália Borba',     papel: 'SEO e UX Writer',                      email: 'nathalia.borba@jussi.com.br',      foto: 'assets/nath.png' },
      { nome: 'Andre Gomes',        papel: 'Web Analytics',                        email: 'andre.gomes@jussi.com.br',         foto: 'assets/andre-gomes.jpeg' },
      { nome: 'Virginia Renzo',     papel: 'CRO',                                  email: 'virginia.renzo@jussi.com.br',      foto: 'assets/virginia.jpeg' },
      { nome: 'Jonatas Amaral',     papel: 'Desenvolvedor Full Stack Pleno',       email: 'jonatas.amaral@jussi.com.br',      foto: 'assets/jonatas.jpeg' },
      { nome: 'Ana Miranda',        papel: 'Desenvolvedora Full Stack Pleno',      email: 'ana.miranda@jussi.com.br',         foto: 'assets/ana-miranda.jpeg' },
      { nome: 'Igor Cerqueira',     papel: 'Desenvolvedor Full Stack Pleno',       email: 'igor.cerqueira@jussi.com.br',      foto: 'assets/igor.jpeg' },
      { nome: 'André Moreno',       papel: 'Desenvolvedor Back-end Especialista',  email: 'andre.moreno@jussi.com.br',        foto: 'assets/andre-moreno.jpeg' },
    ],
    filters: ['sustentacao'] },

  { name: 'Whirlpool · Outsourcing', tipo: 'Sustentação', status: 'On going', risk: 'Baixo',
    resp: 'Mickael Riviere / Igor Souza', frente: 'Outsourcing / Operação', time: null,
    proxima: 'Separar governança entre One Lar e D2C.',
    obs: 'Mickael Riviere assume One Lar. Igor Souza assume D2C.',
    stakeholders: ['Gabriel Scalabrini – SR Manager', 'Brendon Guedes – Desenvolvimento', 'Lucas Amaral – SEO', 'Adrian Zambrano – UX Manager'],
    tools: ['Hotjar', 'IBM Blue Mix', 'Noun Project', 'Screaming Frog'],
    links: [
      { label: 'Controle interno de faturamento', url: 'https://docs.google.com/spreadsheets/d/1WzCMW3T7CoRFsC67zHWJkdzmmSABt04kD4ikTnphC2E/edit?gid=606667963#gid=606667963' },
      { label: 'Controle de faturamento da WHP', url: 'https://docs.google.com/spreadsheets/d/1P5_ISv_azpzKm2O44WyDeuB-LhOD38kiWl5KU2Yjz_8/edit?gid=1280070718#gid=1280070718' },
    ],
    teamGroups: [
      { label: 'Time One Lar', members: [
        { nome: 'Manuela Gomes',  papel: 'Agile Lead',          email: 'manuela.gomes@jussi.com.br',   foto: 'assets/manuela.jpeg' },
        { nome: 'Pamela Lorentz', papel: 'Agile',               email: 'pamela.lorentz@jussi.com.br',  foto: 'assets/pamela.jpeg' },
        { nome: 'Diego Vieira',   papel: 'Tech Lead',           email: 'diego.vieira@jussi.com.br',    foto: 'assets/diego.jpeg' },
        { nome: 'Caroline Ruiz',  papel: 'Product Designer',    email: 'caroline.ruiz@jussi.com.br',   foto: 'assets/caroline-ruiz.png' },
        { nome: 'Wilson Garcia',  papel: 'Product Designer',    email: 'wilson.garcia@jussi.com.br',   foto: 'assets/wilson.jpeg' },
        { nome: 'Clara Vasques',  papel: 'Product Designer',    email: 'clara.vasques@jussi.com.br',   foto: 'assets/clara-vasques.jpeg' },
        { nome: 'Diego Vieira',   papel: 'Tech Lead VTEX',      email: 'diego.vieira@jussi.com.br',    foto: 'assets/diego.jpeg' },
      ]},
      { label: 'Time D2C', members: [
        { nome: 'Bruna Garcia',   papel: 'Diretora de Operações', email: 'bruna.garcia@jussi.com.br',   foto: 'assets/bruna.jpeg' },
        { nome: 'Diego Trezzi',   papel: 'Agile',                 email: 'diego.trezzi@jussi.com.br' },
        { nome: 'Livia Bertunes', papel: 'Agile',                 email: 'livia.bertunes@jussi.com.br', foto: 'assets/livia.jpeg' },
      ]},
    ],
    filters: ['sustentacao'] },

  { name: 'Youse · SEO', tipo: 'Sustentação', status: 'On going', risk: 'Baixo',
    resp: 'Juliana Reche / Igor Souza', frente: 'SEO', time: null,
    proxima: 'Sarah assumiu recentemente a conta sem handover estruturado. Ela precisa se integrar com o time de mídia, pois tanto mídia quanto SEO geram relatórios e estratégias de otimização em conjunto para o cliente.',
    obs: 'Operação recorrente de SEO.',
    stakeholders: ['Raissa Silva'],
    teamList: [
      { nome: 'Sarah Ogbonna', papel: 'Analista de SEO', email: 'sarah.ogbonna@jussi.com.br', foto: 'assets/sarah.png' },
    ],
    filters: ['sustentacao'] },

  { name: 'Potbelly · SEO', sub: 'Bottle Rocket', tipo: 'Sustentação', status: 'On going', risk: 'Médio',
    resp: 'Juliana Reche / Igor Souza', frente: 'SEO internacional', time: null,
    proxima: 'Garantir continuidade da operação de SEO e comunicação com cliente internacional.',
    obs: 'Conta Bottle Rocket.',
    stakeholders: ['Tim Duncan'],
    teamList: [
      { nome: 'Sarah Ogbonna', papel: 'Analista de SEO', email: 'sarah.ogbonna@jussi.com.br', foto: 'assets/sarah.png' },
    ],
    filters: ['sustentacao'] },

  { name: 'Texas Farm Bureau Insurance', sub: 'Bottle Rocket', tipo: 'Projeto', status: 'Ativo em execução', risk: 'Baixo',
    resp: 'Juliana Reche / Igor Souza', frente: 'SEO / GEO', time: null,
    proxima: 'Garantir clareza operacional sobre entregáveis, plano de trabalho e conexão com demais disciplinas.',
    obs: 'Projeto Bottle Rocket.',
    stakeholders: ['Tim Duncan'],
    teamList: [
      { nome: 'Ana Paula Pinel', papel: 'Analista de SEO', email: 'ana.pinel@wppcommerce.com', foto: 'assets/ana-pinel.jpeg' },
    ],
    link: { label: 'Proposta comercial', url: 'https://omgww.sharepoint.com/sites/OportunidadesPropostas/Documentos%20Compartilhados/Forms/AllItems.aspx?id=%2Fsites%2FOportunidadesPropostas%2FDocumentos%20Compartilhados%2FRFPs%2F2026%2FBottle%20Rocket%2FTexas%20Farm%20Bureau%20Insurance&viewid=72947883%2D7e09%2D43cb%2Daabe%2D432275cd5eb0&sharingv2=true&fromShare=true&at=9&CID=04193eef%2D7c75%2D4c80%2Dbba2%2D3da36672f872&FolderCTID=0x012000BCD7AB30EC7AAF43A7C3CDC4683BC336' },
    deliverables: [
      { week: 'Week 1', focus: 'Issue Structuring',            items: ['Consolidated SEO/GEO Issue Map', 'Strategic Problem Framing', 'Open questions for validation'] },
      { week: 'Week 2', focus: 'Prioritization',               items: ['Prioritized SEO/GEO Initiative Backlog', 'Impact & Relevance Assessment', 'Strategic Focus Areas'] },
      { week: 'Week 3', focus: 'Direction & Decision Support', items: ['Strategic Direction Statements', 'Decision Support Framework', 'Key Considerations for CMS, templates, content, technology and measurement'] },
      { week: 'Week 4', focus: 'Narrative Enablement',         items: ['Client Narrative Framework', 'Key Arguments by Initiative', 'SEO/GEO inputs for final readout and redesign recommendations'] },
    ],
    filters: ['execucao'] },

  { name: 'Red Robin', sub: 'Bottle Rocket', tipo: 'On going', status: 'Aguardando início', risk: 'Alto',
    resp: 'Juliana Reche / Igor Souza', frente: 'SEO / GEO', time: null,
    proxima: 'Preparar início em 15/06.',
    obs: 'Transição precisa estar clara antes do início.',
    stakeholders: ['Tim Duncan'],
    teamNote: 'Posições de Analista Sênior e Analista Júnior abertas no RH (vagas RH063391 e RH063392 — Analistas SR e PL). Sendo tratadas pela Andrea Nammur.',
    links: [
      { label: 'Entregáveis do projeto', url: 'https://omgww-my.sharepoint.com/:x:/r/personal/rafael_oliveira_jussi_com_br/_layouts/15/Doc.aspx?sourcedoc=%7B94C04699-9723-4A90-A6EC-94D1105A8CA8%7D&file=SEO%20RFP%20Scorecard%20Draft.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1' },
      { label: 'Proposta comercial', url: 'https://omgww.sharepoint.com/:x:/r/sites/OportunidadesPropostas/_layouts/15/Doc.aspx?sourcedoc=%7B9A3B4C5F-205C-4697-9A71-616B4C59271D%7D&file=JUSSI_RED_HOBIN_SEO.xlsx&action=default&mobileredirect=true' },
    ],
    filters: ['aguardando', 'risco'] },

  { name: 'Cyrela Vivaz · Novo site', tipo: 'Projeto', status: 'Ativo em execução', risk: 'Alto',
    resp: 'Douglas Bortoliero / Mickael Riviere', frente: 'Novo site / Tech', time: null,
    proxima: 'Este projeto já teve sua interface 100% aprovada. Agora estamos na fase de desenvolvimento em Drupal, liderado pelo Mario Zuany. Wagner Petri pode ajudar com informações do projeto.',
    obs: 'Novo site em execução.',
    alert: ['Risco: Product Manager não alocado. Conta sem PM dedicado pode comprometer governança, priorização de backlog e comunicação com o cliente.', 'Risco: Time sobrecarregado com outros projetos. Profissionais alocados em múltiplas frentes simultaneamente, com impacto direto na qualidade da entrega e no cronograma.'],
    stakeholders: ['Arielle Saboia'],
    link: { label: 'Proposta comercial', url: 'https://docs.google.com/spreadsheets/d/1VAIMxTyG8TMQTi3dOV2rdbSL9fXfTKI4HyUPWdvEVm0/edit?gid=1885335819#gid=1885335819' },
    filters2: 'risco',
    teamList: [
      { nome: 'Mario Zuany',  papel: 'Gerente de Desenvolvimento',        email: 'mario.zuany@jussi.com.br',   foto: 'assets/mario.jpeg' },
      { nome: 'Wagner Petri', papel: 'Product Manager Dedicado',           email: 'wagner.petri@jussi.com.br',  foto: 'assets/wagner.jpeg' },
      { nome: 'Jonatas Amaral', papel: 'Desenvolvedor Full Stack Pleno',   email: 'jonatas.amaral@jussi.com.br', foto: 'assets/jonatas.jpeg' },
      { nome: 'André Moreno', papel: 'Desenvolvedor Back-end Especialista',email: 'andre.moreno@jussi.com.br',  foto: 'assets/andre-moreno.jpeg' },
    ],
    filters: ['execucao'] },

  { name: 'Carvalho Hosken · Novo site', tipo: 'Projeto', status: 'Ativo em execução', risk: 'Médio',
    resp: 'Douglas Bortoliero / Mickael Riviere', frente: 'Novo site / Tech', time: null,
    proxima: 'Projeto na etapa de design de interface, liderado pelo Romario, com status semanal às sextas.',
    obs: 'Novo site em execução.',
    alert: ['Risco: Product Manager não alocado. Conta sem PM dedicado pode comprometer governança, priorização de backlog e comunicação com o cliente.', 'Risco: Time sobrecarregado com outros projetos. Profissionais alocados em múltiplas frentes simultaneamente, com impacto direto na qualidade da entrega e no cronograma.'],
    stakeholders: ['Yone Beraldo', 'Amanda Cabral', 'Karen Jurassek'],
    teamList: [
      { nome: 'Mario Zuany',             papel: 'Gerente de Desenvolvimento',        email: 'mario.zuany@jussi.com.br',       foto: 'assets/mario.jpeg' },
      { nome: 'Romario Carvalho',        papel: 'Design Lead',                       email: 'romario.carvalho@jussi.com.br',  foto: 'assets/romario.jpeg' },
      { nome: 'Desenvolvedor Full Stack 1', papel: 'Full Stack — vaga pendente',    email: '' },
      { nome: 'Desenvolvedor Full Stack 2', papel: 'Full Stack — vaga pendente',    email: '' },
      { nome: 'André Moreno',            papel: 'Desenvolvedor Back-end Especialista', email: 'andre.moreno@jussi.com.br',   foto: 'assets/andre-moreno.jpeg' },
      { nome: 'Gabriela Freitas',        papel: 'SEO / UX Writer',                  email: 'gabriela.freitas@jussi.com.br',  foto: 'assets/gabriela.jpeg' },
      { nome: 'Andre Gomes',             papel: 'Web Analytics',                    email: 'andre.gomes@jussi.com.br',       foto: 'assets/andre-gomes.jpeg' },
    ],
    filters: ['execucao'] },

  { name: 'Blip · Novo site', tipo: 'Projeto', status: 'Ativo em execução', risk: 'Alto',
    resp: 'Douglas Bortoliero / Mickael Riviere', frente: 'Novo site / Tech / Produto', time: null,
    proxima: 'Gestão próxima de cronograma, riscos, expectativas e comunicação.',
    obs: 'Trabalhando em cronograma reverso para deploy em 01/07. Interfaces do Figma disponíveis com os designers. Projeto politicamente sensível, exige acompanhamento próximo.',
    alert: ['Risco: Product Manager não alocado. Conta sem PM dedicado pode comprometer governança, priorização de backlog e comunicação com o cliente.', 'Risco: Time sobrecarregado com outros projetos. Profissionais alocados em múltiplas frentes simultaneamente, com impacto direto na qualidade da entrega e no cronograma.'],
    stakeholders: ['Menedjan Morgado', 'Mariana Pessoa'],
    channels: [
      { label: 'Canal Slack com o cliente', url: '#' },
      { label: 'Agenda de reuniões — Google Calendar', url: '#' },
    ],
    teamList: [
      { nome: 'Mario Zuany',      papel: 'Gerente de Desenvolvimento',        email: 'mario.zuany@jussi.com.br',       foto: 'assets/mario.jpeg' },
      { nome: 'Igor Cerqueira',   papel: 'Desenvolvedor Full Stack Pleno',    email: 'igor.cerqueira@jussi.com.br',    foto: 'assets/igor.jpeg' },
      { nome: 'Romario Carvalho', papel: 'Design Lead',                       email: 'romario.carvalho@jussi.com.br',  foto: 'assets/romario.jpeg' },
      { nome: 'João Vasconcelos', papel: 'Product Designer Senior',           email: 'joao.vasconcelos@jussi.com.br',  foto: 'assets/jones.jpeg' },
      { nome: 'Andre Gomes',      papel: 'Web Analytics',                     email: 'andre.gomes@jussi.com.br',       foto: 'assets/andre-gomes.jpeg' },
      { nome: 'SEO / UX Writer',  papel: 'Vaga pendente de alocação',         email: '' },
      { nome: 'Product Owner',    papel: 'Vaga pendente de alocação',         email: '' },
    ],
    filters: ['execucao', 'risco'] },

];

const iconStake = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="3.2"/><path d="M22 21v-2a4 4 0 0 0-3-3.85"/><path d="M16 3.15A4 4 0 0 1 16 11"/></svg>';
const iconLink = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>';

function clientCard(c) {
  const r = riskMap[c.risk];
  const sCls = statusMap[c.status] || 'slate';
  const riskCls = { 'Alto':'risk-alto','Médio':'risk-medio','Baixo':'risk-baixo','A validar':'risk-val' }[c.risk] || 'risk-val';
  const subline = c.sub ? `<span class="sub">${esc(c.sub)}</span>` : '';

  // Team table
  const renderMember = p => `<div class="trow${!p.email ? ' trow-pending' : ''}">
    <span class="tperson">${p.foto ? `<img class="tavatar" src="${esc(p.foto)}" alt="${esc(p.nome)}" />` : `<span class="tavatar-init">${esc(p.nome.charAt(0))}</span>`}<span class="tname">${esc(p.nome)}</span></span>
    <span class="trole">${esc(p.papel)}</span>
    ${p.email ? `<a class="temail" href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : `<span class="badge amber" style="font-size:11px;"><span class="bd"></span>Vaga pendente</span>`}
  </div>`;

  const teamBlock = c.teamGroups
    ? c.teamGroups.map(g => `<div class="field full">
        <div class="k tgroup-label">${esc(g.label)}</div>
        <div class="team-table">${g.members.map(renderMember).join('')}</div>
      </div>`).join('')
    : c.teamList
      ? `<div class="field full"><div class="k">Time alocado</div>
          <div class="team-table">${c.teamList.map(renderMember).join('')}</div></div>`
      : c.teamNote
      ? `<div class="field full"><div class="k">Time alocado</div><div class="v lead" style="margin-top:8px;"><span class="badge amber" style="margin-bottom:10px;display:inline-flex;"><span class="bd"></span>Vagas em aberto</span><br/>${esc(c.teamNote)}</div></div>`
      : `<div class="field"><div class="k">Time alocado</div><div class="v">${f(c.time)}</div></div>`;

  // Stakeholders
  const stakeBlock = c.stakeholders
    ? c.stakeholders.map(s => `<span class="tchip">${esc(s)}</span>`).join('')
    : `<span class="ph">[ mapear por conta ]</span>`;

  // Valor
  const valorBlock = c.valor
    ? `<div class="field"><div class="k">Valor do contrato</div><div class="v" style="font-family:var(--font-display);font-size:18px;font-weight:700;letter-spacing:-0.02em;color:var(--ink-strong);">${esc(c.valor)}</div></div>`
    : '';

  // Link(s)
  const iconSlack = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="8" width="4" height="8" rx="2"/><rect x="17" y="8" width="4" height="8" rx="2"/><rect x="8" y="3" width="8" height="4" rx="2"/><rect x="8" y="17" width="8" height="4" rx="2"/><circle cx="12" cy="12" r="2"/></svg>';
  const iconCal  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  const channelsHtml = c.channels
    ? c.channels.map(ch => {
        const icon = ch.label.toLowerCase().includes('slack') ? iconSlack : ch.label.toLowerCase().includes('calendar') ? iconCal : iconLink;
        return `<a href="${esc(ch.url)}" class="card-link" target="_blank" rel="noopener">${icon} ${esc(ch.label)}</a>`;
      }).join('')
    : '';
  const linkHtml = (c.links
    ? c.links.map(l => `<a href="${esc(l.url)}" class="card-link" target="_blank" rel="noopener">${iconLink} ${esc(l.label)}</a>`).join('')
    : c.link
      ? `<a href="${esc(c.link.url)}" class="card-link" target="_blank" rel="noopener">${iconLink} ${esc(c.link.label)}</a>`
      : '') + channelsHtml;

  const chevron = `<span class="acc-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"/></svg></span>`;

  return `
  <article class="acc-item ${riskCls}" data-filters="${c.filters.join(' ')}">
    <div class="acc-head">
      <div class="ah-name">
        ${subline}
        <span class="nm">${esc(c.name)}</span>
        <div class="ah-badges">
          <span class="badge ${sCls}"><span class="bd"></span>${esc(c.status)}</span>
          ${c.risk === 'Alto' ? `<span class="badge ${r.cls}"><span class="bd"></span>${r.label}</span>` : ''}
          <span class="badge type">${esc(c.tipo)}</span>
        </div>
      </div>
      <div class="ah-meta">
        <span class="mk">NOVO RESPONSÁVEL</span>
        <span class="mv">${c.resp ? esc(c.resp) : '—'}</span>
      </div>
      <div class="ah-meta">
        <span class="mk">Frente</span>
        <span class="mv">${c.frente ? esc(c.frente) : '—'}</span>
      </div>
      ${chevron}
    </div>
    <div class="acc-body">
      <div class="ab-grid">
        ${teamBlock}
        ${valorBlock}
        ${c.tools ? `<div class="field full"><div class="k">Ferramentas contratadas</div><div class="team-chips" style="margin-top:8px;">${c.tools.map(t => `<span class="tchip">${esc(t)}</span>`).join('')}</div></div>` : ''}
        ${c.deliverables ? `<div class="field full"><div class="k">Entregáveis por semana</div><div class="deliv-table" style="margin-top:10px;">${c.deliverables.map(d => `<div class="deliv-row"><div class="deliv-week">${esc(d.week)}</div><div class="deliv-focus">${esc(d.focus)}</div><ul class="deliv-items">${d.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</div></div>` : ''}
        <div class="field full"><div class="k">Próxima ação</div><div class="v lead">${f(c.proxima)}</div></div>
        <div class="field full"><div class="k">Observações</div><div class="v lead">${f(c.obs)}</div></div>
        ${c.alert ? (Array.isArray(c.alert) ? c.alert : [c.alert]).map(a => `<div class="field full"><div class="alert-inline"><span class="alert-icon">⚠</span><span>${esc(a)}</span></div></div>`).join('') : ''}
      </div>
      <div class="ab-foot">
        <div>
          <div class="k" style="font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);font-weight:700;margin-bottom:8px;">Stakeholders do cliente</div>
          <div class="team-chips">${stakeBlock}</div>
        </div>
        ${linkHtml}
      </div>
    </div>
  </article>`;
}

const clientGrid = document.getElementById('clientGrid');
clientGrid.innerHTML = clients.map(clientCard).join('');

/* ---------- accordion toggle ---------- */
function setupAccordion(containerId, exclusive) {
  document.getElementById(containerId).addEventListener('click', (e) => {
    const head = e.target.closest('.acc-head');
    if (!head) return;
    const item = head.closest('.acc-item');
    const wasOpen = item.classList.contains('open');
    if (exclusive) document.querySelectorAll('#' + containerId + ' .acc-item.open').forEach(i => i.classList.remove('open'));
    item.classList.toggle('open', !wasOpen);
  });
}

setupAccordion('clientGrid', true);
setupAccordion('docsAccList', false);
setupAccordion('docsToolsList', false);

/* ---------- filters ---------- */
const filtersEl = document.getElementById('filters');
// set dynamic counts
const counts = { todos: clients.length };
['execucao','sustentacao','aguardando','proposta'].forEach(k => {
  counts[k] = clients.filter(c => c.filters.includes(k)).length;
});
counts['risco'] = clients.filter(c => c.risk === 'Alto').length;
filtersEl.querySelectorAll('.chip').forEach(ch => {
  const c = ch.querySelector('.ct');
  if (c) c.textContent = String(counts[ch.dataset.filter]).padStart(2, '0');
});

filtersEl.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  filtersEl.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === chip));
  const ft = chip.dataset.filter;
  clientGrid.querySelectorAll('.acc-item').forEach(card => {
    const clientData = clients[Array.from(clientGrid.querySelectorAll('.acc-item')).indexOf(card)];
    const show = ft === 'todos' || (ft === 'risco' && clientData && clientData.risk === 'Alto') || card.dataset.filters.split(' ').includes(ft);
    card.style.display = show ? '' : 'none';
  });
});

/* ---------- TEAM data ---------- */
const team = [
  { initials: 'MZ', name: 'Mario Zuany Neto',                          cargo: 'Gerente de Desenvolvimento',          foto: 'assets/mario.jpeg',
    projetos: ['Cyrela On Going', 'Cyrela Vivaz', 'Carvalho Hosken', 'Blip'],
    obs: 'Lidera o desenvolvimento técnico nos principais projetos de novo site.' , email: 'mario.zuany@jussi.com.br'},
  { initials: 'RC', name: 'Romario dos Santos Carvalho',                cargo: 'Design Lead',                         foto: 'assets/romario.jpeg',
    projetos: ['Carvalho Hosken', 'Blip'],
    obs: 'Responsável pelo design de interface nos projetos de novo site.' , email: 'romario.carvalho@jussi.com.br'},
  { initials: 'WP', name: 'Wagner Petri',                               cargo: 'Product Manager Dedicado',            foto: 'assets/wagner.jpeg',
    projetos: ['Cyrela On Going', 'Cyrela Vivaz'],
    obs: 'Product Manager com foco nos projetos Cyrela.' , email: 'wagner.petri@jussi.com.br'},
  { initials: 'CR', name: 'Caroline dos Santos Ruiz',                   cargo: 'Product Designer',                    foto: 'assets/caroline-ruiz.png',
    projetos: ['Whirlpool One Lar'],
    obs: 'Designer alocada na frente Whirlpool One Lar.' , email: 'caroline.ruiz@jussi.com.br'},
  { initials: 'CV', name: 'Clara Vasques da Conceição',                 cargo: 'Product Designer',                    foto: 'assets/clara-vasques.jpeg',
    projetos: ['Whirlpool One Lar'],
    obs: 'Designer alocada na frente Whirlpool One Lar.' , email: 'clara.vasques@jussi.com.br'},
  { initials: 'JV', name: 'João Paulo Vasconcelos',                     cargo: 'Product Designer Senior',             foto: 'assets/jones.jpeg',
    projetos: ['Cyrela On Going', 'Blip'],
    obs: 'Designer Senior com atuação em múltiplos projetos.' , email: 'joao.vasconcelos@jussi.com.br'},
  { initials: 'JM', name: 'Julia Mazon dos Santos',                     cargo: 'Estagiária de UXD',                   foto: 'assets/julia.png',
    projetos: ['Cyrela On Going'],
    obs: 'Estagiária de UX Design alocada na Cyrela.' , email: 'julia.mazon@jussi.com.br'},
  { initials: 'WG', name: 'Wilson Garcia Giesteira',                    cargo: 'Product Designer',                    foto: 'assets/wilson.jpeg',
    projetos: ['Whirlpool One Lar'],
    obs: 'Designer alocado na frente Whirlpool One Lar.' , email: 'wilson.garcia@jussi.com.br'},
  { initials: 'GF', name: 'Gabriela Reis de Freitas',                   cargo: 'SEO / UX Writer',                     foto: 'assets/gabriela.jpeg',
    projetos: ['Carvalho Hosken'],
    obs: 'SEO e UX Writer alocada no projeto Carvalho Hosken.' , email: 'gabriela.freitas@jussi.com.br'},
  { initials: 'JF', name: 'Jacqueline Praxedes Ferreira',               cargo: 'Product Owner em treinamento',        foto: 'assets/jacque.png',
    projetos: ['Cyrela On Going'],
    obs: 'Product Owner em desenvolvimento alocada na Cyrela.' , email: 'jacqueline.ferreira@jussi.com.br'},
  { initials: 'NB', name: 'Nathália Borba Alves da Silva',              cargo: 'SEO e UX Writer',                     foto: 'assets/nath.png',
    projetos: ['Cyrela On Going'],
    obs: 'SEO e UX Writer alocada na Cyrela.' , email: 'nathalia.borba@jussi.com.br'},
  { initials: 'SO', name: 'Sarah Josephine Chinyere Ogbonna',           cargo: 'Analista de SEO',                     foto: 'assets/sarah.png',
    projetos: ['Youse', 'Potbelly'],
    obs: 'Analista de SEO responsável pelas frentes Youse e Potbelly.' , email: 'sarah.ogbonna@jussi.com.br'},
  { initials: 'AM', name: 'Ana Caroline Xavier Miranda',                cargo: 'Desenvolvedora Full Stack Pleno',     foto: 'assets/ana-miranda.jpeg',
    projetos: ['Cyrela On Going'],
    obs: 'Desenvolvedora Full Stack alocada na Cyrela.' , email: 'ana.miranda@jussi.com.br'},
  { initials: 'AG', name: 'Andre Gomes Monteiro',                       cargo: 'Web Analytics',                       foto: 'assets/andre-gomes.jpeg',
    projetos: ['Cyrela On Going', 'Carvalho Hosken', 'Blip'],
    obs: 'Web Analytics com atuação em múltiplos projetos.' , email: 'andre.gomes@jussi.com.br'},
  { initials: 'AL', name: 'Andre Moreno de Lima',                       cargo: 'Desenvolvedor Back-end Especialista', foto: 'assets/andre-moreno.jpeg',
    projetos: ['Cyrela On Going', 'Cyrela Vivaz', 'Carvalho Hosken'],
    obs: 'Especialista Back-end alocado em projetos de novo site.' , email: 'andre.moreno@jussi.com.br'},
  { initials: 'DV', name: 'Diego Neitzel Vieira',                       cargo: 'Tech Lead / Tech Lead VTEX',          foto: 'assets/diego.jpeg',
    projetos: ['Whirlpool One Lar'],
    obs: 'Tech Lead responsável pela frente Whirlpool One Lar.' , email: 'diego.vieira@jussi.com.br'},
  { initials: 'IC', name: 'Igor Vieira de Cerqueira',                   cargo: 'Desenvolvedor Full Stack Pleno',      foto: 'assets/igor.jpeg',
    projetos: ['Cyrela On Going', 'Blip'],
    obs: 'Desenvolvedor Full Stack com atuação na Cyrela e Blip.' , email: 'igor.cerqueira@jussi.com.br'},
  { initials: 'JP', name: 'Jonatas Pinheiro do Amaral',                 cargo: 'Desenvolvedor Full Stack Pleno',      foto: 'assets/jonatas.jpeg',
    projetos: ['Cyrela On Going', 'Cyrela Vivaz'],
    obs: 'Desenvolvedor Full Stack alocado nos projetos Cyrela.' , email: 'jonatas.amaral@jussi.com.br'},
];

function personCard(p) {
  const chips = p.projetos.map(pr => `<span class="tchip">${esc(pr)}</span>`).join('');
  const avatarHtml = p.foto
    ? `<img src="${esc(p.foto)}" alt="${esc(p.name)}" style="width:100%;height:100%;object-fit:cover;display:block;" />`
    : esc(p.initials);
  return `
  <article class="person">
    <div class="top">
      <div class="avatar" style="${p.foto ? 'padding:0;overflow:hidden;' : ''}">${avatarHtml}</div>
      <div class="who">
        <h3>${esc(p.name)}</h3>
        <div class="role">${p.cargo ? esc(p.cargo) : '<span class=\"ph\">[ preencher cargo ]</span>'}</div>
      </div>
    </div>
    <div class="body">
      <div class="field"><div class="k">Projetos relacionados</div><div class="team-chips" style="margin-top:8px;">${chips}</div></div>
      ${p.email ? `<div class="field"><div class="k">E-mail</div><a class="temail" href="mailto:${esc(p.email)}" style="margin-top:6px;display:inline-block;">${esc(p.email)}</a></div>` : ''}
      <div class="field"><div class="k">Observações</div><div class="v lead">${esc(p.obs)}</div></div>
    </div>
  </article>`;
}
document.getElementById('teamGrid').innerHTML = team.map(personCard).join('');

/* ---------- MATRIX data ---------- */
const matrix = [
  ['Cyrela · On Going',              'Sustentação', 'Igor Souza',                          'Novo time de gestão WPP Commerce se apresentar ao time, posteriormente ao cliente.',     'Baixo',     'Conta recorrente. 13 pessoas no time.'],
  ['Whirlpool · Outsourcing',        'Sustentação', 'Mickael Riviere / Igor Souza',        'Separar governança entre One Lar (Mickael) e D2C (Igor).',                              'Baixo',     'Times One Lar e D2C mapeados. Stakeholders: Gabriel Scalabrini, Brendon Guedes, Lucas Amaral, Adrian Zambrano.'],
  ['Youse · SEO',                    'Sustentação', 'Juliana Reche / Igor Souza',          'Sarah assumiu a conta sem handover estruturado — integrar com time de mídia.',          'Baixo',     'Sarah Ogbonna como analista de SEO. Stakeholder: Raissa Silva.'],
  ['Potbelly · SEO',                 'Sustentação', 'Juliana Reche / Igor Souza',          'Garantir continuidade da operação de SEO e comunicação com cliente internacional.',     'Médio',     'Conta Bottle Rocket. Sarah Ogbonna no time. Stakeholder: Tim Duncan.'],
  ['Texas Farm Bureau Insurance',    'Projeto',     'Juliana Reche / Igor Souza',          'Executar 4 semanas de entregáveis SEO/GEO (Issue Structuring → Narrative Enablement).', 'Baixo',     'Conta Bottle Rocket. Ana Paula Pinel no time. Stakeholder: Tim Duncan.'],
  ['Red Robin',                      'On going',    'Juliana Reche / Igor Souza',          'Preparar início em 15/06. Vagas RH063391 e RH063392 sendo tratadas por Andrea Nammur.', 'Alto',      'Conta Bottle Rocket. Posições Analista SR e PL abertas. Stakeholder: Tim Duncan.'],
  ['Cyrela Vivaz · Novo site',       'Projeto',     'Douglas Bortoliero / Mickael Riviere','Interface 100% aprovada. Fase de desenvolvimento em Drupal liderado por Mario Zuany.',  'Alto',      'Risco: sem PM dedicado e devs overalocados em 4 projetos. Stakeholder: Arielle Saboia.'],
  ['Carvalho Hosken · Novo site',    'Projeto',     'Douglas Bortoliero / Mickael Riviere','Etapa de design de interface liderada por Romario. Status semanal às sextas.',           'Médio',     'Risco: sem PM dedicado e time sobrecarregado. 2 vagas de dev pendentes. Stakeholders: Yone Beraldo, Amanda Cabral, Karen Jurassek.'],
  ['Blip · Novo site',               'Projeto',     'Douglas Bortoliero / Mickael Riviere','Cronograma reverso para deploy em 01/07. Figma disponível. Gestão política próxima.',   'Alto',      'Risco alto. Sem PM e time sobrecarregado. Stakeholders: Menedjan Morgado, Mariana Pessoa.'],
];

function matrixRow(r) {
  const risk = riskMap[r[4]];
  return `
  <tr>
    <td><span class="cli">${esc(r[0])}</span></td>
    <td><span class="badge type">${esc(r[1])}</span></td>
    <td>${f(r[2])}</td>
    <td>${f(r[3])}</td>
    <td><span class="badge ${risk.cls}"><span class="bd"></span>${esc(r[4])}</span></td>
    <td class="obs">${f(r[5])}</td>
  </tr>`;
}
document.getElementById('matrixBody').innerHTML = matrix.map(matrixRow).join('');
