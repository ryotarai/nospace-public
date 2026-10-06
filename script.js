(() => {
  document.documentElement?.setAttribute("data-js-enabled", "true");

  const fallbackDemoCopy = {
    "hero.demoTogglePause": "デモ動画を一時停止",
    "hero.demoTogglePlay": "デモ動画を再生",
    "hero.demoPause": "一時停止",
    "hero.demoPlay": "再生"
  };

  const localization = window.NospaceLocalization || {};
  const translations = localization.translations || {};
  const resolveLocale = localization.resolveLocale || (() => "ja");

  const getPreferredLanguages = () => {
    if (Array.isArray(window.nospacePreferredLanguages)) {
      return window.nospacePreferredLanguages;
    }

    if (typeof navigator !== "undefined") {
      if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
        return navigator.languages;
      }
      if (navigator.language) {
        return [navigator.language];
      }
    }

    return [];
  };

  const languageStorageKey = "nospace-website-language";
  const isSupportedLocale = (value) => Object.prototype.hasOwnProperty.call(translations, value);
  const readSavedLanguage = () => {
    try {
      const saved = localStorage.getItem(languageStorageKey);
      return isSupportedLocale(saved) ? saved : null;
    } catch {
      return null;
    }
  };
  let locale = readSavedLanguage() || resolveLocale(getPreferredLanguages());
  let dictionary = translations[locale] || translations.ja || fallbackDemoCopy;
  const fallbackDictionary = translations.en || translations.ja || fallbackDemoCopy;
  const textFor = (key) => {
    const value = dictionary[key] ?? fallbackDictionary[key];
    return value === undefined ? undefined : value;
  };

  const applyTranslations = () => {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = textFor(element.dataset.i18n);
      if (value !== undefined) {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = textFor(element.dataset.i18nHtml);
      if (value !== undefined) {
        element.innerHTML = value;
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const value = textFor(element.dataset.i18nAriaLabel);
      if (value !== undefined) {
        element.setAttribute("aria-label", value);
      }
    });

    document.querySelectorAll("[data-i18n-content]").forEach((element) => {
      const value = textFor(element.dataset.i18nContent);
      if (value !== undefined) {
        element.setAttribute("content", value);
      }
    });
  };

  const updatePolicyLinks = () => {
    const policyLanguage = {
      ja: "ja",
      en: "en",
      "zh-Hans": "zh-CN",
      "zh-Hant": "zh-TW",
      es: "es",
      hi: "hi",
      pt: "pt-BR",
      fr: "fr",
      it: "it"
    }[locale] || "en";

    document.querySelectorAll("[data-policy-link]").forEach((link) => {
      try {
        const url = new URL(link.href, document.baseURI);
        url.searchParams.set("hl", policyLanguage);
        link.href = url.toString();
      } catch {
        // Keep the source link when URL APIs are unavailable.
      }
    });
  };

  let refreshVideoToggle = () => {};
  const languageSelector = document.querySelector("[data-language-selector]");
  const languageLabels = {
    ja: "表示言語", en: "Display language", "zh-Hans": "显示语言",
    "zh-Hant": "顯示語言", es: "Idioma", hi: "भाषा",
    pt: "Idioma", fr: "Langue", it: "Lingua"
  };
  const applyLocale = () => {
    document.documentElement?.setAttribute("lang", locale);
    document.documentElement?.setAttribute("data-locale", locale);
    window.nospaceWebsiteLocale = locale;
    applyTranslations();
    updatePolicyLinks();
    if (languageSelector) {
      languageSelector.value = locale;
      languageSelector.setAttribute("aria-label", languageLabels[locale] || "Display language");
    }
    refreshVideoToggle();
  };
  if (languageSelector) {
    languageSelector.hidden = false;
    languageSelector.addEventListener("change", () => {
      if (!isSupportedLocale(languageSelector.value)) return;
      locale = languageSelector.value;
      dictionary = translations[locale];
      try { localStorage.setItem(languageStorageKey, locale); } catch {
        // The selection still applies for this visit when storage is unavailable.
      }
      applyLocale();
    });
  }
  applyLocale();
  window.nospaceWebsite = {
    get locale() { return locale; },
    get dictionary() { return dictionary; },
    translations, resolveLocale
  };

  const consentStorageKey = "nospace-analytics-consent";
  const consentBanner = document.querySelector("[data-consent-banner]");
  const consentHeading = document.querySelector("#consent-title");
  const consentChoiceButtons = document.querySelectorAll("[data-consent-choice]");
  const consentSettingsButtons = document.querySelectorAll("[data-consent-settings]");
  let consentReturnFocus = null;

  const readConsent = () => {
    try {
      const savedConsent = localStorage.getItem(consentStorageKey);
      return savedConsent === "granted" || savedConsent === "denied"
        ? savedConsent
        : null;
    } catch {
      return null;
    }
  };

  const showConsentBanner = ({ moveFocus = false } = {}) => {
    if (!consentBanner) {
      return;
    }

    consentBanner.hidden = false;
    if (moveFocus) {
      consentHeading?.focus();
    }
  };

  const hideConsentBanner = () => {
    if (!consentBanner) {
      return;
    }

    consentBanner.hidden = true;
    if (typeof HTMLElement !== "undefined" && consentReturnFocus instanceof HTMLElement) {
      consentReturnFocus.focus();
    }
    consentReturnFocus = null;
  };

  const updateAnalyticsConsent = (choice) => {
    try {
      localStorage.setItem(consentStorageKey, choice);
    } catch {
      // The current-page choice still applies when storage is unavailable.
    }

    window.nospaceAnalyticsConsent = choice;
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: choice,
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    }
    hideConsentBanner();
  };

  consentChoiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.consentChoice;
      if (choice === "granted" || choice === "denied") {
        updateAnalyticsConsent(choice);
      }
    });
  });

  consentSettingsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      consentReturnFocus = button;
      showConsentBanner({ moveFocus: true });
    });
  });

  if (readConsent() === null) {
    showConsentBanner();
  }

  const motionQuery = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false, addEventListener() {}, addListener() {} };
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = targetId ? document.querySelector(targetId) : null;

      if (!target || motionQuery.matches) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history?.pushState?.(null, "", targetId);
    });
  });

  const video = document.querySelector("[data-hero-video]");
  const media = video?.closest?.(".hero-media");
  const videoToggle = document.querySelector("[data-video-toggle]");
  const videoToggleLabel = videoToggle?.querySelector("[data-video-toggle-label]");
  const videoToggleIcon = videoToggle?.querySelector(".hero-video-toggle__icon");
  let isVideoVisible = true;
  let isUserPaused = false;

  if (!video || !media) {
    return;
  }

  const setVideoState = (state) => {
    media.dataset.videoState = state;
    if (videoToggle) {
      videoToggle.disabled = state !== "ready" || motionQuery.matches;
    }
  };

  const updateVideoToggle = () => {
    if (!videoToggle || !videoToggleLabel || !videoToggleIcon) {
      return;
    }

    const isPaused = isUserPaused || video.paused;
    videoToggleLabel.textContent = textFor(isPaused ? "hero.demoPlay" : "hero.demoPause");
    videoToggleIcon.textContent = isPaused ? "▶" : "Ⅱ";
    videoToggle.setAttribute(
      "aria-label",
      textFor(isPaused ? "hero.demoTogglePlay" : "hero.demoTogglePause")
    );
  };

  const pauseVideo = () => {
    video.pause();
    updateVideoToggle();
  };

  const playVideo = () => {
    if (
      motionQuery.matches ||
      isUserPaused ||
      !isVideoVisible ||
      document.visibilityState !== "visible" ||
      media.dataset.videoState !== "ready"
    ) {
      return;
    }

    const playback = video.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {
        updateVideoToggle();
      });
    }
  };

  const syncPlayback = () => {
    if (
      motionQuery.matches ||
      isUserPaused ||
      !isVideoVisible ||
      document.visibilityState !== "visible"
    ) {
      pauseVideo();
      return;
    }

    playVideo();
  };

  const syncMotionPreference = () => {
    if (motionQuery.matches) {
      media.dataset.motion = "reduced";
      pauseVideo();
    } else {
      media.dataset.motion = "normal";
    }

    if (videoToggle) {
      videoToggle.disabled =
        media.dataset.videoState !== "ready" || motionQuery.matches;
    }
  };

  const handleVideoReady = () => {
    setVideoState("ready");
    syncPlayback();
  };

  video.addEventListener("loadeddata", handleVideoReady);
  video.addEventListener("play", updateVideoToggle);
  video.addEventListener("pause", updateVideoToggle);
  video.addEventListener("error", () => {
    setVideoState("failed");
    pauseVideo();
  });

  refreshVideoToggle = updateVideoToggle;
  syncMotionPreference();
  updateVideoToggle();

  videoToggle?.addEventListener("click", () => {
    isUserPaused = !video.paused;
    syncPlayback();
  });

  if (typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVideoVisible =
          entry.isIntersecting && entry.intersectionRatio >= 0.3;
        syncPlayback();
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
  } else {
    syncPlayback();
  }

  const handleMotionChange = () => {
    syncMotionPreference();
    syncPlayback();
  };

  if (typeof motionQuery.addEventListener === "function") {
    motionQuery.addEventListener("change", handleMotionChange);
  } else if (typeof motionQuery.addListener === "function") {
    motionQuery.addListener(handleMotionChange);
  }

  document.addEventListener("visibilitychange", () => {
    syncPlayback();
  });

  if (video.readyState >= 2) {
    handleVideoReady();
  }

})();
