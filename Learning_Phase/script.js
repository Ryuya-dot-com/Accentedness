(() => {
  const TRIAL_WINDOW_MS = 4000;
  const POST_AUDIO_TO_BEEP_MS = 500;
  const RECORDING_BEEP_MS = 180;
  const RECORDING_BEEP_HZ = 1000;
  const RECORDING_BEEP_GAIN = 0.06;
  const EXPERIMENT_VERSION = "learning_phase_v5.2.0";
  const EXPERIMENT_BUILD_DATE = "2026-04-21";
  const RECOVERY_DB_NAME = "accentedness_learning_recovery";
  const RECOVERY_DB_VERSION = 2;
  const RECOVERY_SESSIONS_STORE = "sessions";
  const RECOVERY_TRIALS_STORE = "trials";
  const RECOVERY_ZIPS_STORE = "zips";
  const RECOVERY_BY_SESSION_INDEX = "by_session";
  const STIMULUS_FONT_STEP_PX = 2;
  const STIMULUS_MIN_FONT_PX = 30;
  const STIMULUS_GLOSS_FONT_STEP_PX = 1;
  const STIMULUS_GLOSS_MIN_FONT_PX = 15;
  const STIMULUS_HINT_FONT_STEP_PX = 1;
  const STIMULUS_HINT_MIN_FONT_PX = 13;
  const STIMULUS_META_CSV_PATH = "../Stimuli/audio_en_6voices/audio_meta.csv";

  const NATIVE_LANGUAGES = {
    english: {
      id: "english",
      label: "English",
      labelJa: "英語",
      labelZh: "英语",
    },
    japanese: {
      id: "japanese",
      label: "Japanese",
      labelJa: "日本語",
      labelZh: "日语",
    },
    chinese: {
      id: "chinese",
      label: "Chinese",
      labelJa: "中国語",
      labelZh: "中文",
    },
  };

  const UI_COPY = {
    bilingual: {
      langAttr: "ja",
      title: "Accentedness Learning Phase",
      participantLabel: "参加者ID / Participant ID (例 / e.g., 001)",
      nativeLanguageLabel: "母語 / Native language",
      languageOptions: {
        english: "English / 英語",
        japanese: "Japanese / 日本語",
        chinese: "Chinese / 中国語",
      },
      summaryTitle: "実験概要 / Experiment overview:",
      summaryItems: [
        "Google Chrome で実施してください。 / Please use Google Chrome.",
        "本番開始前に、音量チェックと練習録音を行います。 / Before the main recording, you will complete a volume check and practice recording.",
        "練習終了後、ダウンロード確認のために練習ZIPも自動でダウンロードします。 / After practice, a practice ZIP is downloaded automatically so you can confirm downloads work.",
        "本番は50語です。Japanese / Chinese 母語話者は3回、English 母語話者は2回リピートします。 / The main task has 50 words. Japanese/Chinese speakers repeat them 3 times; English speakers repeat them 2 times.",
        "録音後に「もう一度録音する」または「次へ」を選べます。 / After each recording, choose retake or next.",
        "各Passの50語が終わるたびに、そのPassのWAVとログを含むZIPを自動ダウンロードします。 / After each pass, a ZIP containing WAV files and logs is downloaded automatically.",
      ],
      chromeWarning:
        "ブラウザがChrome以外の場合は開始できません。 / This task can only start in Chrome.",
      preloadButton: "準備 / Prepare (Chrome, mic, audio)",
      volumeCheckButton: "音量チェックを再生 / Play volume check",
      volumeCheckAgainButton:
        "音量チェックを再生（再確認） / Play volume check again",
      startRecordingButton: "録音開始 / Start recording (Space)",
      startPracticeButton: "練習を開始 / Start practice",
      micCheckLabel: "マイク入力レベル / Microphone input level",
      micCheckNote:
        "声を出してメーターが動くことを確認してください / Speak and make sure the meter moves.",
      trialHintBase:
        "ビープ音のあとに聞こえた英単語を発話してください / After the beep, say the English word you heard.",
      acceptButton: "次へ / Next",
      retakeButton: "もう一度録音する / Retake",
      recordingDecisionLabel:
        "録音を使うか録り直すかを選ぶ / Choose whether to use or retake the recording",
      redownloadButton: "最後のZIPを再ダウンロード / Re-download last ZIP",
    },
    ja: {
      langAttr: "ja",
      title: "訛りの学習フェーズ",
      participantLabel: "参加者ID (例: 001)",
      nativeLanguageLabel: "母語",
      languageOptions: {
        english: "英語",
        japanese: "日本語",
        chinese: "中国語",
      },
      summaryTitle: "実験概要:",
      summaryItems: [
        "グーグル Chrome で実施してください（マイク録音と圧縮ファイル出力のため）。",
        "本番開始前に、音量チェックと練習録音を行います。",
        "練習終了後、ダウンロード確認のために練習用の圧縮ファイルも自動でダウンロードします。",
        "本番は50語です。日本語・中国語母語話者は3回、英語母語話者は2回リピートします。",
        "1回目は自然な英語、2回目は条件に応じた英語、3回目は自然な英語と母語訛りの中間です。",
        "英語母語話者の2回目は、自然な英語を保ったまま、少しゆっくり・明瞭に発話します。",
        "練習では、コーヒー、ピザ、ソファ、チョコレートを使い、録音レベルと録り直し操作を確認します。",
        "各録音は「刺激音声の再生後にビープ音が鳴り、ビープ音直後から4秒録音」で自動終了します。",
        "録音後に「もう一度録音する」または「次へ」を選べます。",
        "各回の50語が終わるたびに、その回のWAVとログを含む圧縮ファイルを自動ダウンロードします。",
      ],
      chromeWarning: "ブラウザがChrome以外の場合は開始できません。",
      preloadButton: "準備（Chrome確認・マイク許可・音声読み込み）",
      volumeCheckButton: "音量チェックを再生",
      volumeCheckAgainButton: "音量チェックを再生（再確認）",
      startRecordingButton: "録音開始（スペースキー）",
      startPracticeButton: "練習を開始",
      micCheckLabel: "マイク入力レベル",
      micCheckNote: "声を出してメーターが動くことを確認してください",
      trialHintBase: "ビープ音のあとに聞こえた英単語を発話してください",
      acceptButton: "次へ",
      retakeButton: "もう一度録音する",
      recordingDecisionLabel: "録音を使うか録り直すかを選ぶ",
      redownloadButton: "最後の圧縮ファイルを再ダウンロード",
      passes: {
        naturalLabel: "1回目: 自然な英語",
        naturalProgressLabel: "1回目",
        naturalShort: "自然な英語",
        naturalInstruction:
          "1回目は、あなたが普段いちばん自然だと思う英語でリピートしてください。訛りを意識して強めたり弱めたりせず、聞こえた英単語をそのまま発話してください。",
        clearLabel: "2回目: ゆっくり・明瞭な英語",
        clearProgressLabel: "2回目",
        clearShort: "ゆっくり・明瞭な英語",
        clearInstruction:
          "2回目は、自然な英語を保ったまま、少しゆっくり・はっきり発話してください。日本語や中国語の訛りをまねる必要はありません。",
        accentedLabel: (nativeLanguage) =>
          `2回目: ${nativeLanguage.labelJa}の訛りを強めた英語`,
        accentedProgressLabel: "2回目",
        accentedShort: (nativeLanguage) =>
          `${nativeLanguage.labelJa}の訛りを強めた英語`,
        accentedInstruction: (nativeLanguage) =>
          `2回目は、自分の母語（${nativeLanguage.labelJa}）の特徴が出るように英語でリピートしてください。単語は英語のまま、無理に別人をまねず、あなた自身の${nativeLanguage.labelJa}らしい訛りを意識してください。`,
        intermediateLabel: "3回目: 自然な英語と母語訛りの中間",
        intermediateProgressLabel: "3回目",
        intermediateShort: "自然な英語と母語訛りの中間",
        intermediateInstruction:
          "3回目は、1回目の自然な英語と2回目の母語訛りの中間くらいでリピートしてください。訛りを完全には消さず、強すぎもしない発話を目指してください。",
        practiceLabel: "練習: 音量と録り直し確認",
        practiceProgressLabel: "練習",
        practiceShort: "練習",
        practiceInstruction: (nativeLanguage) =>
          `練習では、${nativeLanguage.labelJa}で見慣れた借用語を使って、音量と録り直し操作を確認します。` +
          "ここでの録音は最終圧縮ファイルには保存されませんが、ダウンロード確認のための練習用圧縮ファイルは別に出力されます。声の大きさとマイクまでの距離をここで調整してください。",
      },
      messages: {
        beforeUnload: "このページを離れると実験が中断されます。",
        trialHint: (shortInstruction, takeNo) =>
          `${shortInstruction} / 録音 ${takeNo}. ビープ音のあとに聞こえた英単語を発話してください。`,
        recordingLevelPrefix: "録音レベル",
        recordingPeakLabel: "最大",
        recordingLevels: {
          clipRisk: {
            label: "音量が大きすぎる可能性があります",
            advice: "マイクから少し離れるか、少し小さめに発話してください。",
          },
          tooQuiet: {
            label: "音量が小さめです",
            advice: "マイクに少し近づくか、少し大きめに発話してください。",
          },
          loud: {
            label: "音量はやや大きめですが使用可能です",
            advice: "音割れが気になる場合は少しだけマイクから離れてください。",
          },
          good: {
            label: "録音レベルは良好です",
            advice: "この距離と声量を保ってください。",
          },
        },
        trialDecision: ({ passLabel, trialLabel, takeNo, levelText }) =>
          `録音が終了しました\n${passLabel}\n${trialLabel}\n` +
          `録音 ${takeNo} を使う場合は「次へ」、録り直す場合は「もう一度録音する」を押してください。` +
          levelText,
        preloadingAudio: (current, total) =>
          `音声プリロード中 ${current}/${total}`,
        audioLoadFailed: (path) => `音声が読み込めません: ${path}`,
        idbUnsupported:
          "このブラウザは録音データの一時保存に対応していません。",
        audioContextUnavailable: "このブラウザでは音声機能が利用できません。",
        startPracticeButton: "練習を開始",
        resumePassButton: (label) => `${label} を再開`,
        startPassButton: (label) => `${label} を開始`,
        volumeFirst: "先に音量チェックを行ってください。",
        practiceStartStatus: "練習を開始します。",
        practiceDoneNeedsAttention:
          "練習完了。録音レベルに注意が出た項目があります。本番前にマイク位置を調整してください。",
        practiceDoneOk: "練習完了。録音レベルは概ね良好です。本番へ進めます。",
        practiceLog:
          "練習録音は最終圧縮ファイルには保存しません。確認用の練習圧縮ファイルをダウンロードしました。",
        practiceDoneMessage:
          "練習完了\n確認用の練習圧縮ファイルをダウンロードしました\n本番の録音へ進んでください",
        practiceError: (message) => `練習エラー: ${message}`,
        audioAssetMissing: (path) => `音声アセットが見つかりません: ${path}`,
        audioPlaybackFailed: (path) => `音声再生に失敗しました: ${path}`,
        recordingFailed: "録音の開始または停止に失敗しました。",
        practiceIntro: (pass) =>
          `${pass.label}\n\n` +
          `${pass.instruction}\n\n` +
          "録音レベルが小さすぎる、または大きすぎる場合は、マイクとの距離や声量を調整して録り直してください。\n" +
          "スペースキーで練習を開始",
        passIntro: (pass, completed) =>
          `${pass.label}${completed > 0 ? "（続きから再開）" : ""}\n\n` +
          `${pass.instruction}\n\n` +
          "各単語の録音後に、録り直すか次へ進むかを選べます。\n" +
          "スペースキーで開始",
        checkingMic: "マイクの許可を確認しています...",
        loadingAudio: "音声ファイルを読み込んでいます...",
        prepareFirst: "先に準備を実行してください。",
        volumeAudioMissing: (path) =>
          `音量チェック音声が見つかりません: ${path}`,
        volumeCheckMessage: "音量チェック中です",
        volumeCheckStatus: "音量チェック音声を再生しています...",
        volumePlaybackFailed: "音量チェック音声の再生に失敗しました。",
        volumeDoneStatus: "音量チェック完了。録音を開始できます。",
        volumeDoneMessage: "音量OKなら録音を開始してください",
        allDoneStatus: "すべての録音は完了しています。",
        passStartStatus: (label) => `${label} を開始します。`,
        passDoneNextStatus: (label, count) =>
          `${label} 完了。${count}個のWAVとログを含む圧縮ファイルを自動ダウンロードしました。次のリピートへ進めます。`,
        passDoneNextMessage: (label) =>
          `${label} 完了\n圧縮ファイルをダウンロードしました\n次のリピートへ進んでください`,
        passDoneFinalStatus: (label) =>
          `${label} 完了。最後のWAVとログを含む圧縮ファイルを自動ダウンロードしました。`,
        audioMetaLoadFailed: (path) =>
          `刺激メタデータを読み込めません: ${path}`,
        allDoneMessage: "録音はすべて終了です\nご協力ありがとうございました",
        saved: (name) => `保存: ${name}`,
        genericError: (message) => `エラー: ${message}`,
        genericErrorGuidance:
          "もう一度試してください。繰り返し失敗する場合は実験担当者に知らせてください。",
        micPermissionDenied:
          "マイクの使用が許可されていません。Chrome のアドレスバー左側の権限設定でマイクを許可し、もう一度「準備」を押してください。",
        micNotFound:
          "使用できるマイクが見つかりません。マイクの接続を確認してから、もう一度「準備」を押してください。",
        micInUse:
          "マイクを開始できません。別のアプリがマイクを使用していないか確認してから、もう一度「準備」を押してください。",
        micSecurity:
          "このページではマイクを使用できません。Chrome で安全なページとして開き直してください。",
        micUnknown:
          "マイクを開始できません。接続とChromeのマイク許可を確認してから、もう一度「準備」を押してください。",
        missingParticipant: "参加者IDを入力してください。",
        selectLanguage: "母語を選択してください。",
        chromeOnly: "Chrome で実施してください。Chrome以外では開始できません。",
        micUnsupported: "この環境ではマイク録音に対応していません。",
        prepared: "準備完了。",
        planLog: ({ nativeLanguage, passCount, plannedTrials }) =>
          `母語: ${nativeLanguage} / 予定: ${passCount}回, ${plannedTrials}録音`,
        playVolumeCheckMessage: "音量チェックを再生してください",
        preparedDoVolume: "準備完了。まず音量チェックを行ってください。",
        recoveryMessage: "前回の続きがあります\n録音を再開できます",
        recoveryStatus: (completed, planned) =>
          `復旧データを検出: ${completed}/${planned}`,
        prepareError: (message) => `準備エラー: ${message}`,
        volumeError: (message) => `音量チェックエラー: ${message}`,
        retryButton: "この単語をもう一度試す",
        trialRetryPrompt: (message) =>
          `この単語の録音中に問題が起きました\n${message}\n\n準備ができたら、この単語をもう一度試してください。`,
        redownloadUnavailable: "再ダウンロード可能な圧縮ファイルがありません。",
        redownloaded: (name) => `再ダウンロードしました: ${name}`,
      },
    },
    en: {
      langAttr: "en",
      title: "Accentedness Learning Phase",
      participantLabel: "Participant ID (e.g., 001)",
      nativeLanguageLabel: "Native language",
      languageOptions: {
        english: "English",
        japanese: "Japanese / 日本語",
        chinese: "Chinese / 中文",
      },
      summaryTitle: "Experiment overview:",
      summaryItems: [
        "Please use Google Chrome because this task records audio and downloads ZIP files.",
        "Before the main recording, you will complete a volume check and practice recording.",
        "After practice, a practice ZIP is downloaded automatically so you can confirm that downloads work.",
        "The main task has 50 words. English speakers complete 2 passes; Japanese and Chinese speakers complete 3 passes.",
        "Pass 1 uses your natural English. Pass 2 for English speakers uses slower, clearer English.",
        "Practice uses coffee, pizza, sofa, and chocolate to check recording volume and the retake controls.",
        "Each recording starts after the stimulus audio and a beep, then ends automatically after 4 seconds.",
        "After each recording, choose Next or Retake.",
        "After each pass, a ZIP containing the WAV files and logs for that pass is downloaded automatically.",
      ],
      chromeWarning: "This task can only start in Google Chrome.",
      preloadButton: "Prepare (Chrome check, mic permission, audio preload)",
      volumeCheckButton: "Play volume check",
      volumeCheckAgainButton: "Play volume check again",
      startRecordingButton: "Start recording (Space)",
      startPracticeButton: "Start practice",
      micCheckLabel: "Microphone input level",
      micCheckNote: "Speak and make sure the meter moves.",
      trialHintBase: "After the beep, say the English word you heard.",
      acceptButton: "Next",
      retakeButton: "Retake",
      recordingDecisionLabel: "Choose whether to use or retake the recording",
      redownloadButton: "Re-download last ZIP",
      passes: {
        naturalLabel: "Pass 1: Natural English",
        naturalProgressLabel: "Pass 1",
        naturalShort: "natural English",
        naturalInstruction:
          "For Pass 1, repeat each word in the English that feels most natural to you. Do not intentionally strengthen or weaken an accent; just say the English word you heard.",
        clearLabel: "Pass 2: Clear English",
        clearProgressLabel: "Pass 2",
        clearShort: "slower, clearer English",
        clearInstruction:
          "For Pass 2, keep your English natural, but speak a little more slowly and clearly. You do not need to imitate a Japanese or Chinese accent.",
        accentedLabel: (nativeLanguage) =>
          `Pass 2: ${nativeLanguage.label} accented English`,
        accentedProgressLabel: "Pass 2",
        accentedShort: (nativeLanguage) =>
          `${nativeLanguage.label} accented English`,
        accentedInstruction: (nativeLanguage) =>
          `For Pass 2, repeat each word in English while letting features of your native language (${nativeLanguage.label}) come through. Keep the word in English, and do not imitate another person.`,
        intermediateLabel: "Pass 3: Intermediate accent",
        intermediateProgressLabel: "Pass 3",
        intermediateShort: "between natural and accented English",
        intermediateInstruction:
          "For Pass 3, repeat each word halfway between your natural English from Pass 1 and the accented English from Pass 2. Aim for an accent that is present but not too strong.",
        practiceLabel: "Practice: volume and retake check",
        practiceProgressLabel: "Practice",
        practiceShort: "practice",
        practiceInstruction: () =>
          "In practice, you will use familiar loanwords to check the volume and retake controls. " +
          "These recordings are not saved in the final ZIP, but a separate practice ZIP is downloaded so you can confirm downloads work. Use this step to adjust your speaking volume and distance from the microphone.",
      },
      messages: {
        beforeUnload: "Leaving this page will interrupt the experiment.",
        trialHint: (shortInstruction, takeNo) =>
          `${shortInstruction} / Take ${takeNo}. After the beep, say the English word you heard.`,
        recordingLevelPrefix: "Recording level",
        recordingPeakLabel: "peak",
        recordingLevels: {
          clipRisk: {
            label: "The volume may be too high",
            advice:
              "Move slightly farther from the microphone or speak a little more softly.",
          },
          tooQuiet: {
            label: "The volume is a little low",
            advice:
              "Move slightly closer to the microphone or speak a little louder.",
          },
          loud: {
            label: "The volume is somewhat high but usable",
            advice:
              "If the sound is distorted, move slightly farther from the microphone.",
          },
          good: {
            label: "The recording level is good",
            advice: "Keep this distance and speaking volume.",
          },
        },
        trialDecision: ({ passLabel, trialLabel, takeNo, levelText }) =>
          `Recording finished\n${passLabel}\n${trialLabel}\n` +
          `Press Next to use Take ${takeNo}, or press Retake to record it again.` +
          levelText,
        preloadingAudio: (current, total) =>
          `Preloading audio ${current}/${total}`,
        audioLoadFailed: (path) => `Could not load audio: ${path}`,
        idbUnsupported: "This browser does not support IndexedDB.",
        audioContextUnavailable: "AudioContext is not available.",
        startPracticeButton: "Start practice",
        resumePassButton: (label) => `Resume ${label}`,
        startPassButton: (label) => `Start ${label}`,
        volumeFirst: "Please complete the volume check first.",
        practiceStartStatus: "Starting practice.",
        practiceDoneNeedsAttention:
          "Practice complete. Some recordings need attention; adjust your microphone position before the main task.",
        practiceDoneOk:
          "Practice complete. The recording level looks good overall. You can continue to the main task.",
        practiceLog:
          "Practice recordings are not saved in the final ZIP. A separate practice ZIP has been downloaded.",
        practiceDoneMessage:
          "Practice complete\nThe practice ZIP has been downloaded\nContinue to the main pass",
        practiceError: (message) => `Practice error: ${message}`,
        audioAssetMissing: (path) => `Audio asset not found: ${path}`,
        audioPlaybackFailed: (path) => `Audio playback failed: ${path}`,
        recordingFailed: "Recording could not start or stop.",
        practiceIntro: (pass) =>
          `${pass.label}\n\n` +
          `${pass.instruction}\n\n` +
          "If the recording level is too low or too high, adjust your distance from the microphone or your speaking volume and record again.\n" +
          "Press Space to start practice.",
        passIntro: (pass, completed) =>
          `${pass.label}${completed > 0 ? " (resuming)" : ""}\n\n` +
          `${pass.instruction}\n\n` +
          "After each word, you can choose whether to retake the recording or continue.\n" +
          "Press Space to start.",
        checkingMic: "Checking microphone permission...",
        loadingAudio: "Loading audio files...",
        prepareFirst: "Please run Prepare first.",
        volumeAudioMissing: (path) =>
          `Volume check audio was not found: ${path}`,
        volumeCheckMessage: "Volume check in progress",
        volumeCheckStatus: "Playing the volume check audio...",
        volumePlaybackFailed: "Volume check audio playback failed.",
        volumeDoneStatus: "Volume check complete. You can start recording.",
        volumeDoneMessage: "If the volume is OK, start recording",
        allDoneStatus: "All recordings are complete.",
        passStartStatus: (label) => `Starting ${label}.`,
        passDoneNextStatus: (label, count) =>
          `${label} complete. Downloaded a ZIP containing ${count} WAV files and logs. You can continue to the next pass.`,
        passDoneNextMessage: (label) =>
          `${label} complete\nThe ZIP file has been downloaded\nContinue to the next pass`,
        passDoneFinalStatus: (label) =>
          `${label} complete. The final ZIP containing WAV files and logs has been downloaded.`,
        audioMetaLoadFailed: (path) =>
          `Stimulus metadata could not be loaded: ${path}`,
        allDoneMessage: "All recordings are complete\nThank you",
        saved: (name) => `Saved: ${name}`,
        genericError: (message) => `Error: ${message}`,
        genericErrorGuidance:
          "Try again. If the problem keeps happening, contact the experimenter.",
        micPermissionDenied:
          "Microphone access is blocked. Allow microphone access in Chrome's site settings, then press Prepare again.",
        micNotFound:
          "No usable microphone was found. Check that the microphone is connected, then press Prepare again.",
        micInUse:
          "The microphone could not start. Close other apps that may be using it, then press Prepare again.",
        micSecurity:
          "The microphone cannot be used from this page. Open the task in Chrome from a secure page.",
        micUnknown:
          "The microphone could not start. Check the connection and Chrome microphone permission, then press Prepare again.",
        missingParticipant: "Enter the participant ID.",
        selectLanguage: "Select a native language.",
        chromeOnly:
          "Please use Google Chrome. This task cannot start in other browsers.",
        micUnsupported:
          "This environment does not support microphone recording.",
        prepared: "Preparation complete.",
        planLog: ({ nativeLanguage, passCount, plannedTrials }) =>
          `Native language: ${nativeLanguage} / Planned: ${passCount} passes, ${plannedTrials} recordings`,
        playVolumeCheckMessage: "Play the volume check",
        preparedDoVolume:
          "Preparation complete. First, complete the volume check.",
        recoveryMessage:
          "A previous session was found\nYou can resume recording",
        recoveryStatus: (completed, planned) =>
          `Recovery data found: ${completed}/${planned}`,
        prepareError: (message) => `Preparation error: ${message}`,
        volumeError: (message) => `Volume check error: ${message}`,
        retryButton: "Try this word again",
        trialRetryPrompt: (message) =>
          `A problem occurred while recording this word\n${message}\n\nWhen you are ready, try this word again.`,
        redownloadUnavailable: "There is no ZIP available to re-download.",
        redownloaded: (name) => `Re-downloaded: ${name}`,
      },
    },
    zh: {
      langAttr: "zh-CN",
      title: "口音学习阶段",
      participantLabel: "参与者 ID（例如：001）",
      nativeLanguageLabel: "母语",
      languageOptions: {
        english: "英语",
        japanese: "日语",
        chinese: "中文",
      },
      summaryTitle: "实验概要：",
      summaryItems: [
        "请使用谷歌 Chrome，因为本任务需要麦克风录音和压缩文件下载。",
        "正式录音前，请先完成音量检查和练习录音。",
        "练习结束后，会自动下载一个练习压缩文件，以确认下载功能正常。",
        "正式任务包含 50 个单词。英语母语者完成 2 轮；日语和中文母语者完成 3 轮。",
        "第 1 轮使用自然英语。第 2 轮使用带有母语口音的英语。第 3 轮介于两者之间。",
        "练习使用咖啡、披萨、沙发和巧克力，用来确认录音音量和重录操作。",
        "每次录音会在刺激音频和提示音之后开始，并在 4 秒后自动结束。",
        "每次录音后，请选择下一步或重录。",
        "每轮结束后，会自动下载包含该轮 WAV 和日志的压缩文件。",
      ],
      chromeWarning: "本任务只能在 Google Chrome 中开始。",
      preloadButton: "准备（Chrome 检查、麦克风权限、音频加载）",
      volumeCheckButton: "播放音量检查",
      volumeCheckAgainButton: "再次播放音量检查",
      startRecordingButton: "开始录音（空格键）",
      startPracticeButton: "开始练习",
      micCheckLabel: "麦克风输入音量",
      micCheckNote: "请说话并确认音量条会移动。",
      trialHintBase: "提示音后，请说出你听到的英语单词。",
      acceptButton: "下一步",
      retakeButton: "重录",
      recordingDecisionLabel: "选择使用录音或重新录音",
      redownloadButton: "重新下载上一个压缩文件",
      passes: {
        naturalLabel: "第 1 轮：自然英语",
        naturalProgressLabel: "第 1 轮",
        naturalShort: "自然英语",
        naturalInstruction:
          "第 1 轮，请用你平时最自然的英语重复。不要刻意增强或减弱口音，只需说出你听到的英语单词。",
        clearLabel: "第 2 轮：稍慢、清楚的英语",
        clearProgressLabel: "第 2 轮",
        clearShort: "稍慢、清楚的英语",
        clearInstruction:
          "第 2 轮，请保持自然英语，但说得稍慢、清楚一些。不需要模仿日语或中文口音。",
        accentedLabel: (nativeLanguage) =>
          `第 2 轮：${nativeLanguage.labelZh}口音较强的英语`,
        accentedProgressLabel: "第 2 轮",
        accentedShort: (nativeLanguage) =>
          `${nativeLanguage.labelZh}口音较强的英语`,
        accentedInstruction: (nativeLanguage) =>
          `第 2 轮，请用英语重复，并让你的母语（${nativeLanguage.labelZh}）的特点体现出来。单词仍保持英语，不需要模仿别人，请自然地体现你自己的${nativeLanguage.labelZh}口音。`,
        intermediateLabel: "第 3 轮：自然英语和母语口音之间",
        intermediateProgressLabel: "第 3 轮",
        intermediateShort: "自然英语和母语口音之间",
        intermediateInstruction:
          "第 3 轮，请用介于第 1 轮自然英语和第 2 轮母语口音英语之间的方式重复。口音不要完全消除，也不要过强。",
        practiceLabel: "练习：音量和重录检查",
        practiceProgressLabel: "练习",
        practiceShort: "练习",
        practiceInstruction: () =>
          "练习中会使用熟悉的外来词来确认音量和重录操作。" +
          "这些录音不会保存在最终压缩文件中，但会另外下载一个练习压缩文件来确认下载功能。请在这里调整说话音量和与麦克风的距离。",
      },
      messages: {
        beforeUnload: "离开此页面会中断实验。",
        trialHint: (shortInstruction, takeNo) =>
          `${shortInstruction} / 第 ${takeNo} 次录音。提示音后，请说出你听到的英语单词。`,
        recordingLevelPrefix: "录音音量",
        recordingPeakLabel: "峰值",
        recordingLevels: {
          clipRisk: {
            label: "音量可能过大",
            advice: "请稍微远离麦克风，或稍微小声一些。",
          },
          tooQuiet: {
            label: "音量略小",
            advice: "请稍微靠近麦克风，或稍微大声一些。",
          },
          loud: {
            label: "音量略大，但可以使用",
            advice: "如果声音有失真，请稍微远离麦克风。",
          },
          good: {
            label: "录音音量良好",
            advice: "请保持这个距离和音量。",
          },
        },
        trialDecision: ({ passLabel, trialLabel, takeNo, levelText }) =>
          `录音结束\n${passLabel}\n${trialLabel}\n` +
          `如果使用第 ${takeNo} 次录音，请按“下一步”；如果要重新录音，请按“重录”。` +
          levelText,
        preloadingAudio: (current, total) => `正在加载音频 ${current}/${total}`,
        audioLoadFailed: (path) => `无法加载音频：${path}`,
        idbUnsupported: "此浏览器不支持录音数据的临时保存。",
        audioContextUnavailable: "此浏览器无法使用音频功能。",
        startPracticeButton: "开始练习",
        resumePassButton: (label) => `继续 ${label}`,
        startPassButton: (label) => `开始 ${label}`,
        volumeFirst: "请先完成音量检查。",
        practiceStartStatus: "开始练习。",
        practiceDoneNeedsAttention:
          "练习完成。部分录音音量需要注意；正式录音前请调整麦克风位置。",
        practiceDoneOk: "练习完成。录音音量整体良好，可以进入正式任务。",
        practiceLog:
          "练习录音不会保存在最终压缩文件中。已下载单独的练习压缩文件。",
        practiceDoneMessage:
          "练习完成\n练习压缩文件已下载\n请进入正式录音轮次",
        practiceError: (message) => `练习错误：${message}`,
        audioAssetMissing: (path) => `找不到音频文件：${path}`,
        audioPlaybackFailed: (path) => `音频播放失败：${path}`,
        recordingFailed: "录音无法开始或停止。",
        practiceIntro: (pass) =>
          `${pass.label}\n\n` +
          `${pass.instruction}\n\n` +
          "如果录音音量过小或过大，请调整与麦克风的距离或说话音量，然后重录。\n" +
          "按空格键开始练习。",
        passIntro: (pass, completed) =>
          `${pass.label}${completed > 0 ? "（从上次继续）" : ""}\n\n` +
          `${pass.instruction}\n\n` +
          "每个单词录音后，可以选择重录或继续。\n" +
          "按空格键开始。",
        checkingMic: "正在确认麦克风权限...",
        loadingAudio: "正在加载音频文件...",
        prepareFirst: "请先执行准备。",
        volumeAudioMissing: (path) => `找不到音量检查音频：${path}`,
        volumeCheckMessage: "正在进行音量检查",
        volumeCheckStatus: "正在播放音量检查音频...",
        volumePlaybackFailed: "音量检查音频播放失败。",
        volumeDoneStatus: "音量检查完成。可以开始录音。",
        volumeDoneMessage: "如果音量没有问题，请开始录音",
        allDoneStatus: "所有录音都已完成。",
        passStartStatus: (label) => `正在开始 ${label}。`,
        passDoneNextStatus: (label, count) =>
          `${label} 完成。已自动下载包含 ${count} 个 WAV 和日志的压缩文件。可以进入下一轮。`,
        passDoneNextMessage: (label) =>
          `${label} 完成\n压缩文件已下载\n请进入下一轮`,
        passDoneFinalStatus: (label) =>
          `${label} 完成。包含 WAV 和日志的最终压缩文件已自动下载。`,
        audioMetaLoadFailed: (path) => `无法加载刺激元数据：${path}`,
        allDoneMessage: "所有录音都已结束\n谢谢配合",
        saved: (name) => `已保存：${name}`,
        genericError: (message) => `错误：${message}`,
        genericErrorGuidance:
          "请重新尝试。如果问题反复出现，请联系实验负责人。",
        micPermissionDenied:
          "麦克风权限被阻止。请在 Chrome 的网站权限设置中允许使用麦克风，然后再次点击“准备”。",
        micNotFound:
          "没有找到可用的麦克风。请确认麦克风已连接，然后再次点击“准备”。",
        micInUse:
          "无法启动麦克风。请确认没有其他应用正在使用麦克风，然后再次点击“准备”。",
        micSecurity:
          "此页面无法使用麦克风。请在 Chrome 中以安全页面重新打开任务。",
        micUnknown:
          "无法启动麦克风。请检查连接和 Chrome 的麦克风权限，然后再次点击“准备”。",
        missingParticipant: "请输入参与者 ID。",
        selectLanguage: "请选择母语。",
        chromeOnly: "请使用 Google Chrome。其他浏览器无法开始本任务。",
        micUnsupported: "当前环境不支持麦克风录音。",
        prepared: "准备完成。",
        planLog: ({ nativeLanguage, passCount, plannedTrials }) =>
          `母语：${nativeLanguage} / 计划：${passCount} 轮，${plannedTrials} 次录音`,
        playVolumeCheckMessage: "请播放音量检查",
        preparedDoVolume: "准备完成。请先完成音量检查。",
        recoveryMessage: "检测到上次的进度\n可以继续录音",
        recoveryStatus: (completed, planned) =>
          `检测到恢复数据：${completed}/${planned}`,
        prepareError: (message) => `准备错误：${message}`,
        volumeError: (message) => `音量检查错误：${message}`,
        retryButton: "重新尝试这个单词",
        trialRetryPrompt: (message) =>
          `录制这个单词时出现问题\n${message}\n\n准备好后，请重新尝试这个单词。`,
        redownloadUnavailable: "没有可重新下载的压缩文件。",
        redownloaded: (name) => `已重新下载：${name}`,
      },
    },
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
      labels: {
        english: "chocolate",
        japanese: "チョコレート",
        chinese: "巧克力",
      },
    },
  ];

  const STIMULI = [
    { word: "icicle", jp: "つらら", zh: "冰柱", list: 1 },
    { word: "thermometer", jp: "温度計", zh: "温度计", list: 1 },
    { word: "abacus", jp: "そろばん", zh: "算盘", list: 1 },
    { word: "acorn", jp: "どんぐり", zh: "橡子", list: 1 },
    { word: "binoculars", jp: "双眼鏡", zh: "双筒望远镜", list: 1 },
    { word: "persimmon", jp: "柿", zh: "柿子", list: 1 },
    { word: "mantis", jp: "カマキリ", zh: "螳螂", list: 1 },
    { word: "carousel", jp: "メリーゴーラウンド", zh: "旋转木马", list: 1 },
    { word: "syringe", jp: "注射器", zh: "注射器", list: 1 },
    { word: "burdock", jp: "ごぼう", zh: "牛蒡", list: 1 },
    { word: "cobweb", jp: "クモの巣", zh: "蜘蛛网", list: 1 },
    { word: "faucet", jp: "蛇口", zh: "水龙头", list: 1 },
    { word: "tadpole", jp: "オタマジャクシ", zh: "蝌蚪", list: 1 },
    { word: "tweezers", jp: "ピンセット", zh: "镊子", list: 1 },
    { word: "rickshaw", jp: "人力車", zh: "人力车", list: 1 },
    { word: "abalone", jp: "アワビ", zh: "鲍鱼", list: 1 },
    { word: "raccoon", jp: "アライグマ", zh: "浣熊", list: 1 },
    { word: "ladle", jp: "おたま", zh: "长柄勺", list: 1 },
    { word: "xylophone", jp: "木琴", zh: "木琴", list: 1 },
    { word: "protractor", jp: "分度器", zh: "量角器", list: 1 },
    { word: "toupee", jp: "かつら", zh: "假发", list: 1 },
    { word: "treadmill", jp: "ランニングマシン", zh: "跑步机", list: 1 },
    { word: "cicada", jp: "セミ", zh: "蝉", list: 1 },
    { word: "lawnmower", jp: "芝刈り機", zh: "割草机", list: 1 },
    { word: "burglar", jp: "泥棒", zh: "窃贼", list: 1 },
    { word: "toboggan", jp: "そり", zh: "雪橇", list: 2 },
    { word: "porcupine", jp: "ヤマアラシ", zh: "豪猪", list: 2 },
    { word: "razor", jp: "カミソリ", zh: "剃刀", list: 2 },
    { word: "cocoon", jp: "繭、かいこ", zh: "茧", list: 2 },
    { word: "wardrobe", jp: "タンス", zh: "衣柜", list: 2 },
    { word: "detergent", jp: "洗剤", zh: "洗涤剂", list: 2 },
    { word: "parakeet", jp: "インコ", zh: "长尾鹦鹉", list: 2 },
    { word: "scallop", jp: "ホタテ", zh: "扇贝", list: 2 },
    { word: "walrus", jp: "セイウチ", zh: "海象", list: 2 },
    { word: "podium", jp: "表彰台", zh: "领奖台", list: 2 },
    { word: "casket", jp: "棺", zh: "棺材", list: 2 },
    { word: "pacifier", jp: "おしゃぶり", zh: "安抚奶嘴", list: 2 },
    { word: "scalpel", jp: "メス", zh: "手术刀", list: 2 },
    { word: "spatula", jp: "フライ返し", zh: "锅铲", list: 2 },
    { word: "scapula", jp: "肩甲骨", zh: "肩胛骨", list: 2 },
    { word: "pupa", jp: "蛹", zh: "蛹", list: 2 },
    { word: "nostril", jp: "鼻の穴", zh: "鼻孔", list: 2 },
    { word: "labyrinth", jp: "迷宮", zh: "迷宫", list: 2 },
    { word: "loquat", jp: "ビワ", zh: "枇杷", list: 2 },
    { word: "pylon", jp: "鉄塔", zh: "铁塔", list: 2 },
    { word: "lotus", jp: "ハス", zh: "莲花", list: 2 },
    { word: "capelin", jp: "ししゃも", zh: "多春鱼", list: 2 },
    { word: "strainer", jp: "ざる", zh: "滤网", list: 2 },
    { word: "chisel", jp: "彫刻刀", zh: "凿子", list: 2 },
    { word: "catapult", jp: "投石機", zh: "投石机", list: 2 },
  ];

  const LIST1 = STIMULI.filter((s) => s.list === 1);
  const LIST2 = STIMULI.filter((s) => s.list === 2);

  const preloadBtn = document.getElementById("preload-btn");
  const volumeCheckBtn = document.getElementById("volume-check-btn");
  const startPassBtn = document.getElementById("start-pass-btn");
  const redownloadZipBtn = document.getElementById("redownload-zip-btn");
  const participantInput = document.getElementById("participant-id");
  const nativeLanguageSelect = document.getElementById("native-language");
  const participantLabelEl = document.getElementById("participant-label");
  const nativeLanguageLabelEl = document.getElementById(
    "native-language-label",
  );
  const summaryTitleEl = document.getElementById("summary-title");
  const summaryListEl = document.getElementById("summary-list");
  const chromeWarningEl = document.getElementById("chrome-warning");
  const configEl = document.getElementById("config");
  const statusEl = document.getElementById("status");
  const logEl = document.getElementById("log");
  const progressEl = document.getElementById("progress");
  const progressFillEl = document.getElementById("progress-fill");
  const progressLabelEl = document.getElementById("progress-label");
  const mainDisplayEl = document.getElementById("main-display");
  const jpWordEl = document.getElementById("jp-word");
  const trialGlossEl = document.getElementById("trial-gloss");
  const trialHintEl = document.getElementById("trial-hint");
  const trialTimerEl = document.getElementById("trial-timer");
  const trialTimerFillEl = document.getElementById("trial-timer-fill");
  const messagePanelEl = document.getElementById("message-panel");
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
  let activeUiLanguage = "en";

  window.addEventListener("beforeunload", (e) => {
    if (!isRunning) return;
    e.preventDefault();
    e.returnValue = getUiCopy().messages.beforeUnload;
  });

  const setStatus = (txt) => {
    statusEl.textContent = txt;
  };

  const setLog = (txt) => {
    logEl.textContent = txt;
  };

  function uiLanguageForNative(nativeLanguageId) {
    if (nativeLanguageId === "japanese") return "ja";
    if (nativeLanguageId === "chinese") return "zh";
    return "en";
  }

  function localizedLanguageLabel(nativeLanguageId, languageId = activeUiLanguage) {
    const language = NATIVE_LANGUAGES[nativeLanguageId] || NATIVE_LANGUAGES.english;
    if (languageId === "ja") return language.labelJa;
    if (languageId === "zh") return language.labelZh;
    return language.label;
  }

  function getUiCopy() {
    const copy = UI_COPY[activeUiLanguage];
    return copy && copy.messages ? copy : UI_COPY.en;
  }

  function getStaticCopy() {
    return UI_COPY[activeUiLanguage] || UI_COPY.en;
  }

  function renderStaticCopy() {
    const copy = getStaticCopy();
    document.documentElement.lang = copy.langAttr;
    document.title = copy.title || UI_COPY.en.title;
    if (participantLabelEl)
      participantLabelEl.textContent = copy.participantLabel;
    if (nativeLanguageLabelEl)
      nativeLanguageLabelEl.textContent = copy.nativeLanguageLabel;
    if (summaryTitleEl) summaryTitleEl.textContent = copy.summaryTitle;
    if (summaryListEl) {
      summaryListEl.textContent = "";
      copy.summaryItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        summaryListEl.appendChild(li);
      });
    }
    if (chromeWarningEl) chromeWarningEl.textContent = copy.chromeWarning;
    [...nativeLanguageSelect.options].forEach((option) => {
      option.textContent =
        copy.languageOptions[option.value] || option.textContent;
    });
    preloadBtn.textContent = copy.preloadButton;
    volumeCheckBtn.textContent = volumeCheckCompleted
      ? copy.volumeCheckAgainButton
      : copy.volumeCheckButton;
    if (!preparedSession) startPassBtn.textContent = copy.startRecordingButton;
    if (micCheckEl) {
      const micLabelEl = document.getElementById("mic-check-label");
      const micNoteEl = document.getElementById("mic-check-note");
      if (micLabelEl) micLabelEl.textContent = copy.micCheckLabel;
      if (micNoteEl) micNoteEl.textContent = copy.micCheckNote;
    }
    trialHintEl.textContent = copy.trialHintBase;
    acceptRecordingBtn.textContent = copy.acceptButton;
    retakeRecordingBtn.textContent = copy.retakeButton;
    if (trialActionsEl)
      trialActionsEl.setAttribute("aria-label", copy.recordingDecisionLabel);
    redownloadZipBtn.textContent = copy.redownloadButton;
  }

  function setUiLanguage(languageId) {
    activeUiLanguage = languageId;
    renderStaticCopy();
    if (preparedSession) refreshStartButton();
  }

  function setUiLanguageForNative(nativeLanguageId) {
    setUiLanguage(uiLanguageForNative(nativeLanguageId));
  }

  function parseCsvRows(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i += 1) {
      const ch = text[i];
      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i += 1;
          } else {
            inQuotes = false;
          }
        } else {
          field += ch;
        }
        continue;
      }

      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(field);
        field = "";
      } else if (ch === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (ch !== "\r") {
        field += ch;
      }
    }

    if (field || row.length) {
      row.push(field);
      rows.push(row);
    }
    return rows;
  }

  async function loadAudioMetaIndex(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(getUiCopy().messages.audioMetaLoadFailed(path));
    }

    const rows = parseCsvRows(await response.text());
    if (rows.length < 2) {
      throw new Error(getUiCopy().messages.audioMetaLoadFailed(path));
    }

    const [header, ...records] = rows;
    const headerIndex = new Map(header.map((name, index) => [name, index]));
    const requiredColumns = [
      "audio_file",
      "voice_name",
      "sha256",
      "generated_at",
      "generator_version",
      "project_id",
      "sample_rate_hz",
    ];

    if (requiredColumns.some((column) => !headerIndex.has(column))) {
      throw new Error(getUiCopy().messages.audioMetaLoadFailed(path));
    }

    const index = new Map();
    records.forEach((record) => {
      const audioFile = record[headerIndex.get("audio_file")] || "";
      if (!audioFile) return;
      index.set(audioFile, {
        audioFile,
        voiceName: record[headerIndex.get("voice_name")] || "",
        sha256: record[headerIndex.get("sha256")] || "",
        generatedAt: record[headerIndex.get("generated_at")] || "",
        generatorVersion: record[headerIndex.get("generator_version")] || "",
        projectId: record[headerIndex.get("project_id")] || "",
        sampleRateHz: record[headerIndex.get("sample_rate_hz")] || "",
      });
    });
    return index;
  }

  function audioFileKeyFromPath(audioPath) {
    const parts = String(audioPath || "").split("/").filter(Boolean);
    if (parts.length < 2) return String(audioPath || "");
    return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
  }

  function isEditableTarget(target) {
    const tagName = target?.tagName;
    return (
      target?.isContentEditable ||
      tagName === "INPUT" ||
      tagName === "TEXTAREA" ||
      tagName === "SELECT"
    );
  }

  function isButtonTarget(target) {
    return target?.tagName === "BUTTON";
  }

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
    if (
      !playRecordingStartBeep.ctx ||
      playRecordingStartBeep.ctx.state === "closed"
    ) {
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
    if (acceptRecordingBtn) acceptRecordingBtn.classList.remove("hidden");
    if (retakeRecordingBtn)
      retakeRecordingBtn.textContent = getStaticCopy().retakeButton;
  }

  function showMessage(text) {
    stopTrialTimer();
    hideTrialActions();
    mainDisplayEl.style.display = "none";
    if (messagePanelEl) messagePanelEl.style.display = "flex";
    messageEl.textContent = text;
    if (messagePanelEl) messagePanelEl.classList.remove("decision-active");
    messageEl.classList.remove("decision-message");
    messageEl.classList.toggle(
      "long-message",
      text.length > 90 || text.includes("\n\n"),
    );
    messageEl.style.display = "block";
    document.body.classList.remove("presenting");
  }

  function getBaseStimulusFontPx() {
    if (window.matchMedia("(max-width: 640px)").matches) return 40;
    if (window.matchMedia("(max-height: 640px)").matches) return 44;
    return 60;
  }

  function getBaseStimulusHintFontPx() {
    if (window.matchMedia("(max-width: 640px)").matches) return 16;
    if (window.matchMedia("(max-height: 700px)").matches) return 15;
    return 18;
  }

  function getBaseStimulusGlossFontPx() {
    if (window.matchMedia("(max-width: 640px)").matches) return 22;
    if (window.matchMedia("(max-height: 700px)").matches) return 20;
    return 30;
  }

  function getTrialGlossText(trial) {
    const gloss = String(trial?.displayText || "").trim();
    const word = String(trial?.word || "").trim();
    if (!gloss || gloss === word) return "";
    return gloss;
  }

  function getTrialLabelText(trial) {
    const word = String(trial?.word || "").trim();
    const gloss = getTrialGlossText(trial);
    return gloss ? `${word}\n${gloss}` : word;
  }

  function fitStimulusText(wordText, glossText = "") {
    if (!jpWordEl || !mainDisplayEl) return;

    jpWordEl.textContent = wordText || "";
    jpWordEl.style.fontSize = `${getBaseStimulusFontPx()}px`;
    jpWordEl.style.whiteSpace = "nowrap";
    if (trialGlossEl) {
      trialGlossEl.textContent = glossText || "";
      trialGlossEl.classList.toggle("hidden", !glossText);
      trialGlossEl.style.fontSize = `${getBaseStimulusGlossFontPx()}px`;
    }
    if (trialHintEl) {
      trialHintEl.style.fontSize = `${getBaseStimulusHintFontPx()}px`;
    }
    mainDisplayEl.style.gap = window.matchMedia("(max-height: 700px)").matches
      ? "10px"
      : "16px";

    const maxWidth = mainDisplayEl.clientWidth;
    const maxHeight = mainDisplayEl.clientHeight;
    if (!maxWidth || !maxHeight) return;

    let fontSize =
      parseFloat(jpWordEl.style.fontSize) || getBaseStimulusFontPx();
    while (
      (jpWordEl.scrollWidth > maxWidth ||
        mainDisplayEl.scrollHeight > maxHeight) &&
      fontSize > STIMULUS_MIN_FONT_PX
    ) {
      fontSize -= STIMULUS_FONT_STEP_PX;
      jpWordEl.style.fontSize = `${fontSize}px`;
    }

    if (jpWordEl.scrollWidth > maxWidth) {
      jpWordEl.style.whiteSpace = "normal";
      while (
        mainDisplayEl.scrollHeight > maxHeight &&
        fontSize > STIMULUS_MIN_FONT_PX
      ) {
        fontSize -= STIMULUS_FONT_STEP_PX;
        jpWordEl.style.fontSize = `${fontSize}px`;
      }
    }

    if (trialGlossEl && !trialGlossEl.classList.contains("hidden")) {
      let glossFontSize =
        parseFloat(trialGlossEl.style.fontSize) || getBaseStimulusGlossFontPx();
      while (
        mainDisplayEl.scrollHeight > maxHeight &&
        glossFontSize > STIMULUS_GLOSS_MIN_FONT_PX
      ) {
        glossFontSize -= STIMULUS_GLOSS_FONT_STEP_PX;
        trialGlossEl.style.fontSize = `${glossFontSize}px`;
      }
    }

    if (!trialHintEl) return;

    let hintFontSize =
      parseFloat(trialHintEl.style.fontSize) || getBaseStimulusHintFontPx();
    while (
      mainDisplayEl.scrollHeight > maxHeight &&
      hintFontSize > STIMULUS_HINT_MIN_FONT_PX
    ) {
      hintFontSize -= STIMULUS_HINT_FONT_STEP_PX;
      trialHintEl.style.fontSize = `${hintFontSize}px`;
    }
  }

  function refreshRedownloadButton() {
    const shouldShow =
      Boolean(lastZipBlob && lastZipName) &&
      !document.body.classList.contains("running");
    redownloadZipBtn.classList.toggle("hidden", !shouldShow);
    redownloadZipBtn.disabled = !shouldShow;
  }

  function showStimulus(trial, pass, takeNo) {
    hideTrialActions();
    if (messagePanelEl) {
      messagePanelEl.classList.remove("decision-active");
      messagePanelEl.style.display = "none";
    }
    messageEl.classList.remove("long-message", "decision-message");
    messageEl.style.display = "none";
    mainDisplayEl.style.display = "flex";
    trialHintEl.textContent = getUiCopy().messages.trialHint(
      pass.shortInstruction,
      takeNo,
    );
    fitStimulusText(trial.word, getTrialGlossText(trial));
    document.body.classList.add("presenting");
  }

  function hideStimulus() {
    mainDisplayEl.style.display = "none";
    if (trialGlossEl) {
      trialGlossEl.textContent = "";
      trialGlossEl.classList.add("hidden");
    }
    if (messagePanelEl) {
      messagePanelEl.style.display = "flex";
      messagePanelEl.classList.remove("decision-active");
    }
    messageEl.style.display = "none";
    messageEl.classList.remove("long-message", "decision-message");
    hideTrialActions();
    stopTrialTimer();
    document.body.classList.remove("presenting");
  }

  function showProgress(done, total, label) {
    const pct =
      total <= 0 ? 0 : Math.min(100, Math.max(0, (done / total) * 100));
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
    fitStimulusText(jpWordEl.textContent, trialGlossEl?.textContent || "");
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
      request.onerror = () =>
        reject(request.error || new Error("IndexedDB request failed"));
    });
  }

  function idbTxDone(tx) {
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onabort = () =>
        reject(tx.error || new Error("IndexedDB transaction aborted"));
      tx.onerror = () =>
        reject(tx.error || new Error("IndexedDB transaction failed"));
    });
  }

  async function openRecoveryDb() {
    if (!window.indexedDB) {
      throw new Error(getUiCopy().messages.idbUnsupported);
    }
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(RECOVERY_DB_NAME, RECOVERY_DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(RECOVERY_SESSIONS_STORE)) {
          db.createObjectStore(RECOVERY_SESSIONS_STORE, {
            keyPath: "sessionId",
          });
        }
        if (!db.objectStoreNames.contains(RECOVERY_TRIALS_STORE)) {
          const trialStore = db.createObjectStore(RECOVERY_TRIALS_STORE, {
            keyPath: ["sessionId", "serialNo"],
          });
          trialStore.createIndex(RECOVERY_BY_SESSION_INDEX, "sessionId", {
            unique: false,
          });
        } else {
          const trialStore = request.transaction.objectStore(
            RECOVERY_TRIALS_STORE,
          );
          if (!trialStore.indexNames.contains(RECOVERY_BY_SESSION_INDEX)) {
            trialStore.createIndex(RECOVERY_BY_SESSION_INDEX, "sessionId", {
              unique: false,
            });
          }
        }
        if (!db.objectStoreNames.contains(RECOVERY_ZIPS_STORE)) {
          const zipStore = db.createObjectStore(RECOVERY_ZIPS_STORE, {
            keyPath: ["sessionId", "passIndex"],
          });
          zipStore.createIndex(RECOVERY_BY_SESSION_INDEX, "sessionId", {
            unique: false,
          });
        } else {
          const zipStore = request.transaction.objectStore(RECOVERY_ZIPS_STORE);
          if (!zipStore.indexNames.contains(RECOVERY_BY_SESSION_INDEX)) {
            zipStore.createIndex(RECOVERY_BY_SESSION_INDEX, "sessionId", {
              unique: false,
            });
          }
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () =>
        reject(request.error || new Error("IndexedDB open failed"));
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

  function isAcceptedRecoveryRow(row) {
    if (!row) return false;
    return (
      row.accepted !== false &&
      row.recordingDecision !== "pending" &&
      row.recordingDecision !== "retaken"
    );
  }

  function isAcceptedMainRecoveryRow(row) {
    return isAcceptedRecoveryRow(row) && row.phase === "main";
  }

  function isSavedRecoveryZipRecord(record) {
    return Boolean(
      record &&
        Number.isFinite(record.passIndex) &&
        record.zipBlob &&
        record.zipName,
    );
  }

  async function saveRecoveryZip(sessionId, passIndex, zipName, zipBlob) {
    await withRecoveryDb(async (db) => {
      const tx = db.transaction(RECOVERY_ZIPS_STORE, "readwrite");
      tx.objectStore(RECOVERY_ZIPS_STORE).put({
        sessionId,
        passIndex,
        zipName,
        zipBlob,
        updatedAt: Date.now(),
      });
      await idbTxDone(tx);
    });
  }

  async function getLatestRecoveryZip(sessionId) {
    return withRecoveryDb(async (db) => {
      const tx = db.transaction(RECOVERY_ZIPS_STORE, "readonly");
      const records = await idbRequest(
        tx
          .objectStore(RECOVERY_ZIPS_STORE)
          .index(RECOVERY_BY_SESSION_INDEX)
          .getAll(IDBKeyRange.only(sessionId)),
      );
      await idbTxDone(tx);
      const latest = (records || [])
        .filter((record) => record?.zipBlob && record?.zipName)
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))[0];
      return latest
        ? { zipBlob: latest.zipBlob, zipName: latest.zipName }
        : null;
    });
  }

  async function loadRecoverySnapshot(sessionId) {
    return withRecoveryDb(async (db) => {
      const tx = db.transaction(
        [RECOVERY_SESSIONS_STORE, RECOVERY_TRIALS_STORE, RECOVERY_ZIPS_STORE],
        "readonly",
      );
      const metaReq = tx.objectStore(RECOVERY_SESSIONS_STORE).get(sessionId);
      const trialReq = tx
        .objectStore(RECOVERY_TRIALS_STORE)
        .index(RECOVERY_BY_SESSION_INDEX)
        .getAll(IDBKeyRange.only(sessionId));
      const zipReq = tx
        .objectStore(RECOVERY_ZIPS_STORE)
        .index(RECOVERY_BY_SESSION_INDEX)
        .getAll(IDBKeyRange.only(sessionId));
      const [meta, trialRecords, zipRecords] = await Promise.all([
        idbRequest(metaReq),
        idbRequest(trialReq),
        idbRequest(zipReq),
      ]);
      await idbTxDone(tx);
      const sorted = (trialRecords || [])
        .filter((r) => r && r.row && Number.isFinite(r.serialNo))
        .sort((a, b) => a.serialNo - b.serialNo);
      const rows = sorted.map((r) => r.row).filter(isAcceptedMainRecoveryRow);
      return {
        meta: meta || null,
        trialRecords: sorted,
        zipRecords: (zipRecords || [])
          .filter(isSavedRecoveryZipRecord)
          .sort((a, b) => (a.passIndex || 0) - (b.passIndex || 0)),
        rows,
      };
    });
  }

  async function clearRecoverySession(sessionId, options = {}) {
    const preserveZips = Boolean(options.preserveZips);
    await withRecoveryDb(async (db) => {
      const tx = db.transaction(
        [RECOVERY_SESSIONS_STORE, RECOVERY_TRIALS_STORE, RECOVERY_ZIPS_STORE],
        "readwrite",
      );
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
      if (!preserveZips) {
        const zipStore = tx.objectStore(RECOVERY_ZIPS_STORE);
        const zipIndex = zipStore.index(RECOVERY_BY_SESSION_INDEX);
        const zipCursorReq = zipIndex.openCursor(IDBKeyRange.only(sessionId));
        await new Promise((resolve, reject) => {
          zipCursorReq.onsuccess = () => {
            const cursor = zipCursorReq.result;
            if (!cursor) {
              resolve();
              return;
            }
            cursor.delete();
            cursor.continue();
          };
          zipCursorReq.onerror = () =>
            reject(zipCursorReq.error || new Error("IndexedDB cursor failed"));
        });
      }
      await idbTxDone(tx);
    });
  }

  function recoveryRecordMatches(record, filter) {
    const row = record.row || {};
    if (!isAcceptedRecoveryRow(row)) return false;
    if (!filter) return true;
    if (filter.phase && row.phase !== filter.phase) return false;
    if (
      Number.isFinite(filter.passIndex) &&
      row.passIndex !== filter.passIndex
    ) {
      return false;
    }
    return true;
  }

  async function getRecoveryArtifacts(sessionId, filter = null) {
    const snapshot = await loadRecoverySnapshot(sessionId);
    const records = snapshot.trialRecords.filter((record) =>
      recoveryRecordMatches(record, filter),
    );
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
    const levels = getUiCopy().messages.recordingLevels;
    if (peak >= 0.98) {
      return {
        code: "clip_risk",
        label: levels.clipRisk.label,
        advice: levels.clipRisk.advice,
        peakDbfs,
      };
    }
    if (rms < 0.008 || peak < 0.05) {
      return {
        code: "too_quiet",
        label: levels.tooQuiet.label,
        advice: levels.tooQuiet.advice,
        peakDbfs,
      };
    }
    if (peak > 0.85) {
      return {
        code: "loud",
        label: levels.loud.label,
        advice: levels.loud.advice,
        peakDbfs,
      };
    }
    return {
      code: "good",
      label: levels.good.label,
      advice: levels.good.advice,
      peakDbfs,
    };
  }

  function formatRecordingLevel(rec) {
    const level = assessRecordingLevel(rec);
    const peakText = formatDb(level.peakDbfs);
    const messages = getUiCopy().messages;
    return (
      `${messages.recordingLevelPrefix}: ${level.label}` +
      `${peakText ? ` (${messages.recordingPeakLabel} ${peakText})` : ""}\n${level.advice}`
    );
  }

  function getUserFacingErrorMessage(err) {
    const messages = getUiCopy().messages;
    const name = err?.name || "";
    if (name === "NotAllowedError" || name === "PermissionDeniedError") {
      return messages.micPermissionDenied;
    }
    if (name === "NotFoundError" || name === "DevicesNotFoundError") {
      return messages.micNotFound;
    }
    if (name === "NotReadableError" || name === "TrackStartError") {
      return messages.micInUse;
    }
    if (name === "SecurityError") {
      return messages.micSecurity;
    }
    const rawMessage = String(err?.message || "").trim();
    if (!rawMessage) return messages.genericErrorGuidance;
    if (/indexeddb|database|transaction|cursor/i.test(rawMessage))
      return messages.idbUnsupported;
    if (/audiocontext|audio context/i.test(rawMessage))
      return messages.audioContextUnavailable;
    if (/permission|denied|not allowed/i.test(rawMessage))
      return messages.micPermissionDenied;
    if (/device|microphone|mic|media/i.test(rawMessage))
      return `${rawMessage}\n${messages.micUnknown}`;
    return `${rawMessage}\n${messages.genericErrorGuidance}`;
  }

  function waitForTrialDecision(pass, trial, takeNo, rec) {
    stopTrialTimer();
    hideProgress();
    mainDisplayEl.style.display = "none";
    if (messagePanelEl) messagePanelEl.style.display = "flex";
    const levelText = rec ? `\n\n${formatRecordingLevel(rec)}` : "";
    const trialLabel = getTrialLabelText(trial);
    messageEl.textContent = getUiCopy().messages.trialDecision({
      passLabel: pass.label,
      trialLabel,
      takeNo,
      levelText,
    });
    if (messagePanelEl) messagePanelEl.classList.add("decision-active");
    messageEl.classList.add("long-message", "decision-message");
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
        if (isButtonTarget(ev.target)) return;
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

  function waitForRetryCurrentTrial(promptText) {
    stopTrialTimer();
    hideProgress();
    mainDisplayEl.style.display = "none";
    if (messagePanelEl) messagePanelEl.style.display = "flex";
    messageEl.textContent = promptText;
    if (messagePanelEl) messagePanelEl.classList.add("decision-active");
    messageEl.classList.add("long-message", "decision-message");
    messageEl.style.display = "block";
    document.body.classList.remove("presenting");
    acceptRecordingBtn.classList.add("hidden");
    retakeRecordingBtn.textContent = getUiCopy().messages.retryButton;
    trialActionsEl.classList.remove("hidden");

    return new Promise((resolve) => {
      const cleanup = () => {
        retakeRecordingBtn.removeEventListener("click", onRetry);
        document.removeEventListener("keydown", onKeyDown);
        acceptRecordingBtn.classList.remove("hidden");
        hideTrialActions();
        resolve();
      };
      const onRetry = () => cleanup();
      const onKeyDown = (ev) => {
        if (ev.repeat) return;
        if (isButtonTarget(ev.target)) return;
        if (ev.code === "Enter" || ev.code === "Space" || ev.key === " ") {
          ev.preventDefault();
          cleanup();
        }
      };
      retakeRecordingBtn.addEventListener("click", onRetry);
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
    const nativeLanguage =
      NATIVE_LANGUAGES[nativeLanguageId] || NATIVE_LANGUAGES.japanese;
    const passCopy = (
      UI_COPY[uiLanguageForNative(nativeLanguage.id)] || UI_COPY.en
    ).passes;
    const naturalPass = {
      passIndex: 1,
      id: "natural_english",
      label: passCopy.naturalLabel,
      progressLabel: passCopy.naturalProgressLabel,
      condition: "natural_english",
      shortInstruction: passCopy.naturalShort,
      instruction: passCopy.naturalInstruction,
    };

    if (nativeLanguage.id === "english") {
      return [
        naturalPass,
        {
          passIndex: 2,
          id: "clear_english",
          label: passCopy.clearLabel,
          progressLabel: passCopy.clearProgressLabel,
          condition: "clear_english",
          shortInstruction: passCopy.clearShort,
          instruction: passCopy.clearInstruction,
        },
      ];
    }

    return [
      naturalPass,
      {
        passIndex: 2,
        id: `${nativeLanguage.id}_accented_english`,
        label: passCopy.accentedLabel(nativeLanguage),
        progressLabel: passCopy.accentedProgressLabel,
        condition: `${nativeLanguage.id}_accented_english`,
        shortInstruction: passCopy.accentedShort(nativeLanguage),
        instruction: passCopy.accentedInstruction(nativeLanguage),
      },
      {
        passIndex: 3,
        id: "intermediate_accent",
        label: passCopy.intermediateLabel,
        progressLabel: passCopy.intermediateProgressLabel,
        condition: "intermediate_accent",
        shortInstruction: passCopy.intermediateShort,
        instruction: passCopy.intermediateInstruction,
      },
    ];
  }

  function buildPracticePass(nativeLanguageId) {
    const nativeLanguage =
      NATIVE_LANGUAGES[nativeLanguageId] || NATIVE_LANGUAGES.japanese;
    const passCopy = (
      UI_COPY[uiLanguageForNative(nativeLanguage.id)] || UI_COPY.en
    ).passes;
    return {
      passIndex: 0,
      id: "practice_calibration",
      label: passCopy.practiceLabel,
      progressLabel: passCopy.practiceProgressLabel,
      condition: "practice_calibration",
      shortInstruction: passCopy.practiceShort,
      instruction: passCopy.practiceInstruction(nativeLanguage),
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

  function getMainDisplayText(item, nativeLanguageId) {
    if (nativeLanguageId === "english") return "";
    if (nativeLanguageId === "chinese") return item.zh || item.word;
    return item.jp || item.word;
  }

  function buildMainWordOrder(counterbalance, nativeLanguageId) {
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
          displayText: getMainDisplayText(item, nativeLanguageId),
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
    const words = buildMainWordOrder(counterbalance, nativeLanguageId);
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
      setStatus(getUiCopy().messages.preloadingAudio(i + 1, paths.length));
      const audio = await new Promise((resolve, reject) => {
        const el = new Audio();
        el.preload = "auto";
        el.oncanplaythrough = () => resolve(el);
        el.onerror = () =>
          reject(new Error(getUiCopy().messages.audioLoadFailed(path)));
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
        throw new Error(getUiCopy().messages.audioContextUnavailable);
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
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
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
    "display_text",
    "take_no",
    "talker_id",
    "talker_label",
    "stimulus_file",
    "stimulus_audio_file",
    "stimulus_voice_name",
    "stimulus_sha256",
    "stimulus_generated_at",
    "stimulus_generator_version",
    "stimulus_project_id",
    "stimulus_sample_rate_hz",
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
          r.displayText || "",
          r.takeNo,
          r.talkerId,
          r.talkerLabel,
          r.stimulusFile,
          r.stimulusAudioFile || "",
          r.stimulusVoiceName || "",
          r.stimulusSha256 || "",
          r.stimulusGeneratedAt || "",
          r.stimulusGeneratorVersion || "",
          r.stimulusProjectId || "",
          r.stimulusSampleRateHz || "",
          r.recordingFile,
          r.trialWindowMs,
          r.recordingDurationMs.toFixed(3),
          r.recordingRms.toFixed(6),
          r.recordingPeak.toFixed(6),
          Number.isFinite(r.recordingPeakDbfs)
            ? r.recordingPeakDbfs.toFixed(3)
            : "",
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
    return String(value).replace(
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,
      "",
    );
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
            if (
              cellValue === null ||
              cellValue === undefined ||
              cellValue === ""
            ) {
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
      {
        name: "[Content_Types].xml",
        bytes: TEXT_ENCODER.encode(contentTypesXml),
      },
      { name: "_rels/.rels", bytes: TEXT_ENCODER.encode(rootRelsXml) },
      { name: "xl/workbook.xml", bytes: TEXT_ENCODER.encode(workbookXml) },
      {
        name: "xl/_rels/workbook.xml.rels",
        bytes: TEXT_ENCODER.encode(workbookRelsXml),
      },
      { name: "xl/styles.xml", bytes: TEXT_ENCODER.encode(stylesXml) },
      {
        name: "xl/worksheets/sheet1.xml",
        bytes: TEXT_ENCODER.encode(worksheetXml),
      },
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
    refreshRedownloadButton();
  }

  function exitExperimentScreen() {
    configEl.classList.remove("hidden");
    document.body.classList.remove("running");
    hideProgress();
    hideStimulus();
    refreshRedownloadButton();
  }

  function getRowsForPass(passIndex) {
    if (!preparedSession) return [];
    return preparedSession.rows
      .filter(
        (row) =>
          row.phase === "main" &&
          row.passIndex === passIndex &&
          isAcceptedMainRecoveryRow(row),
      )
      .sort((a, b) => a.trialInPass - b.trialInPass);
  }

  function hasSavedZipForPass(passIndex) {
    return Boolean(
      preparedSession &&
        preparedSession.savedZipPassIndices &&
        preparedSession.savedZipPassIndices.has(passIndex),
    );
  }

  function getNextPendingPass() {
    if (!preparedSession) return null;
    return (
      preparedSession.passes.find(
        (pass) =>
          getRowsForPass(pass.passIndex).length < pass.trials.length ||
          !hasSavedZipForPass(pass.passIndex),
      ) || null
    );
  }

  function refreshStartButton() {
    if (!preparedSession) return;
    const messages = getUiCopy().messages;
    if (!preparedSession.practiceCompleted) {
      startPassBtn.textContent = messages.startPracticeButton;
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
      done > 0 || hasSavedZipForPass(pass.passIndex)
        ? messages.resumePassButton(pass.label)
        : messages.startPassButton(pass.label);
    startPassBtn.classList.remove("hidden");
    startPassBtn.disabled = false;
  }

  async function runPracticeFlow() {
    if (!preparedSession || isRunning) return;
    if (!volumeCheckCompleted) {
      setStatus(getUiCopy().messages.volumeFirst);
      return;
    }

    isRunning = true;
    volumeCheckBtn.classList.add("hidden");
    startPassBtn.disabled = true;

    try {
      enterExperimentScreen();
      setStatus(getUiCopy().messages.practiceStartStatus);
      const { practiceStats, acceptedTrials } = await runPracticePass(
        preparedSession.practicePass,
      );
      const { zipBlob, zipName } = await buildPracticeZip(
        preparedSession.practicePass,
        acceptedTrials,
      );
      lastZipBlob = zipBlob;
      lastZipName = zipName;
      await saveRecoveryZip(preparedSession.sessionId, 0, zipName, zipBlob);
      preparedSession.savedZipPassIndices.add(0);
      triggerDownload(zipBlob, zipName);
      preparedSession.practiceCompleted = true;
      await mergeRecoverySessionMeta(preparedSession.sessionId, {
        practiceCompleted: true,
        practiceStats,
        phase: "practice_completed",
      });

      exitExperimentScreen();
      const needsAttention = practiceStats.some(
        (s) => s.levelCode === "too_quiet" || s.levelCode === "clip_risk",
      );
      setStatus(
        needsAttention
          ? getUiCopy().messages.practiceDoneNeedsAttention
          : getUiCopy().messages.practiceDoneOk,
      );
      setLog(`${getUiCopy().messages.practiceLog}\n${getUiCopy().messages.saved(zipName)}`);
      showMessage(getUiCopy().messages.practiceDoneMessage);
      refreshStartButton();
    } catch (err) {
      console.error(err);
      exitExperimentScreen();
      setStatus(
        getUiCopy().messages.practiceError(getUserFacingErrorMessage(err)),
      );
      refreshStartButton();
      preloadBtn.disabled = false;
    } finally {
      isRunning = false;
    }
  }

  async function recordOneTake({ pass, trial, takeNo, phaseStartPerf }) {
    const audio = preparedSession.audioMap.get(trial.audioPath);
    if (!audio) {
      throw new Error(getUiCopy().messages.audioAssetMissing(trial.audioPath));
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
          reject(
            new Error(
              getUiCopy().messages.audioPlaybackFailed(trial.audioPath),
            ),
          );
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

      await delay(POST_AUDIO_TO_BEEP_MS);
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
      throw new Error(
        getUiCopy().messages.audioPlaybackFailed(trial.audioPath),
      );
    }
    if (!rec || trialStartEpochMs === null) {
      throw new Error(getUiCopy().messages.recordingFailed);
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
    return (
      `${outputPrefix}/wav/` +
      `${baseDir}_${nativeLanguage}_pass${pad2(pass.passIndex)}_${safePass}_` +
      `word${pad3(trial.trialInPass)}_${safeWord}_` +
      `take${pad2(takeNo)}_trial${pad4(serialNo)}_talker_${trial.talker.id}.wav`
    );
  }

  function buildRow({
    pass,
    trial,
    takeNo,
    serialNo,
    recordingFile,
    timing,
    phase = "main",
  }) {
    const stimulusAudioMeta = trial.audioMeta || null;
    return {
      participantId: preparedSession.participantId,
      nativeLanguage: preparedSession.nativeLanguage,
      experimentVersion: EXPERIMENT_VERSION,
      serialNo,
      phase,
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
      displayText: trial.displayText || trial.word,
      takeNo,
      talkerId: trial.talker.id,
      talkerLabel: trial.talker.label,
      stimulusFile: trial.audioPath,
      stimulusAudioFile:
        stimulusAudioMeta?.audioFile || audioFileKeyFromPath(trial.audioPath),
      stimulusVoiceName: stimulusAudioMeta?.voiceName || "",
      stimulusSha256: stimulusAudioMeta?.sha256 || "",
      stimulusGeneratedAt: stimulusAudioMeta?.generatedAt || "",
      stimulusGeneratorVersion: stimulusAudioMeta?.generatorVersion || "",
      stimulusProjectId: stimulusAudioMeta?.projectId || "",
      stimulusSampleRateHz: stimulusAudioMeta?.sampleRateHz || "",
      recordingFile,
      trialWindowMs: TRIAL_WINDOW_MS,
      recordingDurationMs: timing.rec.durationMs,
      recordingRms: timing.rec.rms,
      recordingPeak: timing.rec.peak,
      recordingPeakDbfs: timing.rec.peakDbfs,
      recordingLevel: timing.rec.levelCode,
      recordingDecision: "pending",
      accepted: false,
      acceptedAt: "",
      trialStartEpochMs: timing.trialStartEpochMs,
      audioOnsetEpochMs: timing.audioOnsetEpochMs,
      audioOnsetFromPassMs: timing.audioOnsetFromPassMs,
      cbIndex: preparedSession.counterbalance.conditionIndex,
      listOrder: preparedSession.counterbalance.listOrder.join("->"),
      singleTalker: preparedSession.counterbalance.singleTalker.id,
    };
  }

  async function recordTrialWithRetake({ pass, trial, phaseStartPerf }) {
    const serialNo =
      (pass.passIndex - 1) * trial.trialTotalInPass + trial.trialInPass;
    let takeNo = 0;

    while (true) {
      takeNo += 1;
      let timing = null;
      try {
        timing = await recordOneTake({ pass, trial, takeNo, phaseStartPerf });
      } catch (err) {
        console.error(err);
        const message = getUiCopy().messages.trialRetryPrompt(
          getUserFacingErrorMessage(err),
        );
        setStatus(
          getUiCopy().messages.genericError(getUserFacingErrorMessage(err)),
        );
        await waitForRetryCurrentTrial(message);
        takeNo -= 1;
        continue;
      }
      const recordingFile = buildRecordingFileName({
        pass,
        trial,
        takeNo,
        serialNo,
      });
      const row = buildRow({
        pass,
        trial,
        takeNo,
        serialNo,
        recordingFile,
        timing,
      });
      await saveRecoveryTrial(
        preparedSession.sessionId,
        row,
        timing.rec.wavBytes,
      );
      await mergeRecoverySessionMeta(preparedSession.sessionId, {
        latestSerialNo: row.serialNo,
        latestPassIndex: pass.passIndex,
        latestTrialInPass: trial.trialInPass,
        phase: "main",
      });

      const decision = await waitForTrialDecision(
        pass,
        trial,
        takeNo,
        timing.rec,
      );
      if (decision === "accept") {
        row.recordingDecision = "accepted";
        row.accepted = true;
        row.acceptedAt = new Date().toISOString();
        await saveRecoveryTrial(
          preparedSession.sessionId,
          row,
          timing.rec.wavBytes,
        );
        return row;
      }
      row.recordingDecision = "retaken";
      row.accepted = false;
      await saveRecoveryTrial(
        preparedSession.sessionId,
        row,
        timing.rec.wavBytes,
      );
    }
  }

  async function recordPracticeTrialWithRetake({
    pass,
    trial,
    phaseStartPerf,
  }) {
    const serialNo = trial.trialInPass;
    let takeNo = 0;

    while (true) {
      takeNo += 1;
      let timing = null;
      try {
        timing = await recordOneTake({ pass, trial, takeNo, phaseStartPerf });
      } catch (err) {
        console.error(err);
        const message = getUiCopy().messages.trialRetryPrompt(
          getUserFacingErrorMessage(err),
        );
        setStatus(
          getUiCopy().messages.genericError(getUserFacingErrorMessage(err)),
        );
        await waitForRetryCurrentTrial(message);
        takeNo -= 1;
        continue;
      }
      const recordingFile = buildRecordingFileName({
        pass,
        trial,
        takeNo,
        serialNo,
      });
      const row = buildRow({
        pass,
        trial,
        takeNo,
        serialNo,
        recordingFile,
        timing,
        phase: "practice",
      });
      const decision = await waitForTrialDecision(
        pass,
        trial,
        takeNo,
        timing.rec,
      );
      if (decision === "accept") {
        row.recordingDecision = "accepted";
        row.accepted = true;
        row.acceptedAt = new Date().toISOString();
        return {
          row,
          wavBytes: timing.rec.wavBytes,
          rec: timing.rec,
        };
      }
      row.recordingDecision = "retaken";
      row.accepted = false;
    }
  }

  async function runPracticePass(pass) {
    const totalTrials = pass.trials.length;
    const label = pass.progressLabel || "Practice";
    let completed = 0;

    await waitForSpace(getUiCopy().messages.practiceIntro(pass));

    const phaseStartPerf = performance.now();
    const practiceStats = [];
    const acceptedTrials = [];

    for (const trial of pass.trials) {
      showProgress(completed, totalTrials, label);
      const result = await recordPracticeTrialWithRetake({
        pass,
        trial,
        phaseStartPerf,
      });
      acceptedTrials.push({
        row: result.row,
        file: {
          name: result.row.recordingFile,
          bytes: new Uint8Array(result.wavBytes),
        },
      });
      practiceStats.push({
        word: trial.word,
        displayText: trial.displayText,
        rms: result.rec.rms,
        peak: result.rec.peak,
        levelCode: result.rec.levelCode,
      });
      completed += 1;
      showProgress(completed, totalTrials, label);
    }

    return { practiceStats, acceptedTrials };
  }

  async function runPass(pass) {
    const existingRows = getRowsForPass(pass.passIndex);
    const completedByTrial = new Map(
      existingRows.map((row) => [row.trialInPass, row]),
    );
    const totalTrials = pass.trials.length;
    const label = pass.progressLabel || `Pass ${pass.passIndex}`;
    let completed = existingRows.length;

    await waitForSpace(getUiCopy().messages.passIntro(pass, completed));

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

    return [...completedByTrial.values()].sort(
      (a, b) => a.trialInPass - b.trialInPass,
    );
  }

  async function buildZipFromArtifacts(pass, artifacts) {
    const baseDir = sanitizeName(preparedSession.participantId);
    const safePass = sanitizeName(pass.id);
    const outputPrefix = `${baseDir}/pass${pad2(pass.passIndex)}_${safePass}`;
    const rows = artifacts.rows.slice().sort((a, b) => a.trialInPass - b.trialInPass);
    const logTable = buildLogTable(rows);
    const logBytes = await buildXlsxBytes(
      logTable,
      `pass${pad2(pass.passIndex)}_log`,
    );
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

  async function buildPassZip(pass) {
    const artifacts = await getRecoveryArtifacts(preparedSession.sessionId, {
      phase: "main",
      passIndex: pass.passIndex,
    });
    return buildZipFromArtifacts(pass, artifacts);
  }

  async function buildPracticeZip(pass, acceptedTrials) {
    return buildZipFromArtifacts(pass, {
      rows: acceptedTrials.map((trial) => trial.row),
      files: acceptedTrials.map((trial) => trial.file),
    });
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
    const plannedTrials = passes.reduce(
      (acc, pass) => acc + pass.trials.length,
      0,
    );

    let recoverySnapshot = await loadRecoverySnapshot(sessionId);
    let savedZipPassIndices = new Set(
      (recoverySnapshot.zipRecords || []).map((record) => record.passIndex),
    );
    const hasIncompatibleDraft =
      recoverySnapshot.meta &&
      (recoverySnapshot.meta.participantId !== participantId ||
        recoverySnapshot.meta.nativeLanguage !== nativeLanguageId ||
        recoverySnapshot.meta.counterbalanceIndex !==
          counterbalance.conditionIndex ||
        recoverySnapshot.meta.experimentVersion !== EXPERIMENT_VERSION);
    const hasCompletedRowsWithAllPassZips =
      (recoverySnapshot.rows?.length || 0) >= plannedTrials &&
      passes.every((pass) => savedZipPassIndices.has(pass.passIndex));
    const hasCompletedRowsWithoutMeta =
      !recoverySnapshot.meta &&
      (recoverySnapshot.rows?.length || 0) >= plannedTrials;
    const hasOrphanZipDraft =
      !recoverySnapshot.meta &&
      (recoverySnapshot.rows?.length || 0) === 0 &&
      savedZipPassIndices.size > 0;
    if (
      hasIncompatibleDraft ||
      hasCompletedRowsWithAllPassZips ||
      recoverySnapshot.meta?.allPassesCompleted ||
      hasCompletedRowsWithoutMeta ||
      hasOrphanZipDraft
    ) {
      await clearRecoverySession(sessionId);
      recoverySnapshot = { meta: null, trialRecords: [], rows: [] };
      savedZipPassIndices = new Set();
    }

    setStatus(getUiCopy().messages.checkingMic);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: false,
      },
    });

    let recorder = null;
    try {
      recorder = new WavRecorder(stream);
      setStatus(getUiCopy().messages.loadingAudio);
      const audioMetaByFile = await loadAudioMetaIndex(STIMULUS_META_CSV_PATH);
      const audioMap = await preloadAudio(audioPaths);
      passes.forEach((pass) => {
        pass.trials.forEach((trial) => {
          trial.audioMeta = audioMetaByFile.get(audioFileKeyFromPath(trial.audioPath)) || null;
        });
      });
      const volumeCheckDone = Boolean(
        recoverySnapshot.meta?.volumeCheckCompleted,
      );
      const practiceCompleted = Boolean(
        recoverySnapshot.meta?.practiceCompleted,
      );

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
        savedZipPassIndices,
        hasRecoveryMeta: Boolean(recoverySnapshot.meta),
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
      setStatus(getUiCopy().messages.prepareFirst);
      return;
    }
    const samplePath = PRACTICE_ITEMS[0].audioPath;
    const audio = preparedSession.audioMap.get(samplePath);
    if (!audio) {
      throw new Error(getUiCopy().messages.volumeAudioMissing(samplePath));
    }

    volumeCheckBtn.disabled = true;
    showMessage(getUiCopy().messages.volumeCheckMessage);
    setStatus(getUiCopy().messages.volumeCheckStatus);
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
        reject(new Error(getUiCopy().messages.volumePlaybackFailed));
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
    volumeCheckBtn.textContent = getStaticCopy().volumeCheckAgainButton;
    volumeCheckBtn.disabled = false;
    refreshStartButton();
    setStatus(getUiCopy().messages.volumeDoneStatus);
    showMessage(getUiCopy().messages.volumeDoneMessage);
  }

  async function runPassFlow() {
    if (!preparedSession || isRunning) return;
    if (!volumeCheckCompleted) {
      setStatus(getUiCopy().messages.volumeFirst);
      return;
    }
    if (!preparedSession.practiceCompleted) {
      await runPracticeFlow();
      return;
    }

    const pass = getNextPendingPass();
    if (!pass) {
      setStatus(getUiCopy().messages.allDoneStatus);
      return;
    }

    isRunning = true;
    volumeCheckBtn.classList.add("hidden");
    startPassBtn.disabled = true;

    try {
      enterExperimentScreen();
      setStatus(getUiCopy().messages.passStartStatus(pass.label));
      await runPass(pass);
      await refreshRecoveredRows();

      const { zipBlob, zipName, rows } = await buildPassZip(pass);
      lastZipBlob = zipBlob;
      lastZipName = zipName;
      await saveRecoveryZip(
        preparedSession.sessionId,
        pass.passIndex,
        zipName,
        zipBlob,
      );
      preparedSession.savedZipPassIndices.add(pass.passIndex);
      triggerDownload(zipBlob, zipName);

      await mergeRecoverySessionMeta(preparedSession.sessionId, {
        [`pass${pass.passIndex}Completed`]: true,
        latestCompletedPassIndex: pass.passIndex,
        phase: `pass${pass.passIndex}_completed`,
      });

      exitExperimentScreen();
      const nextPass = getNextPendingPass();
      refreshRedownloadButton();

      if (nextPass) {
        setStatus(
          getUiCopy().messages.passDoneNextStatus(pass.label, rows.length),
        );
        setLog(getUiCopy().messages.saved(zipName));
        showMessage(getUiCopy().messages.passDoneNextMessage(pass.label));
        refreshStartButton();
      } else {
        setStatus(getUiCopy().messages.passDoneFinalStatus(pass.label));
        setLog(getUiCopy().messages.saved(zipName));
        showMessage(getUiCopy().messages.allDoneMessage);
        startPassBtn.classList.add("hidden");
        startPassBtn.disabled = true;
        await preparedSession.recorder.dispose();
        await clearRecoverySession(preparedSession.sessionId);
        preparedSession = null;
        preloadBtn.disabled = false;
        nativeLanguageSelect.disabled = false;
      }
    } catch (err) {
      console.error(err);
      exitExperimentScreen();
      setStatus(
        getUiCopy().messages.genericError(getUserFacingErrorMessage(err)),
      );
      refreshStartButton();
      preloadBtn.disabled = false;
    } finally {
      isRunning = false;
    }
  }

  setUiLanguage("en");

  nativeLanguageSelect.addEventListener("change", () => {
    if (preparedSession) return;
    setUiLanguageForNative(nativeLanguageSelect.value);
  });

  preloadBtn.addEventListener("click", async () => {
    const participantId = participantInput.value.trim();
    const nativeLanguageId = nativeLanguageSelect.value;
    setUiLanguageForNative(nativeLanguageId);
    if (!participantId) {
      setStatus(getUiCopy().messages.missingParticipant);
      return;
    }
    if (!NATIVE_LANGUAGES[nativeLanguageId]) {
      setStatus(getUiCopy().messages.selectLanguage);
      return;
    }
    if (!isChrome()) {
      setStatus(getUiCopy().messages.chromeOnly);
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus(getUiCopy().messages.micUnsupported);
      return;
    }

    preloadBtn.disabled = true;
    nativeLanguageSelect.disabled = true;
    stopMicMeter();
    volumeCheckCompleted = false;
    lastZipBlob = null;
    lastZipName = "";
    volumeCheckBtn.classList.add("hidden");
    volumeCheckBtn.textContent = getStaticCopy().volumeCheckButton;
    volumeCheckBtn.disabled = true;
    startPassBtn.classList.add("hidden");
    startPassBtn.disabled = true;
    refreshRedownloadButton();
    setLog("");

    try {
      preparedSession = await prepareSession(participantId, nativeLanguageId);
      const plannedTrials = preparedSession.passes.reduce(
        (acc, pass) => acc + pass.trials.length,
        0,
      );
      const completedTrials = preparedSession.rows.length;
      volumeCheckCompleted = Boolean(preparedSession.volumeCheckCompleted);
      const latestZip = preparedSession.hasRecoveryMeta
        ? await getLatestRecoveryZip(preparedSession.sessionId)
        : null;
      if (latestZip) {
        lastZipBlob = latestZip.zipBlob;
        lastZipName = latestZip.zipName;
      }
      refreshRedownloadButton();

      setStatus(getUiCopy().messages.prepared);
      setLog(
        getUiCopy().messages.planLog({
          nativeLanguage: localizedLanguageLabel(nativeLanguageId),
          passCount: preparedSession.passes.length,
          plannedTrials,
        }),
      );

      if (!volumeCheckCompleted) {
        showMessage(getUiCopy().messages.playVolumeCheckMessage);
        setStatus(getUiCopy().messages.preparedDoVolume);
        volumeCheckBtn.classList.remove("hidden");
        volumeCheckBtn.disabled = false;
      } else {
        showMessage(getUiCopy().messages.recoveryMessage);
        setStatus(
          getUiCopy().messages.recoveryStatus(completedTrials, plannedTrials),
        );
        refreshStartButton();
      }
    } catch (err) {
      console.error(err);
      setStatus(
        getUiCopy().messages.prepareError(getUserFacingErrorMessage(err)),
      );
      preloadBtn.disabled = false;
      nativeLanguageSelect.disabled = false;
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
      setStatus(
        getUiCopy().messages.volumeError(getUserFacingErrorMessage(err)),
      );
      volumeCheckBtn.disabled = false;
    }
  });

  startPassBtn.addEventListener("click", runPassFlow);

  redownloadZipBtn.addEventListener("click", () => {
    if (!lastZipBlob || !lastZipName) {
      setStatus(getUiCopy().messages.redownloadUnavailable);
      return;
    }
    triggerDownload(lastZipBlob, lastZipName);
    setStatus(getUiCopy().messages.redownloaded(lastZipName));
  });

  document.addEventListener("keydown", (ev) => {
    if (isRunning) return;
    if (isEditableTarget(ev.target)) return;
    if (ev.code !== "Space" && ev.key !== " ") return;
    if (startPassBtn.classList.contains("hidden")) return;
    if (startPassBtn.disabled) return;
    ev.preventDefault();
    runPassFlow();
  });

  window.addEventListener("resize", () => {
    if (mainDisplayEl.style.display !== "flex") return;
    fitStimulusText(jpWordEl.textContent, trialGlossEl?.textContent || "");
  });
})();
