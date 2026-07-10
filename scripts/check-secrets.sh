#!/usr/bin/env bash
# Fail if OpenAI-style keys appear in tracked files (run before deploy or in CI)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PATTERNS='sk-proj-|sk-[a-zA-Z0-9]{20,}'

if git grep -E "$PATTERNS" -- ':!*.example' ':!scripts/check-secrets.sh' 2>/dev/null; then
  echo "ERROR: Possible API key found in tracked files. Remove before deploying."
  exit 1
fi

if git ls-files --error-unmatch backend/.env frontend/.env.local 2>/dev/null; then
  echo "ERROR: Env file is tracked by git. Run: git rm --cached backend/.env"
  exit 1
fi

echo "OK: No secrets detected in tracked files."
