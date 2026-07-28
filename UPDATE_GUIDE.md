# TestFlow 업데이트 적용 방법

이 ZIP은 저장소 전체를 새로 만드는 파일이 아니라, 기존 `testflow-demo` 저장소에
덮어쓰는 업데이트 파일입니다.

## 적용된 기능

- 용어 설명을 읽은 뒤 정답을 맞혀야 완료되는 미니퀴즈
- 용어 및 TC 오답 횟수 자동 저장
- 최근 복습일 및 해결 여부 저장
- 오답 복습 전용 메뉴
- TC 오답 시 올바른 순서와 단계별 확인 포인트 표시
- 기존 `App.tsx` 단일 구조를 pages, components, data, hooks로 분리
- 기존 localStorage 학습 기록과 호환

## Codespaces에서 적용

1. GitHub 저장소에서 Codespaces를 엽니다.
2. 이 ZIP 파일을 Codespaces 왼쪽 파일 영역의 프로젝트 최상단에 업로드합니다.
3. 터미널에서 아래 명령어를 실행합니다.

```bash
unzip -o testflow-demo-v1.1-review-update.zip -d .
bash apply-testflow-update.sh
git add -A
git commit -m "feat: add review center and term mini quizzes"
git push origin main
```

GitHub Pages 배포 작업이 완료되면 기존 주소에서 변경 사항을 확인할 수 있습니다.

## 주의

- `unzip -o`의 `-o`는 같은 이름의 파일을 묻지 않고 덮어쓰는 옵션입니다.
- `apply-testflow-update.sh`는 이전의 `src/components.tsx`, `src/data.ts`를 삭제합니다.
- 브라우저에 저장된 기존 닉네임, XP, 학습 완료 기록은 유지됩니다.
- 새 오답 관련 필드는 기존 기록에 자동으로 빈 값으로 추가됩니다.
