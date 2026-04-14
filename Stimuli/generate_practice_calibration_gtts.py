#!/usr/bin/env python3
"""Generate practice calibration audio with Python gTTS.

The browser experiment plays WAV files, so this script first writes gTTS MP3
audio and then converts it to 44.1 kHz mono PCM WAV with ffmpeg.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

from gtts import gTTS


DEFAULT_OUTPUT_DIR = Path(__file__).resolve().parent.parent / "practice_calibration"


@dataclass(frozen=True)
class PracticeItem:
    stem: str
    text: str


PRACTICE_ITEMS = (
    PracticeItem("coffee", "coffee"),
    PracticeItem("pizza", "pizza"),
    PracticeItem("sofa", "sofa"),
    PracticeItem("chocolate", "chocolate"),
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate English practice calibration audio with gTTS."
    )
    parser.add_argument(
        "--output-dir",
        default=str(DEFAULT_OUTPUT_DIR),
        help="Directory for generated practice audio.",
    )
    parser.add_argument(
        "--lang",
        default="en",
        help="gTTS language code (default: en).",
    )
    parser.add_argument(
        "--tld",
        default="com",
        help="gTTS top-level domain for accent selection (default: com).",
    )
    parser.add_argument(
        "--slow",
        action="store_true",
        help="Use gTTS slow speech mode.",
    )
    parser.add_argument(
        "--keep-mp3",
        action="store_true",
        help="Keep the gTTS MP3 files alongside the WAV files.",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite existing WAV and MP3 files.",
    )
    return parser.parse_args()


def require_ffmpeg() -> None:
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg is required to convert gTTS MP3 files to WAV.")


def synthesize_mp3(
    text: str,
    output_path: Path,
    lang: str,
    tld: str,
    slow: bool,
    overwrite: bool,
) -> None:
    if output_path.exists() and not overwrite:
        return
    tts = gTTS(text=text, lang=lang, tld=tld, slow=slow)
    tts.save(str(output_path))


def convert_to_wav(mp3_path: Path, wav_path: Path, overwrite: bool) -> None:
    if wav_path.exists() and not overwrite:
        return
    cmd = [
        "ffmpeg",
        "-y" if overwrite else "-n",
        "-loglevel",
        "error",
        "-i",
        str(mp3_path),
        "-ar",
        "44100",
        "-ac",
        "1",
        "-c:a",
        "pcm_s16le",
        str(wav_path),
    ]
    subprocess.run(cmd, check=True)


def run(args: argparse.Namespace) -> int:
    require_ffmpeg()

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    written = 0
    skipped = 0

    for item in PRACTICE_ITEMS:
        mp3_path = output_dir / f"{item.stem}.mp3"
        wav_path = output_dir / f"{item.stem}.wav"
        temp_mp3_path = mp3_path if args.keep_mp3 else output_dir / f".{item.stem}.gtts.tmp.mp3"

        if wav_path.exists() and not args.overwrite:
            skipped += 1
            print(f"[skip] {wav_path.name}")
            continue

        synthesize_mp3(
            text=item.text,
            output_path=temp_mp3_path,
            lang=args.lang,
            tld=args.tld,
            slow=args.slow,
            overwrite=True,
        )
        convert_to_wav(temp_mp3_path, wav_path, overwrite=True)

        if not args.keep_mp3:
            temp_mp3_path.unlink(missing_ok=True)

        written += 1
        print(f"[ok] {wav_path.name} <- gTTS '{item.text}'")

    print(f"Done. written={written}, skipped={skipped}, total={len(PRACTICE_ITEMS)}")
    return 0


def main() -> int:
    args = parse_args()
    try:
        return run(args)
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
