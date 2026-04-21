# Accentedness

This repository currently contains the browser-based Learning Phase only. The old Testing Phase has been removed.

Experiment entry point:

- `index.html`
  - Redirects to `Learning_Phase/`.
- `Learning_Phase/index.html`
  - Main UI for participant ID, native-language selection, audio preload, volume check, recording, retake, and ZIP download.
- `Learning_Phase/script.js`
  - Experiment logic, counterbalancing, WAV recording, pass-wise ZIP/XLSX output, and recovery via IndexedDB.
- `practice_calibration/`
  - gTTS-generated WAV files for the initial practice and microphone-level check.
- `Stimuli/generate_practice_calibration_gtts.py`
  - Regenerates the practice WAV files with Python gTTS and ffmpeg.
- `Stimuli/generate_gcloud_stimuli_audio.py`
  - Generates main-task word WAVs with Google Cloud Text-to-Speech using the
    `uvlt-cat-ljt` billing project already configured in local ADC.

See `Learning_Phase/README.md` for the current experimental design.
