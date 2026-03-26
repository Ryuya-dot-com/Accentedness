# Accentedness Learning Phase

## 概要

`Learning_Phase` は、英語音声を聞いたあとに日本語語彙を見ながら発話録音を行う学習フェーズです。  
画面操作はブラウザ上で完結し、各試行の録音 WAV とログ XLSX を ZIP で保存します。

エントリーポイントは以下です。

- `../index.html`
  - 自動的に `Learning_Phase/` へリダイレクトします。
- `index.html`
  - Learning Phase の UI 本体です。
- `script.js`
  - 実験ロジック、録音、ログ出力、復旧処理を担います。

## 現在の実装仕様

- 実験バージョン: `learning_phase_v4.0.0`
- ビルド日: `2026-03-26`
- 録音ウィンドウ: 4000 ms
- 反復回数: 2 回
- 条件: `Single` のみ
- 使用話者: 2 名
  - 男性: `m1_guy`
  - 女性: `f1_aria`

## 刺激構成

### Practice

- 語数: 5 語
- 各語 2 回提示
- 合計 10 試行
- 音声ファイル:
  - `../practice/<word>.wav`

### Main

- 語数: 50 語
  - List 1: 25 語
  - List 2: 25 語
- 各語 2 回提示
- 合計 100 試行
- 音声ファイル:
  - `../Stimuli/audio_en_6voices/<talker_id>/<word>.wav`
- 実際に使用する話者は上記フォルダ内の 2 名のみです。

## 参加者 ID による割り当て

参加者 ID から数字部分を抽出し、その値で話者とリスト順を決定します。  
数字が含まれない場合は `1` として扱います。

4 名分で 1 周し、以後繰り返します。

| 数値 ID のパターン | 話者 | リスト順 |
| --- | --- | --- |
| 1, 5, 9, ... | `m1_guy` | `1 -> 2` |
| 2, 6, 10, ... | `f1_aria` | `1 -> 2` |
| 3, 7, 11, ... | `m1_guy` | `2 -> 1` |
| 4, 8, 12, ... | `f1_aria` | `2 -> 1` |

補足:

- `condition` は常に `Single`
- `single_list` はログ上 `all`
- `multi_list` は空文字
- `multi_rotation_start` も空文字

旧版との互換性のため、ログ列名は `multi_*` を残しています。

## 実験フロー

1. 参加者 ID を入力する
2. `Preload` ボタンでマイク許可と刺激音声の事前読み込みを行う
3. 音量確認を実施する
4. Practice を開始する
5. Practice 終了後、確認用 ZIP をダウンロードする
6. 問題なければ Main へ進む
7. Main 終了後、最終 ZIP をダウンロードする

各ブロック開始時は Space キーで進行します。  
各試行では以下の順で処理されます。

1. 日本語語彙を表示
2. 英語音声を再生
3. 録音開始ビープを再生
4. 4 秒間録音
5. WAV とログを保存

## 必要環境

- Google Chrome
- マイク利用許可
- ファイルダウンロード許可

実装上、Chrome 以外は非推奨です。  
録音取得時は以下を無効化しています。

- `echoCancellation: false`
- `noiseSuppression: false`
- `autoGainControl: false`

## 保存物

### Practice 終了時

以下の ZIP を自動ダウンロードします。

- `practice_check_<participant>.zip`

ZIP の中身:

- `<participant>/practice/wav/*.wav`
- `<participant>/practice/logs/practice_log_<participant>.xlsx`

### Main 終了時

以下の ZIP を自動ダウンロードします。

- `learning_phase_<participant>_all_data.zip`

ZIP の中身:

- `<participant>/practice/wav/*.wav`
- `<participant>/main/wav/*.wav`
- `<participant>/logs/practice_log_<participant>.xlsx`
- `<participant>/logs/main_log_<participant>.xlsx`
- `<participant>/logs/summary_<participant>.json`

## ログ内容

Practice と Main の XLSX は同じ列構造です。主な列は以下です。

- `participant_id`
- `experiment_version`
- `serial_no`
- `phase`
- `trial_in_phase`
- `global_trial`
- `block_index`
- `list`
- `condition`
- `word`
- `japanese`
- `repetition`
- `talker_id`
- `talker_label`
- `stimulus_file`
- `recording_file`
- `trial_window_ms`
- `recording_duration_ms`
- `trial_start_epoch_ms`
- `audio_onset_epoch_ms`
- `audio_onset_from_phase_ms`
- `counterbalance_index`
- `single_list`
- `multi_list`
- `list_order`
- `single_talker`
- `multi_rotation_start`

`summary_<participant>.json` には以下が含まれます。

- 参加者 ID
- 実験バージョン
- ビルド日
- 最終化時刻
- カウンターバランス情報
- Practice 試行数
- Main 試行数
- 復旧セッションの有無
- 開始時点で復旧された試行数

## 中断復旧

進行中データは IndexedDB に保存します。

- DB 名: `accentedness_learning_recovery`
- Stores:
  - `sessions`
  - `trials`

同一参加者・同一バージョン・同一カウンターバランスであれば、再読み込み後に途中再開できます。  
以下の場合は復旧データを自動で破棄します。

- 参加者 ID が一致しない
- カウンターバランス条件が一致しない
- 実験バージョンが一致しない
- Main 完了済み
- 完了済み相当の試行数が既に存在する

Main 完了後は IndexedDB 上の復旧データを削除します。

## 関連ファイル

- `index.html`
  - 画面レイアウト、ボタン、進捗表示、マイクメーター
- `script.js`
  - 刺激定義、カウンターバランス、録音、ZIP/XLSX 生成、復旧
- `../practice/`
  - Practice 音声
- `../Stimuli/audio_en_6voices/`
  - Main 音声

## 変更時に見るべき箇所

- 試行数や録音長を変える:
  - `script.js` 冒頭定数
- 話者を変える:
  - `TALKERS`
- 参加者割り当てを変える:
  - `buildCounterbalance()`
- 出力列を変える:
  - `LOG_COLUMNS`
- ZIP の中身を変える:
  - `runPracticeFlow()`
  - `runMainFlow()`
