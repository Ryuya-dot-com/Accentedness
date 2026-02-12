(() => {
  const EXPERIMENT_VERSION = "testing_phase_v1.0.0";
  const EXPERIMENT_BUILD_DATE = "2026-02-12";
  const RESPONSE_KEYS = {
    yes: "KeyJ",
    no: "KeyF",
  };

  const TEST_VOICES = [
    { id: "male_test", label: "Male Test (Brian)", gender: "male" },
    { id: "female_test", label: "Female Test (Emma)", gender: "female" },
  ];

  const PRACTICE_ITEMS = [
    { word: "elephant", jp: "ぞう" },
    { word: "fox", jp: "きつね" },
    { word: "giraffe", jp: "きりん" },
    { word: "hippopotamus", jp: "カバ" },
    { word: "monkey", jp: "さる" },
  ];

  const STIMULI = [
    { word: "icicle", jp: "つらら" },
    { word: "thermometer", jp: "温度計" },
    { word: "abacus", jp: "そろばん" },
    { word: "acorn", jp: "どんぐり" },
    { word: "binoculars", jp: "双眼鏡" },
    { word: "persimmon", jp: "柿" },
    { word: "mantis", jp: "カマキリ" },
    { word: "carousel", jp: "メリーゴーラウンド" },
    { word: "syringe", jp: "注射器" },
    { word: "burdock", jp: "ごぼう" },
    { word: "cobweb", jp: "クモの巣" },
    { word: "faucet", jp: "蛇口" },
    { word: "tadpole", jp: "オタマジャクシ" },
    { word: "tweezers", jp: "ピンセット" },
    { word: "rickshaw", jp: "人力車" },
    { word: "abalone", jp: "アワビ" },
    { word: "raccoon", jp: "アライグマ" },
    { word: "ladle", jp: "おたま" },
    { word: "xylophone", jp: "木琴" },
    { word: "protractor", jp: "分度器" },
    { word: "toupee", jp: "かつら" },
    { word: "treadmill", jp: "ランニングマシン" },
    { word: "cicada", jp: "セミ" },
    { word: "lawnmower", jp: "芝刈り機" },
    { word: "burglar", jp: "泥棒" },
    { word: "toboggan", jp: "そり" },
    { word: "porcupine", jp: "ヤマアラシ" },
    { word: "razor", jp: "カミソリ" },
    { word: "cocoon", jp: "繭、かいこ" },
    { word: "wardrobe", jp: "タンス" },
    { word: "detergent", jp: "洗剤" },
    { word: "parakeet", jp: "インコ" },
    { word: "scallop", jp: "ホタテ" },
    { word: "walrus", jp: "セイウチ" },
    { word: "podium", jp: "表彰台" },
    { word: "casket", jp: "棺" },
    { word: "pacifier", jp: "おしゃぶり" },
    { word: "scalpel", jp: "メス" },
    { word: "spatula", jp: "フライ返し" },
    { word: "scapula", jp: "肩甲骨" },
    { word: "pupa", jp: "蛹" },
    { word: "nostril", jp: "鼻の穴" },
    { word: "labyrinth", jp: "迷宮" },
    { word: "loquat", jp: "ビワ" },
    { word: "pylon", jp: "鉄塔" },
    { word: "lotus", jp: "ハス" },
    { word: "capelin", jp: "ししゃも" },
    { word: "strainer", jp: "ざる" },
    { word: "chisel", jp: "彫刻刀" },
    { word: "catapult", jp: "投石機" },
  ];

  const prepareBtn = document.getElementById("prepare-btn");
  const startPracticeBtn = document.getElementById("start-practice-btn");
  const startMainBtn = document.getElementById("start-main-btn");
  const downloadBtn = document.getElementById("download-btn");
  const participantInput = document.getElementById("participant-id");

  const statusEl = document.getElementById("status");
  const logEl = document.getElementById("log");
  const trialEl = document.getElementById("trial");
  const messageEl = document.getElementById("message");
  const jpWordEl = document.getElementById("jp-word");
  const progressEl = document.getElementById("progress");
  const progressFillEl = document.getElementById("progress-fill");
  const progressLabelEl = document.getElementById("progress-label");

  let preparedSession = null;
  let isRunning = false;
  let finalXlsxBytes = null;

  const setStatus = (text) => {
    statusEl.textContent = text;
  };

  const setLog = (text) => {
    logEl.textContent = text;
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function parseNumericId(participantId) {
    const digits = String(participantId).match(/\d+/g);
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

  function isChrome() {
    const ua = navigator.userAgent || "";
    const hasChrome = /Chrome\/\d+/.test(ua);
    const blocked = /Edg\/|OPR\/|Opera|Firefox\/|CriOS\/|FxiOS\//.test(ua);
    return hasChrome && !blocked;
  }

  function showMessage(text) {
    trialEl.style.display = "none";
    messageEl.style.display = "block";
    messageEl.textContent = text;
  }

  function showTrial(jp) {
    messageEl.style.display = "none";
    trialEl.style.display = "block";
    jpWordEl.textContent = jp;
  }

  function showProgress(done, total, labelPrefix) {
    const pct = total <= 0 ? 0 : Math.min(100, Math.max(0, (done / total) * 100));
    progressFillEl.style.width = `${pct}%`;
    progressLabelEl.textContent = `${labelPrefix} ${done}/${total}`;
    progressEl.style.display = "flex";
  }

  function hideProgress() {
    progressEl.style.display = "none";
    progressFillEl.style.width = "0%";
    progressLabelEl.textContent = "";
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

  function derangeByIndex(items, rng) {
    if (items.length <= 1) {
      throw new Error("Derangement requires at least 2 items.");
    }
    for (let attempt = 0; attempt < 500; attempt += 1) {
      const shuffled = seededShuffle(items, rng);
      let ok = true;
      for (let i = 0; i < items.length; i += 1) {
        if (shuffled[i] === items[i]) {
          ok = false;
          break;
        }
      }
      if (ok) return shuffled;
    }

    const rotated = items.slice(1).concat(items[0]);
    for (let i = 0; i < items.length; i += 1) {
      if (rotated[i] === items[i]) {
        throw new Error("Failed to generate derangement.");
      }
    }
    return rotated;
  }

  function trialVoiceById(id) {
    const voice = TEST_VOICES.find((v) => v.id === id);
    if (!voice) throw new Error(`Unknown voice id: ${id}`);
    return voice;
  }

  function createTrial({ phase, word, correctJp, shownJp, isMatch, voiceId }) {
    const voice = trialVoiceById(voiceId);
    return {
      phase,
      word,
      correctJp,
      shownJp,
      isMatch,
      expectedKey: isMatch ? RESPONSE_KEYS.yes : RESPONSE_KEYS.no,
      expectedLabel: isMatch ? "Yes" : "No",
      voiceId: voice.id,
      voiceLabel: voice.label,
      voiceGender: voice.gender,
      audioPath: `../Stimuli/audio_test_2voices/${voice.id}/${word}.wav`,
    };
  }

  function buildPracticeTrials(participantId) {
    const numericId = parseNumericId(participantId);
    const rng = mulberry32(numericId * 1000 + 701);
    const ordered = seededShuffle(PRACTICE_ITEMS, rng);
    const mismatchedJps = derangeByIndex(
      ordered.map((item) => item.jp),
      rng
    );

    const trials = [];
    ordered.forEach((item, idx) => {
      const yesVoice = TEST_VOICES[Math.floor(rng() * TEST_VOICES.length)].id;
      const noVoice = TEST_VOICES[Math.floor(rng() * TEST_VOICES.length)].id;

      trials.push(
        createTrial({
          phase: "practice",
          word: item.word,
          correctJp: item.jp,
          shownJp: item.jp,
          isMatch: true,
          voiceId: yesVoice,
        })
      );

      trials.push(
        createTrial({
          phase: "practice",
          word: item.word,
          correctJp: item.jp,
          shownJp: mismatchedJps[idx],
          isMatch: false,
          voiceId: noVoice,
        })
      );
    });

    const shuffled = seededShuffle(trials, rng);
    shuffled.forEach((trial, idx) => {
      trial.trialInPhase = idx + 1;
      trial.trialTotal = shuffled.length;
    });
    return shuffled;
  }

  function buildMainTrials(participantId) {
    const numericId = parseNumericId(participantId);
    const rngWords = mulberry32(numericId * 1000 + 801);
    const rngMismatch = mulberry32(numericId * 1000 + 803);
    const rngVoice = mulberry32(numericId * 1000 + 805);
    const rngOrder = mulberry32(numericId * 1000 + 807);

    const ordered = seededShuffle(STIMULI, rngWords);
    const mismatchedJps = derangeByIndex(
      ordered.map((item) => item.jp),
      rngMismatch
    );

    const signalTrials = ordered.map((item) =>
      createTrial({
        phase: "main",
        word: item.word,
        correctJp: item.jp,
        shownJp: item.jp,
        isMatch: true,
        voiceId: TEST_VOICES[0].id,
      })
    );

    const noiseTrials = ordered.map((item, idx) =>
      createTrial({
        phase: "main",
        word: item.word,
        correctJp: item.jp,
        shownJp: mismatchedJps[idx],
        isMatch: false,
        voiceId: TEST_VOICES[1].id,
      })
    );

    const trials = signalTrials.concat(noiseTrials);

    const voicePool = [];
    for (let i = 0; i < trials.length / 2; i += 1) {
      voicePool.push(TEST_VOICES[0].id);
      voicePool.push(TEST_VOICES[1].id);
    }
    const shuffledVoicePool = seededShuffle(voicePool, rngVoice);

    trials.forEach((trial, idx) => {
      const voice = trialVoiceById(shuffledVoicePool[idx]);
      trial.voiceId = voice.id;
      trial.voiceLabel = voice.label;
      trial.voiceGender = voice.gender;
      trial.audioPath = `../Stimuli/audio_test_2voices/${voice.id}/${trial.word}.wav`;
    });

    const shuffledTrials = seededShuffle(trials, rngOrder);
    shuffledTrials.forEach((trial, idx) => {
      trial.trialInPhase = idx + 1;
      trial.trialTotal = shuffledTrials.length;
    });
    return shuffledTrials;
  }

  function summarizePlannedMainTrials(trials) {
    const byGender = {
      male: { yes: 0, no: 0, total: 0 },
      female: { yes: 0, no: 0, total: 0 },
    };

    trials.forEach((trial) => {
      const g = byGender[trial.voiceGender];
      if (!g) return;
      g.total += 1;
      if (trial.isMatch) g.yes += 1;
      else g.no += 1;
    });

    return byGender;
  }

  function collectAudioPaths(practiceTrials, mainTrials) {
    const unique = new Set();
    practiceTrials.forEach((trial) => unique.add(trial.audioPath));
    mainTrials.forEach((trial) => unique.add(trial.audioPath));
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

  function waitForResponseKey(startPerf) {
    return new Promise((resolve) => {
      const handler = (ev) => {
        if (ev.repeat) return;
        if (ev.code !== RESPONSE_KEYS.yes && ev.code !== RESPONSE_KEYS.no) return;
        ev.preventDefault();
        document.removeEventListener("keydown", handler);

        const rtMs = Math.max(0, performance.now() - startPerf);
        const responseLabel = ev.code === RESPONSE_KEYS.yes ? "Yes" : "No";
        resolve({
          keyCode: ev.code,
          keyLabel: responseLabel,
          rtMs,
          responseEpochMs: Date.now(),
        });
      };
      document.addEventListener("keydown", handler);
    });
  }

  async function prepareSession(participantId) {
    const practiceTrials = buildPracticeTrials(participantId);
    const mainTrials = buildMainTrials(participantId);
    const audioPaths = collectAudioPaths(practiceTrials, mainTrials);
    const audioMap = await preloadAudio(audioPaths);

    return {
      participantId,
      practiceTrials,
      mainTrials,
      audioMap,
      rows: [],
      summaryRows: null,
      preparedAt: new Date().toISOString(),
      randomizedGenderRatio: summarizePlannedMainTrials(mainTrials),
    };
  }

  async function runTrialSequence(trials, phaseLabel, opts) {
    const { showFeedback } = opts;

    for (let i = 0; i < trials.length; i += 1) {
      const trial = trials[i];
      showProgress(i, trials.length, `${phaseLabel}`);
      setStatus(`${phaseLabel} 実行中: ${i + 1}/${trials.length}`);

      const audio = preparedSession.audioMap.get(trial.audioPath);
      if (!audio) {
        throw new Error(`音声が見つかりません: ${trial.audioPath}`);
      }

      showTrial(trial.shownJp);
      await delay(150);

      audio.pause();
      audio.currentTime = 0;

      let audioOnsetPerf = null;
      let audioOnsetEpochMs = null;
      try {
        await audio.play();
        audioOnsetPerf = performance.now();
        audioOnsetEpochMs = Date.now();
      } catch (err) {
        throw new Error(`音声再生に失敗しました: ${trial.audioPath}`);
      }

      const response = await waitForResponseKey(audioOnsetPerf);
      const isCorrect = response.keyCode === trial.expectedKey;
      audio.pause();
      audio.currentTime = 0;

      const globalTrial = preparedSession.rows.length + 1;
      preparedSession.rows.push({
        participantId: preparedSession.participantId,
        experimentVersion: EXPERIMENT_VERSION,
        buildDate: EXPERIMENT_BUILD_DATE,
        phase: trial.phase,
        phaseLabel,
        trialInPhase: trial.trialInPhase,
        trialTotalInPhase: trial.trialTotal,
        globalTrial,
        word: trial.word,
        shownJp: trial.shownJp,
        correctJp: trial.correctJp,
        isMatch: trial.isMatch,
        expectedResponse: trial.expectedLabel,
        expectedKey: trial.expectedKey,
        responseKey: response.keyCode,
        responseLabel: response.keyLabel,
        isCorrect,
        rtMs: response.rtMs,
        audioPath: trial.audioPath,
        voiceId: trial.voiceId,
        voiceLabel: trial.voiceLabel,
        voiceGender: trial.voiceGender,
        audioOnsetEpochMs,
        responseEpochMs: response.responseEpochMs,
      });

      if (showFeedback) {
        if (isCorrect) {
          showMessage("正解");
        } else {
          showMessage(`不正解\n正答: ${trial.expectedLabel}`);
        }
        await delay(420);
      }

      await delay(160);
    }

    showProgress(trials.length, trials.length, `${phaseLabel}`);
  }

  function splitMainRows(rows) {
    return rows.filter((r) => r.phase === "main");
  }

  function average(nums) {
    if (!nums.length) return null;
    return nums.reduce((a, b) => a + b, 0) / nums.length;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function normInv(p) {
    const a = [
      -3.969683028665376e+01,
      2.209460984245205e+02,
      -2.759285104469687e+02,
      1.38357751867269e+02,
      -3.066479806614716e+01,
      2.506628277459239e+00,
    ];
    const b = [
      -5.447609879822406e+01,
      1.615858368580409e+02,
      -1.556989798598866e+02,
      6.680131188771972e+01,
      -1.328068155288572e+01,
    ];
    const c = [
      -7.784894002430293e-03,
      -3.223964580411365e-01,
      -2.400758277161838e+00,
      -2.549732539343734e+00,
      4.374664141464968e+00,
      2.938163982698783e+00,
    ];
    const d = [
      7.784695709041462e-03,
      3.224671290700398e-01,
      2.445134137142996e+00,
      3.754408661907416e+00,
    ];

    const plow = 0.02425;
    const phigh = 1 - plow;

    const pp = clamp(p, 1e-12, 1 - 1e-12);
    let q;
    let r;

    if (pp < plow) {
      q = Math.sqrt(-2 * Math.log(pp));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    if (pp > phigh) {
      q = Math.sqrt(-2 * Math.log(1 - pp));
      return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }

    q = pp - 0.5;
    r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }

  function computeSignalDetection(rows) {
    const signalRows = rows.filter((r) => r.isMatch);
    const noiseRows = rows.filter((r) => !r.isMatch);

    const hits = signalRows.filter((r) => r.responseKey === RESPONSE_KEYS.yes).length;
    const misses = signalRows.length - hits;
    const falseAlarms = noiseRows.filter((r) => r.responseKey === RESPONSE_KEYS.yes).length;
    const correctRejections = noiseRows.length - falseAlarms;

    const hitRate = signalRows.length ? hits / signalRows.length : 0;
    const faRate = noiseRows.length ? falseAlarms / noiseRows.length : 0;

    const hitAdj = signalRows.length ? (hits + 0.5) / (signalRows.length + 1) : 0.5;
    const faAdj = noiseRows.length ? (falseAlarms + 0.5) / (noiseRows.length + 1) : 0.5;

    const zHit = normInv(hitAdj);
    const zFa = normInv(faAdj);
    const dPrime = zHit - zFa;
    const criterionC = -0.5 * (zHit + zFa);
    const beta = Math.exp((zFa * zFa - zHit * zHit) / 2);

    const acc = rows.length ? (hits + correctRejections) / rows.length : 0;

    return {
      nTrials: rows.length,
      nSignal: signalRows.length,
      nNoise: noiseRows.length,
      hits,
      misses,
      falseAlarms,
      correctRejections,
      accuracy: acc,
      hitRate,
      falseAlarmRate: faRate,
      hitRateAdjusted: hitAdj,
      falseAlarmRateAdjusted: faAdj,
      dPrime,
      criterionC,
      beta,
      meanRtMs: average(rows.map((r) => r.rtMs)),
      meanRtCorrectMs: average(rows.filter((r) => r.isCorrect).map((r) => r.rtMs)),
    };
  }

  function toPct(value) {
    return `${(value * 100).toFixed(2)}%`;
  }

  function buildSummaryTable(mainRows) {
    const scopes = [
      { label: "overall", rows: mainRows },
      { label: "male", rows: mainRows.filter((r) => r.voiceGender === "male") },
      { label: "female", rows: mainRows.filter((r) => r.voiceGender === "female") },
    ];

    const out = [[
      "scope",
      "n_trials",
      "n_signal",
      "n_noise",
      "hits",
      "misses",
      "false_alarms",
      "correct_rejections",
      "accuracy",
      "hit_rate",
      "false_alarm_rate",
      "hit_rate_adjusted",
      "false_alarm_rate_adjusted",
      "d_prime",
      "criterion_c",
      "beta",
      "mean_rt_ms",
      "mean_rt_correct_ms",
    ]];

    scopes.forEach((scope) => {
      const m = computeSignalDetection(scope.rows);
      out.push([
        scope.label,
        m.nTrials,
        m.nSignal,
        m.nNoise,
        m.hits,
        m.misses,
        m.falseAlarms,
        m.correctRejections,
        toPct(m.accuracy),
        toPct(m.hitRate),
        toPct(m.falseAlarmRate),
        toPct(m.hitRateAdjusted),
        toPct(m.falseAlarmRateAdjusted),
        m.dPrime.toFixed(6),
        m.criterionC.toFixed(6),
        m.beta.toFixed(6),
        m.meanRtMs === null ? "" : m.meanRtMs.toFixed(3),
        m.meanRtCorrectMs === null ? "" : m.meanRtCorrectMs.toFixed(3),
      ]);
    });

    return out;
  }

  function buildTrialTable(rows) {
    const out = [[
      "participant_id",
      "experiment_version",
      "build_date",
      "phase",
      "phase_label",
      "trial_in_phase",
      "trial_total_in_phase",
      "global_trial",
      "word",
      "shown_jp",
      "correct_jp",
      "is_match",
      "expected_response",
      "expected_key",
      "response_key",
      "response_label",
      "is_correct",
      "rt_ms",
      "audio_path",
      "voice_id",
      "voice_label",
      "voice_gender",
      "audio_onset_epoch_ms",
      "response_epoch_ms",
    ]];

    rows.forEach((r) => {
      out.push([
        r.participantId,
        r.experimentVersion,
        r.buildDate,
        r.phase,
        r.phaseLabel,
        r.trialInPhase,
        r.trialTotalInPhase,
        r.globalTrial,
        r.word,
        r.shownJp,
        r.correctJp,
        r.isMatch ? 1 : 0,
        r.expectedResponse,
        r.expectedKey,
        r.responseKey,
        r.responseLabel,
        r.isCorrect ? 1 : 0,
        r.rtMs.toFixed(3),
        r.audioPath,
        r.voiceId,
        r.voiceLabel,
        r.voiceGender,
        r.audioOnsetEpochMs,
        r.responseEpochMs,
      ]);
    });

    return out;
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

    const centralSize = centralParts.reduce((acc, x) => acc + x.length, 0);
    const end = new Uint8Array(22);
    const ev = new DataView(end.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(4, 0, true);
    ev.setUint16(6, 0, true);
    ev.setUint16(8, fileEntries.length, true);
    ev.setUint16(10, fileEntries.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, localOffset, true);
    ev.setUint16(20, 0, true);

    return new Blob([...parts, ...centralParts, end], {
      type: "application/zip",
    });
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

  function buildWorksheetXml(tableRows) {
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

    return (
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
      `<sheetData>${rowXml}</sheetData>` +
      `</worksheet>`
    );
  }

  async function buildWorkbookXlsxBytes(sheets) {
    const safeSheets = sheets.map((sheet, idx) => ({
      id: idx + 1,
      name: sanitizeSheetName(sheet.name || `Sheet${idx + 1}`),
      rows: sheet.rows,
    }));

    const workbookSheetXml = safeSheets
      .map((sheet) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${sheet.id}" r:id="rId${sheet.id}"/>`)
      .join("");

    const workbookXml =
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ` +
      `xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">` +
      `<sheets>${workbookSheetXml}</sheets>` +
      `</workbook>`;

    const workbookRelEntries = safeSheets
      .map(
        (sheet) =>
          `<Relationship Id="rId${sheet.id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" ` +
          `Target="worksheets/sheet${sheet.id}.xml"/>`
      )
      .join("");

    const styleRelId = safeSheets.length + 1;
    const workbookRelsXml =
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
      workbookRelEntries +
      `<Relationship Id="rId${styleRelId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>` +
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

    const contentOverrides = safeSheets
      .map(
        (sheet) =>
          `<Override PartName="/xl/worksheets/sheet${sheet.id}.xml" ` +
          `ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`
      )
      .join("");

    const contentTypesXml =
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
      `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
      `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
      `<Default Extension="xml" ContentType="application/xml"/>` +
      `<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>` +
      contentOverrides +
      `<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>` +
      `</Types>`;

    const xlsxFiles = [
      { name: "[Content_Types].xml", bytes: TEXT_ENCODER.encode(contentTypesXml) },
      { name: "_rels/.rels", bytes: TEXT_ENCODER.encode(rootRelsXml) },
      { name: "xl/workbook.xml", bytes: TEXT_ENCODER.encode(workbookXml) },
      { name: "xl/_rels/workbook.xml.rels", bytes: TEXT_ENCODER.encode(workbookRelsXml) },
      { name: "xl/styles.xml", bytes: TEXT_ENCODER.encode(stylesXml) },
    ];

    safeSheets.forEach((sheet) => {
      const worksheetXml = buildWorksheetXml(sheet.rows);
      xlsxFiles.push({
        name: `xl/worksheets/sheet${sheet.id}.xml`,
        bytes: TEXT_ENCODER.encode(worksheetXml),
      });
    });

    const blob = createZipBlob(xlsxFiles);
    return new Uint8Array(await blob.arrayBuffer());
  }

  function triggerDownload(bytes, filename) {
    const blob = new Blob([bytes], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function finalizeResults() {
    const mainRows = splitMainRows(preparedSession.rows);
    const trialTable = buildTrialTable(preparedSession.rows);
    const summaryTable = buildSummaryTable(mainRows);

    finalXlsxBytes = await buildWorkbookXlsxBytes([
      { name: "trial_log", rows: trialTable },
      { name: "sdt_summary", rows: summaryTable },
    ]);

    preparedSession.summaryRows = summaryTable;
    const overall = computeSignalDetection(mainRows);
    setLog(`Main accuracy ${toPct(overall.accuracy)} | d' ${overall.dPrime.toFixed(3)} | c ${overall.criterionC.toFixed(3)}`);
  }

  async function runPractice() {
    if (!preparedSession || isRunning) return;
    isRunning = true;
    startPracticeBtn.disabled = true;
    startMainBtn.classList.add("hidden");
    downloadBtn.classList.add("hidden");

    try {
      document.body.classList.add("running");
      showMessage("練習を開始します");
      await delay(700);
      await runTrialSequence(preparedSession.practiceTrials, "Practice", { showFeedback: true });
      showMessage("練習終了\n本試行へ進んでください");
      setStatus("練習終了。準備ができたら本試行開始を押してください。");
      setLog("練習は学習時の動物語を使用しています。");
      startMainBtn.classList.remove("hidden");
      startMainBtn.disabled = false;
    } catch (err) {
      console.error(err);
      showMessage("エラーが発生しました");
      setStatus(`エラー: ${err.message}`);
      startPracticeBtn.disabled = false;
    } finally {
      document.body.classList.remove("running");
      hideProgress();
      isRunning = false;
    }
  }

  async function runMain() {
    if (!preparedSession || isRunning) return;
    isRunning = true;
    startMainBtn.disabled = true;
    downloadBtn.classList.add("hidden");

    try {
      document.body.classList.add("running");
      showMessage("本試行を開始します\nJ=Yes / F=No");
      await delay(800);
      await runTrialSequence(preparedSession.mainTrials, "Main", { showFeedback: false });
      await finalizeResults();
      setStatus("本試行終了。Excelファイルを保存してください。");
      showMessage("テスト終了\n結果を保存してください");
      downloadBtn.classList.remove("hidden");
      downloadBtn.disabled = false;
    } catch (err) {
      console.error(err);
      showMessage("エラーが発生しました");
      setStatus(`エラー: ${err.message}`);
      startMainBtn.disabled = false;
    } finally {
      document.body.classList.remove("running");
      hideProgress();
      isRunning = false;
    }
  }

  prepareBtn.addEventListener("click", async () => {
    if (isRunning) return;

    const participantId = participantInput.value.trim();
    if (!participantId) {
      setStatus("参加者IDを入力してください。");
      return;
    }

    prepareBtn.disabled = true;
    startPracticeBtn.classList.add("hidden");
    startMainBtn.classList.add("hidden");
    downloadBtn.classList.add("hidden");
    finalXlsxBytes = null;

    try {
      if (!isChrome()) {
        setLog("Chrome以外が検出されました。動作は継続できますが、Chrome推奨です。");
      } else {
        setLog("");
      }

      showMessage("刺激を準備しています...");
      setStatus("試行条件を生成しています...");
      preparedSession = await prepareSession(participantId);

      const ratio = preparedSession.randomizedGenderRatio;
      setStatus("準備完了。練習を開始できます。");
      setLog(
        `Main予定: male Yes=${ratio.male.yes}, No=${ratio.male.no} / female Yes=${ratio.female.yes}, No=${ratio.female.no}`
      );

      showMessage("準備完了\n「練習開始」を押してください");
      startPracticeBtn.classList.remove("hidden");
      startPracticeBtn.disabled = false;
    } catch (err) {
      console.error(err);
      showMessage("準備に失敗しました");
      setStatus(`準備エラー: ${err.message}`);
    } finally {
      prepareBtn.disabled = false;
    }
  });

  startPracticeBtn.addEventListener("click", () => {
    runPractice();
  });

  startMainBtn.addEventListener("click", () => {
    runMain();
  });

  downloadBtn.addEventListener("click", () => {
    if (!finalXlsxBytes || !preparedSession) {
      setStatus("保存可能な結果がありません。");
      return;
    }

    const filename = `testing_phase_${sanitizeName(preparedSession.participantId)}.xlsx`;
    triggerDownload(finalXlsxBytes, filename);
    setStatus(`保存しました: ${filename}`);
  });
})();
