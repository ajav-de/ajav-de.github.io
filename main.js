document.addEventListener("DOMContentLoaded", () => {
  const heroContainer = document.getElementById("heroScrollContainer");
  const heroShoeWrapper = document.getElementById("heroShoeWrapper");
  const heroImages = heroShoeWrapper ? Array.from(heroShoeWrapper.querySelectorAll("img")) : [];
  const mainHeader = document.getElementById("mainHeader");
  const footerSection = document.getElementById("footerSection");
  const footerGradientGlow = document.getElementById("footerGradientGlow");
  const globalToast = document.getElementById("globalToast");

  const reservePairBtn = document.getElementById("reservePairBtn");
  const achievementsToggleBtn = document.getElementById("achievementsToggleBtn");
  const releaseBadge = document.getElementById("releaseBadge");
  const releaseHeading = document.getElementById("releaseHeading");
  const colorwaysDeck = document.getElementById("colorwaysDeck");
  const achievementsDeck = document.getElementById("achievementsDeck");

  // Achievements carousel refs
  const achievePrevBtn = document.getElementById("achievePrevBtn");
  const achieveNextBtn = document.getElementById("achieveNextBtn");
  const achievementsTrack = document.getElementById("achievementsTrack");
  const achieveDots = document.getElementById("achieveDots");

  // Projects carousel refs
  const projectsPrevBtn = document.getElementById("projectsPrevBtn");
  const projectsNextBtn = document.getElementById("projectsNextBtn");
  const projectsTrack = document.getElementById("projectsTrack");
  const projectsDots = document.getElementById("projectsDots");

  let toastTimer = null;

  // NOTIF ADDITIONAL WHEN YOU CLICK TO VIEW A FUNCTION
  function showToast(msg) {
    if (!globalToast) return;
    clearTimeout(toastTimer);
    globalToast.textContent = `[ ${msg} ]`;
    globalToast.className = "toast-visible";
    toastTimer = setTimeout(() => {
      globalToast.className = "toast-hidden";
    }, 2800);
  }

  // 2. SCROLL ANIMATION FOR HERO/HEADER
  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowH = window.innerHeight;

    // FADE EFFECT IMAGE
    if (heroContainer && heroImages.length) {
      const rect = heroContainer.getBoundingClientRect();
      const maxScroll = rect.height - windowH;
      if (maxScroll > 0) {
        const progress = Math.max(0, Math.min(1, -rect.top / maxScroll));
        const frame = progress * (heroImages.length - 1);
        heroImages.forEach((img, idx) => {
          const dist = Math.abs(frame - idx);
          const opacity = Math.max(0, Math.min(1, 1 - dist * 1.25));
          img.style.opacity = opacity.toFixed(2);
          img.style.visibility = opacity > 0.02 ? "visible" : "hidden";
        });
      }
    }

    // HEADER SCROLL EFFECT
    if (mainHeader) {
      mainHeader.classList.toggle("header-scrolled", scrollY > 40);
    }

    // GRADIENT POPUP WHEN SCROLL
    if (footerSection && footerGradientGlow) {
      const footerTop = footerSection.getBoundingClientRect().top;
      const trigger = windowH * 1.35;
      if (footerTop <= trigger) {
        const p = Math.min(1, Math.max(0, (trigger - footerTop) / (trigger - windowH * 0.2)));
        footerGradientGlow.classList.add("glow-active");
        footerGradientGlow.style.opacity = Math.min(1, p * 1.25).toFixed(2);
      } else {
        footerGradientGlow.classList.remove("glow-active");
        footerGradientGlow.style.opacity = "0";
      }
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // =========================================
  // SHARED CAROUSEL FACTORY
  // =========================================
  function createCarousel({ track, dots, prevBtn, nextBtn, cardSelector }) {
    const cards = track ? Array.from(track.querySelectorAll(cardSelector)) : [];
    const total = cards.length;
    let index = 0;
    let maxIndex = 0;

    function getCardsPerView() {
      const w = window.innerWidth;
      return w >= 1024 ? 3 : w >= 640 ? 2 : 1;
    }

    function renderDots() {
      if (!dots) return;
      dots.innerHTML = "";
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement("button");
        dot.className = `carousel-dot ${i === index ? "active" : ""}`;
        dot.setAttribute("aria-label", `Slide ${i + 1}`);
        dot.addEventListener("click", () => {
          index = i;
          apply();
        });
        dots.appendChild(dot);
      }
    }

    function apply() {
      if (!track || !cards.length) return;
      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = 24;
      track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;

      if (dots) {
        dots.querySelectorAll(".carousel-dot").forEach((d, idx) => {
          d.classList.toggle("active", idx === index);
        });
      }
    }

    function update() {
      const perView = getCardsPerView();
      maxIndex = Math.max(0, total - perView);
      index = Math.min(index, maxIndex);
      renderDots();
      apply();
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        index = index > 0 ? index - 1 : maxIndex;
        apply();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        index = index < maxIndex ? index + 1 : 0;
        apply();
      });
    }

    // Swipe + drag
    let startX = 0;
    let isDown = false;

    track?.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track?.addEventListener("touchend", e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) index = index < maxIndex ? index + 1 : 0;
        else index = index > 0 ? index - 1 : maxIndex;
        apply();
      }
    });

    track?.addEventListener("mousedown", e => {
      isDown = true;
      startX = e.clientX;
    });

    window.addEventListener("mouseup", e => {
      if (!isDown) return;
      isDown = false;
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) index = index < maxIndex ? index + 1 : 0;
        else index = index > 0 ? index - 1 : maxIndex;
        apply();
      }
    });

    return { update };
  }

  // Instantiate both carousels with the same factory
  const achievementsCarousel = createCarousel({
    track: achievementsTrack,
    dots: achieveDots,
    prevBtn: achievePrevBtn,
    nextBtn: achieveNextBtn,
    cardSelector: ".achievement-card"
  });

  const projectsCarousel = createCarousel({
    track: projectsTrack,
    dots: projectsDots,
    prevBtn: projectsPrevBtn,
    nextBtn: projectsNextBtn,
    cardSelector: ".achievement-card"
  });

  // Thin wrappers so existing tab functions keep working unchanged
  function updateCarousel() { achievementsCarousel.update(); }
  function updateProjectsCarousel() { projectsCarousel.update(); }

  // =========================================
  // TAB SWITCHING
  // =========================================
  function showProjectsTab(notify = true) {
    if (colorwaysDeck) colorwaysDeck.classList.remove("hidden");
    if (achievementsDeck) achievementsDeck.classList.add("hidden");
    if (reservePairBtn) {
      reservePairBtn.classList.remove("inactive");
      reservePairBtn.classList.add("active");
    }
    if (achievementsToggleBtn) achievementsToggleBtn.classList.remove("active");
    if (releaseBadge) releaseBadge.textContent = "[ WEB DEV PROJECTS ]";
    if (releaseHeading) releaseHeading.textContent = "Selected Projects & UI Works";
    if (notify) showToast("SHOWCASING WEB DEV & UI PROJECTS");
    setTimeout(updateProjectsCarousel, 40);
  }

  function showAchievementsTab(notify = true) {
    if (colorwaysDeck) colorwaysDeck.classList.add("hidden");
    if (achievementsDeck) achievementsDeck.classList.remove("hidden");
    if (reservePairBtn) {
      reservePairBtn.classList.add("inactive");
      reservePairBtn.classList.remove("active");
    }
    if (achievementsToggleBtn) achievementsToggleBtn.classList.add("active");
    if (releaseBadge) releaseBadge.textContent = "[ VERIFIED MILESTONES ]";
    if (releaseHeading) releaseHeading.textContent = "Achievements & Honors";
    if (notify) showToast("SHOWCASING ACHIEVEMENTS & MILESTONES");
    setTimeout(updateCarousel, 40);
  }

  if (reservePairBtn) {
    reservePairBtn.addEventListener("click", () => {
      showProjectsTab(true);
      document.getElementById("featuredDrop")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (achievementsToggleBtn) {
    achievementsToggleBtn.addEventListener("click", () => {
      showAchievementsTab(true);
      document.getElementById("featuredDrop")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // LINK DIRECT
  document.getElementById("navProjectsLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    showProjectsTab(false);
    document.getElementById("featuredDrop")?.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("navAchievementsLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    showAchievementsTab(false);
    document.getElementById("featuredDrop")?.scrollIntoView({ behavior: "smooth" });
  });

  // CLICKING CARD (product-card is no longer used in projects,
  // but this guard keeps it safe if used elsewhere)
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const title = card.querySelector(".product-title")?.textContent || "PROJECT";
      showToast(`OPENING ${title.toUpperCase()} DEMO`);
    });
  });

  // SMOOTH ANCHORING
  document.querySelectorAll("a[href^='#']").forEach(link => {
    if (["navProjectsLink", "navAchievementsLink"].includes(link.id)) return;
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        e.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // FOR THE HAPPY SYNTHESIZER MP4
  document.querySelectorAll("video").forEach(v => {
    v.addEventListener("error", () => {
      v.style.display = "none";
    });
    v.addEventListener("click", () => {
      if (v.paused) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  });

  window.addEventListener("resize", () => {
    onScroll();
    updateCarousel();
    updateProjectsCarousel();
  }, { passive: true });

  // Init
  onScroll();
  showProjectsTab(false);
  updateCarousel();
  updateProjectsCarousel();
});
