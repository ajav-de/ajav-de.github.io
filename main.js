
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
  const achievePrevBtn = document.getElementById("achievePrevBtn");
  const achieveNextBtn = document.getElementById("achieveNextBtn");
  const achievementsTrack = document.getElementById("achievementsTrack");
  const achieveDots = document.getElementById("achieveDots");

  let toastTimer = null;
  let carouselIndex = 0;
  let maxCarouselIndex = 0;
  const achievementCards = achievementsTrack ? Array.from(achievementsTrack.querySelectorAll(".achievement-card")) : [];
  const totalCards = achievementCards.length;

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

  // FOR SWITCHING IN PROJECTS AND ACHIEVEMENTS
  function showProjectsTab(notify = true) {
    if (colorwaysDeck) colorwaysDeck.style.display = "grid";
    if (achievementsDeck) achievementsDeck.classList.add("hidden");
    if (reservePairBtn) {
      reservePairBtn.classList.remove("inactive");
      reservePairBtn.classList.add("active");
    }
    if (achievementsToggleBtn) achievementsToggleBtn.classList.remove("active");
    if (releaseBadge) releaseBadge.textContent = "[ WEB DEV PROJECTS ]";
    if (releaseHeading) releaseHeading.textContent = "Selected Projects & UI Works";
    if (notify) showToast("SHOWCASING WEB DEV & UI PROJECTS");
  }

  function showAchievementsTab(notify = true) {
    if (colorwaysDeck) colorwaysDeck.style.display = "none";
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

  // CLICKING CARD
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const title = card.querySelector(".product-title")?.textContent || "PROJECT";
      showToast(`OPENING ${title.toUpperCase()} DEMO`);
    });
  });

  // AMOOTH ANCHORING
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

  // ACHIEVEMENT CARDS
  function getCardsPerView() {
    const w = window.innerWidth;
    return w >= 1024 ? 3 : w >= 640 ? 2 : 1;
  }

  function updateCarousel() {
    const perView = getCardsPerView();
    maxCarouselIndex = Math.max(0, totalCards - perView);
    carouselIndex = Math.min(carouselIndex, maxCarouselIndex);
    renderDots();
    applyCarousel();
  }

  function renderDots() {
    if (!achieveDots) return;
    achieveDots.innerHTML = "";
    for (let i = 0; i <= maxCarouselIndex; i++) {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${i === carouselIndex ? "active" : ""}`;
      dot.setAttribute("aria-label", `Slide ${i + 1}`);
      dot.addEventListener("click", () => {
        carouselIndex = i;
        applyCarousel();
      });
      achieveDots.appendChild(dot);
    }
  }

  function applyCarousel() {
    if (!achievementsTrack || !achievementCards.length) return;
    const cardWidth = achievementCards[0].getBoundingClientRect().width;
    const gap = 24;
    achievementsTrack.style.transform = `translateX(-${carouselIndex * (cardWidth + gap)}px)`;

    if (achieveDots) {
      achieveDots.querySelectorAll(".carousel-dot").forEach((d, idx) => {
        d.classList.toggle("active", idx === carouselIndex);
      });
    }
  }

  if (achievePrevBtn) {
    achievePrevBtn.addEventListener("click", () => {
      carouselIndex = carouselIndex > 0 ? carouselIndex - 1 : maxCarouselIndex;
      applyCarousel();
    });
  }

  if (achieveNextBtn) {
    achieveNextBtn.addEventListener("click", () => {
      carouselIndex = carouselIndex < maxCarouselIndex ? carouselIndex + 1 : 0;
      applyCarousel();
    });
  }

  // TOUCH SWIPRE AND DRAG FOR THE CARDS
  let startX = 0;
  let isDown = false;

  achievementsTrack?.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  achievementsTrack?.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) carouselIndex = carouselIndex < maxCarouselIndex ? carouselIndex + 1 : 0;
      else carouselIndex = carouselIndex > 0 ? carouselIndex - 1 : maxCarouselIndex;
      applyCarousel();
    }
  });

  achievementsTrack?.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.clientX;
  });

  window.addEventListener("mouseup", e => {
    if (!isDown) return;
    isDown = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) carouselIndex = carouselIndex < maxCarouselIndex ? carouselIndex + 1 : 0;
      else carouselIndex = carouselIndex > 0 ? carouselIndex - 1 : maxCarouselIndex;
      applyCarousel();
    }
  });

  window.addEventListener("resize", () => {
    onScroll();
    updateCarousel();
  }, { passive: true });

  // Init
  onScroll();
  showProjectsTab(false);
  updateCarousel();
});
