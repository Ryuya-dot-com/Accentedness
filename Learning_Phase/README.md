# Accentedness Learning Phase

## 概要

`Learning_Phase` は、英語音声を聞いたあとに英単語スペルを見ながら発話録音を行うブラウザ実験です。  
Japanese / Chinese 話者には英単語スペルに加えて母語グロスも表示されます。  
参加者は最初に母語を `English` / `Japanese` / `Chinese` から選び、条件ごとに全50語を録音します。

ルートの `../index.html` は `Learning_Phase/` にリダイレクトします。  
`Testing_Phase` は削除済みで、現在の実験入口は Learning Phase のみです。

## 現在の実装仕様

- 実験バージョン: `learning_phase_v5.2.0`
- ビルド日: `2026-04-21`
- 録音ウィンドウ: 4000 ms
- 刺激音声終了後 500 ms 後にビープを提示し、その直後から録音を開始します。
- 使用話者: 2 名
  - 男性: `m1_guy`
  - 女性: `f1_aria`
- Main 語数: 50 語
  - List 1: 25 語
  - List 2: 25 語
- 実験参加は PC 上の Google Chrome を前提とします。
- Main 刺激音声は `../Stimuli/audio_en_6voices/**/*.wav` を使用します。`audio_meta.csv` に生成メタデータを保持します。
- Practice 音声は音量チェックと練習録音に使用します。音声は Python の gTTS で生成します。

## 母語別の録音 Pass

Japanese / Chinese 母語話者:

1. `natural_english`
   - 自分が普段いちばん自然だと思う英語でリピートする。
2. `<native>_accented_english`
   - 自分の母語（日本語または中国語）の訛りを意識して英語でリピートする。
3. `intermediate_accent`
   - 1回目の自然な英語と2回目の母語訛りの中間くらいでリピートする。

English 母語話者:

1. `natural_english`
   - 自然な英語でリピートする。
2. `clear_english`
   - 自然な英語を保ったまま、少しゆっくり・明瞭にリピートする。

各 Pass は全50語を1回ずつ録音します。録音ごとに `次へ` または `もう一度録音する` を選択できます。  
録り直した場合は同じ trial 番号の最新 take を採用し、ZIP には最新 take の WAV が入ります。

## 練習録音と音量確認

本番 Pass の前に、練習録音を行います。練習録音は最終 ZIP には保存しませんが、ダウンロード確認のため practice ZIP を別途自動出力します。

練習語は、日本語・中国語のどちらでも借用語として発音イメージを作りやすい以下の4語です。

| English | Japanese prompt | Chinese prompt |
| --- | --- | --- |
| `coffee` | `コーヒー` | `咖啡` |
| `pizza` | `ピザ` | `披萨` |
| `sofa` | `ソファ` | `沙发` |
| `chocolate` | `チョコレート` | `巧克力` |

録音ごとに RMS と peak を計算し、画面に `良好` / `小さめ` / `大きすぎる可能性` などの目安を表示します。  
音声ファイルそのものには gain 調整や normalization は行いません。

Practice 音声を再生成する場合:

```sh
python3 -m venv .venv-gtts
source .venv-gtts/bin/activate
python3 -m pip install gTTS
python3 Stimuli/generate_practice_calibration_gtts.py --overwrite
```

WAV 変換には `ffmpeg` が必要です。ブラウザ実験では `practice_calibration/*.wav` を再生します。gTTS の MP3 も保存したい場合は `--keep-mp3` を追加します。

## 参加者 ID による割り当て

参加者 ID から数字部分を抽出し、話者とリスト順を決定します。数字が含まれない場合は `1` として扱います。

| 数値 ID のパターン | 話者 | リスト順 |
| --- | --- | --- |
| 1, 5, 9, ... | `m1_guy` | `1 -> 2` |
| 2, 6, 10, ... | `f1_aria` | `1 -> 2` |
| 3, 7, 11, ... | `m1_guy` | `2 -> 1` |
| 4, 8, 12, ... | `f1_aria` | `2 -> 1` |

## 実験フロー

1. 参加者 ID と母語を入力する。
2. `準備` ボタンで Chrome 確認、マイク許可、刺激音声の事前読み込みを行う。
3. 音量チェックを行う。
4. 練習録音を行い、音量と録り直し操作を確認する。
5. Pass 1 を開始する。
6. 各録音後に、問題なければ `次へ`、録り直す場合は `もう一度録音する` を押す。
7. Pass 1 の50語が終わると Pass 1 の ZIP を自動ダウンロードする。
8. Pass 2、必要な場合は Pass 3 も同じ流れで実施し、各 Pass 終了時に ZIP を自動ダウンロードする。

各試行では以下の順で処理されます。

1. 母語に応じたグロスを表示
2. 英語音声を再生
3. 録音開始ビープを再生
4. 4 秒間録音
5. `次へ` または `もう一度録音する` を選ぶ

## 保存物

各 Pass 終了時に以下の形式で ZIP を自動ダウンロードします。

- `<participant>_<native_language>_pass01_natural_english.zip`
- `<participant>_<native_language>_pass02_<condition>.zip`
- `<participant>_<native_language>_pass03_intermediate_accent.zip`
  - English 母語話者には Pass 3 はありません。

ZIP の中身:

- `<participant>/passXX_<condition>/wav/*.wav`
- `<participant>/passXX_<condition>/logs/<participant>_passXX_<condition>_log.xlsx`
- `<participant>/passXX_<condition>/logs/<participant>_passXX_<condition>_summary.json`

XLSX ログには録音レベル確認用に以下も記録します。

- `recording_rms`
- `recording_peak`
- `recording_peak_dbfs`
- `recording_level`

WAV ファイル名には以下を含めます。

- participant ID
- native language
- pass number
- condition
- word number
- word
- take number
- trial number
- talker ID

例:

`001_japanese_pass01_natural_english_word001_icicle_take01_trial0001_talker_m1_guy.wav`

## 中断復旧

進行中データは IndexedDB に保存します。

- DB 名: `accentedness_learning_recovery`
- Stores:
  - `sessions`
  - `trials`

同一参加者・同一母語・同一実験バージョン・同一カウンターバランスであれば、再読み込み後に途中再開できます。  
以下の場合は復旧データを自動で破棄します。

- 参加者 ID が一致しない
- 母語が一致しない
- カウンターバランス条件が一致しない
- 実験バージョンが一致しない
- 全 Pass 完了済み

全 Pass 完了後は IndexedDB 上の復旧データを削除します。
