(() => {
  const TRIAL_WINDOW_MS = 4000;
  const RECORDING_BEEP_MS = 180;
  const RECORDING_BEEP_HZ = 1000;
  const RECORDING_BEEP_GAIN = 0.06;
  const EXPERIMENT_VERSION = "learning_phase_v5.0.0";
  const EXPERIMENT_BUILD_DATE = "2026-04-14";
  const RECOVERY_DB_NAME = "accentedness_learning_recovery";
  const RECOVERY_DB_VERSION = 1;
  const RECOVERY_SESSIONS_STORE = "sessions";
  const RECOVERY_TRIALS_STORE = "trials";
  const RECOVERY_BY_SESSION_INDEX = "by_session";

  const NATIVE_LANGUAGES = {
    english: { id: "english", label: "English", labelJa: "英語" },
    japanese: { id: "japanese", label: "Japanese", labelJa: "日本語" },
    chinese: { id: "chinese", label: "Chinese", labelJa: "中国語" },
  };

  const TALKERS = [
    { id: "m1_guy", label: "M1 (Guy)" },
    { id: "f1_aria", label: "F1 (Aria)" },
  ];

  const PRACTICE_ITEMS = [
    {
      word: "coffee",
      audioPath: "../practice_calibration/coffee.wav",
      labels: { english: "coffee", japanese: "コーヒー", chinese: "咖啡" },
    },
    {
      word: "pizza",
      audioPath: "../practice_calibration/pizza.wav",
      labels: { english: "pizza", japanese: "ピザ", chinese: "披萨" },
    },
    {
      word: "sofa",
      audioPath: "../practice_calibration/sofa.wav",
      labels: { english: "sofa", japanese: "ソファ", chinese: "沙发" },
    },
    {
      word: "chocolate",
      audioPath: "../practice_calibration/chocolate.wav",
      labels: { english: "chocolate", japanese: "チョコレート", chinese: "巧克力" },
    },
  ];

  const STIMULI = [
    { word: "icicle", jp: "つらら", list: 1 },
    { word: "thermometer", jp: "温度計", list: 1 },
    { word: "abacus", jp: "そろばん", list: 1 },
    { word: "acorn", jp: "どんぐり", list: 1 },
    { word: "binoculars", jp: "双眼鏡", list: 1 },
    { word: "persimmon", jp: "柿", list: 1 },
    { word: "mantis", jp: "カマキリ", list: 1 },
    { word: "carousel", jp: "メリーゴーラウンド", list: 1 },
    { word: "syringe", jp: "注射器", list: 1 },
    { word: "burdock", jp: "ごぼう", list: 1 },
    { word: "cobweb", jp: "クモの巣", list: 1 },
    { word: "faucet", jp: "蛇口", list: 1 },
    { word: "tadpole", jp: "オタマジャクシ", list: 1 },
    { word: "tweezers", jp: "ピンセット", list: 1 },
    { word: "rickshaw", jp: "人力車", list: 1 },
    { word: "abalone", jp: "アワビ", list: 1 },
    { word: "raccoon", jp: "アライグマ", list: 1 },
    { word: "ladle", jp: "おたま", list: 1 },
    { word: "xylophone", jp: "木琴", list: 1 },
    { word: "protractor", jp: "分度器", list: 1 },
    { word: "toupee", jp: "かつら", list: 1 },
    { word: "treadmill", jp: "ランニングマシン", list: 1 },
    { word: "cicada", jp: "セミ", list: 1 },
    { word: "lawnmower", jp: "芝刈り機", list: 1 },
    { word: "burglar", jp: "泥棒", list: 1 },
    { word: "toboggan", jp: "そり", list: 2 },
    { word: "porcupine", jp: "ヤマアラシ", list: 2 },
    { word: "razor", jp: "カミソリ", list: 2 },
    { word: "cocoon", jp: "繭、かいこ", list: 2 },
    { word: "wardrobe", jp: "タンス", list: 2 },
    { word: "detergent", jp: "洗剤", list: 2 },
    { word: "parakeet", jp: "インコ", list: 2 },
    { word: "scallop", jp: "ホタテ", list: 2 },
    { word: "walrus", jp: "セイウチ", list: 2 },
    { word: "podium", jp: "表彰台", list: 2 },
    { word: "casket", jp: "棺", list: 2 },
    { word: "pacifier", jp: "おしゃぶり", list: 2 },
    { word: "scalpel", jp: "メス", list: 2 },
    { word: "spatula", jp: "フライ返し", list: 2 },
    { word: "scapula", jp: "肩甲骨", list: 2 },
    { word: "pupa", jp: "蛹", list: 2 },
    { word: "nostril", jp: "鼻の穴", list: 2 },
    { word: "labyrinth", jp: "迷宮", list: 2 },
    { word: "loquat", jp: "ビワ", list: 2 },
    { word: "pylon", jp: "鉄塔", list: 2 },
    { word: "lotus", jp: "ハス", list: 2 },
    { word: "capelin", jp: "ししゃも", list: 2 },
    { word: "strainer", jp: "ざる", list: 2 },
    { word: "chisel", jp: "彫刻刀", list: 2 },
    { word: "catapult", jp: "投石機", list: 2 },
  ];

  const LIST1 = STIMULI.filter((s) => s.list === 1);
  const LIST2 = STIMULI.filter((s) => s.list === 2);

  const preloadBtn = document.getElementById("preload-btn");
  const volumeCheckBtn = document.getElementById("volume-check-btn");
  const startPassBtn = document.getElementById("start-pass-btn");
  const redownloadZipBtn = document.getElementById("redownload-zip-btn");
  const participantInput = document.getElementById("participant-id");
  const nativeLanguageSelect = document.getElementById("native-language");
  const configEl = document.getElementById("config");
  const statusEl = document.getElementById("status");
  const logEl = document.getElementById("log");
  const progressEl = document.getElementById("progress");
  const progressFillEl = document.getElementById("progress-fill");
  const progressLabelEl = document.getElementById("progress-label");
  const mainDisplayEl = document.getElementById("main-display");
  const jpWordEl = document.getElementById("jp-word");
  const trialHintEl = document.getElementById("trial-hint");
  const trialTimerEl = document.getElementById("trial-timer");
  const trialTimerFillEl = document.getElementById("trial-timer-fill");
  const messageEl = document.getElementById("message");
  const trialActionsEl = document.getElementById("trial-actions");
  const acceptRecordingBtn = document.getElementById("accept-recording-btn");
  const retakeRecordingBtn = document.getElementById("retake-recording-btn");
  const micCheckEl = document.getElementById("mic-check");
  const micMeterFillEl = document.getElementById("mic-meter-fill");

  let preparedSession = null;
  let lastZipBlob = null;
  let lastZipName = "";
  let isRunning = false;
  let volumeCheckCompleted = false;
  let micMeterRaf = null;

  window.addEventListener("beforeunload", (e) => {
    if (!isRunning) return;
    e.preventDefault();
    e.returnValue = "このページを離れると実験が中断されます。";
  });

  const setStatus = (txt) => {
    statusEl.textContent = txt;
  };

  const setLog = (txt) => {
    logEl.textContent = txt;
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function pad2(value) {
    return String(value).padStart(2, "0");
  }

  function pad3(value) {
    return String(value).padStart(3, "0");
  }

  function pad4(value) {
    return String(value).padStart(4, "0");
  }

  async function playRecordingStartBeep() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!playRecordingStartBeep.ctx || playRecordingStartBeep.ctx.state === "closed") {
      playRecordingStartBeep.ctx = new Ctx();
    }

    const ctx = playRecordingStartBeep.ctx;
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    const now = ctx.currentTime;
    const durationSec = RECORDING_BEEP_MS / 1000;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(RECORDING_BEEP_HZ, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(RECORDING_BEEP_GAIN, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    await new Promise((resolve) => {
      oscillator.onended = resolve;
      oscillator.start(now);
      oscillator.stop(now + durationSec);
    });
  }

  function hideTrialActions() {
    if (trialActionsEl) trialActionsEl.classList.add("hidden");
  }

  function showMessage(text) {
    stopTrialTimer();
    hideTrialActions();
    mainDisplayEl.style.display = "none";
    messageEl.textContent = text;
    messageEl.style.display = "block";
    document.body.classList.remove("presenting");
  }

  function showStimulus(trial, pass, takeNo) {
    hideTrialActions();
    messageEl.style.display = "none";
    mainDisplayEl.style.display = "flex";
    jpWordEl.textContent = trial.displayText || trial.jp;
    trialHintEl.textContent =
      `${pass.shortInstruction} / Take ${takeNo}. ビープ音のあとに聞こえた英単語を発話してください。`;
    document.body.classList.add("presenting");
  }

  function hideStimulus() {
    mainDisplayEl.style.display = "none";
    messageEl.style.display = "none";
    hideTrialActions();
    stopTrialTimer();
    document.body.classList.remove("presenting");
  }

  function showProgress(done, total, label) {
    const pct = total <= 0 ? 0 : Math.min(100, Math.max(0, (done / total) * 100));
    progressFillEl.style.width = `${pct}%`;
    progressLabelEl.textContent = `${label}: ${done}/${total}`;
    progressLabelEl.style.display = "block";
    progressEl.style.display = "flex";
  }

  function hideProgress() {
    progressEl.style.display = "none";
  }

  let trialTimerRaf = null;
  let trialTimerActive = false;

  function stopTrialTimer() {
    trialTimerActive = false;
    if (trialTimerRaf !== null) {
      cancelAnimationFrame(trialTimerRaf);
      trialTimerRaf = null;
    }
    trialTimerFillEl.style.width = "0%";
    trialTimerEl.style.display = "none";
  }

  function startTrialTimer(durationMs) {
    stopTrialTimer();
    trialTimerActive = true;
    trialTimerEl.style.display = "block";
    const start = performance.now();

    const tick = (now) => {
      if (!trialTimerActive) return;
      const elapsed = now - start;
      const pct = Math.min(100, Math.max(0, (elapsed / durationMs) * 100));
      trialTimerFillEl.style.width = `${pct}%`;
      if (pct < 100) {
        trialTimerRaf = requestAnimationFrame(tick);
      } else {
        trialTimerActive = false;
        trialTimerRaf = null;
      }
    };

    trialTimerRaf = requestAnimationFrame(tick);
  }

  function parseNumericId(participantId) {
    const digits = participantId.match(/\d+/g);
    if (!digits) return 1;
    const numeric = parseInt(digits.join(""), 10);
    return Number.isFinite(numeric) && numeric > 0 ? numeric : 1;
  }

  function sanitizeName(value) {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");
  }

  function getRecoverySessionId(participantId) {
    return `participant_${sanitizeName(participantId)}`;
  }

  function idbRequest(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("IndexedDB request failed"));
    });
  }

  function idbTxDone(tx) {
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onabort = () => reject(tx.error || new Error("IndexedDB transaction aborted"));
      tx.onerror = () => reject(tx.error || new Error("IndexedDB transaction failed"));
    });
  }

  async function openRecoveryDb() {
    if (!window.indexedDB) {
      throw new Error("このブラウザはIndexedDBに対応していません。");
    }
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(RECOVERY_DB_NAME, RECOVERY_DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(RECOVERY_SESSIONS_STORE)) {
          db.createObjectStore(RECOVERY_SESSIONS_STORE, { keyPath: "sessionId" });
        }
        if (!db.objectStoreNames.contains(RECOVERY_TRIALS_STORE)) {
          const trialStore = db.createObjectStore(RECOVERY_TRIALS_STORE, {
            keyPath: ["sessionId", "serialNo"],
          });
          trialStore.createIndex(RECOVERY_BY_SESSION_INDEX, "sessionId", { unique: false });
        } else {
          const trialStore = request.transaction.objectStore(RECOVERY_TRIALS_STORE);
          if (!trialStore.indexNames.contains(RECOVERY_BY_SESSION_INDEX)) {
            trialStore.createIndex(RECOVERY_BY_SESSION_INDEX, "sessionId", { unique: false });
          }
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("IndexedDB open failed"));
    });
  }

  async function withRecoveryDb(fn) {
    const db = await openRecoveryDb();
    try {
      return await fn(db);
    } finally {
      db.close();
    }
  }

  async function getRecoverySessionMeta(sessionId) {
    return withRecoveryDb(async (db) => {
      const tx = db.transaction(RECOVERY_SESSIONS_STORE, "readonly");
      const store = tx.objectStore(RECOVERY_SESSIONS_STORE);
      const meta = await idbRequest(store.get(sessionId));
      await idbTxDone(tx);
      return meta || null;
    });
  }

  async function putRecoverySessionMeta(meta) {
    return withRecoveryDb(async (db) => {
      const tx = db.transaction(RECOVERY_SESSIONS_STORE, "readwrite");
      tx.objectStore(RECOVERY_SESSIONS_STORE).put(meta);
      await idbTxDone(tx);
      return meta;
    });
  }

  async function mergeRecoverySessionMeta(sessionId, patch) {
    const current = await getRecoverySessionMeta(sessionId);
    const nowIso = new Date().toISOString();
    const next = {
      sessionId,
      createdAt: current?.createdAt || nowIso,
      updatedAt: nowIso,
      ...current,
      ...patch,
    };
    return putRecoverySessionMeta(next);
  }

  async function saveRecoveryTrial(sessionId, row, wavBytes) {
    const wavBlob = new Blob([wavBytes], { type: "audio/wav" });
    await withRecoveryDb(async (db) => {
      const tx = db.transaction(RECOVERY_TRIALS_STORE, "readwrite");
      tx.objectStore(RECOVERY_TRIALS_STORE).put({
        sessionId,
        serialNo: row.serialNo,
        row,
        wavBlob,
        updatedAt: Date.now(),
      });
      await idbTxDone(tx);
    });
  }

  async function loadRecoverySnapshot(sessionId) {
    return withRecoveryDb(async (db) => {
      const tx = db.transaction([RECOVERY_SESSIONS_STORE, RECOVERY_TRIALS_STORE], "readonly");
      const metaReq = tx.objectStore(RECOVERY_SESSIONS_STORE).get(sessionId);
      const trialReq = tx
        .objectStore(RECOVERY_TRIALS_STORE)
        .index(RECOVERY_BY_SESSION_INDEX)
        .getAll(IDBKeyRange.only(sessionId));
      const [meta, trialRecords] = await Promise.all([
        idbRequest(metaReq),
        idbRequest(trialReq),
      ]);
      await idbTxDone(tx);
      const sorted = (trialRecords || [])
        .filter((r) => r && r.row && Number.isFinite(r.serialNo))
        .sort((a, b) => a.serialNo - b.serialNo);
      const rows = sorted.map((r) => r.row);
      return {
        meta: meta || null,
        trialRecords: sorted,
        rows,
      };
    });
  }

  async function clearRecoverySession(sessionId) {
    await withRecoveryDb(async (db) => {
      const tx = db.transaction([RECOVERY_SESSIONS_STORE, RECOVERY_TRIALS_STORE], "readwrite");
      tx.objectStore(RECOVERY_SESSIONS_STORE).delete(sessionId);
      const trialStore = tx.objectStore(RECOVERY_TRIALS_STORE);
      const index = trialStore.index(RECOVERY_BY_SESSION_INDEX);
      const cursorReq = index.openCursor(IDBKeyRange.only(sessionId));
      await new Promise((resolve, reject) => {
        cursorReq.onsuccess = () => {
          const cursor = cursorReq.result;
          if (!cursor) {
            resolve();
            return;
          }
          cursor.delete();
          cursor.continue();
        };
        cursorReq.onerror = () =>
          reject(cursorReq.error || new Error("IndexedDB cursor failed"));
      });
      await idbTxDone(tx);
    });
  }

  function recoveryRecordMatches(record, filter) {
    if (!filter) return true;
    const row = record.row || {};
    if (filter.phase && row.phase !== filter.phase) return false;
    if (filter.passIndex && row.passIndex !== filter.passIndex) return false;
    return true;
  }

  async function getRecoveryArtifacts(sessionId, filter = null) {
    const snapshot = await loadRecoverySnapshot(sessionId);
    const records = snapshot.trialRecords.filter((record) => recoveryRecordMatches(record, filter));
    const files = [];
    for (const record of records) {
      if (!record.row?.recordingFile || !record.wavBlob) continue;
      const bytes = new Uint8Array(await record.wavBlob.arrayBuffer());
      files.push({
        name: record.row.recordingFile,
        bytes,
      });
    }
    return {
      meta: snapshot.meta,
      rows: records.map((r) => r.row),
      files,
    };
  }

  function stopMicMeter() {
    if (micMeterRaf !== null) {
      cancelAnimationFrame(micMeterRaf);
      micMeterRaf = null;
    }
    if (micMeterFillEl) micMeterFillEl.style.width = "0%";
    if (micCheckEl) micCheckEl.classList.add("hidden");
  }

  function startMicMeter(recorder) {
    stopMicMeter();
    if (micCheckEl) micCheckEl.classList.remove("hidden");
    const tick = () => {
      const level = recorder ? recorder.getInputLevel() : 0;
      const pct = Math.min(100, Math.max(0, Math.round(level * 320)));
      if (micMeterFillEl) micMeterFillEl.style.width = `${pct}%`;
      micMeterRaf = requestAnimationFrame(tick);
    };
    micMeterRaf = requestAnimationFrame(tick);
  }

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function seededShuffle(arr, rng) {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function isChrome() {
    const ua = navigator.userAgent || "";
    const hasChrome = /Chrome\/\d+/.test(ua);
    const blocked = /Edg\/|OPR\/|Opera|Firefox\/|CriOS\/|FxiOS\//.test(ua);
    return hasChrome && !blocked;
  }

  function waitForSpace(promptText) {
    showMessage(promptText);
    return new Promise((resolve) => {
      const handler = (ev) => {
        if (ev.code === "Space" || ev.key === " ") {
          ev.preventDefault();
          document.removeEventListener("keydown", handler);
          resolve();
        }
      };
      document.addEventListener("keydown", handler);
    });
  }

  function formatDb(value) {
    if (!Number.isFinite(value)) return "";
    return `${value.toFixed(1)} dBFS`;
  }

  function peakToDbfs(peak) {
    return peak > 0 ? 20 * Math.log10(peak) : -Infinity;
  }

  function assessRecordingLevel(rec) {
    const peak = rec.peak || 0;
    const rms = rec.rms || 0;
    const peakDbfs = peakToDbfs(peak);
    if (peak >= 0.98) {
      return {
        code: "clip_risk",
        label: "音量が大きすぎる可能性があります",
        advice: "マイクから少し離れるか、少し小さめに発話してください。",
        peakDbfs,
      };
    }
    if (rms < 0.008 || peak < 0.05) {
      return {
        code: "too_quiet",
        label: "音量が小さめです",
        advice: "マイクに少し近づくか、少し大きめに発話してください。",
        peakDbfs,
      };
    }
    if (peak > 0.85) {
      return {
        code: "loud",
        label: "音量はやや大きめですが使用可能です",
        advice: "音割れが気になる場合は少しだけマイクから離れてください。",
        peakDbfs,
      };
    }
    return {
      code: "good",
      label: "録音レベルは良好です",
      advice: "この距離と声量を保ってください。",
      peakDbfs,
    };
  }

  function formatRecordingLevel(rec) {
    const level = assessRecordingLevel(rec);
    const peakText = formatDb(level.peakDbfs);
    return `録音レベル: ${level.label}${peakText ? `（peak ${peakText}）` : ""}\n${level.advice}`;
  }

  function waitForTrialDecision(pass, trial, takeNo, rec) {
    stopTrialTimer();
    mainDisplayEl.style.display = "none";
    const levelText = rec ? `\n\n${formatRecordingLevel(rec)}` : "";
    messageEl.textContent =
      `録音が終了しました\n${pass.label}\n${trial.jp} / ${trial.word}\n` +
      `Take ${takeNo} を使う場合は「次へ」、録り直す場合は「もう一度録音する」を押してください。` +
      levelText;
    messageEl.style.display = "block";
    document.body.classList.remove("presenting");
    trialActionsEl.classList.remove("hidden");

    return new Promise((resolve) => {
      const cleanup = (decision) => {
        acceptRecordingBtn.removeEventListener("click", onAccept);
        retakeRecordingBtn.removeEventListener("click", onRetake);
        document.removeEventListener("keydown", onKeyDown);
        hideTrialActions();
        resolve(decision);
      };

      const onAccept = () => cleanup("accept");
      const onRetake = () => cleanup("retake");
      const onKeyDown = (ev) => {
        if (ev.repeat) return;
        if (ev.code === "KeyR") {
          ev.preventDefault();
          cleanup("retake");
        }
        if (ev.code === "Enter" || ev.code === "Space" || ev.key === " ") {
          ev.preventDefault();
          cleanup("accept");
        }
      };

      acceptRecordingBtn.addEventListener("click", onAccept);
      retakeRecordingBtn.addEventListener("click", onRetake);
      document.addEventListener("keydown", onKeyDown);
    });
  }

  function buildCounterbalance(participantId) {
    const numericId = parseNumericId(participantId);
    const conditionIndex = (numericId - 1) % 4;
    const orderFactor = Math.floor(conditionIndex / TALKERS.length);
    const talkerFactor = conditionIndex % TALKERS.length;
    const listOrder = orderFactor === 0 ? [1, 2] : [2, 1];
    const singleTalker = TALKERS[talkerFactor];

    return {
      numericId,
      conditionIndex,
      listOrder,
      singleTalker,
      listOrderLabel: listOrder.join("->"),
    };
  }

  function getPassDefinitions(nativeLanguageId) {
    const nativeLanguage = NATIVE_LANGUAGES[nativeLanguageId] || NATIVE_LANGUAGES.japanese;
    const naturalPass = {
      passIndex: 1,
      id: "natural_english",
      label: "Pass 1: Natural English",
      condition: "natural_english",
      shortInstruction: "自然な英語",
      instruction:
        "1回目は、あなたが普段いちばん自然だと思う英語でリピートしてください。訛りを意識して強めたり弱めたりせず、聞こえた英単語をそのまま発話してください。",
    };

    if (nativeLanguage.id === "english") {
      return [
        naturalPass,
        {
          passIndex: 2,
          id: "clear_english",
          label: "Pass 2: Clear English",
          condition: "clear_english",
          shortInstruction: "ゆっくり・明瞭な英語",
          instruction:
            "2回目は、自然な英語を保ったまま、少しゆっくり・はっきり発話してください。日本語や中国語の訛りをまねる必要はありません。",
        },
      ];
    }

    return [
      naturalPass,
      {
        passIndex: 2,
        id: `${nativeLanguage.id}_accented_english`,
        label: `Pass 2: ${nativeLanguage.label} accented English`,
        condition: `${nativeLanguage.id}_accented_english`,
        shortInstruction: `${nativeLanguage.labelJa}の訛りを強めた英語`,
        instruction:
          `2回目は、自分の母語（${nativeLanguage.labelJa}）の特徴が出るように英語でリピートしてください。単語は英語のまま、無理に別人をまねず、あなた自身の${nativeLanguage.labelJa}らしい訛りを意識してください。`,
      },
      {
        passIndex: 3,
        id: "intermediate_accent",
        label: "Pass 3: Intermediate accent",
        condition: "intermediate_accent",
        shortInstruction: "自然な英語と母語訛りの中間",
        instruction:
          "3回目は、1回目の自然な英語と2回目の母語訛りの中間くらいでリピートしてください。訛りを完全には消さず、強すぎもしない発話を目指してください。",
      },
    ];
  }

  function buildPracticePass(nativeLanguageId) {
    const nativeLanguage = NATIVE_LANGUAGES[nativeLanguageId] || NATIVE_LANGUAGES.japanese;
    return {
      passIndex: 0,
      id: "practice_calibration",
      label: "Practice: volume and retake check",
      condition: "practice_calibration",
      shortInstruction: "練習",
      instruction:
        `練習では、${nativeLanguage.labelJa}で見慣れた借用語を使って、音量と録り直し操作を確認します。` +
        "ここでの録音は最終ZIPには保存されません。声の大きさとマイクまでの距離をここで調整してください。",
      trials: PRACTICE_ITEMS.map((item, idx) => ({
        phase: "practice",
        word: item.word,
        jp: item.labels[nativeLanguage.id] || item.word,
        displayText: item.labels[nativeLanguage.id] || item.word,
        list: 0,
        blockIndex: idx + 1,
        blockTotal: PRACTICE_ITEMS.length,
        talker: { id: "practice_calibration", label: "Practice Voice" },
        audioPath: item.audioPath,
        trialInPass: idx + 1,
        trialTotalInPass: PRACTICE_ITEMS.length,
      })),
    };
  }

  function buildMainWordOrder(counterbalance) {
    const rng1 = mulberry32(counterbalance.numericId * 1000 + 11);
    const rng2 = mulberry32(counterbalance.numericId * 1000 + 13);
    const orderedList1 = seededShuffle(LIST1, rng1);
    const orderedList2 = seededShuffle(LIST2, rng2);
    const wordsByList = { 1: orderedList1, 2: orderedList2 };
    const words = [];

    counterbalance.listOrder.forEach((listId) => {
      wordsByList[listId].forEach((item) => {
        words.push({
          ...item,
          blockIndex: words.length + 1,
          blockTotal: STIMULI.length,
          talker: counterbalance.singleTalker,
          audioPath: `../Stimuli/audio_en_6voices/${counterbalance.singleTalker.id}/${item.word}.wav`,
        });
      });
    });

    return words;
  }

  function buildRecordingPasses(counterbalance, nativeLanguageId) {
    const words = buildMainWordOrder(counterbalance);
    return getPassDefinitions(nativeLanguageId).map((pass) => ({
      ...pass,
      trials: words.map((word, idx) => ({
        ...word,
        phase: "main",
        trialInPass: idx + 1,
        trialTotalInPass: words.length,
      })),
    }));
  }

  function collectAudioPaths(passes) {
    const unique = new Set();
    passes.forEach((pass) => {
      pass.trials.forEach((trial) => unique.add(trial.audioPath));
    });
    return [...unique];
  }

  async function preloadAudio(paths) {
    const audioMap = new Map();
    for (let i = 0; i < paths.length; i += 1) {
      const path = paths[i];
      setStatus(`音声プリロード中 ${i + 1}/${paths.length}`);
      const audio = await new Promise((resolve, reject) => {
        const el = new Audio();
        el.preload = "auto";
        el.oncanplaythrough = () => resolve(el);
        el.onerror = () => reject(new Error(`音声が読み込めません: ${path}`));
        el.src = path;
        el.load();
      });
      audioMap.set(path, audio);
    }
    return audioMap;
  }

  function encodeWav(chunks, sampleRate) {
    const totalSamples = chunks.reduce((acc, c) => acc + c.length, 0);
    const dataSize = totalSamples * 2;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    const writeStr = (offset, value) => {
      for (let i = 0; i < value.length; i += 1) {
        view.setUint8(offset + i, value.charCodeAt(i));
      }
    };

    writeStr(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeStr(8, "WAVE");
    writeStr(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeStr(36, "data");
    view.setUint32(40, dataSize, true);

    let offset = 44;
    chunks.forEach((chunk) => {
      for (let i = 0; i < chunk.length; i += 1) {
        let sample = chunk[i];
        sample = Math.max(-1, Math.min(1, sample));
        const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(offset, int16, true);
        offset += 2;
      }
    });

    return new Uint8Array(buffer);
  }

  function analyzeRecordingChunks(chunks) {
    let totalSamples = 0;
    let sumSquares = 0;
    let peak = 0;
    chunks.forEach((chunk) => {
      for (let i = 0; i < chunk.length; i += 1) {
        const sample = chunk[i];
        const abs = Math.abs(sample);
        if (abs > peak) peak = abs;
        sumSquares += sample * sample;
        totalSamples += 1;
      }
    });
    const rms = totalSamples > 0 ? Math.sqrt(sumSquares / totalSamples) : 0;
    return { rms, peak, peakDbfs: peakToDbfs(peak) };
  }

  class WavRecorder {
    constructor(stream) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) {
        throw new Error("AudioContext が利用できません。");
      }
      this.stream = stream;
      this.audioCtx = new Ctx();
      this.source = this.audioCtx.createMediaStreamSource(stream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 2048;
      this.levelBuffer = new Float32Array(this.analyser.fftSize);
      this.processor = this.audioCtx.createScriptProcessor(4096, 1, 1);
      this.silentGain = this.audioCtx.createGain();
      this.silentGain.gain.value = 0;

      this.isRecording = false;
      this.chunks = [];
      this.recordingStartPerf = 0;

      this.processor.onaudioprocess = (ev) => {
        if (!this.isRecording) return;
        const input = ev.inputBuffer.getChannelData(0);
        this.chunks.push(new Float32Array(input));
      };

      this.source.connect(this.processor);
      this.source.connect(this.analyser);
      this.processor.connect(this.silentGain);
      this.silentGain.connect(this.audioCtx.destination);
    }

    async start() {
      if (this.audioCtx.state === "suspended") {
        await this.audioCtx.resume();
      }
      this.chunks = [];
      this.recordingStartPerf = performance.now();
      this.isRecording = true;
    }

    stop() {
      this.isRecording = false;
      const recordingStopPerf = performance.now();
      const stats = analyzeRecordingChunks(this.chunks);
      const wavBytes = encodeWav(this.chunks, this.audioCtx.sampleRate);
      return {
        wavBytes,
        durationMs: recordingStopPerf - this.recordingStartPerf,
        sampleRate: this.audioCtx.sampleRate,
        rms: stats.rms,
        peak: stats.peak,
        peakDbfs: stats.peakDbfs,
        levelCode: assessRecordingLevel(stats).code,
      };
    }

    getInputLevel() {
      this.analyser.getFloatTimeDomainData(this.levelBuffer);
      let sumSquares = 0;
      for (let i = 0; i < this.levelBuffer.length; i += 1) {
        const v = this.levelBuffer[i];
        sumSquares += v * v;
      }
      return Math.sqrt(sumSquares / this.levelBuffer.length);
    }

    async dispose() {
      this.isRecording = false;
      this.source.disconnect();
      this.analyser.disconnect();
      this.processor.disconnect();
      this.silentGain.disconnect();
      this.stream.getTracks().forEach((track) => track.stop());
      if (this.audioCtx && this.audioCtx.state !== "closed") {
        await this.audioCtx.close();
      }
    }
  }

  const TEXT_ENCODER = new TextEncoder();

  function makeCrcTable() {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c >>> 0;
    }
    return table;
  }

  const CRC_TABLE = makeCrcTable();

  function crc32(bytes) {
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i += 1) {
      crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function toDosDate(dateObj) {
    const year = Math.max(1980, dateObj.getFullYear());
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = Math.floor(dateObj.getSeconds() / 2);
    const dosTime = (hours << 11) | (minutes << 5) | seconds;
    const dosDate = ((year - 1980) << 9) | (month << 5) | day;
    return { dosTime, dosDate };
  }

  function createZipBlob(files) {
    const fileEntries = files.map((f) => ({
      name: f.name.replace(/\\/g, "/"),
      bytes: f.bytes,
    }));
    let localOffset = 0;
    const parts = [];
    const centralParts = [];
    const now = toDosDate(new Date());

    fileEntries.forEach((entry) => {
      const fileNameBytes = TEXT_ENCODER.encode(entry.name);
      const dataBytes = entry.bytes;
      const crc = crc32(dataBytes);

      const localHeader = new Uint8Array(30 + fileNameBytes.length);
      const lv = new DataView(localHeader.buffer);
      lv.setUint32(0, 0x04034b50, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 0, true);
      lv.setUint16(8, 0, true);
      lv.setUint16(10, now.dosTime, true);
      lv.setUint16(12, now.dosDate, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, dataBytes.length, true);
      lv.setUint32(22, dataBytes.length, true);
      lv.setUint16(26, fileNameBytes.length, true);
      lv.setUint16(28, 0, true);
      localHeader.set(fileNameBytes, 30);

      parts.push(localHeader);
      parts.push(dataBytes);

      const centralHeader = new Uint8Array(46 + fileNameBytes.length);
      const cv = new DataView(centralHeader.buffer);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0, true);
      cv.setUint16(10, 0, true);
      cv.setUint16(12, now.dosTime, true);
      cv.setUint16(14, now.dosDate, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, dataBytes.length, true);
      cv.setUint32(24, dataBytes.length, true);
      cv.setUint16(28, fileNameBytes.length, true);
      cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true);
      cv.setUint16(34, 0, true);
      cv.setUint16(36, 0, true);
      cv.setUint32(38, 0, true);
      cv.setUint32(42, localOffset, true);
      centralHeader.set(fileNameBytes, 46);
      centralParts.push(centralHeader);

      localOffset += localHeader.length + dataBytes.length;
    });

    const centralSize = centralParts.reduce((acc, p) => acc + p.length, 0);
    const centralOffset = localOffset;

    const eocd = new Uint8Array(22);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(4, 0, true);
    ev.setUint16(6, 0, true);
    ev.setUint16(8, fileEntries.length, true);
    ev.setUint16(10, fileEntries.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, centralOffset, true);
    ev.setUint16(20, 0, true);

    const allParts = [...parts, ...centralParts, eocd];
    const totalLen = allParts.reduce((acc, p) => acc + p.length, 0);
    const zipBytes = new Uint8Array(totalLen);
    let writeOffset = 0;
    allParts.forEach((part) => {
      zipBytes.set(part, writeOffset);
      writeOffset += part.length;
    });

    return new Blob([zipBytes], { type: "application/zip" });
  }

  function triggerDownload(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  const LOG_COLUMNS = [
    "participant_id",
    "native_language",
    "experiment_version",
    "serial_no",
    "phase",
    "pass_index",
    "pass_id",
    "pass_label",
    "condition",
    "trial_in_pass",
    "trial_total_in_pass",
    "global_trial",
    "block_index",
    "block_total",
    "list",
    "word",
    "japanese",
    "take_no",
    "talker_id",
    "talker_label",
    "stimulus_file",
    "recording_file",
    "trial_window_ms",
    "recording_duration_ms",
    "recording_rms",
    "recording_peak",
    "recording_peak_dbfs",
    "recording_level",
    "trial_start_epoch_ms",
    "audio_onset_epoch_ms",
    "audio_onset_from_pass_ms",
    "counterbalance_index",
    "list_order",
    "single_talker",
  ];

  function buildLogTable(rows) {
    const out = [LOG_COLUMNS];
    rows
      .slice()
      .sort((a, b) => (a.serialNo || 0) - (b.serialNo || 0))
      .forEach((r) => {
        out.push([
          r.participantId,
          r.nativeLanguage,
          r.experimentVersion || EXPERIMENT_VERSION,
          r.serialNo,
          r.phase,
          r.passIndex,
          r.passId,
          r.passLabel,
          r.condition,
          r.trialInPass,
          r.trialTotalInPass,
          r.globalTrial,
          r.blockIndex,
          r.blockTotal,
          r.list,
          r.word,
          r.jp,
          r.takeNo,
          r.talkerId,
          r.talkerLabel,
          r.stimulusFile,
          r.recordingFile,
          r.trialWindowMs,
          r.recordingDurationMs.toFixed(3),
          r.recordingRms.toFixed(6),
          r.recordingPeak.toFixed(6),
          Number.isFinite(r.recordingPeakDbfs) ? r.recordingPeakDbfs.toFixed(3) : "",
          r.recordingLevel,
          r.trialStartEpochMs,
          r.audioOnsetEpochMs,
          r.audioOnsetFromPassMs.toFixed(3),
          r.cbIndex,
          r.listOrder,
          r.singleTalker,
        ]);
      });
    return out;
  }

  function xmlEscape(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function xmlSafeText(value) {
    return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
  }

  function excelColName(index1Based) {
    let n = index1Based;
    let out = "";
    while (n > 0) {
      const rem = (n - 1) % 26;
      out = String.fromCharCode(65 + rem) + out;
      n = Math.floor((n - 1) / 26);
    }
    return out;
  }

  function sanitizeSheetName(name) {
    const cleaned = String(name)
      .replace(/[\\/*?:\[\]]/g, "_")
      .replace(/[\u0000-\u001F]/g, "")
      .trim();
    const fallback = cleaned || "Sheet1";
    return fallback.length > 31 ? fallback.slice(0, 31) : fallback;
  }

  async function buildXlsxBytes(tableRows, sheetName) {
    const safeSheetName = sanitizeSheetName(sheetName);
    const rowXml = tableRows
      .map((row, rowIndex) => {
        const cellXml = row
          .map((cellValue, colIndex) => {
            const ref = `${excelColName(colIndex + 1)}${rowIndex + 1}`;
            if (cellValue === null || cellValue === undefined || cellValue === "") {
              return `<c r="${ref}"/>`;
            }
            const text = xmlEscape(xmlSafeText(cellValue));
            return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${text}</t></is></c>`;
          })
          .join("");
        return `<row r="${rowIndex + 1}">${cellXml}</row>`;
      })
      .join("");

    const worksheetXml =
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
      `<sheetData>${rowXml}</sheetData>` +
      `</worksheet>`;

    const workbookXml =
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ` +
      `xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">` +
      `<sheets><sheet name="${xmlEscape(safeSheetName)}" sheetId="1" r:id="rId1"/></sheets>` +
      `</workbook>`;

    const workbookRelsXml =
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
      `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>` +
      `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>` +
      `</Relationships>`;

    const rootRelsXml =
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
      `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>` +
      `</Relationships>`;

    const stylesXml =
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
      `<fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts>` +
      `<fills count="1"><fill><patternFill patternType="none"/></fill></fills>` +
      `<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>` +
      `<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>` +
      `<cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>` +
      `</styleSheet>`;

    const contentTypesXml =
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
      `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
      `<Default Extension="xml" ContentType="application/xml"/>` +
      `<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>` +
      `<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>` +
      `<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>` +
      `</Types>`;

    const xlsxFiles = [
      { name: "[Content_Types].xml", bytes: TEXT_ENCODER.encode(contentTypesXml) },
      { name: "_rels/.rels", bytes: TEXT_ENCODER.encode(rootRelsXml) },
      { name: "xl/workbook.xml", bytes: TEXT_ENCODER.encode(workbookXml) },
      { name: "xl/_rels/workbook.xml.rels", bytes: TEXT_ENCODER.encode(workbookRelsXml) },
      { name: "xl/styles.xml", bytes: TEXT_ENCODER.encode(stylesXml) },
      { name: "xl/worksheets/sheet1.xml", bytes: TEXT_ENCODER.encode(worksheetXml) },
    ];

    const blob = createZipBlob(xlsxFiles);
    return new Uint8Array(await blob.arrayBuffer());
  }

  function enterExperimentScreen() {
    configEl.classList.add("hidden");
    document.body.classList.add("running");
    stopMicMeter();
    hideProgress();
    setLog("");
  }

  function exitExperimentScreen() {
    configEl.classList.remove("hidden");
    document.body.classList.remove("running");
    hideProgress();
    hideStimulus();
  }

  function getRowsForPass(passIndex) {
    if (!preparedSession) return [];
    return preparedSession.rows
      .filter((row) => row.phase === "main" && row.passIndex === passIndex)
      .sort((a, b) => a.trialInPass - b.trialInPass);
  }

  function getNextPendingPass() {
    if (!preparedSession) return null;
    return preparedSession.passes.find((pass) => getRowsForPass(pass.passIndex).length < pass.trials.length) || null;
  }

  function refreshStartButton() {
    if (!preparedSession) return;
    if (!preparedSession.practiceCompleted) {
      startPassBtn.textContent = "練習を開始";
      startPassBtn.classList.remove("hidden");
      startPassBtn.disabled = false;
      return;
    }
    const pass = getNextPendingPass();
    if (!pass) {
      startPassBtn.classList.add("hidden");
      startPassBtn.disabled = true;
      return;
    }
    const done = getRowsForPass(pass.passIndex).length;
    startPassBtn.textContent =
      done > 0
        ? `${pass.label} を再開`
        : `${pass.label} を開始`;
    startPassBtn.classList.remove("hidden");
    startPassBtn.disabled = false;
  }

  async function runPracticeFlow() {
    if (!preparedSession || isRunning) return;
    if (!volumeCheckCompleted) {
      setStatus("先に音量チェックを行ってください。");
      return;
    }

    isRunning = true;
    volumeCheckBtn.classList.add("hidden");
    startPassBtn.disabled = true;

    try {
      enterExperimentScreen();
      setStatus("練習を開始します。");
      const practiceStats = await runPracticePass(preparedSession.practicePass);
      preparedSession.practiceCompleted = true;
      await mergeRecoverySessionMeta(preparedSession.sessionId, {
        practiceCompleted: true,
        practiceStats,
        phase: "practice_completed",
      });

      exitExperimentScreen();
      const needsAttention = practiceStats.some((s) => s.levelCode === "too_quiet" || s.levelCode === "clip_risk");
      setStatus(needsAttention
        ? "練習完了。録音レベルに注意が出た項目があります。本番前にマイク位置を調整してください。"
        : "練習完了。録音レベルは概ね良好です。本番へ進めます。"
      );
      setLog("練習録音は最終ZIPには保存しません。");
      showMessage("練習完了\n本番のPassへ進んでください");
      refreshStartButton();
    } catch (err) {
      console.error(err);
      exitExperimentScreen();
      setStatus(`練習エラー: ${err.message}`);
      refreshStartButton();
      preloadBtn.disabled = false;
    } finally {
      isRunning = false;
    }
  }

  async function recordOneTake({ pass, trial, takeNo, phaseStartPerf }) {
    const audio = preparedSession.audioMap.get(trial.audioPath);
    if (!audio) {
      throw new Error(`音声アセットが見つかりません: ${trial.audioPath}`);
    }

    showStimulus(trial, pass, takeNo);
    audio.pause();
    audio.currentTime = 0;

    let audioOnsetPerf = null;
    let audioOnsetEpochMs = null;
    let trialStartEpochMs = null;
    let rec = null;
    let recordingStarted = false;
    let cleanupPlayback = () => {};

    try {
      const playbackEnded = new Promise((resolve, reject) => {
        const onEnded = () => {
          cleanupPlayback();
          resolve();
        };
        const onError = () => {
          cleanupPlayback();
          reject(new Error(`音声再生に失敗しました: ${trial.audioPath}`));
        };
        cleanupPlayback = () => {
          audio.removeEventListener("ended", onEnded);
          audio.removeEventListener("error", onError);
        };
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("error", onError);
      });

      await audio.play();
      audioOnsetPerf = performance.now();
      audioOnsetEpochMs = Date.now();
      await playbackEnded;

      await playRecordingStartBeep();
      trialStartEpochMs = Date.now();
      await preparedSession.recorder.start();
      recordingStarted = true;
      startTrialTimer(TRIAL_WINDOW_MS);
      await delay(TRIAL_WINDOW_MS);
      rec = preparedSession.recorder.stop();
    } finally {
      if (recordingStarted && !rec) {
        preparedSession.recorder.stop();
      }
      stopTrialTimer();
      cleanupPlayback();
      audio.pause();
      audio.currentTime = 0;
    }

    if (audioOnsetPerf === null || audioOnsetEpochMs === null) {
      throw new Error(`音声再生に失敗しました: ${trial.audioPath}`);
    }
    if (!rec || trialStartEpochMs === null) {
      throw new Error("録音の開始または停止に失敗しました。");
    }

    return {
      rec,
      audioOnsetEpochMs,
      trialStartEpochMs,
      audioOnsetFromPassMs: audioOnsetPerf - phaseStartPerf,
    };
  }

  function buildRecordingFileName({ pass, trial, takeNo, serialNo }) {
    const baseDir = sanitizeName(preparedSession.participantId);
    const nativeLanguage = preparedSession.nativeLanguage;
    const safePass = sanitizeName(pass.id);
    const safeWord = sanitizeName(trial.word);
    const outputPrefix = `${baseDir}/pass${pad2(pass.passIndex)}_${safePass}`;
    return `${outputPrefix}/wav/` +
      `${baseDir}_${nativeLanguage}_pass${pad2(pass.passIndex)}_${safePass}_` +
      `word${pad3(trial.trialInPass)}_${safeWord}_` +
      `take${pad2(takeNo)}_trial${pad4(serialNo)}_talker_${trial.talker.id}.wav`;
  }

  function buildRow({ pass, trial, takeNo, serialNo, recordingFile, timing }) {
    return {
      participantId: preparedSession.participantId,
      nativeLanguage: preparedSession.nativeLanguage,
      experimentVersion: EXPERIMENT_VERSION,
      serialNo,
      phase: "main",
      passIndex: pass.passIndex,
      passId: pass.id,
      passLabel: pass.label,
      condition: pass.condition,
      trialInPass: trial.trialInPass,
      trialTotalInPass: trial.trialTotalInPass,
      globalTrial: serialNo,
      blockIndex: trial.blockIndex,
      blockTotal: trial.blockTotal,
      list: trial.list,
      word: trial.word,
      jp: trial.jp,
      takeNo,
      talkerId: trial.talker.id,
      talkerLabel: trial.talker.label,
      stimulusFile: trial.audioPath,
      recordingFile,
      trialWindowMs: TRIAL_WINDOW_MS,
      recordingDurationMs: timing.rec.durationMs,
      recordingRms: timing.rec.rms,
      recordingPeak: timing.rec.peak,
      recordingPeakDbfs: timing.rec.peakDbfs,
      recordingLevel: timing.rec.levelCode,
      trialStartEpochMs: timing.trialStartEpochMs,
      audioOnsetEpochMs: timing.audioOnsetEpochMs,
      audioOnsetFromPassMs: timing.audioOnsetFromPassMs,
      cbIndex: preparedSession.counterbalance.conditionIndex,
      listOrder: preparedSession.counterbalance.listOrder.join("->"),
      singleTalker: preparedSession.counterbalance.singleTalker.id,
    };
  }

  async function recordTrialWithRetake({ pass, trial, phaseStartPerf }) {
    const serialNo = ((pass.passIndex - 1) * trial.trialTotalInPass) + trial.trialInPass;
    let takeNo = 0;

    while (true) {
      takeNo += 1;
      const timing = await recordOneTake({ pass, trial, takeNo, phaseStartPerf });
      const recordingFile = buildRecordingFileName({ pass, trial, takeNo, serialNo });
      const row = buildRow({ pass, trial, takeNo, serialNo, recordingFile, timing });
      await saveRecoveryTrial(preparedSession.sessionId, row, timing.rec.wavBytes);
      await mergeRecoverySessionMeta(preparedSession.sessionId, {
        latestSerialNo: row.serialNo,
        latestPassIndex: pass.passIndex,
        latestTrialInPass: trial.trialInPass,
        phase: "main",
      });

      const decision = await waitForTrialDecision(pass, trial, takeNo, timing.rec);
      if (decision === "accept") {
        return row;
      }
    }
  }

  async function recordPracticeTrialWithRetake({ pass, trial, phaseStartPerf }) {
    let takeNo = 0;

    while (true) {
      takeNo += 1;
      const timing = await recordOneTake({ pass, trial, takeNo, phaseStartPerf });
      const decision = await waitForTrialDecision(pass, trial, takeNo, timing.rec);
      if (decision === "accept") {
        return timing.rec;
      }
    }
  }

  async function runPracticePass(pass) {
    const totalTrials = pass.trials.length;
    const label = "Practice";
    let completed = 0;

    await waitForSpace(
      `${pass.label}\n\n` +
      `${pass.instruction}\n\n` +
      "録音レベルが小さすぎる、または大きすぎる場合は、マイクとの距離や声量を調整して録り直してください。\n" +
      "スペースキーで練習を開始"
    );

    const phaseStartPerf = performance.now();
    const practiceStats = [];

    for (const trial of pass.trials) {
      showProgress(completed, totalTrials, label);
      const rec = await recordPracticeTrialWithRetake({ pass, trial, phaseStartPerf });
      practiceStats.push({
        word: trial.word,
        displayText: trial.displayText,
        rms: rec.rms,
        peak: rec.peak,
        levelCode: rec.levelCode,
      });
      completed += 1;
      showProgress(completed, totalTrials, label);
    }

    return practiceStats;
  }

  async function runPass(pass) {
    const existingRows = getRowsForPass(pass.passIndex);
    const completedByTrial = new Map(existingRows.map((row) => [row.trialInPass, row]));
    const totalTrials = pass.trials.length;
    const label = `Pass ${pass.passIndex}`;
    let completed = existingRows.length;

    await waitForSpace(
      `${pass.label}${completed > 0 ? "（続きから再開）" : ""}\n\n` +
      `${pass.instruction}\n\n` +
      "各単語の録音後に、録り直すか次へ進むかを選べます。\n" +
      "スペースキーで開始"
    );

    const phaseStartPerf = performance.now();

    for (const trial of pass.trials) {
      if (completedByTrial.has(trial.trialInPass)) {
        showProgress(completed, totalTrials, label);
        continue;
      }

      showProgress(completed, totalTrials, label);
      const row = await recordTrialWithRetake({ pass, trial, phaseStartPerf });
      completedByTrial.set(trial.trialInPass, row);
      completed += 1;
      showProgress(completed, totalTrials, label);
    }

    return [...completedByTrial.values()].sort((a, b) => a.trialInPass - b.trialInPass);
  }

  async function buildPassZip(pass) {
    const baseDir = sanitizeName(preparedSession.participantId);
    const safePass = sanitizeName(pass.id);
    const outputPrefix = `${baseDir}/pass${pad2(pass.passIndex)}_${safePass}`;
    const artifacts = await getRecoveryArtifacts(preparedSession.sessionId, {
      phase: "main",
      passIndex: pass.passIndex,
    });
    const rows = artifacts.rows.sort((a, b) => a.trialInPass - b.trialInPass);
    const logTable = buildLogTable(rows);
    const logBytes = await buildXlsxBytes(logTable, `pass${pad2(pass.passIndex)}_log`);
    const summary = {
      participant_id: preparedSession.participantId,
      native_language: preparedSession.nativeLanguage,
      experiment_version: EXPERIMENT_VERSION,
      build_date: EXPERIMENT_BUILD_DATE,
      exported_at_iso: new Date().toISOString(),
      pass_index: pass.passIndex,
      pass_id: pass.id,
      pass_label: pass.label,
      condition: pass.condition,
      instruction: pass.instruction,
      counterbalance_index: preparedSession.counterbalance.conditionIndex,
      list_order: preparedSession.counterbalance.listOrderLabel,
      talker_id: preparedSession.counterbalance.singleTalker.id,
      trial_count: rows.length,
    };
    const files = [
      ...artifacts.files,
      {
        name: `${outputPrefix}/logs/${baseDir}_pass${pad2(pass.passIndex)}_${safePass}_log.xlsx`,
        bytes: logBytes,
      },
      {
        name: `${outputPrefix}/logs/${baseDir}_pass${pad2(pass.passIndex)}_${safePass}_summary.json`,
        bytes: TEXT_ENCODER.encode(JSON.stringify(summary, null, 2)),
      },
    ];
    const zipBlob = createZipBlob(files);
    const zipName = `${baseDir}_${preparedSession.nativeLanguage}_pass${pad2(pass.passIndex)}_${safePass}.zip`;
    return { zipBlob, zipName, rows };
  }

  async function refreshRecoveredRows() {
    if (!preparedSession) return;
    const snapshot = await loadRecoverySnapshot(preparedSession.sessionId);
    preparedSession.rows = snapshot.rows;
  }

  async function prepareSession(participantId, nativeLanguageId) {
    const counterbalance = buildCounterbalance(participantId);
    const practicePass = buildPracticePass(nativeLanguageId);
    const passes = buildRecordingPasses(counterbalance, nativeLanguageId);
    const audioPaths = collectAudioPaths([practicePass, ...passes]);
    const sessionId = getRecoverySessionId(participantId);
    const plannedTrials = passes.reduce((acc, pass) => acc + pass.trials.length, 0);

    let recoverySnapshot = await loadRecoverySnapshot(sessionId);
    const hasIncompatibleDraft =
      recoverySnapshot.meta &&
      (
        recoverySnapshot.meta.participantId !== participantId ||
        recoverySnapshot.meta.nativeLanguage !== nativeLanguageId ||
        recoverySnapshot.meta.counterbalanceIndex !== counterbalance.conditionIndex ||
        recoverySnapshot.meta.experimentVersion !== EXPERIMENT_VERSION
      );
    const hasCompletedRowsWithoutMeta =
      !recoverySnapshot.meta && (recoverySnapshot.rows?.length || 0) >= plannedTrials;
    if (hasIncompatibleDraft || recoverySnapshot.meta?.allPassesCompleted || hasCompletedRowsWithoutMeta) {
      await clearRecoverySession(sessionId);
      recoverySnapshot = { meta: null, trialRecords: [], rows: [] };
    }

    setStatus("マイクの許可を確認しています...");
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });

    let recorder = null;
    try {
      recorder = new WavRecorder(stream);
      setStatus("音声ファイルを読み込んでいます...");
      const audioMap = await preloadAudio(audioPaths);
      const volumeCheckDone = Boolean(recoverySnapshot.meta?.volumeCheckCompleted);
      const practiceCompleted = Boolean(recoverySnapshot.meta?.practiceCompleted);

      await mergeRecoverySessionMeta(sessionId, {
        participantId,
        nativeLanguage: nativeLanguageId,
        counterbalanceIndex: counterbalance.conditionIndex,
        listOrder: counterbalance.listOrderLabel,
        experimentVersion: EXPERIMENT_VERSION,
        buildDate: EXPERIMENT_BUILD_DATE,
        volumeCheckCompleted: volumeCheckDone,
        practiceCompleted,
        passCount: passes.length,
        plannedTrials,
        allPassesCompleted: false,
      });

      return {
        sessionId,
        participantId,
        nativeLanguage: nativeLanguageId,
        counterbalance,
        practicePass,
        practiceCompleted,
        passes,
        audioMap,
        recorder,
        rows: recoverySnapshot.rows || [],
        volumeCheckCompleted: volumeCheckDone,
        initialRecoveredTrials: recoverySnapshot.rows?.length || 0,
      };
    } catch (err) {
      if (recorder) {
        await recorder.dispose();
      } else {
        stream.getTracks().forEach((track) => track.stop());
      }
      throw err;
    }
  }

  async function runVolumeCheck() {
    if (!preparedSession) {
      setStatus("先に準備を実行してください。");
      return;
    }
    const samplePath = PRACTICE_ITEMS[0].audioPath;
    const audio = preparedSession.audioMap.get(samplePath);
    if (!audio) {
      throw new Error(`音量チェック音声が見つかりません: ${samplePath}`);
    }

    volumeCheckBtn.disabled = true;
    showMessage("音量チェック中です");
    setStatus("音量チェック音声を再生しています...");
    startMicMeter(preparedSession.recorder);

    audio.pause();
    audio.currentTime = 0;
    let cleanup = () => {};
    const endedPromise = new Promise((resolve, reject) => {
      cleanup = () => {
        audio.removeEventListener("ended", onEnded);
        audio.removeEventListener("error", onError);
      };
      const onEnded = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        reject(new Error("音量チェック音声の再生に失敗しました。"));
      };
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("error", onError);
    });
    try {
      await audio.play();
      await endedPromise;
    } catch (err) {
      cleanup();
      stopMicMeter();
      throw err;
    }
    stopMicMeter();

    volumeCheckCompleted = true;
    preparedSession.volumeCheckCompleted = true;
    await mergeRecoverySessionMeta(preparedSession.sessionId, {
      volumeCheckCompleted: true,
      phase: "volume_checked",
    });
    volumeCheckBtn.textContent = "音量チェックを再生（再確認）";
    volumeCheckBtn.disabled = false;
    refreshStartButton();
    setStatus("音量チェック完了。録音を開始できます。");
    showMessage("音量OKなら録音を開始してください");
  }

  async function runPassFlow() {
    if (!preparedSession || isRunning) return;
    if (!volumeCheckCompleted) {
      setStatus("先に音量チェックを行ってください。");
      return;
    }
    if (!preparedSession.practiceCompleted) {
      await runPracticeFlow();
      return;
    }

    const pass = getNextPendingPass();
    if (!pass) {
      setStatus("すべての録音は完了しています。");
      return;
    }

    isRunning = true;
    volumeCheckBtn.classList.add("hidden");
    startPassBtn.disabled = true;

    try {
      enterExperimentScreen();
      setStatus(`${pass.label} を開始します。`);
      await runPass(pass);
      await refreshRecoveredRows();

      const { zipBlob, zipName, rows } = await buildPassZip(pass);
      lastZipBlob = zipBlob;
      lastZipName = zipName;
      triggerDownload(zipBlob, zipName);

      await mergeRecoverySessionMeta(preparedSession.sessionId, {
        [`pass${pass.passIndex}Completed`]: true,
        latestCompletedPassIndex: pass.passIndex,
        phase: `pass${pass.passIndex}_completed`,
      });

      exitExperimentScreen();
      const nextPass = getNextPendingPass();
      redownloadZipBtn.classList.remove("hidden");
      redownloadZipBtn.disabled = false;

      if (nextPass) {
        setStatus(`${pass.label} 完了。${rows.length}個のWAVをZIPで自動ダウンロードしました。次のリピートへ進めます。`);
        setLog(`保存: ${zipName}`);
        showMessage(`${pass.label} 完了\nZIPをダウンロードしました\n次のリピートへ進んでください`);
        refreshStartButton();
      } else {
        setStatus(`${pass.label} 完了。最後のZIPを自動ダウンロードしました。`);
        setLog(`保存: ${zipName}`);
        showMessage("録音はすべて終了です\nご協力ありがとうございました");
        startPassBtn.classList.add("hidden");
        startPassBtn.disabled = true;
        await mergeRecoverySessionMeta(preparedSession.sessionId, {
          allPassesCompleted: true,
          phase: "completed",
        });
        await preparedSession.recorder.dispose();
        await clearRecoverySession(preparedSession.sessionId);
        preparedSession = null;
        preloadBtn.disabled = false;
      }
    } catch (err) {
      console.error(err);
      exitExperimentScreen();
      setStatus(`エラー: ${err.message}`);
      refreshStartButton();
      preloadBtn.disabled = false;
    } finally {
      isRunning = false;
    }
  }

  preloadBtn.addEventListener("click", async () => {
    const participantId = participantInput.value.trim();
    const nativeLanguageId = nativeLanguageSelect.value;
    if (!participantId) {
      setStatus("参加者IDを入力してください。");
      return;
    }
    if (!NATIVE_LANGUAGES[nativeLanguageId]) {
      setStatus("母語を選択してください。");
      return;
    }
    if (!isChrome()) {
      setStatus("Chrome で実施してください。Chrome以外では開始できません。");
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus("この環境ではマイク録音に対応していません。");
      return;
    }

    preloadBtn.disabled = true;
    stopMicMeter();
    volumeCheckCompleted = false;
    lastZipBlob = null;
    lastZipName = "";
    volumeCheckBtn.classList.add("hidden");
    volumeCheckBtn.textContent = "音量チェックを再生";
    volumeCheckBtn.disabled = true;
    startPassBtn.classList.add("hidden");
    startPassBtn.disabled = true;
    redownloadZipBtn.classList.add("hidden");
    redownloadZipBtn.disabled = true;
    setLog("");

    try {
      preparedSession = await prepareSession(participantId, nativeLanguageId);
      const plannedTrials = preparedSession.passes.reduce((acc, pass) => acc + pass.trials.length, 0);
      const completedTrials = preparedSession.rows.length;
      volumeCheckCompleted = Boolean(preparedSession.volumeCheckCompleted);

      setStatus("準備完了。");
      setLog(
        `母語: ${NATIVE_LANGUAGES[nativeLanguageId].label} / ` +
        `予定: ${preparedSession.passes.length} passes, ${plannedTrials} recordings`
      );

      if (!volumeCheckCompleted) {
        showMessage("音量チェックを再生してください");
        setStatus("準備完了。まず音量チェックを行ってください。");
        volumeCheckBtn.classList.remove("hidden");
        volumeCheckBtn.disabled = false;
      } else {
        showMessage("前回の続きがあります\n録音を再開できます");
        setStatus(`復旧データを検出: ${completedTrials}/${plannedTrials}`);
        refreshStartButton();
      }
    } catch (err) {
      console.error(err);
      setStatus(`準備エラー: ${err.message}`);
      preloadBtn.disabled = false;
      volumeCheckBtn.classList.add("hidden");
      if (preparedSession && preparedSession.recorder) {
        await preparedSession.recorder.dispose();
      }
      preparedSession = null;
    }
  });

  volumeCheckBtn.addEventListener("click", async () => {
    try {
      await runVolumeCheck();
    } catch (err) {
      console.error(err);
      setStatus(`音量チェックエラー: ${err.message}`);
      volumeCheckBtn.disabled = false;
    }
  });

  startPassBtn.addEventListener("click", runPassFlow);

  redownloadZipBtn.addEventListener("click", () => {
    if (!lastZipBlob || !lastZipName) {
      setStatus("再ダウンロード可能なZIPがありません。");
      return;
    }
    triggerDownload(lastZipBlob, lastZipName);
    setStatus(`再ダウンロードしました: ${lastZipName}`);
  });

  document.addEventListener("keydown", (ev) => {
    if (isRunning) return;
    if (ev.code !== "Space" && ev.key !== " ") return;
    if (startPassBtn.classList.contains("hidden")) return;
    if (startPassBtn.disabled) return;
    ev.preventDefault();
    runPassFlow();
  });
})();
