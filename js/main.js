/**
 * MARLEX & CO. — Interactive Experience, Mega Menu, & "Map My Business Journey" Controller
 * "From Idea to Reality" // SKETCH × REALITY
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------
     1. STICKY HEADER, STRUCTURED "LAYANAN" MEGA MENU & MOBILE DRAWER
     -------------------------------------------------- */
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sub-link');

  const navLayananItem = document.getElementById('nav-layanan-item');
  const megaTrigger = document.getElementById('nav-mega-trigger');
  const megaMenu = document.getElementById('services-mega-menu');
  let megaCloseTimeout = null;

  const handleScrollHeader = () => {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Structured Mega Menu Hover & Click Behavior
  const openMegaMenu = () => {
    if (!megaMenu || !megaTrigger) return;
    clearTimeout(megaCloseTimeout);
    megaMenu.classList.add('open');
    megaMenu.setAttribute('aria-hidden', 'false');
    megaTrigger.setAttribute('aria-expanded', 'true');
  };

  const closeMegaMenu = () => {
    if (!megaMenu || !megaTrigger) return;
    megaMenu.classList.remove('open');
    megaMenu.setAttribute('aria-hidden', 'true');
    megaTrigger.setAttribute('aria-expanded', 'false');
  };

  if (navLayananItem && megaTrigger && megaMenu) {
    navLayananItem.addEventListener('mouseenter', openMegaMenu);
    navLayananItem.addEventListener('mouseleave', () => {
      megaCloseTimeout = setTimeout(closeMegaMenu, 160);
    });

    megaMenu.addEventListener('mouseenter', () => {
      clearTimeout(megaCloseTimeout);
    });
    megaMenu.addEventListener('mouseleave', () => {
      megaCloseTimeout = setTimeout(closeMegaMenu, 160);
    });

    megaTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = megaMenu.classList.contains('open');
      if (isOpen) {
        closeMegaMenu();
      } else {
        openMegaMenu();
      }
    });

    document.querySelectorAll('[data-close-mega], .mega-links a').forEach((link) => {
      link.addEventListener('click', closeMegaMenu);
    });

    document.addEventListener('click', (e) => {
      if (!megaMenu.contains(e.target) && !navLayananItem.contains(e.target)) {
        closeMegaMenu();
      }
    });
  }

  // Full-Screen Editorial Mobile Menu Drawer & LAYANAN Table of Contents
  const mobileLayananToggle = document.getElementById('mobile-layanan-toggle');
  const mobileTocServices = document.getElementById('mobile-toc-services');
  const allMobileMenuLinks = document.querySelectorAll(
    '.mobile-nav-drawer a, .mobile-start-conv-btn'
  );

  const closeMobileMenu = () => {
    if (!mobileToggle || !mobileDrawer) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal-backdrop.active')) {
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      const nextState = !isExpanded;
      mobileToggle.setAttribute('aria-expanded', String(nextState));
      mobileDrawer.classList.toggle('open', nextState);
      mobileDrawer.setAttribute('aria-hidden', String(!nextState));
      document.body.style.overflow = nextState ? 'hidden' : '';
    });

    allMobileMenuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  if (mobileLayananToggle && mobileTocServices) {
    mobileLayananToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = mobileLayananToggle.getAttribute('aria-expanded') === 'true';
      const nextState = !isExpanded;
      mobileLayananToggle.setAttribute('aria-expanded', String(nextState));
      mobileTocServices.hidden = !nextState;
      const iconEl = mobileLayananToggle.querySelector('.m-nav-toggle-icon');
      if (iconEl) iconEl.textContent = nextState ? '−' : '+';
    });
  }

  // Sticky Mobile Bottom CTA Bar (Appears after scrolling past Hero)
  const mobileStickyBar = document.getElementById('mobile-sticky-bar');
  const closeStickyBarBtn = document.getElementById('close-sticky-bar');
  let stickyBarDismissed = false;

  const handleStickyBarScroll = () => {
    if (!mobileStickyBar || stickyBarDismissed) return;
    const triggerY = 420;
    if (window.scrollY > triggerY) {
      mobileStickyBar.classList.add('visible');
    } else {
      mobileStickyBar.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleStickyBarScroll, { passive: true });
  handleStickyBarScroll();

  if (closeStickyBarBtn && mobileStickyBar) {
    closeStickyBarBtn.addEventListener('click', () => {
      stickyBarDismissed = true;
      mobileStickyBar.classList.remove('visible');
      mobileStickyBar.classList.add('dismissed');
    });
  }

  /* --------------------------------------------------
     2. SCROLL REVEAL & HAND-DRAWN SKETCH LINE OBSERVER
     -------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-up');
  const sketchPaths = document.querySelectorAll('.sketch-draw-path');

  sketchPaths.forEach((path) => {
    try {
      const length = path.getTotalLength();
      if (length) {
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      }
    } catch (_) {
      // Fallback uses CSS default dasharray
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const sketchObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('drawn');
          entry.target.style.strokeDashoffset = '0';
          sketchObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sketchPaths.forEach((path) => sketchObserver.observe(path));

  /* --------------------------------------------------
     3. SECTION 02 — INTERACTIVE BUSINESS JOURNEY NODES (BILINGUAL)
     -------------------------------------------------- */
  const journeyData = {
    '01': {
      badge: 'STAGE 01 // IDEA',
      heading: 'Setiap bisnis besar dimulai dari sketsa di atas kertas.',
      desc: 'Sebelum badan usaha berdiri atau produk masuk ke pasar, semuanya berawal dari konsep, catatan buku, dan rencana awal. Kami membantu Anda memetakan langkah yang tepat sejak hari pertama.',
      sketch: 'Catatan ide bisnis, konsep nama brand, & sketsa produk awal',
      reality: 'Peta kebutuhan badan usaha, KBLI, merek, dan izin produk yang jelas',
      target: '#stage-build',
      linkLabel: 'LIHAT TAHAP 01: BUILD'
    },
    '02': {
      badge: 'STAGE 02 // BUILD (BUSINESS FOUNDATION)',
      heading: 'Siapkan fondasi badan usaha yang tepat.',
      desc: 'Kami membantu mempersiapkan pendirian PT, CV, atau badan usaha Anda beserta penentuan kode KBLI dan NIB agar bisnis memiliki struktur resmi yang jelas.',
      sketch: 'Rencana struktur usaha, pembagian peran, & draf kegiatan bisnis',
      reality: 'Akta Pendirian PT/CV, SK Kemenkumham, NPWP Badan, & NIB',
      target: '#stage-build',
      linkLabel: 'MENUJU 01 / BUILD'
    },
    '03': {
      badge: 'STAGE 03 // LEGALIZE (LEGAL ENTITY & LICENSING)',
      heading: 'Jadikan operasional bisnis Anda resmi dan terarah.',
      desc: 'Kami membantu mengidentifikasi dan mengurus kebutuhan NIB, sistem OSS Berbasis Risiko, serta izin operasional yang relevan dengan kegiatan usaha Anda.',
      sketch: 'Daftar kebutuhan operasional & kelengkapan dokumen usaha',
      reality: 'NIB Aktif, Perizinan Berusaha OSS, & Izin Operasional Terverifikasi',
      target: '#stage-legalize',
      linkLabel: 'MENUJU 02 / LEGALIZE'
    },
    '04': {
      badge: 'STAGE 04 // PROTECT (PROTECTED BRAND)',
      heading: 'Lindungi nama dan identitas brand yang Anda bangun.',
      desc: 'Ubah nama dan logo brand Anda menjadi aset kekayaan intelektual yang terlindungi secara resmi melalui pendaftaran merek di DJKI.',
      sketch: 'Sketsa logo awal, pemilihan nama brand, & eksplorasi identitas',
      reality: 'Bukti Permohonan / Sertifikat Merek Terdaftar (®) di DJKI',
      target: '#stage-protect',
      linkLabel: 'MENUJU 03 / PROTECT'
    },
    '05': {
      badge: 'STAGE 05 // CERTIFY (COMPLIANT PRODUCT)',
      heading: 'Siapkan produk Anda sebelum masuk ke pasar.',
      desc: 'Mulai dari evaluasi komposisi dan label kemasan hingga pendampingan izin edar BPOM dan sertifikasi Halal BPJPH sesuai kategori produk Anda.',
      sketch: 'Sampel prototipe produk, daftar komposisi, & draf desain kemasan',
      reality: 'Produk dengan Nomor Izin Edar BPOM & Sertifikat Halal siap jual',
      target: '#stage-certify',
      linkLabel: 'MENUJU 04 / CERTIFY'
    },
    '06': {
      badge: 'STAGE 06 // MOVE FORWARD',
      heading: 'Melangkah lebih jauh dengan kesiapan penuh.',
      desc: 'Ketika fondasi badan usaha telah berdiri, izin usaha jelas, merek terlindungi, dan produk telah terdaftar, bisnis Anda siap memperluas distribusi dan kemitraan.',
      sketch: 'Seluruh tahapan bisnis terhubung dalam satu peta jalan',
      reality: 'Bisnis dan produk beroperasi resmi serta siap berekspansi di pasar',
      target: '#stage-move-forward',
      linkLabel: 'MENUJU 05 / MOVE FORWARD'
    }
  };

  const journeyNodes = document.querySelectorAll('.journey-node');
  const badgeEl = document.getElementById('journey-badge');
  const headingEl = document.getElementById('journey-heading');
  const descEl = document.getElementById('journey-desc');
  const sketchValEl = document.getElementById('journey-sketch-val');
  const realityValEl = document.getElementById('journey-reality-val');
  const jumpLinkEl = document.getElementById('journey-jump-link');

  journeyNodes.forEach((node) => {
    node.addEventListener('click', () => {
      const stageKey = node.getAttribute('data-stage');
      const data = journeyData[stageKey];
      if (!data) return;

      journeyNodes.forEach((n) => {
        n.classList.remove('active');
        n.setAttribute('aria-selected', 'false');
      });
      node.classList.add('active');
      node.setAttribute('aria-selected', 'true');

      if (badgeEl) badgeEl.textContent = data.badge;
      if (headingEl) headingEl.textContent = data.heading;
      if (descEl) descEl.textContent = data.desc;
      if (sketchValEl) sketchValEl.textContent = data.sketch;
      if (realityValEl) realityValEl.textContent = data.reality;
      if (jumpLinkEl) {
        jumpLinkEl.setAttribute('href', data.target);
        const span = jumpLinkEl.querySelector('span:first-child');
        if (span) span.textContent = data.linkLabel;
      }
    });
  });

  /* --------------------------------------------------
     3B. MOBILE EDITORIAL JOURNEY SWIPEABLE CAROUSEL
     -------------------------------------------------- */
  const mjTrack = document.getElementById('mj-track');
  const mjCounter = document.getElementById('mj-counter');
  const mjPrevBtn = document.getElementById('mj-prev-card');
  const mjNextBtn = document.getElementById('mj-next-card');
  const mjDots = document.querySelectorAll('.mj-dots-wrapper .mj-dot');
  const mjCards = document.querySelectorAll('.mj-card');

  const stageTitles = [
    'IDEA',
    'BUILD',
    'LEGALIZE',
    'PROTECT',
    'CERTIFY',
    'MOVE FORWARD'
  ];

  const updateMjActive = (idx) => {
    if (mjCounter) {
      const stageName = stageTitles[idx] || 'STAGE';
      mjCounter.textContent = `0${idx + 1} / 06 // ${stageName}`;
    }
    mjDots.forEach((dot, dIdx) => {
      dot.classList.toggle('active', dIdx === idx);
    });
  };

  if (mjTrack && mjCards.length > 0) {
    let scrollTimeout = null;
    mjTrack.addEventListener(
      'scroll',
      () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const scrollLeft = mjTrack.scrollLeft;
          const cardWidth = (mjCards[0].offsetWidth || 280) + 14;
          const activeIdx = Math.round(scrollLeft / cardWidth);
          const clampedIdx = Math.max(0, Math.min(mjCards.length - 1, activeIdx));
          updateMjActive(clampedIdx);
        }, 60);
      },
      { passive: true }
    );

    const scrollToCard = (idx) => {
      const targetCard = mjCards[idx];
      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
        updateMjActive(idx);
      }
    };

    if (mjPrevBtn) {
      mjPrevBtn.addEventListener('click', () => {
        const cardWidth = (mjCards[0].offsetWidth || 280) + 14;
        const currentIdx = Math.round(mjTrack.scrollLeft / cardWidth);
        const prevIdx = Math.max(0, currentIdx - 1);
        scrollToCard(prevIdx);
      });
    }

    if (mjNextBtn) {
      mjNextBtn.addEventListener('click', () => {
        const cardWidth = (mjCards[0].offsetWidth || 280) + 14;
        const currentIdx = Math.round(mjTrack.scrollLeft / cardWidth);
        const nextIdx = Math.min(mjCards.length - 1, currentIdx + 1);
        scrollToCard(nextIdx);
      });
    }

    mjDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const dotIdx = Number(dot.getAttribute('data-dot')) - 1;
        scrollToCard(dotIdx);
      });
    });
  }

  /* --------------------------------------------------
     4. CONSULTATION BRIEF MODAL (BAHASA INDONESIA)
     -------------------------------------------------- */
  const consultationModal = document.getElementById('consultation-modal');
  const consultationForm = document.getElementById('consultation-form');
  const formSuccessState = document.getElementById('form-success-state');
  const clientStageSelect = document.getElementById('client-stage');
  const clientNotesTextarea = document.getElementById('client-notes');
  const openModalTriggers = document.querySelectorAll('[data-open-modal="consultation"]');

  const openModal = (modalEl, preselectValue, customNote) => {
    if (!modalEl) return;
    if (preselectValue && clientStageSelect) {
      const prefix = preselectValue.slice(0, 8);
      const matchingOption = Array.from(clientStageSelect.options).find((opt) =>
        opt.value.startsWith(prefix.trim())
      );
      if (matchingOption) {
        clientStageSelect.value = matchingOption.value;
      }
    }
    if (customNote && clientNotesTextarea) {
      clientNotesTextarea.value = customNote;
    }
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeAllModals = () => {
    document.querySelectorAll('.modal-backdrop.active').forEach((modal) => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  };

  openModalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const preselect = trigger.getAttribute('data-preselect');
      if (consultationForm && formSuccessState) {
        consultationForm.hidden = false;
        formSuccessState.hidden = true;
      }
      openModal(consultationModal, preselect);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAllModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      closeMegaMenu();
    }
  });

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      consultationForm.hidden = true;
      if (formSuccessState) {
        formSuccessState.hidden = false;
      }
      consultationForm.reset();
    });
  }

  /* --------------------------------------------------
     5. SIGNATURE INTERACTIVE FEATURE: MAP MY BUSINESS JOURNEY
     -------------------------------------------------- */
  const mapperIntroView = document.getElementById('mapper-intro-view');
  const mapperStepsView = document.getElementById('mapper-steps-view');
  const mapperResultView = document.getElementById('mapper-result-view');
  const startMapperBtn = document.getElementById('start-mapper-btn');
  const mapperPrevBtn = document.getElementById('mapper-prev-btn');
  const mapperNextBtn = document.getElementById('mapper-next-btn');
  const mapperNextLabel = document.getElementById('mapper-next-btn')?.querySelector('#mapper-next-label');
  const mapperProgressFill = document.getElementById('mapper-progress-fill');
  const mapperProgressLabel = document.getElementById('mapper-progress-label');
  const mapperResetBtn = document.getElementById('mapper-reset-btn');
  const mapperConsultBtn = document.getElementById('mapper-consult-btn');
  const productSubquestion = document.getElementById('product-type-subquestion');

  const mapperState = {
    currentStep: 1,
    building: 'BISNIS',
    stage: 'IDEA',
    foundation: [],
    hasProduct: 'BELUM',
    productCategory: '',
    priority: 'MULAI_LEGAL'
  };

  const showMapperStep = (stepNum) => {
    mapperState.currentStep = stepNum;
    const allStepPanels = document.querySelectorAll('.mapper-step');
    allStepPanels.forEach((panel) => {
      const panelStep = Number(panel.getAttribute('data-step'));
      panel.hidden = panelStep !== stepNum;
    });

    const pct = Math.min(100, Math.max(20, stepNum * 20));
    if (mapperProgressFill) mapperProgressFill.style.width = `${pct}%`;
    if (mapperProgressLabel) mapperProgressLabel.textContent = `0${stepNum} / 05`;
    if (mapperNextLabel) {
      mapperNextLabel.textContent = stepNum === 5 ? 'LIHAT REKOMENDASI' : 'NEXT';
    }
  };

  if (startMapperBtn && mapperIntroView && mapperStepsView) {
    startMapperBtn.addEventListener('click', () => {
      mapperIntroView.hidden = true;
      mapperStepsView.hidden = false;
      mapperResultView.hidden = true;
      showMapperStep(1);
    });
  }

  // Single-choice option cards (Steps 1, 2, 4, 5)
  document.querySelectorAll('.mapper-option-card').forEach((card) => {
    card.addEventListener('click', () => {
      const field = card.getAttribute('data-field');
      const value = card.getAttribute('data-value');
      if (!field || !value) return;

      mapperState[field] = value;

      // Highlight within same field group
      document.querySelectorAll(`.mapper-option-card[data-field="${field}"]`).forEach((sibling) => {
        sibling.classList.remove('selected');
      });
      card.classList.add('selected');

      // Step 04 conditional product category subquestion
      if (field === 'hasProduct' && productSubquestion) {
        if (value === 'YA') {
          productSubquestion.hidden = false;
        } else {
          productSubquestion.hidden = true;
          mapperState.productCategory = '';
          document.querySelectorAll('.mapper-pill').forEach((p) => p.classList.remove('selected'));
        }
      }

      // Auto-advance on Step 1 & Step 2 for smooth editorial flow
      if ((field === 'building' && mapperState.currentStep === 1) || (field === 'stage' && mapperState.currentStep === 2)) {
        setTimeout(() => {
          showMapperStep(mapperState.currentStep + 1);
        }, 220);
      }
    });
  });

  // Step 04 Product Category Pills
  document.querySelectorAll('.mapper-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.mapper-pill').forEach((p) => p.classList.remove('selected'));
      pill.classList.add('selected');
      mapperState.productCategory = pill.getAttribute('data-product-cat') || '';
    });
  });

  // Step 03 Multi-select checkboxes with exclusive logic for "Belum memiliki semuanya" / "Belum yakin"
  const foundationInputs = document.querySelectorAll('input[name="foundation"]');
  foundationInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const isExclusive = input.getAttribute('data-exclusive') === 'true';
      if (isExclusive && input.checked) {
        foundationInputs.forEach((other) => {
          if (other !== input) other.checked = false;
        });
      } else if (!isExclusive && input.checked) {
        foundationInputs.forEach((other) => {
          if (other.getAttribute('data-exclusive') === 'true') other.checked = false;
        });
      }

      mapperState.foundation = Array.from(foundationInputs)
        .filter((i) => i.checked)
        .map((i) => i.value);
    });
  });

  // Recommendation Engine based on User Answers
  const catalogBlocks = {
    BUILD: {
      stageCode: '01 — BUILD',
      title: 'FONDASI BISNIS & BADAN USAHA',
      desc: 'Mulai dengan mempersiapkan struktur badan usaha (PT atau CV), penentuan kode KBLI yang tepat, serta pendaftaran awal agar bisnis Anda memiliki landasan resmi.',
      services: ['Pendirian Badan Usaha (PT / CV)', 'Pendaftaran Bisnis & NPWP Badan', 'Pengurusan NIB'],
      ctaLabel: 'MULAI BANGUN BISNIS →',
      ctaHref: 'pendirian-bisnis.html',
      preselect: '01 BUILD'
    },
    LEGALIZE: {
      stageCode: '02 — LEGALIZE',
      title: 'LEGALITAS & PERIZINAN USAHA',
      desc: 'Lengkapi dan tertibkan Nomor Induk Berusaha (NIB), sinkronisasi sistem OSS Berbasis Risiko, serta izin operasional sesuai bidang usaha Anda.',
      services: ['Pengurusan NIB', 'Perizinan Berusaha & OSS', 'Izin Operasional & Sertifikat Standar'],
      ctaLabel: 'URUS LEGALITAS →',
      ctaHref: 'legalitas-perizinan.html',
      preselect: '02 LEGALIZE'
    },
    PROTECT: {
      stageCode: '03 — PROTECT',
      title: 'PENDAFTARAN MEREK & PROTEKSI BRAND',
      desc: 'Lindungi nama dan identitas brand yang telah Anda bangun melalui pengecekan kemiripan dan pendaftaran merek resmi di DJKI sebelum diklaim pihak lain.',
      services: ['Pendaftaran Merek (DJKI)', 'Konsultasi & Cek Kemiripan Merek', 'Perlindungan Kekayaan Intelektual'],
      ctaLabel: 'PELAJARI LAYANAN MEREK →',
      ctaHref: 'pendaftaran-merek.html',
      preselect: '03 PROTECT'
    },
    CERTIFY: {
      stageCode: '04 — CERTIFY',
      title: 'PERSIAPAN & REGISTRASI PRODUK',
      desc: 'Identifikasi kebutuhan registrasi, evaluasi label kemasan, izin edar BPOM, serta sertifikasi Halal yang relevan dengan kategori produk Anda.',
      services: ['Registrasi Produk', 'Kepatuhan Produk & Label', 'Pendampingan BPOM', 'Sertifikasi Halal'],
      ctaLabel: 'SIAPKAN PRODUK →',
      ctaHref: 'sertifikasi-produk.html',
      preselect: '04 CERTIFY'
    }
  };

  const computeRecommendations = () => {
    const { building, stage, foundation, hasProduct, productCategory, priority } = mapperState;
    const hasEntity = foundation.includes('BADAN_USAHA');
    const hasNib = foundation.includes('NIB');
    const hasTrademark = foundation.includes('MEREK');
    const hasNone =
      foundation.length === 0 ||
      foundation.includes('BELUM_SEMUA') ||
      foundation.includes('BELUM_YAKIN');

    const order = [];

    // Explicit Rule 1: "A BRAND" + "ALREADY OPERATING" + "NO REGISTERED TRADEMARK" -> Prioritize PROTECT
    if (building === 'BRAND' && stage === 'ALREADY_OPERATING' && !hasTrademark) {
      order.push('PROTECT', 'LEGALIZE', hasProduct === 'YA' ? 'CERTIFY' : 'BUILD');
    }
    // Explicit Rule 2: "A BUSINESS" + "IDEA" + "NONE OF THE ABOVE" -> Prioritize BUILD
    else if (building === 'BISNIS' && stage === 'IDEA' && hasNone) {
      order.push('BUILD', 'LEGALIZE', 'PROTECT');
    }
    // Explicit Rule 3: "A PRODUCT" + "READY TO LAUNCH" -> Prioritize CERTIFY
    else if (building === 'PRODUK' && stage === 'READY_TO_LAUNCH') {
      order.push('CERTIFY', !hasTrademark ? 'PROTECT' : 'LEGALIZE', !hasEntity ? 'BUILD' : 'LEGALIZE');
    }
    // Priority-driven & intelligent fallback rules
    else {
      if (priority === 'DAFTAR_MEREK' || building === 'BRAND') {
        order.push('PROTECT');
      } else if (
        priority === 'REGISTRASI_PRODUK' ||
        priority === 'BPOM' ||
        priority === 'HALAL' ||
        building === 'PRODUK'
      ) {
        order.push('CERTIFY');
      } else if (priority === 'NIB_PERIZINAN') {
        order.push('LEGALIZE');
      } else {
        order.push('BUILD');
      }

      // Secondary steps based on missing foundation
      if (!hasEntity && !order.includes('BUILD')) order.push('BUILD');
      if (!hasNib && !order.includes('LEGALIZE')) order.push('LEGALIZE');
      if (!hasTrademark && !order.includes('PROTECT')) order.push('PROTECT');
      if (hasProduct === 'YA' && !order.includes('CERTIFY')) order.push('CERTIFY');

      ['BUILD', 'LEGALIZE', 'PROTECT', 'CERTIFY'].forEach((k) => {
        if (!order.includes(k)) order.push(k);
      });
    }

    const uniqueTop3 = [...new Set(order)].slice(0, 3);
    return uniqueTop3.map((key, idx) => {
      const base = { ...catalogBlocks[key] };
      if (key === 'CERTIFY' && productCategory) {
        base.title = `PERSIAPAN PRODUK (${productCategory.toUpperCase()})`;
      }
      return {
        ...base,
        rank: idx + 1,
        badgeText: idx === 0 ? '01 — PRIORITY' : `0${idx + 1} — NEXT STEP`
      };
    });
  };

  const renderMapperResults = () => {
    const recommendations = computeRecommendations();
    const roadmapGrid = document.getElementById('mapper-roadmap-grid');
    const nextStepsMobile = document.getElementById('mapper-next-steps-mobile');
    const summaryStrip = document.getElementById('mapper-summary-strip');

    const buildingLabels = {
      BISNIS: 'Fokus: Membangun Bisnis',
      BRAND: 'Fokus: Melindungi Brand',
      PRODUK: 'Fokus: Menyiapkan Produk',
      BELUM_YAKIN: 'Fokus: Eksplorasi Langkah Awal'
    };
    const stageLabels = {
      IDEA: 'Tahap: Idea / Konsep',
      BUILDING: 'Tahap: Sedang Mempersiapkan',
      ALREADY_OPERATING: 'Tahap: Sudah Berjalan',
      READY_TO_LAUNCH: 'Tahap: Siap Peluncuran',
      READY_TO_EXPAND: 'Tahap: Siap Ekspansi'
    };

    if (summaryStrip) {
      const chips = [
        buildingLabels[mapperState.building] || 'Bisnis',
        stageLabels[mapperState.stage] || 'Tahap Awal'
      ];
      if (mapperState.hasProduct === 'YA') {
        chips.push(
          mapperState.productCategory
            ? `Produk: ${mapperState.productCategory}`
            : 'Memiliki Produk Siap Jual'
        );
      }
      summaryStrip.innerHTML = chips.map((c) => `<span class="summary-chip">${c}</span>`).join('');
    }

    if (roadmapGrid) {
      roadmapGrid.innerHTML = recommendations
        .map(
          (rec, idx) => `
          <article class="roadmap-card ${idx === 0 ? 'priority-primary' : ''}">
            <div>
              <span class="roadmap-badge">${rec.badgeText}</span>
              <div class="roadmap-stage">${rec.stageCode}</div>
              <h4 class="roadmap-title">${rec.title}</h4>
              <p class="roadmap-desc">${rec.desc}</p>
              <div class="roadmap-services">
                <span class="roadmap-services-label">LAYANAN YANG DIREKOMENDASIKAN:</span>
                <ul>
                  ${rec.services.map((s) => `<li>${s}</li>`).join('')}
                </ul>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.6rem;">
              ${
                idx === 0
                  ? `<button type="button" class="btn btn-primary btn-full" data-priority-consult="${rec.preselect}">
                      <span>KONSULTASI SEKARANG</span>
                      <span class="btn-arrow">→</span>
                    </button>`
                  : ''
              }
              <a href="${rec.ctaHref}" class="btn ${idx === 0 ? 'btn-secondary' : 'btn-secondary'} btn-full">
                <span>${rec.ctaLabel}</span>
              </a>
            </div>
          </article>
        `
        )
        .join('');

      const priorityConsultBtn = roadmapGrid.querySelector('[data-priority-consult]');
      if (priorityConsultBtn && recommendations[0]) {
        const topRec = recommendations[0];
        const summaryNote = `Hasil Map My Business Journey — Prioritas: ${topRec.stageCode} (${topRec.title}). Fokus: ${
          buildingLabels[mapperState.building] || ''
        }, ${stageLabels[mapperState.stage] || ''}${
          mapperState.productCategory ? `, Kategori Produk: ${mapperState.productCategory}` : ''
        }.`;
        priorityConsultBtn.addEventListener('click', () => {
          openModal(consultationModal, topRec.preselect, summaryNote);
        });
      }
    }

    if (nextStepsMobile) {
      const secondaryRecs = recommendations.slice(1);
      nextStepsMobile.innerHTML = `
        <span class="next-steps-mobile-title">YOUR NEXT STEPS:</span>
        <div class="next-steps-mobile-list">
          ${secondaryRecs
            .map(
              (rec, i) => `
              <a href="${rec.ctaHref}" class="next-step-mobile-row">
                <div>
                  <strong>0${i + 2} — ${rec.title}</strong>
                  <span>${rec.services.slice(0, 2).join(' · ')}</span>
                </div>
                <span class="btn-arrow" aria-hidden="true">→</span>
              </a>
            `
            )
            .join('')}
        </div>
      `;
    }

    if (mapperConsultBtn && recommendations[0]) {
      const topRec = recommendations[0];
      const summaryNote = `Hasil Map My Business Journey — Prioritas: ${topRec.stageCode} (${topRec.title}). Fokus: ${
        buildingLabels[mapperState.building] || ''
      }, ${stageLabels[mapperState.stage] || ''}${
        mapperState.productCategory ? `, Kategori Produk: ${mapperState.productCategory}` : ''
      }.`;
      mapperConsultBtn.onclick = () => {
        openModal(consultationModal, topRec.preselect, summaryNote);
      };
    }

    mapperIntroView.hidden = true;
    mapperStepsView.hidden = true;
    mapperResultView.hidden = false;
    if (mapperProgressLabel) mapperProgressLabel.textContent = 'INITIAL MAP GENERATED';
  };

  if (mapperPrevBtn) {
    mapperPrevBtn.addEventListener('click', () => {
      if (mapperState.currentStep > 1) {
        showMapperStep(mapperState.currentStep - 1);
      } else {
        mapperStepsView.hidden = true;
        mapperIntroView.hidden = false;
        if (mapperProgressLabel) mapperProgressLabel.textContent = 'READY TO START';
      }
    });
  }

  if (mapperNextBtn) {
    mapperNextBtn.addEventListener('click', () => {
      if (mapperState.currentStep < 5) {
        showMapperStep(mapperState.currentStep + 1);
      } else {
        renderMapperResults();
      }
    });
  }

  if (mapperResetBtn) {
    mapperResetBtn.addEventListener('click', () => {
      mapperResultView.hidden = true;
      mapperStepsView.hidden = false;
      showMapperStep(1);
    });
  }

  /* --------------------------------------------------
     6. SECTION 10 — EDITORIAL INSIGHTS READER MODAL (BAHASA INDONESIA)
     -------------------------------------------------- */
  const articlesContent = {
    'article-1': {
      category: '01 // FONDASI & LEGALITAS · ISSUE NO. 14',
      title: 'What Does a New Business Actually Need to Start Legally?',
      preselect: '01 BUILD',
      body: `
        <p>Ketika seorang pengusaha melangkah dari konsep di buku catatan menuju eksekusi bisnis nyata, kebingungan yang paling sering muncul adalah: dokumen apa yang harus diurus lebih dulu agar bisnis berjalan resmi tanpa membuang biaya untuk izin yang belum diperlukan?</p>
        <h4>1. Pilih Bentuk Badan Usaha yang Sesuai dengan Rencana Bisnis</h4>
        <p>Pemilihan antara PT Umum, PT Perorangan, atau CV menentukan pemisahan tanggung jawab harta pribadi serta kemudahan saat bekerja sama dengan pihak ketiga atau mendaftarkan produk di kemudian hari.</p>
        <h4>2. Ketepatan Memilih Kode KBLI Sejak Awal</h4>
        <p>Seluruh perizinan usaha di Indonesia mengacu pada KBLI (Klasifikasi Baku Lapangan Usaha Indonesia). Memilih kode KBLI yang tepat saat pembuatan akta pendirian akan menghindarkan Anda dari keharusan mengubah akta ketika ingin mengurus izin operasional atau BPOM.</p>
        <ul>
          <li><strong>Akta Pendirian & SK Kemenkumham:</strong> Dasar pengesahan berdirinya badan usaha Anda.</li>
          <li><strong>NPWP Badan Usaha:</strong> Diperlukan untuk pembukaan rekening bank perusahaan dan administrasi perpajakan.</li>
          <li><strong>NIB (Nomor Induk Berusaha):</strong> Identitas resmi pelaku usaha yang diterbitkan melalui sistem OSS.</li>
        </ul>
        <p>Di MARLEX &amp; CO., kami membantu menyusun langkah awal ini secara berurutan agar fondasi perusahaan Anda siap mendukung perlindungan merek dan registrasi produk di tahap berikutnya.</p>
      `
    },
    'article-2': {
      category: '02 // PERLINDUNGAN MEREK · ISSUE NO. 19',
      title: 'Before Registering Your Trademark, Understand These Things.',
      preselect: '03 PROTECT',
      body: `
        <p>Banyak pemilik bisnis menginvestasikan biaya besar untuk desain kemasan, kampanye pemasaran, dan pembuatan toko fisik sebelum memeriksa apakah nama brand yang mereka gunakan masih tersedia secara hukum di DJKI.</p>
        <h4>1. Hindari Nama yang Terlalu Umum (Deskriptif)</h4>
        <p>Merek yang hanya menjelaskan jenis barang atau sifat produk umumnya sulit mendapatkan persetujuan. Nama yang unik dan memiliki daya pembeda kuat memiliki peluang pendaftaran yang jauh lebih tinggi.</p>
        <h4>2. Tentukan Kelas Merek (Nice Classification) dengan Tepat</h4>
        <p>Perlindungan merek berlaku berdasarkan kelas barang atau jasa (Kelas 1 hingga 45). Pastikan Anda mendaftarkan merek pada kelas yang benar-benar mewakili produk maupun layanan bisnis Anda saat ini dan rencana pengembangannya.</p>
        <ul>
          <li>Lakukan pengecekan kemiripan merek sebelum mencetak kemasan dalam jumlah besar.</li>
          <li>Pahami prinsip <em>First-to-File</em>: pihak yang mendaftar lebih dulu memiliki prioritas perlindungan hukum.</li>
          <li>Bukti pengajuan merek resmi juga menjadi syarat penting ketika Anda ingin mengurus izin edar BPOM.</li>
        </ul>
      `
    },
    'article-3': {
      category: '03 // REGISTRASI PRODUK · ISSUE NO. 23',
      title: 'From Product Idea to Market: What Should You Prepare?',
      preselect: '04 CERTIFY',
      body: `
        <p>Membawa produk fisik—seperti skincare, kosmetik, makanan dan minuman kemasan, atau suplemen—dari tahap sampel menuju penjualan resmi di pasar memerlukan persiapan kepatuhan produk yang terencana.</p>
        <h4>1. Kesiapan Komposisi & Fasilitas Produksi</h4>
        <p>Pastikan setiap bahan baku yang digunakan sesuai dengan batas keamanan yang berlaku. Baik Anda memproduksi sendiri maupun bekerja sama dengan pabrik maklon, dokumen kerjasama dan standar fasilitas produksi harus selaras.</p>
        <h4>2. Kesesuaian Desain Label Kemasan</h4>
        <p>Informasi pada kemasan produk (seperti nama produk, komposisi, berat bersih, nomor bets, dan klaim manfaat) wajib mengikuti ketentuan pelabelan agar tidak mengalami kendala saat evaluasi.</p>
        <ul>
          <li><strong>Nomor Izin Edar (NIE) BPOM:</strong> Syarat utama agar produk dapat dipasarkan secara luas dan aman.</li>
          <li><strong>Sertifikasi Halal BPJPH:</strong> Memberikan jaminan kehalalan produk sekaligus memenuhi kewajiban regulasi yang berlaku.</li>
          <li><strong>Keterhubungan Legalitas:</strong> Pastikan KBLI badan usaha dan pendaftaran merek Anda sudah siap mendukung proses registrasi produk.</li>
        </ul>
      `
    }
  };

  const insightModal = document.getElementById('insight-modal');
  const insightCategoryEl = document.getElementById('insight-modal-category');
  const insightTitleEl = document.getElementById('insight-modal-title');
  const insightBodyEl = document.getElementById('insight-modal-body');
  const insightCtaBtn = document.getElementById('insight-modal-cta');
  const insightCards = document.querySelectorAll('.insight-card');

  insightCards.forEach((card) => {
    const openArticle = () => {
      const id = card.getAttribute('data-article-id');
      const article = articlesContent[id];
      if (!article || !insightModal) return;

      if (insightCategoryEl) insightCategoryEl.textContent = article.category;
      if (insightTitleEl) insightTitleEl.textContent = article.title;
      if (insightBodyEl) insightBodyEl.innerHTML = article.body;
      if (insightCtaBtn) {
        insightCtaBtn.onclick = () => {
          closeAllModals();
          openModal(consultationModal, article.preselect);
        };
      }

      openModal(insightModal);
    };

    card.addEventListener('click', openArticle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openArticle();
      }
    });
  });

  /* --------------------------------------------------
     7. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
     -------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const trackedSections = [
    { id: 'top', el: document.getElementById('top') },
    { id: 'services', el: document.getElementById('services') },
    { id: 'why-marlex', el: document.getElementById('why-marlex') },
    { id: 'insights', el: document.getElementById('insights') }
  ];

  const updateActiveNav = () => {
    if (!trackedSections[0].el) return;
    const scrollPos = window.scrollY + 240;
    let currentId = 'top';

    trackedSections.forEach((item) => {
      if (item.el && item.el.offsetTop <= scrollPos) {
        currentId = item.id;
      }
    });

    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('data-section') === currentId;
      link.classList.toggle('active', isMatch);
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
});
