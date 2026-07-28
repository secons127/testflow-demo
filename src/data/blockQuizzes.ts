import type { BlockQuiz } from '../types';

export const blockQuizzes: BlockQuiz[] = [
  {
    "id": "ims-register-flow",
    "title": "IMS 등록 동작 확인",
    "category": "SIP",
    "description": "단말이 IMS망에 등록될 때 발생하는 메시지 흐름을 순서대로 조합합니다.",
    "xp": 30,
    "blocks": [
      {
        "id": "ims-connect-tool",
        "label": "단말을 로그 확인 도구에 연결한다."
      },
      {
        "id": "ims-toggle-network",
        "label": "비행기 모드를 켰다가 끄거나 단말 전원을 다시 켠다."
      },
      {
        "id": "ims-first-register",
        "label": "단말이 인증 정보가 없는 REGISTER를 전송한다."
      },
      {
        "id": "ims-401",
        "label": "서버에서 401 Unauthorized를 수신한다."
      },
      {
        "id": "ims-second-register",
        "label": "단말이 인증 정보를 포함한 REGISTER를 다시 전송한다."
      },
      {
        "id": "ims-200-subscribe",
        "label": "200 OK 수신 후 SUBSCRIBE와 후속 응답을 확인한다."
      }
    ]
  },
  {
    "id": "video-call-basic",
    "title": "영상통화 수발신 확인",
    "category": "기본동작",
    "description": "두 단말 사이에서 영상통화를 연결하고 화면과 음질을 확인하는 기본 TC입니다.",
    "xp": 20,
    "blocks": [
      {
        "id": "basic-prepare",
        "label": "시험용 단말 A와 B의 통신 상태를 확인한다."
      },
      {
        "id": "basic-dial",
        "label": "A단말에서 B단말 번호를 입력하고 영상통화를 발신한다."
      },
      {
        "id": "basic-answer",
        "label": "B단말에서 영상통화를 수신한다."
      },
      {
        "id": "basic-media",
        "label": "양쪽 단말의 영상 화면과 통화 음질을 확인한다."
      },
      {
        "id": "basic-end",
        "label": "영상통화를 종료하고 통화 종료 상태를 확인한다."
      }
    ]
  },
  {
    "id": "video-call-reject",
    "title": "영상통화 수신 거절 확인",
    "category": "호처리",
    "description": "수신 단말이 영상통화를 거절했을 때 SIP 응답과 발신 화면을 확인합니다.",
    "xp": 20,
    "blocks": [
      {
        "id": "reject-connect-tool",
        "label": "수신 단말 A를 로그 확인 도구에 연결한다."
      },
      {
        "id": "reject-call",
        "label": "B단말에서 A단말로 영상통화를 발신한다."
      },
      {
        "id": "reject-action",
        "label": "A단말의 수신 화면에서 거절을 선택한다."
      },
      {
        "id": "reject-message",
        "label": "A단말에서 603 Decline 메시지가 전송되는지 확인한다."
      },
      {
        "id": "reject-ui",
        "label": "B단말에 안내 문구가 표시되고 통화가 종료되는지 확인한다."
      }
    ]
  },
  {
    "id": "dedicated-bearer",
    "title": "Dedicated Bearer 동작 확인",
    "category": "네트워크",
    "description": "영상통화 연결과 종료에 따라 전용 베어러가 생성·해제되는 흐름을 확인합니다.",
    "xp": 30,
    "blocks": [
      {
        "id": "bearer-connect-tool",
        "label": "A단말을 로그 확인 도구에 연결한다."
      },
      {
        "id": "bearer-idle",
        "label": "IDLE 상태에서 2분 이상 대기한다."
      },
      {
        "id": "bearer-call",
        "label": "A단말에서 B단말로 영상통화를 발신하고 B단말에서 수신한다."
      },
      {
        "id": "bearer-create",
        "label": "영상통화 연결 후 Dedicated EPS Bearer 생성 메시지를 확인한다."
      },
      {
        "id": "bearer-qci",
        "label": "영상통화에 QCI 1과 QCI 2가 할당되는지 확인한다."
      },
      {
        "id": "bearer-release",
        "label": "통화 종료 후 EPS Bearer 해제 메시지를 확인한다."
      }
    ]
  },
  {
    "id": "video-call-mute",
    "title": "영상통화 음소거 확인",
    "category": "메뉴·UI",
    "description": "영상통화 중 음소거 버튼의 음성 차단과 영상 유지 동작을 확인합니다.",
    "xp": 20,
    "blocks": [
      {
        "id": "mute-connect",
        "label": "A단말과 B단말 사이에 영상통화를 연결한다."
      },
      {
        "id": "mute-on",
        "label": "A단말에서 음소거 버튼을 선택한다."
      },
      {
        "id": "mute-wait",
        "label": "20초 이상 대기하며 상대 단말에 음성이 들리지 않는지 확인한다."
      },
      {
        "id": "mute-video",
        "label": "음소거 상태에서도 영상이 계속 표시되는지 확인한다."
      },
      {
        "id": "mute-off",
        "label": "음소거를 해제하고 상대 단말에 음성이 다시 들리는지 확인한다."
      }
    ]
  }
];
