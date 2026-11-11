'use strict';
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const arrow = '<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg>';
  const check = '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>';
  let previousFocus = null;
  const menu = $('#menu-dialog');
  const info = $('#info-dialog');
  const booking = $('#booking-dialog');
  const gallery = $('#gallery-dialog');
  const resultsDialog = $('#results-dialog');
  const menuToggle = $('#menu-toggle');
  const form = $('#booking-form');
  const review = $('#booking-review');
  let selectedTreatment = '';

  const treatments = {
    aesthetic: {title:'Estética dental',line:'Naturalmente você.',category:'HARMONIA & NATURALIDADE',photo:'photo-aesthetic',selection:'Estética dental',description:'Um sorriso pode expressar a sua personalidade. O planejamento estético considera a saúde dos dentes, a harmonia do rosto e, principalmente, o que faz sentido para você.',items:['Clareamento dental','Facetas e restaurações estéticas','Planejamento individual do sorriso']},
    implant: {title:'Implantodontia',line:'Cuidado que reconstrói.',category:'FUNÇÃO & CONFIANÇA',photo:'photo-implant',selection:'Implantodontia',description:'A reabilitação oral começa com a compreensão das suas necessidades. A avaliação profissional orienta as possibilidades de reposição dos dentes e o planejamento de cada etapa.',items:['Avaliação para implantes dentários','Planejamento da reabilitação oral','Acompanhamento individual']},
    orthodontic: {title:'Ortodontia',line:'Harmonia em movimento.',category:'EQUILÍBRIO & FUNÇÃO',photo:'photo-orthodontic',selection:'Ortodontia',description:'Alinhar um sorriso envolve estética, função e saúde. Uma avaliação ajuda a entender as opções de tratamento adequadas ao seu caso e à sua rotina.',items:['Avaliação do alinhamento dental','Alinhadores transparentes, quando indicados','Planejamento e acompanhamento']},
    prevention: {title:'Prevenção',line:'Cuidar, todos os dias.',category:'SAÚDE & CONTINUIDADE',photo:'photo-prevention',selection:'Prevenção',description:'O cuidado contínuo tem um lugar especial na saúde do sorriso. Consultas de acompanhamento e orientações individuais ajudam a construir uma rotina de atenção à sua saúde bucal.',items:['Avaliação da saúde bucal','Limpeza profissional','Orientações e acompanhamento preventivo']}
  };

  const pages = {
    technology: {eyebrow:'PRECISÃO COM PROPÓSITO',title:'Tecnologia que aproxima.',subtitle:'O cuidado continua humano.',description:'Neste conceito, a tecnologia apoia a compreensão do sorriso e o planejamento do cuidado, com espaço para explicar cada etapa e ouvir as suas dúvidas.',items:['Planejamento orientado por avaliação profissional','Informação clara para decisões compartilhadas','Acompanhamento pensado para cada pessoa'],note:'Os equipamentos e recursos da clínica real serão apresentados após a confirmação de sua estrutura.'},
    team: {eyebrow:'PESSOAS QUE CUIDAM DE PESSOAS',title:'Diferentes olhares.',subtitle:'Um cuidado integrado.',description:'O atendimento odontológico começa com a escuta. Esta proposta valoriza a colaboração entre especialidades e uma relação próxima em todas as etapas do cuidado.',items:['Odontologia estética','Implantodontia e reabilitação','Ortodontia e prevenção'],note:'A apresentação da equipe, os nomes e os registros profissionais serão incluídos com os dados oficiais da clínica.'},
    approach: {eyebrow:'CADA SORRISO TEM UMA HISTÓRIA',title:'O cuidado começa',subtitle:'por conhecer você.',description:'Um tratamento bem planejado considera suas necessidades, suas expectativas e o seu tempo. A proposta é tornar cada escolha compreensível, com atenção ao que importa para você.',items:['Uma conversa sobre suas necessidades','Avaliação e orientação individual','Um plano de cuidado construído em conjunto'],note:'As indicações e possibilidades de tratamento dependem de avaliação profissional.'},
    clinic: {eyebrow:'ODONTOLOGIA & BEM-ESTAR',title:'Um espaço para',subtitle:'se sentir cuidado.',description:'Luz, formas suaves e uma atmosfera tranquila traduzem a proposta visual da YU.MED: fazer do cuidado uma experiência mais acolhedora, desde a primeira conversa.',items:['Acolhimento desde a chegada','Atenção aos detalhes','Você no centro de cada decisão'],photo:true,note:'YU.MED é o nome provisório desta demonstração. Os ambientes exibidos são imagens ilustrativas, não fotografias de uma clínica real.'},
    privacy: {eyebrow:'SUA PRIVACIDADE',title:'Transparência',subtitle:'em cada detalhe.',description:'Esta é uma demonstração de site. O formulário apenas organiza uma prévia na sua tela: os dados digitados não são enviados a uma clínica nem gravados em banco de dados ou no armazenamento do navegador.',items:['O formulário não envia nem armazena dados','Fontes e fotografias servidas com o próprio site','Mapa externo incorporado pelo Google Maps'],note:'O mapa utiliza um serviço externo, sujeito à política de privacidade do Google. A localização é ilustrativa. Antes do uso real, deverão ser configurados os contatos, o tratamento dos dados pessoais e a política de privacidade da clínica.'}
  };

  function openDialog(dialog) {
    const current = $('dialog[open]');
    if (!current) previousFocus = document.activeElement;
    if (current && current !== dialog) current.close();
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('dialog-open');
    menuToggle.setAttribute('aria-expanded', String(dialog === menu));
    dialog.scrollTop = 0;
  }

  function closeDialog(dialog) {
    dialog.close();
  }

  $$('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
    });
    dialog.addEventListener('close', () => {
      if (dialog === booking) {
        form.reset();
        form.hidden = false;
        review.hidden = true;
        $('#review-details').replaceChildren();
        form.elements.phone.setCustomValidity('');
      }
      queueMicrotask(() => {
        const active = $('dialog[open]');
        document.body.classList.toggle('dialog-open', !!active);
        menuToggle.setAttribute('aria-expanded', String(active === menu));
        if (!active && previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
      });
    });
  });

  function primaryButton(label='CONVERSAR SOBRE MEU SORRISO') {
    return `<button type="button" class="pill pill-dark" data-book><span>${label}</span><span class="round-arrow">${arrow}</span></button>`;
  }

  function showTreatment(key) {
    const treatment = treatments[key];
    if (!treatment) return;
    selectedTreatment = treatment.selection;
    $('#info-content').innerHTML = `<div class="dialog-photo ${treatment.photo}" role="img" aria-label="Imagem ilustrativa de ${treatment.title}"></div><p class="eyebrow">${treatment.category}</p><h2 id="info-title">${treatment.title}<em>${treatment.line}</em></h2><p class="dialog-description">${treatment.description}</p><ul>${treatment.items.map(item=>`<li>${check}<span>${item}</span></li>`).join('')}</ul><small class="demo-note">Conteúdo ilustrativo. A indicação de procedimentos depende de avaliação odontológica individual.</small>${primaryButton()}`;
    openDialog(info);
  }

  function showInfo(key) {
    const page = pages[key];
    if (!page) return;
    selectedTreatment = '';
    $('#info-content').innerHTML = `${page.photo?'<div class="dialog-photo dialog-photo-clinic" role="img" aria-label="Ambiente ilustrativo de uma clínica"></div>':''}<p class="eyebrow">${page.eyebrow}</p><h2 id="info-title">${page.title}<em>${page.subtitle}</em></h2><p class="dialog-description">${page.description}</p><ul>${page.items.map(item=>`<li>${check}<span>${item}</span></li>`).join('')}</ul><small class="demo-note">${page.note}</small>${key==='privacy'?'':primaryButton('AGENDE SUA VISITA')}`;
    openDialog(info);
  }

  document.addEventListener('click', event => {
    const close = event.target.closest('[data-close]');
    if (close) { closeDialog(close.closest('dialog')); return; }
    const treatment = event.target.closest('[data-treatment]');
    if (treatment) { showTreatment(treatment.dataset.treatment); return; }
    const information = event.target.closest('[data-info]');
    if (information) { showInfo(information.dataset.info); return; }
    const book = event.target.closest('[data-book]');
    if (book) {
      const fromTreatment = !!book.closest('#info-dialog') && !!selectedTreatment;
      if (!booking.open) {
        form.hidden = false;
        review.hidden = true;
        if (fromTreatment) $('#booking-treatment').value = selectedTreatment;
      }
      openDialog(booking);
      return;
    }
    if (event.target.closest('[data-results]')) { openDialog(resultsDialog); return; }
    const galleryTrigger = event.target.closest('[data-gallery]');
    if (galleryTrigger) {
      selectedTreatment='';
      const technology = galleryTrigger.dataset.gallery === 'technology';
      const image = $('#gallery-image');
      image.src = technology ? 'assets/technology.webp' : 'assets/clinic.webp';
      image.alt = technology ? 'Consultório ilustrativo com equipamentos digitais e luz natural' : 'Recepção ilustrativa com balcão curvo em pedra clara e paredes azul-petróleo';
      $('#gallery-title').innerHTML = technology ? 'Um novo olhar<em>para o cuidado.</em>' : 'O cuidado começa<em>no acolhimento.</em>';
      $('#gallery-caption').textContent = technology ? 'Uma visão de como tecnologia, luz natural e conforto podem fazer parte da experiência odontológica. Ambiente gerado para esta demonstração.' : 'Luz natural, materiais acolhedores e uma atmosfera tranquila. Uma visão do espaço que inspira este conceito.';
      openDialog(gallery);
    }
  });

  menuToggle.addEventListener('click', () => openDialog(menu));
  $$('a[href^="#"]', menu).forEach(link=>link.addEventListener('click',()=>menu.close()));
  $('#all-treatments').addEventListener('click', () => {
    selectedTreatment = '';
    $('#info-content').innerHTML = `<p class="eyebrow">UM CUIDADO PARA CADA MOMENTO</p><h2 id="info-title">Encontre seu<em>próximo passo.</em></h2><p class="dialog-description">Explore as áreas de cuidado e conheça as possibilidades para o seu sorriso.</p><div class="treatment-list">${Object.entries(treatments).map(([key,treatment])=>`<button type="button" data-treatment="${key}"><span>${treatment.title}</span>${arrow}</button>`).join('')}</div><small class="demo-note">A escolha do tratamento é feita com orientação profissional, após uma avaliação individual.</small>`;
    openDialog(info);
  });

  $$('.comparison-input').forEach(input => {
    input.addEventListener('input', () => {
      const value = Number(input.value);
      input.closest('.smile-comparison').style.setProperty('--comparison-position', `${value}%`);
      input.setAttribute('aria-valuetext', `${value}% da imagem inicial e ${100-value}% da imagem proposta`);
    });
  });

  const slides = [
    {first:'Mais que',second:'um sorriso.',description:'Cuidado, estética e tecnologia<br>para o seu bem-estar, hoje e sempre.',eyebrow:'ESTÉTICA &nbsp; SAÚDE &nbsp; PREVENÇÃO'},
    {first:'Seu sorriso,',second:'sua essência.',description:'Um olhar atento para o que faz<br>você se sentir bem sendo você.',eyebrow:'NATURALIDADE &nbsp; HARMONIA &nbsp; CUIDADO'},
    {first:'Bem-estar',second:'por inteiro.',description:'Uma experiência de cuidado<br>que começa por ouvir você.',eyebrow:'ESCUTA &nbsp; CONFORTO &nbsp; CONFIANÇA'}
  ];
  $$('[data-slide]').forEach(button=>button.addEventListener('click',()=>{
    const index = Number(button.dataset.slide);
    const slide = slides[index];
    $('#hero-title').replaceChildren();
    const first = document.createElement('span'); first.textContent=slide.first;
    const second = document.createElement('em'); second.textContent=slide.second;
    $('#hero-title').append(first,second);
    $('#hero-description').innerHTML=slide.description;
    $('#hero-eyebrow').innerHTML=slide.eyebrow;
    $('.hero').dataset.activeSlide=String(index);
    $$('[data-slide]').forEach(tab=>tab.setAttribute('aria-pressed',String(tab===button)));
  }));

  const rail = $('#treatment-rail');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function moveTreatments(direction) {
    const cards = $$('.treatment-card', rail);
    const step = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(rail).gap);
    const maximum = rail.scrollWidth - rail.clientWidth;
    if (maximum > 10) {
      let position = rail.scrollLeft + direction*step;
      if (position > maximum+10) position = 0;
      else if (position < -10) position = maximum;
      rail.scrollTo({left:position,behavior:reducedMotion.matches?'instant':'smooth'});
    } else {
      if (direction>0) rail.append(cards[0]);
      else rail.prepend(cards.at(-1));
      const first=$('.treatment-card strong',rail).textContent;
      $('#treatment-announcement').textContent=`Primeiro tratamento: ${first.toLowerCase()}.`;
    }
  }
  $('#treatment-prev').addEventListener('click',()=>moveTreatments(-1));
  $('#treatment-next').addEventListener('click',()=>moveTreatments(1));

  const today = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  form.elements.date.min = today;
  form.elements.phone.addEventListener('input',()=>form.elements.phone.setCustomValidity(''));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const digits=form.elements.phone.value.replace(/\D/g,'');
    if (digits.length<10 || digits.length>13) {
      form.elements.phone.setCustomValidity('Informe um telefone com DDD, com 10 a 13 dígitos.');
      form.elements.phone.reportValidity();
      return;
    }
    if (!form.reportValidity()) return;
    const data=new FormData(form);
    const date=new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});
    const fields=[['Nome',String(data.get('name')).trim()],['Contato',String(data.get('phone'))],['Interesse',String(data.get('treatment'))],['Preferência',`${date}, ${String(data.get('period')).toLowerCase()}`]];
    const details=$('#review-details'); details.replaceChildren();
    fields.forEach(([label,value])=>{
      const row=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');
      dt.textContent=label;dd.textContent=value;row.append(dt,dd);details.append(row);
    });
    form.hidden=true;review.hidden=false;booking.scrollTop=0;
    $('#edit-booking').focus({preventScroll:true});
  });
  $('#edit-booking').addEventListener('click',()=>{review.hidden=true;form.hidden=false;form.elements.name.focus();});
})();
