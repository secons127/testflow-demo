# TestFlow Prototype

통신 QA 입문자를 위한 학습 서비스 프로토타입입니다.

## 기능

- 통신 용어 학습
- 학습 완료 및 XP 저장
- 음성통화 절차 블록 순서 퀴즈
- Mock AI 질문
- 마이페이지
- localStorage 기반 기록 유지
- GitHub Pages 자동 배포

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드 확인

```bash
npm run build
npm run preview
```

## GitHub Pages 배포

1. 이 폴더의 파일을 GitHub 저장소에 업로드합니다.
2. 저장소의 `Settings → Pages`로 이동합니다.
3. `Build and deployment → Source`에서 `GitHub Actions`를 선택합니다.
4. `main` 브랜치에 push하면 Actions가 자동으로 배포합니다.
5. Actions 완료 후 Pages 화면에 표시되는 주소로 접속합니다.

`vite.config.ts`의 `base`가 `./`로 설정되어 있어 저장소 이름과 관계없이 정적 파일이 정상 로드되도록 구성했습니다.

## 주의

AI 질문은 실제 OpenAI API가 아닌 Mock 응답입니다.
학습 기록과 대화는 브라우저 localStorage에 저장됩니다.
