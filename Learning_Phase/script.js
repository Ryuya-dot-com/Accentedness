(() => {
  const TRIAL_WINDOW_MS = 4000;
  const RECORDING_BEEP_MS = 180;
  const RECORDING_BEEP_HZ = 1000;
  const RECORDING_BEEP_GAIN = 0.06;
  const EXPERIMENT_VERSION = "learning_phase_v3.3.0";
  const EXPERIMENT_BUILD_DATE = "2026-02-12";
  const RECOVERY_DB_NAME = "accentedness_learning_recovery";
  const RECOVERY_DB_VERSION = 1;
  const RECOVERY_SESSIONS_STORE = "sessions";
  const RECOVERY_TRIALS_STORE = "trials";
  const RECOVERY_BY_SESSION_INDEX = "by_session";
  const TALKERS = [
    { id: "m1_guy", label: "M1 (Guy)" },
    { id: "m2_christopher", label: "M2 (Christopher)" },
    { id: "m3_ryan", label: "M3 (Andrew)" },
    { id: "f1_aria", label: "F1 (Aria)" },
    { id: "f2_jenny", label: "F2 (Jenny)" },
    { id: "f3_sonia", label: "F3 (Ana)" },
  ];

  const PRACTICE_ITEMS = [
    { word: "elephant", jp: "ぞう", list: 0 },
    { word: "fox", jp: "きつね", list: 0 },
    { word: "giraffe", jp: "きりん", list: 0 },
    { word: "hippopotamus", jp: "カバ", list: 0 },
    { word: "monkey", jp: "さる", list: 0 },
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
  const startPracticeBtn = document.getElementById("start-practice-btn");
  const confirmPracticeBtn = document.getElementById("confirm-practice-btn");
  const downloadFinalBtn = document.getElementById("download-final-btn");
  const participantInput = document.getElementById("participant-id");
  const configEl = document.getElementById("config");
  const statusEl = document.getElementById("status");
  const logEl = document.getElementById("log");
  const progressEl = document.getElementById("progress");
  const progressFillEl = document.getElementById("progress-fill");
  const progressLabelEl = document.getElementById("progress-label");
  const mainDisplayEl = document.getElementById("main-display");
  const jpWordEl = document.getElementById("jp-word");
  const trialTimerEl = document.getElementById("trial-timer");
  const trialTimerFillEl = document.getElementById("trial-timer-fill");
  const messageEl = document.getElementById("message");
  const micCheckEl = document.getElementById("mic-check");
  const micMeterFillEl = document.getElementById("mic-meter-fill");

  let preparedSession = null;
  let finalZipBlob = null;
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

  function showMessage(text) {
    stopTrialTimer();
    mainDisplayEl.style.display = "none";
    messageEl.textContent = text;
    messageEl.style.display = "block";
    document.body.classList.remove("presenting");
  }

  function showStimulus(block) {
    messageEl.style.display = "none";
    mainDisplayEl.style.display = "flex";
    jpWordEl.textContent = block.jp;
    document.body.classList.add("presenting");
  }

  function hideStimulus() {
    mainDisplayEl.style.display = "none";
    messageEl.style.display = "none";
    stopTrialTimer();
    document.body.classList.remove("presenting");
  }

  function showProgress(done, total) {
    const pct = total <= 0 ? 0 : Math.min(100, Math.max(0, (done / total) * 100));
    progressFillEl.style.width = `${pct}%`;
    progressLabelEl.textContent = "";
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
        practiceRows: rows.filter((r) => r.phase === "practice"),
        mainRows: rows.filter((r) => r.phase === "main"),
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

  async function getRecoveryArtifacts(sessionId, phaseFilter = null) {
    const snapshot = await loadRecoverySnapshot(sessionId);
    const records = phaseFilter
      ? snapshot.trialRecords.filter((r) => r.row.phase === phaseFilter)
      : snapshot.trialRecords.slice();
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

  function rotate(arr, startIndex) {
    return [...arr.slice(startIndex), ...arr.slice(0, startIndex)];
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

  function buildCounterbalance(participantId) {
    const numericId = parseNumericId(participantId);
    const conditionIndex = (numericId - 1) % 24;
    const listMappingFactor = Math.floor(conditionIndex / 12);
    const orderFactor = Math.floor((conditionIndex % 12) / 6);
    const talkerFactor = conditionIndex % 6;

    const singleList = listMappingFactor === 0 ? 1 : 2;
    const multiList = singleList === 1 ? 2 : 1;
    const listOrder = orderFactor === 0 ? [1, 2] : [2, 1];
    const singleTalker = TALKERS[talkerFactor];
    const multiRotation = rotate(TALKERS, talkerFactor);

    return {
      numericId,
      conditionIndex,
      singleList,
      multiList,
      listOrder,
      singleTalker,
      multiRotation,
      listAssignmentLabel: singleList === 1 ? "L1=Single,L2=Multi" : "L1=Multi,L2=Single",
      listOrderLabel: listOrder.join("->"),
    };
  }

  function buildPracticeBlocks(participantId) {
    const numericId = parseNumericId(participantId);
    const rng = mulberry32(numericId * 1000 + 17);
    const ordered = seededShuffle(PRACTICE_ITEMS, rng);
    return ordered.map((item, idx) => ({
      phase: "practice",
      phaseLabel: "Practice",
      blockIndex: idx + 1,
      blockTotal: ordered.length,
      list: 0,
      condition: "Single",
      word: item.word,
      jp: item.jp,
      repetitions: Array.from({ length: 6 }, (_, i) => ({
        repetition: i + 1,
        talker: { id: "practice", label: "Practice Voice" },
        audioPath: `../practice/${item.word}.wav`,
      })),
    }));
  }

  function buildMainBlocks(counterbalance) {
    const rng1 = mulberry32(counterbalance.numericId * 1000 + 11);
    const rng2 = mulberry32(counterbalance.numericId * 1000 + 13);
    const orderedList1 = seededShuffle(LIST1, rng1);
    const orderedList2 = seededShuffle(LIST2, rng2);
    const wordsByList = { 1: orderedList1, 2: orderedList2 };

    const blocks = [];
    let blockNo = 0;

    counterbalance.listOrder.forEach((listId) => {
      const condition = listId === counterbalance.singleList ? "Single" : "Multi";
      const sourceWords = wordsByList[listId];

      sourceWords.forEach((item) => {
        blockNo += 1;
        const repetitions = [];
        for (let i = 0; i < 6; i += 1) {
          const talker =
            condition === "Single"
              ? counterbalance.singleTalker
              : counterbalance.multiRotation[i % counterbalance.multiRotation.length];
          repetitions.push({
            repetition: i + 1,
            talker,
            audioPath: `../Stimuli/audio_en_6voices/${talker.id}/${item.word}.wav`,
          });
        }
        blocks.push({
          phase: "main",
          phaseLabel: "Main",
          blockIndex: blockNo,
          blockTotal: 50,
          list: listId,
          condition,
          word: item.word,
          jp: item.jp,
          repetitions,
        });
      });
    });

    return blocks;
  }

  function collectAudioPaths(practiceBlocks, mainBlocks) {
    const unique = new Set();
    [...practiceBlocks, ...mainBlocks].forEach((block) => {
      block.repetitions.forEach((rep) => unique.add(rep.audioPath));
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
      const wavBytes = encodeWav(this.chunks, this.audioCtx.sampleRate);
      return {
        wavBytes,
        durationMs: recordingStopPerf - this.recordingStartPerf,
        sampleRate: this.audioCtx.sampleRate,
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
    "experiment_version",
    "serial_no",
    "phase",
    "trial_in_phase",
    "global_trial",
    "block_index",
    "block_total",
    "list",
    "condition",
    "word",
    "japanese",
    "repetition",
    "talker_id",
    "talker_label",
    "stimulus_file",
    "recording_file",
    "trial_window_ms",
    "recording_duration_ms",
    "trial_start_epoch_ms",
    "audio_onset_epoch_ms",
    "audio_onset_from_phase_ms",
    "counterbalance_index",
    "single_list",
    "multi_list",
    "list_order",
    "single_talker",
    "multi_rotation_start",
  ];

  function buildLogTable(rows) {
    const out = [LOG_COLUMNS];
    rows.forEach((r) => {
      out.push([
        r.participantId,
        r.experimentVersion || EXPERIMENT_VERSION,
        r.serialNo,
        r.phase,
        r.trialInPhase,
        r.globalTrial,
        r.blockIndex,
        r.blockTotal,
        r.list,
        r.condition,
        r.word,
        r.jp,
        r.repetition,
        r.talkerId,
        r.talkerLabel,
        r.stimulusFile,
        r.recordingFile,
        r.trialWindowMs,
        r.recordingDurationMs.toFixed(3),
        r.trialStartEpochMs,
        r.audioOnsetEpochMs,
        r.audioOnsetFromPhaseMs.toFixed(3),
        r.cbIndex,
        r.singleList,
        r.multiList,
        r.listOrder,
        r.singleTalker,
        r.multiRotationStart,
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

  async function runPhase({
    phaseName,
    phaseLabel,
    blocks,
    participantId,
    counterbalance,
    audioMap,
    recorder,
    globalTrialRef,
    outputPrefix,
    existingRows = [],
    onTrialPersist = null,
  }) {
    const totalTrials = blocks.reduce((acc, b) => acc + b.repetitions.length, 0);
    const rows = existingRows
      .slice()
      .sort((a, b) => (a.serialNo || 0) - (b.serialNo || 0));
    let completed = rows.length;
    const phaseStartPerf = performance.now();
    const completedByBlock = new Map();
    rows.forEach((r) => {
      const count = completedByBlock.get(r.blockIndex) || 0;
      completedByBlock.set(r.blockIndex, count + 1);
    });
    let firstPendingPrompted = false;

    for (let b = 0; b < blocks.length; b += 1) {
      const block = blocks[b];
      const doneInBlock = completedByBlock.get(block.blockIndex) || 0;
      if (doneInBlock >= block.repetitions.length) {
        continue;
      }
      if (!firstPendingPrompted) {
        const blockPrompt =
          `${phaseLabel}${completed > 0 ? "（続きから再開）" : ""}\n` +
          `ブロック ${block.blockIndex}/${block.blockTotal}\n` +
          `日本語: ${block.jp}\n` +
          "スペースキーで開始";
        await waitForSpace(blockPrompt);
        firstPendingPrompted = true;
      }

      for (let r = doneInBlock; r < block.repetitions.length; r += 1) {
        const rep = block.repetitions[r];
        const trialInPhase = completed + 1;
        showProgress(completed, totalTrials);
        globalTrialRef.value += 1;
        const serialNo = globalTrialRef.value;
        showStimulus(block);

        const audio = audioMap.get(rep.audioPath);
        if (!audio) {
          throw new Error(`音声アセットが見つかりません: ${rep.audioPath}`);
        }

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
              reject(new Error(`音声再生に失敗しました: ${rep.audioPath}`));
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
          await recorder.start();
          recordingStarted = true;
          startTrialTimer(TRIAL_WINDOW_MS);
          await delay(TRIAL_WINDOW_MS);
          rec = recorder.stop();
        } finally {
          if (recordingStarted && !rec) {
            recorder.stop();
          }
          stopTrialTimer();
          cleanupPlayback();
        }
        audio.pause();
        audio.currentTime = 0;
        if (audioOnsetPerf === null || audioOnsetEpochMs === null) {
          throw new Error(`音声再生に失敗しました: ${rep.audioPath}`);
        }
        if (!rec || trialStartEpochMs === null) {
          throw new Error("録音の開始または停止に失敗しました。");
        }

        const safeWord = sanitizeName(block.word);
        const recordingFile = `${outputPrefix}/wav/` +
          `trial${String(serialNo).padStart(4, "0")}_` +
          `${phaseName}_block${String(block.blockIndex).padStart(3, "0")}` +
          `_word_${safeWord}` +
          `_rep${String(rep.repetition).padStart(2, "0")}` +
          `_talker_${rep.talker.id}.wav`;

        rows.push({
          participantId,
          experimentVersion: EXPERIMENT_VERSION,
          serialNo,
          phase: phaseName,
          trialInPhase,
          globalTrial: serialNo,
          blockIndex: block.blockIndex,
          blockTotal: block.blockTotal,
          list: block.list,
          condition: block.condition,
          word: block.word,
          jp: block.jp,
          repetition: rep.repetition,
          talkerId: rep.talker.id,
          talkerLabel: rep.talker.label,
          stimulusFile: rep.audioPath,
          recordingFile,
          trialWindowMs: TRIAL_WINDOW_MS,
          recordingDurationMs: rec.durationMs,
          trialStartEpochMs,
          audioOnsetEpochMs,
          audioOnsetFromPhaseMs: audioOnsetPerf - phaseStartPerf,
          cbIndex: counterbalance.conditionIndex,
          singleList: counterbalance.singleList,
          multiList: counterbalance.multiList,
          listOrder: counterbalance.listOrder.join("->"),
          singleTalker: counterbalance.singleTalker.id,
          multiRotationStart: counterbalance.multiRotation[0].id,
        });

        if (onTrialPersist) {
          await onTrialPersist(rows[rows.length - 1], rec.wavBytes);
        }
        completed += 1;
        completedByBlock.set(block.blockIndex, (completedByBlock.get(block.blockIndex) || 0) + 1);
        showProgress(completed, totalTrials);
      }

      let nextPendingBlock = null;
      for (let nb = b + 1; nb < blocks.length; nb += 1) {
        const maybe = blocks[nb];
        const maybeDone = completedByBlock.get(maybe.blockIndex) || 0;
        if (maybeDone < maybe.repetitions.length) {
          nextPendingBlock = maybe;
          break;
        }
      }
      if (nextPendingBlock) {
        await waitForSpace(
          `この単語は終了です\n` +
          `次: ${nextPendingBlock.jp}\n` +
          "スペースキーで次へ"
        );
      }
    }

    return { rows, totalTrials };
  }

  async function prepareSession(participantId) {
    const counterbalance = buildCounterbalance(participantId);
    const practiceBlocks = buildPracticeBlocks(participantId);
    const mainBlocks = buildMainBlocks(counterbalance);
    const audioPaths = collectAudioPaths(practiceBlocks, mainBlocks);
    const sessionId = getRecoverySessionId(participantId);

    let recoverySnapshot = await loadRecoverySnapshot(sessionId);
    const plannedMainTrials = mainBlocks.reduce((acc, b) => acc + b.repetitions.length, 0);
    const hasIncompatibleDraft =
      recoverySnapshot.meta &&
      (
        recoverySnapshot.meta.participantId !== participantId ||
        recoverySnapshot.meta.counterbalanceIndex !== counterbalance.conditionIndex ||
        recoverySnapshot.meta.experimentVersion !== EXPERIMENT_VERSION
      );
    const hasCompletedRowsWithoutMeta =
      (recoverySnapshot.mainRows?.length || 0) >= plannedMainTrials;
    if (hasIncompatibleDraft || recoverySnapshot.meta?.mainCompleted || hasCompletedRowsWithoutMeta) {
      await clearRecoverySession(sessionId);
      recoverySnapshot = { meta: null, trialRecords: [], rows: [], practiceRows: [], mainRows: [] };
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
      const practiceRows = recoverySnapshot.practiceRows || [];
      const mainRows = recoverySnapshot.mainRows || [];
      const volumeCheckDone = Boolean(recoverySnapshot.meta?.volumeCheckCompleted);

      await mergeRecoverySessionMeta(sessionId, {
        participantId,
        counterbalanceIndex: counterbalance.conditionIndex,
        counterbalanceLabel: counterbalance.listAssignmentLabel,
        listOrder: counterbalance.listOrderLabel,
        experimentVersion: EXPERIMENT_VERSION,
        buildDate: EXPERIMENT_BUILD_DATE,
        volumeCheckCompleted: volumeCheckDone,
        practiceCompleted: practiceRows.length >= practiceBlocks.reduce((acc, b) => acc + b.repetitions.length, 0),
        mainCompleted: mainRows.length >= mainBlocks.reduce((acc, b) => acc + b.repetitions.length, 0),
      });

      return {
        sessionId,
        participantId,
        counterbalance,
        practiceBlocks,
        mainBlocks,
        audioMap,
        recorder,
        practiceRows,
        mainRows,
        volumeCheckCompleted: volumeCheckDone,
        initialRecoveredTrials: practiceRows.length + mainRows.length,
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
    const samplePath = preparedSession.practiceBlocks[0]?.repetitions[0]?.audioPath;
    if (!samplePath) {
      throw new Error("音量チェック用の刺激が見つかりません。");
    }
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
    startPracticeBtn.classList.remove("hidden");
    startPracticeBtn.disabled = false;
    setStatus("音量チェック完了。練習を開始できます。");
    showMessage("音量OKならスペースキーまたはボタンで練習開始");
  }

  async function runPracticeFlow() {
    if (!preparedSession || isRunning) return;
    if (!volumeCheckCompleted) {
      setStatus("先に音量チェックを行ってください。");
      return;
    }
    isRunning = true;
    volumeCheckBtn.classList.add("hidden");
    startPracticeBtn.disabled = true;
    confirmPracticeBtn.classList.add("hidden");
    downloadFinalBtn.classList.add("hidden");

    const globalTrialRef = {
      value: (preparedSession.practiceRows?.length || 0) + (preparedSession.mainRows?.length || 0),
    };
    const outputPrefix = `${sanitizeName(preparedSession.participantId)}/practice`;

    try {
      enterExperimentScreen();
      const practiceTotal = preparedSession.practiceBlocks.reduce((acc, b) => acc + b.repetitions.length, 0);
      if ((preparedSession.practiceRows?.length || 0) > 0) {
        setStatus(`練習を再開します。完了済み: ${preparedSession.practiceRows.length}/${practiceTotal}`);
      } else {
        setStatus("練習を開始します。");
      }
      const practiceResult = await runPhase({
        phaseName: "practice",
        phaseLabel: "Practice",
        blocks: preparedSession.practiceBlocks,
        participantId: preparedSession.participantId,
        counterbalance: preparedSession.counterbalance,
        audioMap: preparedSession.audioMap,
        recorder: preparedSession.recorder,
        globalTrialRef,
        outputPrefix,
        existingRows: preparedSession.practiceRows || [],
        onTrialPersist: async (row, wavBytes) => {
          await saveRecoveryTrial(preparedSession.sessionId, row, wavBytes);
          await mergeRecoverySessionMeta(preparedSession.sessionId, {
            latestSerialNo: row.serialNo,
            phase: "practice",
          });
        },
      });

      preparedSession.practiceRows = practiceResult.rows;

      const practiceArtifacts = await getRecoveryArtifacts(preparedSession.sessionId, "practice");
      const practiceTable = buildLogTable(practiceArtifacts.rows);
      const practiceXlsxBytes = await buildXlsxBytes(practiceTable, "practice_log");
      const practiceZipFiles = [
        ...practiceArtifacts.files,
        {
          name: `${outputPrefix}/logs/practice_log_${sanitizeName(preparedSession.participantId)}.xlsx`,
          bytes: practiceXlsxBytes,
        },
      ];

      const practiceZip = createZipBlob(practiceZipFiles);
      triggerDownload(
        practiceZip,
        `practice_check_${sanitizeName(preparedSession.participantId)}.zip`
      );
      await mergeRecoverySessionMeta(preparedSession.sessionId, {
        practiceCompleted: true,
        phase: "practice_completed",
      });

      exitExperimentScreen();
      setStatus("練習ZIP（WAV+XLSX）を自動ダウンロードしました。録音を確認してから本番へ進んでください。");
      setLog("練習完了: ZIPを展開してWAVを確認後、「確認できたので本番へ進む」を押してください。");
      showMessage("練習終了\n録音確認後に本番へ進みます");
      startPracticeBtn.classList.add("hidden");
      confirmPracticeBtn.classList.remove("hidden");
      confirmPracticeBtn.disabled = false;
    } catch (err) {
      console.error(err);
      exitExperimentScreen();
      setStatus(`エラー: ${err.message}`);
      startPracticeBtn.disabled = false;
    } finally {
      isRunning = false;
    }
  }

  async function runMainFlow() {
    if (!preparedSession || isRunning) return;
    isRunning = true;
    confirmPracticeBtn.disabled = true;

    const globalTrialRef = {
      value: (preparedSession.practiceRows?.length || 0) + (preparedSession.mainRows?.length || 0),
    };
    const outputPrefix = `${sanitizeName(preparedSession.participantId)}/main`;

    try {
      enterExperimentScreen();
      const mainTotal = preparedSession.mainBlocks.reduce((acc, b) => acc + b.repetitions.length, 0);
      if ((preparedSession.mainRows?.length || 0) > 0) {
        setStatus(`本番を再開します。完了済み: ${preparedSession.mainRows.length}/${mainTotal}`);
      } else {
        setStatus("本番を開始します。");
      }
      const mainResult = await runPhase({
        phaseName: "main",
        phaseLabel: "Main",
        blocks: preparedSession.mainBlocks,
        participantId: preparedSession.participantId,
        counterbalance: preparedSession.counterbalance,
        audioMap: preparedSession.audioMap,
        recorder: preparedSession.recorder,
        globalTrialRef,
        outputPrefix,
        existingRows: preparedSession.mainRows || [],
        onTrialPersist: async (row, wavBytes) => {
          await saveRecoveryTrial(preparedSession.sessionId, row, wavBytes);
          await mergeRecoverySessionMeta(preparedSession.sessionId, {
            latestSerialNo: row.serialNo,
            phase: "main",
          });
        },
      });

      preparedSession.mainRows = mainResult.rows;
      const practiceArtifacts = await getRecoveryArtifacts(preparedSession.sessionId, "practice");
      const mainArtifacts = await getRecoveryArtifacts(preparedSession.sessionId, "main");
      const practiceTable = buildLogTable(practiceArtifacts.rows);
      const mainTable = buildLogTable(mainArtifacts.rows);
      const practiceXlsxBytes = await buildXlsxBytes(practiceTable, "practice_log");
      const mainXlsxBytes = await buildXlsxBytes(mainTable, "main_log");
      const summary = {
        participant_id: preparedSession.participantId,
        experiment_version: EXPERIMENT_VERSION,
        build_date: EXPERIMENT_BUILD_DATE,
        finalized_at_iso: new Date().toISOString(),
        counterbalance_index: preparedSession.counterbalance.conditionIndex,
        list_assignment: preparedSession.counterbalance.listAssignmentLabel,
        list_order: preparedSession.counterbalance.listOrderLabel,
        single_list: preparedSession.counterbalance.singleList,
        multi_list: preparedSession.counterbalance.multiList,
        single_talker: preparedSession.counterbalance.singleTalker.id,
        multi_rotation: preparedSession.counterbalance.multiRotation.map((t) => t.id),
        practice_trials: practiceArtifacts.rows.length,
        main_trials: mainArtifacts.rows.length,
        recovered_session: preparedSession.initialRecoveredTrials > 0,
        recovered_trials_at_start: preparedSession.initialRecoveredTrials,
      };

      const baseDir = sanitizeName(preparedSession.participantId);
      const zipFiles = [
        ...practiceArtifacts.files,
        ...mainArtifacts.files,
        {
          name: `${baseDir}/logs/practice_log_${baseDir}.xlsx`,
          bytes: practiceXlsxBytes,
        },
        {
          name: `${baseDir}/logs/main_log_${baseDir}.xlsx`,
          bytes: mainXlsxBytes,
        },
        {
          name: `${baseDir}/logs/summary_${baseDir}.json`,
          bytes: TEXT_ENCODER.encode(JSON.stringify(summary, null, 2)),
        },
      ];

      finalZipBlob = createZipBlob(zipFiles);
      const finalZipName = `learning_phase_${baseDir}_all_data.zip`;
      triggerDownload(finalZipBlob, finalZipName);

      exitExperimentScreen();
      setStatus("本番完了。全WAV+XLSX+summary のZIPを自動ダウンロードしました。");
      setLog("");
      showMessage("実験終了\nご協力ありがとうございました");
      await mergeRecoverySessionMeta(preparedSession.sessionId, {
        mainCompleted: true,
        phase: "completed",
      });

      downloadFinalBtn.classList.remove("hidden");
      downloadFinalBtn.onclick = () => {
        if (!finalZipBlob) return;
        triggerDownload(finalZipBlob, finalZipName);
      };

      await preparedSession.recorder.dispose();
      await clearRecoverySession(preparedSession.sessionId);
      preparedSession = null;
      preloadBtn.disabled = false;
      volumeCheckBtn.classList.add("hidden");
      startPracticeBtn.classList.add("hidden");
      confirmPracticeBtn.classList.add("hidden");
    } catch (err) {
      console.error(err);
      exitExperimentScreen();
      setStatus(`エラー: ${err.message}`);
      confirmPracticeBtn.disabled = false;
      preloadBtn.disabled = false;
    } finally {
      isRunning = false;
    }
  }

  preloadBtn.addEventListener("click", async () => {
    const participantId = participantInput.value.trim();
    if (!participantId) {
      setStatus("参加者IDを入力してください。");
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
    volumeCheckBtn.classList.add("hidden");
    volumeCheckBtn.textContent = "音量チェックを再生";
    volumeCheckBtn.disabled = true;
    startPracticeBtn.classList.add("hidden");
    startPracticeBtn.disabled = true;
    confirmPracticeBtn.classList.add("hidden");
    confirmPracticeBtn.disabled = true;
    downloadFinalBtn.classList.add("hidden");
    setLog("");

    try {
      preparedSession = await prepareSession(participantId);
      const practiceTotal = preparedSession.practiceBlocks.reduce((acc, b) => acc + b.repetitions.length, 0);
      const mainTotal = preparedSession.mainBlocks.reduce((acc, b) => acc + b.repetitions.length, 0);
      const practiceDone = preparedSession.practiceRows.length;
      const mainDone = preparedSession.mainRows.length;
      volumeCheckCompleted = Boolean(preparedSession.volumeCheckCompleted);

      setStatus("準備完了。");
      setLog("");
      if (practiceDone >= practiceTotal && mainDone < mainTotal) {
        volumeCheckCompleted = true;
        showMessage("前回の続きがあります\n本番を再開できます");
        setStatus(`復旧データを検出: 練習 ${practiceDone}/${practiceTotal}, 本番 ${mainDone}/${mainTotal}`);
        confirmPracticeBtn.classList.remove("hidden");
        confirmPracticeBtn.disabled = false;
        return;
      }

      if (!volumeCheckCompleted) {
        setStatus("準備完了。まず音量チェックを行ってください。");
        showMessage("音量チェックを再生してください");
        volumeCheckBtn.classList.remove("hidden");
        volumeCheckBtn.disabled = false;
      } else {
        showMessage("前回の続きがあります\n練習を再開できます");
        setStatus(`復旧データを検出: 練習 ${practiceDone}/${practiceTotal}, 本番 ${mainDone}/${mainTotal}`);
        startPracticeBtn.classList.remove("hidden");
        startPracticeBtn.disabled = false;
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

  startPracticeBtn.addEventListener("click", runPracticeFlow);
  confirmPracticeBtn.addEventListener("click", runMainFlow);

  document.addEventListener("keydown", (ev) => {
    if (ev.code !== "Space" && ev.key !== " ") return;
    if (startPracticeBtn.classList.contains("hidden")) return;
    if (startPracticeBtn.disabled) return;
    ev.preventDefault();
    runPracticeFlow();
  });
})();
