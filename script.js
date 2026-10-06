(() => {
  document.documentElement?.setAttribute("data-js-enabled", "true");

  const fallbackDemoCopy = {
    "hero.demoTogglePause": "デモアニメーションを一時停止",
    "hero.demoTogglePlay": "デモアニメーションを再生",
    "hero.demoPause": "一時停止",
    "hero.demoPlay": "再生",
    "hero.demoPanelInputPlaceholder": "ローマ字で入力…",
    "hero.demoPanelLanguageTarget": "日本語",
    "hero.demoPanelConvert": "変換",
    "hero.demoPanelShortcuts": "↪ 改行",
    "hero.demoPanelLoading": "自然な日本語に変換しています",
    "hero.demoPanelCancel": "キャンセル",
    "hero.demoPanelCandidateCount": "{count} 件の候補",
    "hero.demoPanelCandidateCountOne": "{count} 件の候補",
    "hero.demoPanelAdjust": "調整",
    "hero.demoPanelRegenerate": "再生成",
    "hero.demoPanelAddDictionary": "単語を登録",
    "hero.demoPanelEdit": "編集　↪",
    "hero.demoPanelTranslate": "翻訳　⌘T",
    "hero.demoPanelSelect": "↑↓ 選択",
    "hero.demoPanelInsert": "↵ 挿入",
    "hero.demoPanelClose": "esc 閉じる",
    "hero.demoEditorStatus": "行: 1　文字: 0　位置: 0",
    "demo.rawInput": "nospacenara,utimatigeegaattemo,omoituitakotobawosubayakusizennnabunnsyounikaetekuremasu",
    "demo.resultOne": "Nospaceなら、打ち間違いがあっても、思いついた言葉を素早く自然な文章に変えてくれます。",
    "demo.resultTwo": "Nospaceなら、打ち間違いがあっても、思い付いた言葉を素早く自然な文章に変えてくれます。",
    "demo.resultThree": "Nospaceなら、誤字があっても、思いついた言葉を素早く自然な文章に変えてくれます。",
    "demo.resultFour": "Nospaceなら、打ち間違いがあっても、思いついたことを素早く自然な文章に変えてくれます。",
    "demo.resultFive": "Nospaceなら、少し崩れた入力でも、伝えたいことを自然な文章にできます。",
    "demo.resultSix": "Nospaceなら、急いで入力した言葉も、読みやすい文章に整えられます。",
    "demo.resultSeven": "Nospaceなら、考えたことをそのまま入力して、自然な文に仕上げられます。",
    "demo.resultEight": "Nospaceなら、多少の打ち間違いがあっても、文章の流れを保てます。",
    "demo.editorText": "Nospaceなら、打ち間違いがあっても、思いついた言葉を素早く自然な文章に変えてくれます。"
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

  const locale = resolveLocale(getPreferredLanguages());
  const dictionary = translations[locale] || translations.ja || fallbackDemoCopy;
  const fallbackDictionary = translations.en || translations.ja || fallbackDemoCopy;
  const textFor = (key) => {
    const value = dictionary[key] ?? fallbackDictionary[key];
    return value === undefined ? undefined : value;
  };

  document.documentElement?.setAttribute("lang", locale);
  document.documentElement?.setAttribute("data-locale", locale);
  window.nospaceWebsiteLocale = locale;

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

    document.querySelectorAll("[data-demo-language-target]").forEach((element) => {
      element.textContent = textFor("hero.demoPanelLanguageTarget");
    });
    document.querySelectorAll("[data-demo-language-secondary]").forEach((element) => {
      element.textContent = locale === "en"
        ? "日本語"
        : textFor("hero.demoPanelLanguageEnglish");
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

  applyTranslations();
  updatePolicyLinks();

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

  const DEMO_DURATION = 25600;
  const DEMO_PHASES = {
    inputStart: 1800,
    typingStart: 2200,
    processingStart: 14350,
    candidatesStart: 17300,
    insertedStart: 19580
  };

  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);
  const candidateKeyNames = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

  const formatEditorStatus = (template, text) => {
    const characterCount = Array.from(text).length;
    return String(template || "").replaceAll("0", String(characterCount));
  };

  const getDemoFrame = (elapsed, copy = dictionary) => {
    const rawInput = copy["demo.rawInput"] || "";
    const candidates = candidateKeyNames.map((suffix) => copy[`demo.result${suffix}`] || "");
    const normalizedElapsed = ((Number(elapsed) % DEMO_DURATION) + DEMO_DURATION) % DEMO_DURATION;
    let phase = "idle";
    let input = "";
    let inputProgress = 0;

    if (normalizedElapsed >= DEMO_PHASES.inputStart && normalizedElapsed < DEMO_PHASES.processingStart) {
      phase = "input";
      if (normalizedElapsed >= DEMO_PHASES.typingStart) {
        inputProgress = clamp(
          (normalizedElapsed - DEMO_PHASES.typingStart) / (DEMO_PHASES.processingStart - DEMO_PHASES.typingStart),
          0,
          1
        );
        input = rawInput.slice(0, Math.floor(rawInput.length * inputProgress));
      }
    } else if (normalizedElapsed >= DEMO_PHASES.processingStart && normalizedElapsed < DEMO_PHASES.candidatesStart) {
      phase = "processing";
      input = rawInput;
      inputProgress = 1;
    } else if (normalizedElapsed >= DEMO_PHASES.candidatesStart && normalizedElapsed < DEMO_PHASES.insertedStart) {
      phase = "candidates";
      input = rawInput;
      inputProgress = 1;
    } else if (normalizedElapsed >= DEMO_PHASES.insertedStart) {
      phase = "inserted";
      input = rawInput;
      inputProgress = 1;
    }

    const editorText = phase === "inserted" ? copy["demo.editorText"] || candidates[0] : "";
    const candidateCount = phase === "candidates"
      ? normalizedElapsed < DEMO_PHASES.candidatesStart + 900 ? 1 : 8
      : 0;

    return {
      elapsed: normalizedElapsed,
      phase,
      input,
      inputProgress,
      placeholder: phase === "input" && normalizedElapsed < DEMO_PHASES.typingStart,
      candidates,
      candidateCount,
      editorText,
      editorStats: phase === "inserted"
        ? formatEditorStatus(copy["hero.demoEditorStatus"], editorText)
        : copy["hero.demoEditorStatus"] || ""
    };
  };

  const setText = (element, value) => {
    if (element) {
      element.textContent = value;
    }
  };

  const createDemoController = (media, copy = dictionary) => {
    const root = media?.querySelector?.("[data-demo-root]");
    if (!media || !root) {
      return null;
    }

    const input = root.querySelector("[data-demo-input]");
    const editorText = root.querySelector("[data-demo-editor-text]");
    const editorStatus = root.querySelector("[data-demo-editor-status]");
    const candidateCount = root.querySelector("[data-demo-candidate-count]");
    const inputPreview = root.querySelector("[data-demo-input-preview]");
    const candidateText = root.querySelectorAll("[data-demo-candidate-text]");
    const candidates = root.querySelectorAll("[data-demo-candidate]");
    const loading = root.querySelector("[data-demo-loading]");
    const caret = root.querySelector("[data-demo-input-caret]");
    let elapsed = 0;
    let lastTimestamp = null;
    let playing = false;
    let animationFrame = null;

    const requestFrame = (callback) => {
      if (typeof window.requestAnimationFrame === "function") {
        return window.requestAnimationFrame(callback);
      }
      if (typeof window.setTimeout === "function") {
        return window.setTimeout(() => callback(Date.now()), 16);
      }
      return null;
    };

    const cancelFrame = (frame) => {
      if (frame === null || frame === undefined) {
        return;
      }
      if (typeof window.cancelAnimationFrame === "function") {
        window.cancelAnimationFrame(frame);
      } else if (typeof window.clearTimeout === "function") {
        window.clearTimeout(frame);
      }
    };

    const renderAt = (nextElapsed) => {
      elapsed = ((Number(nextElapsed) % DEMO_DURATION) + DEMO_DURATION) % DEMO_DURATION;
      const frame = getDemoFrame(elapsed, copy);
      media.dataset.demoPhase = frame.phase;
      media.dataset.demoCandidateCount = String(frame.candidateCount);
      media.dataset.demoState = "ready";

      if (input) {
        input.dataset.demoPlaceholder = String(frame.placeholder);
        setText(input, frame.placeholder ? copy["hero.demoPanelInputPlaceholder"] : frame.input);
      }
      setText(inputPreview, frame.input);
      const countKey = frame.candidateCount === 1
        ? "hero.demoPanelCandidateCountOne"
        : "hero.demoPanelCandidateCount";
      setText(candidateCount, (copy[countKey] || copy["hero.demoPanelCandidateCount"] || "{count}").replace("{count}", String(frame.candidateCount || 1)));
      setText(editorText, frame.editorText);
      setText(editorStatus, frame.editorStats);
      candidateText.forEach((element, index) => setText(element, frame.candidates[index] || ""));
      candidates.forEach((element, index) => {
        const isVisible = frame.phase === "candidates" && index < frame.candidateCount;
        element.classList.toggle("is-visible", isVisible);
        element.classList.toggle("is-selected", isVisible && index === 0);
      });
      loading?.setAttribute("aria-hidden", String(frame.phase !== "processing"));
      caret?.setAttribute("aria-hidden", String(frame.phase !== "input"));
      return frame;
    };

    const tick = (timestamp) => {
      if (!playing) {
        return;
      }
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      } else {
        elapsed += Math.max(0, timestamp - lastTimestamp);
        lastTimestamp = timestamp;
      }
      renderAt(elapsed);
      animationFrame = requestFrame(tick);
    };

    const play = () => {
      if (playing) {
        return;
      }
      playing = true;
      lastTimestamp = null;
      animationFrame = requestFrame(tick);
    };

    const pause = () => {
      playing = false;
      lastTimestamp = null;
      cancelFrame(animationFrame);
      animationFrame = null;
    };

    renderAt(0);

    return {
      play,
      pause,
      renderAt,
      isPlaying: () => playing,
      getElapsed: () => elapsed,
      destroy: pause
    };
  };

  window.nospaceWebsite = {
    locale,
    dictionary,
    translations,
    resolveLocale,
    getDemoFrame,
    createDemoController,
    demoDuration: DEMO_DURATION,
    demoPhases: DEMO_PHASES
  };

  const media = document.querySelector("[data-demo-root]")?.closest?.(".hero-media");
  const demoToggle = document.querySelector("[data-demo-toggle]");
  const demoToggleLabel = demoToggle?.querySelector("[data-demo-toggle-label]");
  const demoToggleIcon = demoToggle?.querySelector(".hero-demo-toggle__icon");

  if (!media) {
    return;
  }

  const controller = createDemoController(media, dictionary);
  let isDemoVisible = true;
  let isUserPaused = false;

  const updateDemoToggle = () => {
    if (!demoToggle || !demoToggleLabel || !demoToggleIcon || !controller) {
      return;
    }

    const isPlaying = controller.isPlaying();
    demoToggleLabel.textContent = isPlaying ? textFor("hero.demoPause") : textFor("hero.demoPlay");
    demoToggleIcon.textContent = isPlaying ? "Ⅱ" : "▶";
    demoToggle.setAttribute(
      "aria-label",
      textFor(isPlaying ? "hero.demoTogglePause" : "hero.demoTogglePlay")
    );
  };

  const shouldPlay = () => (
    !motionQuery.matches &&
    !isUserPaused &&
    isDemoVisible &&
    document.visibilityState !== "hidden"
  );

  const syncPlayback = () => {
    if (shouldPlay()) {
      controller.play();
    } else {
      controller.pause();
    }
    updateDemoToggle();
  };

  const syncMotionPreference = () => {
    media.dataset.motion = motionQuery.matches ? "reduced" : "normal";
    if (motionQuery.matches) {
      controller.pause();
      controller.renderAt(DEMO_DURATION - 1);
    }
    if (demoToggle) {
      demoToggle.disabled = motionQuery.matches;
    }
    updateDemoToggle();
  };

  demoToggle?.addEventListener("click", () => {
    isUserPaused = !isUserPaused;
    syncPlayback();
  });

  if (typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isDemoVisible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
        syncPlayback();
      },
      { threshold: 0.3 }
    );
    observer.observe(media);
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

  document.addEventListener?.("visibilitychange", syncPlayback);
  syncMotionPreference();
  syncPlayback();
})();
