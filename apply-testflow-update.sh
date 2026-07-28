#!/usr/bin/env bash
set -euo pipefail

echo "[1/3] 이전 단일 파일 구조 정리"
rm -f src/components.tsx src/data.ts

echo "[2/3] 패키지 및 빌드 확인"
npm install
npm run build

echo "[3/3] 완료"
echo "다음 명령어로 GitHub에 반영하세요:"
echo "git add -A"
echo "git commit -m \"feat: add review center and term mini quizzes\""
echo "git push origin main"
