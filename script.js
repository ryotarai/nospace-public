(() => {
  const translations = {
    ja: {
      "meta.description": "打ち間違いや崩れたローマ字でも、AIで自然な日本語に。スペースキーを何度も打つ変換の手間を減らし、選んだ候補をそのままアプリへ挿入できます。",
      "document.title": "Nospace — もう、スペースキーで変換しない。",
      "skip.main": "本文へスキップ",
      "brand.homeLabel": "Nospaceのトップへ",
      "nav.label": "メインナビゲーション",
      "nav.flow": "しくみ",
      "nav.cost": "料金",
      "nav.privacy": "データと権限",
      "nav.download": "ダウンロード",
      "hero.title": "<span class=\"hero__headline-line hero__headline-line--ink\">もう、スペースキーで</span><br><em>変換しない。</em>",
      "hero.lede": "打ち間違いを気にせずに、ざっと入力するだけで、いい感じに変換できます。",
      "hero.privacyLink": "データの扱いを見る",
      "hero.note": "入力文は候補生成のために、選んだAPIへ。APIキーはmacOSのキーチェーンに保存。",
      "hero.shortcutLabel": "Shift Space で入力パネルを開く",
      "hero.visualAria": "Nospaceでローマ字を入力し、自然な日本語候補を選ぶデモ画面",
      "hero.demoLanguage": "日本語",
      "demo.input": "INPUT",
      "demo.rawInput": "ashitanokaiginosiryowo",
      "demo.resultOne": "明日の会議の資料を",
      "demo.resultTwo": "明日の会議資料を",
      "demo.resultThree": "明日の会議の資料について",
      "demo.select": "↑↓ 選択",
      "demo.insert": "↩ 挿入",
      "demo.close": "esc 閉じる",
      "hero.sr": "音声のないデモ動画で、ローマ字入力から自然な日本語候補を表示して選ぶ流れを確認できます。",
      "hero.visualFootInput": "打ち間違いのまま入力",
      "hero.visualFootSelect": "候補を選ぶだけ",
      "process.title": "入力を、<br><span>考える速さに。</span>",
      "process.lede": "キーを打つ。候補を選ぶ。文章が、いまの場所に戻る。余計な画面を行き来しないための入力パネルです。",
      "process.input.label": "INPUT",
      "process.input.title": "思いついたまま、<br>ローマ字で。",
      "process.input.text": "打ち間違えがあっても大丈夫。AIが文脈を見て自然な候補に整えます。",
      "process.input.example": "ashitanokaiginosiryowo",
      "process.reconstruct.label": "RECONSTRUCT",
      "process.reconstruct.title": "AIが自然な候補を、<br>5つ生成。",
      "process.reconstruct.text": "文脈に合わせた候補を並べるから、スペースキーを何度も打って変換の正解を探す時間が短くなります。",
      "process.reconstruct.example": "明日の会議の資料を",
      "process.insert.label": "INSERT",
      "process.insert.title": "選んだ文章を、<br>元のアプリへ。",
      "process.insert.text": "ショートカットで呼び出して、選択。テキストは元のフォーカス位置に戻ります。",
      "process.insert.app": "メモ",
      "process.insert.example": "明日の会議の資料を",
      "pricing.eyebrow": "COST / PER MANUSCRIPT",
      "pricing.title": "5ドルで、<br><span>原稿用紙約1万枚分。</span>",
      "pricing.lede": "Nospace自体の利用料はありません。実測した長文生成をもとに、5ドル分の目安を表示しています。",
      "pricing.callout.title": "これは実測ベースの目安です。",
      "pricing.callout.text": "モデルの価格・キャッシュ・契約条件が変わると、実際の請求額も変わります。",
      "pricing.ledger.unit": "LONG GENERATION / MEASURED",
      "pricing.ledger.estimate": "ESTIMATE / USD",
      "pricing.measure.title": "原稿用紙1枚分",
      "pricing.measure.text": "日本語1,238字<br>OUTPUT / 400字",
      "pricing.model.label": "MODEL",
      "pricing.model.detail": "システムプロンプト込み",
      "pricing.provider.meta": "実測レスポンス / 1回",
      "pricing.provider.estimate": "1回あたりの目安",
      "pricing.rate.input": "INPUT",
      "pricing.rate.cachedInput": "CACHED INPUT",
      "pricing.rate.unusedCachedInput": "0 tok × $0.02 / M",
      "pricing.rate.cacheWrite": "CACHE WRITE",
      "pricing.rate.output": "OUTPUT",
      "pricing.provider.link": "公式料金を見る",
      "pricing.provider.linkLabel": "GPT-5.6 Lunaの公式料金を見る（新しいタブ）",
      "pricing.assumptions.label": "MEASUREMENT",
      "pricing.assumptions.text": "システム指示3,981文字を含むResponses APIのリクエストを実測しました。入力1,156 / 出力986 tokens、出力1,238文字でした。原稿用紙1枚=400字として、1回=約3.1枚、5ドル=約3,400回=約1万枚と計算しています。",
      "pricing.priceNote.label": "PRICE NOTE",
      "pricing.priceNote.text": "短文脈料金（入力 $0.20 / M、cached input $0.02 / M、cache write $0.25 / M、出力 $1.20 / M）で、3 × $0.20 / M + 1,153 × $0.25 / M + 986 × $1.20 / M = $0.00147205 と計算しています。",
      "pricing.longContext.label": "PRICE CHANGES",
      "pricing.longContext.text": "長文脈では料金が異なる場合があります。モデル価格、割引、cacheの扱い、契約条件は変更される可能性があるため、実際の請求は公式料金と利用状況を確認してください。",
      "privacy.title": "Nospaceは<br><span>データを保持しません。</span>",
      "privacy.lede": "Nospaceは、選んだAPIを直接利用します。独自サーバーを経由しません。",
      "privacy.card.label": "API DESTINATION",
      "privacy.card.title": "入力文は、<br><strong>選んだAPIへ。</strong>",
      "privacy.card.text": "NospaceはOpenAI APIまたはOpenRouter APIを直接利用します。入力文と候補生成の指示は選択したAPIへ送信しますが、Nospaceの独自サーバーや他の場所には送りません。",
      "privacy.card.destination": "送信先",
      "privacy.card.request": "APIリクエスト",
      "privacy.card.tag": "独自サーバーには送信しません",
      "privacy.footnotes.keyTitle": "APIキー",
      "privacy.footnotes.keyText": "macOSのキーチェーンに保存します。",
      "privacy.footnotes.permissionTitle": "権限がないとき",
      "privacy.footnotes.permissionText": "候補はクリップボードから手動で貼り付けできます。",
      "privacy.footnotes.storageTitle": "アプリの保存",
      "privacy.footnotes.storageText": "入力と候補はディスクに保存しません。",
      "download.title": "次の一文を、<br><span>すぐ書こう。</span>",
      "download.lede": "macOS 14以降。すぐに始められます。",
      "download.linkLabel": "Nospaceをダウンロード（新しいタブ）",
      "footer.tagline": "入力を、考える速さに。"
    }
  };

  const applyTranslations = () => {
    const dictionary = translations.ja;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value !== undefined) {
        element.textContent = value;
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = dictionary[element.dataset.i18nHtml];
      if (value !== undefined) {
        element.innerHTML = value;
      }
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const value = dictionary[element.dataset.i18nAriaLabel];
      if (value !== undefined) {
        element.setAttribute("aria-label", value);
      }
    });
    document.querySelectorAll("[data-i18n-content]").forEach((element) => {
      const value = dictionary[element.dataset.i18nContent];
      if (value !== undefined) {
        element.setAttribute("content", value);
      }
    });
  };

  applyTranslations();

  const video = document.querySelector("#hero-video");
  const media = video?.closest(".hero-media");
  const videoToggle = document.querySelector("[data-video-toggle]");
  const videoToggleLabel = videoToggle?.querySelector("[data-video-toggle-label]");
  const videoToggleIcon = videoToggle?.querySelector(".hero-video-toggle__icon");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  let isVideoVisible = true;
  let isUserPaused = false;

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = targetId ? document.querySelector(targetId) : null;

      if (!target || motionQuery.matches) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", targetId);
    });
  });

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
    videoToggleLabel.textContent = isPaused ? "PLAY" : "PAUSE";
    videoToggleIcon.textContent = isPaused ? "▶" : "Ⅱ";
    videoToggle.setAttribute(
      "aria-label",
      isPaused ? "デモ動画を再生" : "デモ動画を一時停止"
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

  syncMotionPreference();
  updateVideoToggle();

  videoToggle?.addEventListener("click", () => {
    isUserPaused = !video.paused;
    syncPlayback();
  });

  if ("IntersectionObserver" in window) {
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
