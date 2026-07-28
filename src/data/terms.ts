import type { Term } from '../types';

export const categories = [
  "통화·서비스",
  "SIP 메시지",
  "IMS·네트워크",
  "미디어·코덱",
  "SIM·단말",
  "품질·화질",
];

export const terms: Term[] = [
  {
    "id": "video-call",
    "term": "영상통화",
    "fullName": "Video Call",
    "category": "통화·서비스",
    "simple": "음성과 영상을 동시에 주고받는 실시간 통화 서비스예요.",
    "practical": "통화 연결 여부뿐 아니라 양방향 음성, 영상 해상도, 프레임 유지, 화면 전환을 함께 확인합니다.",
    "example": "통화 연결 후 두 단말의 영상과 음성이 모두 정상적으로 전달되는지 확인합니다."
  },
  {
    "id": "voice-call",
    "term": "음성통화",
    "fullName": "Voice Call",
    "category": "통화·서비스",
    "simple": "두 사용자가 음성으로 대화할 수 있도록 연결하는 통신 서비스예요.",
    "practical": "발신·수신·연결·종료 흐름과 양방향 음질, 지연, 끊김 여부를 확인합니다.",
    "example": "수신자가 전화를 받은 뒤 양쪽에서 음성이 정상적으로 들리는지 확인합니다."
  },
  {
    "id": "volte",
    "term": "VoLTE",
    "fullName": "Voice over LTE",
    "category": "통화·서비스",
    "simple": "LTE 데이터망과 IMS를 이용해 음성통화를 제공하는 기술이에요.",
    "practical": "단말의 IMS 등록 상태와 SIP 호 처리, 전용 베어러 생성 여부를 함께 확인합니다.",
    "example": "LTE 상태에서 발신한 뒤 IMS 등록과 통화 연결이 정상인지 확인합니다."
  },
  {
    "id": "dtmf",
    "term": "DTMF",
    "fullName": "Dual-Tone Multi-Frequency",
    "category": "통화·서비스",
    "simple": "전화 키패드의 숫자와 기호를 두 개의 주파수 조합으로 전달하는 신호 방식이에요.",
    "practical": "통화 중 0~9, 별표, 우물정자를 입력했을 때 상대 시스템이 정확히 인식하는지 확인합니다.",
    "example": "ARS 연결 후 1번을 눌러 해당 메뉴로 이동하는지 확인합니다."
  },
  {
    "id": "sms",
    "term": "SMS",
    "fullName": "Short Message Service",
    "category": "통화·서비스",
    "simple": "이동통신망에서 짧은 문자 메시지를 주고받는 서비스예요.",
    "practical": "통화 중에도 메시지 발신과 수신이 가능하고 내용이 손상되지 않는지 확인합니다.",
    "example": "영상통화 중 다른 단말에서 SMS를 보내 정상 수신되는지 확인합니다."
  },
  {
    "id": "mms",
    "term": "MMS",
    "fullName": "Multimedia Messaging Service",
    "category": "통화·서비스",
    "simple": "문자뿐 아니라 사진·영상 등 멀티미디어를 전송하는 메시지 서비스예요.",
    "practical": "망 상태와 통화 상태가 바뀌어도 첨부 파일과 본문이 정상적으로 전달되는지 확인합니다.",
    "example": "영상통화 중 사진이 포함된 MMS를 발신하고 수신 결과를 확인합니다."
  },
  {
    "id": "sip",
    "term": "SIP",
    "fullName": "Session Initiation Protocol",
    "category": "SIP 메시지",
    "simple": "멀티미디어 통신 세션을 만들고 변경하고 종료하는 시그널링 프로토콜이에요.",
    "practical": "단말 등록, 통화 발신, 응답 코드, 세션 갱신 등 호 처리 흐름을 메시지 단위로 확인합니다.",
    "example": "통화 발신 시 INVITE가 전송되고 응답 메시지가 순서대로 수신되는지 확인합니다."
  },
  {
    "id": "register",
    "term": "REGISTER",
    "fullName": "SIP REGISTER Request",
    "category": "SIP 메시지",
    "simple": "단말의 현재 접속 위치와 주소를 SIP 서버에 등록하는 요청 메시지예요.",
    "practical": "전원 켜기나 비행기 모드 해제 후 REGISTER와 인증 응답, 최종 성공 응답을 확인합니다.",
    "example": "REGISTER → 401 Unauthorized → REGISTER → 200 OK 순서로 등록되는지 확인합니다."
  },
  {
    "id": "subscribe",
    "term": "SUBSCRIBE",
    "fullName": "SIP SUBSCRIBE Request",
    "category": "SIP 메시지",
    "simple": "특정 상태나 이벤트가 바뀔 때 알림을 받기 위해 구독을 요청하는 메시지예요.",
    "practical": "Event와 Accept 헤더가 예상한 값으로 구성되는지 확인합니다.",
    "example": "IMS 등록 후 SUBSCRIBE 메시지의 Event 값이 reg인지 확인합니다."
  },
  {
    "id": "invite",
    "term": "INVITE",
    "fullName": "SIP INVITE Request",
    "category": "SIP 메시지",
    "simple": "새 통화를 시작하거나 진행 중인 세션 조건을 변경할 때 보내는 요청이에요.",
    "practical": "수신 주소, 발신 정보, SDP, 세션 타이머가 요구사항에 맞는지 확인합니다.",
    "example": "영상통화 발신 시 INVITE 안에 영상 코덱 정보가 포함되는지 확인합니다."
  },
  {
    "id": "200-ok",
    "term": "200 OK",
    "fullName": "SIP 200 OK Response",
    "category": "SIP 메시지",
    "simple": "요청이 정상적으로 처리되었다는 SIP 성공 응답이에요.",
    "practical": "REGISTER 성공, INVITE 수락 등 어떤 요청에 대한 응답인지 CSeq와 함께 확인합니다.",
    "example": "REGISTER 재전송 후 200 OK가 수신되어 IMS 등록이 완료되는지 확인합니다."
  },
  {
    "id": "401-unauthorized",
    "term": "401 Unauthorized",
    "fullName": "SIP 401 Unauthorized Response",
    "category": "SIP 메시지",
    "simple": "서버가 단말에 인증 정보를 요구할 때 보내는 응답이에요.",
    "practical": "첫 REGISTER 뒤 401을 받은 단말이 인증 값을 포함해 REGISTER를 다시 보내는지 확인합니다.",
    "example": "401 수신 후 인증 정보가 포함된 REGISTER가 재전송되는지 확인합니다."
  },
  {
    "id": "489-bad-event",
    "term": "489 Bad Event",
    "fullName": "SIP 489 Bad Event Response",
    "category": "SIP 메시지",
    "simple": "서버가 SUBSCRIBE에 지정된 이벤트를 지원하지 않을 때 보내는 응답이에요.",
    "practical": "SUBSCRIBE의 Event 값과 서버 응답이 예상한 시나리오와 일치하는지 확인합니다.",
    "example": "SUBSCRIBE 전송 후 489 Bad Event가 수신되는지 확인합니다."
  },
  {
    "id": "603-decline",
    "term": "603 Decline",
    "fullName": "SIP 603 Decline Response",
    "category": "SIP 메시지",
    "simple": "수신 측이 통화 요청을 명확하게 거절했음을 나타내는 응답이에요.",
    "practical": "거절 시 발신 화면의 안내 문구와 통화 종료 동작이 규격에 맞는지 확인합니다.",
    "example": "수신자가 거절 버튼을 누르면 603 응답과 안내 문구가 발생하는지 확인합니다."
  },
  {
    "id": "480-response",
    "term": "480 Response",
    "fullName": "SIP 480 Temporarily Unavailable",
    "category": "SIP 메시지",
    "simple": "상대방이 현재 일시적으로 통화할 수 없는 상태임을 나타내는 응답이에요.",
    "practical": "배터리나 단말 상태 등 시나리오에 따라 안내 문구와 종료 처리가 맞는지 확인합니다.",
    "example": "상대 단말이 통화 불가 상태일 때 480 응답 후 발신이 종료되는지 확인합니다."
  },
  {
    "id": "486-user-busy",
    "term": "486 User Busy",
    "fullName": "SIP 486 Busy Here Response",
    "category": "SIP 메시지",
    "simple": "상대방이 다른 통화 중이라 현재 요청을 받을 수 없다는 응답이에요.",
    "practical": "통화 중인 단말로 발신했을 때 응답 코드와 사용자 안내가 일치하는지 확인합니다.",
    "example": "상대방 통화 중 발신 시 486 응답과 통화 중 안내가 표시되는지 확인합니다."
  },
  {
    "id": "491-glare",
    "term": "491 Glare Condition",
    "fullName": "SIP 491 Request Pending Response",
    "category": "SIP 메시지",
    "simple": "같은 세션에서 처리 중인 요청과 새 요청이 충돌했음을 나타내는 응답이에요.",
    "practical": "동시에 세션 변경 요청이 발생해도 기존 통화가 안정적으로 유지되는지 확인합니다.",
    "example": "491 응답이 발생한 뒤 영상통화가 끊기지 않고 유지되는지 확인합니다."
  },
  {
    "id": "408-timeout",
    "term": "408 Request Timeout",
    "fullName": "SIP 408 Request Timeout Response",
    "category": "SIP 메시지",
    "simple": "정해진 시간 안에 요청에 대한 응답을 받지 못했음을 나타내는 응답이에요.",
    "practical": "무응답 시 타이머 만료, 안내 문구, 자동 종료 시점이 규격과 맞는지 확인합니다.",
    "example": "상대방이 받지 않을 때 408 응답과 부재 안내가 표시되는지 확인합니다."
  },
  {
    "id": "session-update",
    "term": "Session Update",
    "fullName": "SIP Session Update",
    "category": "SIP 메시지",
    "simple": "진행 중인 통화의 세션 정보를 주기적으로 갱신하는 동작이에요.",
    "practical": "Session-Expires 값을 기준으로 정해진 시점에 갱신 메시지가 발생하는지 확인합니다.",
    "example": "장시간 영상통화 중 세션 갱신 메시지가 한 번 이상 정상 발생하는지 확인합니다."
  },
  {
    "id": "ims",
    "term": "IMS",
    "fullName": "IP Multimedia Subsystem",
    "category": "IMS·네트워크",
    "simple": "IP망에서 음성·영상통화와 멀티미디어 서비스를 제어하는 통신망 구조예요.",
    "practical": "단말이 IMS에 등록되어야 VoLTE와 영상통화의 SIP 호 처리가 진행됩니다.",
    "example": "통화 전 단말의 IMS 등록 상태가 정상인지 확인합니다."
  },
  {
    "id": "pcscf",
    "term": "P-CSCF",
    "fullName": "Proxy-Call Session Control Function",
    "category": "IMS·네트워크",
    "simple": "단말이 IMS에 접속할 때 처음 만나는 SIP 프록시 기능이에요.",
    "practical": "REGISTER와 INVITE가 설정된 P-CSCF 주소와 포트로 전송되는지 확인합니다.",
    "example": "히든 메뉴의 P-CSCF 주소와 실제 SIP 전송 목적지가 일치하는지 확인합니다."
  },
  {
    "id": "p-access-network-info",
    "term": "P-Access-Network-Info",
    "fullName": "SIP P-Access-Network-Info Header",
    "category": "IMS·네트워크",
    "simple": "단말이 접속한 무선망 종류와 망 식별 정보를 전달하는 SIP 헤더예요.",
    "practical": "3GPP-E-UTRAN, MCC, MNC, 셀 식별 정보가 요구 형식에 맞는지 확인합니다.",
    "example": "REGISTER와 SUBSCRIBE의 P-Access-Network-Info 값을 비교합니다."
  },
  {
    "id": "dns-query",
    "term": "DNS Query",
    "fullName": "Domain Name System Query",
    "category": "IMS·네트워크",
    "simple": "도메인 이름에 대응하는 IP 주소를 찾기 위한 질의예요.",
    "practical": "DNS 질의가 실패했을 때 저장된 P-CSCF나 최신 망 설정으로 재접속하는지 확인합니다.",
    "example": "DNS 실패 후 단말이 대체 P-CSCF로 REGISTER를 시도하는지 확인합니다."
  },
  {
    "id": "pdn",
    "term": "PDN",
    "fullName": "Packet Data Network",
    "category": "IMS·네트워크",
    "simple": "이동통신 단말이 접속하는 외부 패킷 데이터 네트워크예요.",
    "practical": "일반 통화와 긴급통화에서 IMS PDN 또는 긴급 PDN으로 전환되는지 확인합니다.",
    "example": "긴급 영상통화 전후에 PDN 연결 상태가 예상한 순서로 바뀌는지 확인합니다."
  },
  {
    "id": "eps-bearer",
    "term": "EPS Bearer",
    "fullName": "Evolved Packet System Bearer",
    "category": "IMS·네트워크",
    "simple": "LTE 망에서 단말과 네트워크 사이의 데이터 전달 경로를 논리적으로 구분한 단위예요.",
    "practical": "통화 시작과 종료 시 기본 또는 전용 베어러가 생성·해제되는지 확인합니다.",
    "example": "영상통화 연결 시 필요한 EPS bearer가 활성화되는지 확인합니다."
  },
  {
    "id": "dedicated-bearer",
    "term": "Dedicated Bearer",
    "fullName": "Dedicated EPS Bearer",
    "category": "IMS·네트워크",
    "simple": "특정 서비스 품질을 보장하기 위해 별도로 설정하는 EPS 전달 경로예요.",
    "practical": "음성·영상통화 연결 시 서비스에 맞는 전용 베어러와 QCI가 할당되는지 확인합니다.",
    "example": "영상통화 시작 후 Dedicated Bearer가 생성되고 종료 후 해제되는지 확인합니다."
  },
  {
    "id": "qci",
    "term": "QCI",
    "fullName": "QoS Class Identifier",
    "category": "IMS·네트워크",
    "simple": "LTE에서 지연, 우선순위 등 서비스 품질 특성을 구분하는 식별 값이에요.",
    "practical": "음성이나 영상 미디어에 요구되는 QCI가 전용 베어러에 정확히 할당되는지 확인합니다.",
    "example": "영상통화 연결 시 음성과 영상에 대응하는 QCI 값이 생성되는지 확인합니다."
  },
  {
    "id": "rsrp",
    "term": "RSRP",
    "fullName": "Reference Signal Received Power",
    "category": "IMS·네트워크",
    "simple": "LTE 기준 신호의 수신 전력을 나타내는 무선 품질 지표예요.",
    "practical": "값이 낮은 약전계 환경에서 통화 끊김과 영상 품질 저하 여부를 확인합니다.",
    "example": "RSRP가 -120 dBm 이하인 환경에서 영상통화가 유지되는지 확인합니다."
  },
  {
    "id": "sdp",
    "term": "SDP",
    "fullName": "Session Description Protocol",
    "category": "미디어·코덱",
    "simple": "멀티미디어 세션에서 사용할 매체, 주소, 포트, 코덱 조건을 기술하는 프로토콜이에요.",
    "practical": "INVITE의 SDP에서 음성·영상 포트, Payload Type, 코덱, 비트레이트 속성을 확인합니다.",
    "example": "INVITE와 응답 SDP의 코덱 구성이 서로 호환되는지 확인합니다."
  },
  {
    "id": "rtp",
    "term": "RTP",
    "fullName": "Real-Time Transport Protocol",
    "category": "미디어·코덱",
    "simple": "실시간 음성과 영상 데이터를 전달하기 위한 전송 프로토콜이에요.",
    "practical": "통화가 연결된 뒤 실제 미디어 패킷이 양방향으로 전송되는지 확인합니다.",
    "example": "영상통화 중 RTP 패킷의 코덱과 페이로드 구성을 확인합니다."
  },
  {
    "id": "dynamic-payload-type",
    "term": "Dynamic Payload Type",
    "fullName": "RTP Dynamic Payload Type",
    "category": "미디어·코덱",
    "simple": "세션마다 코덱과 RTP 번호의 대응 관계를 동적으로 지정하는 방식이에요.",
    "practical": "SDP의 rtpmap 값과 실제 RTP 패킷의 Payload Type이 일치하는지 확인합니다.",
    "example": "SDP에서 112번이 H.265로 협상됐다면 RTP에도 같은 값이 사용되는지 확인합니다."
  },
  {
    "id": "evs",
    "term": "EVS",
    "fullName": "Enhanced Voice Services",
    "category": "미디어·코덱",
    "simple": "이동통신에서 고품질 음성을 제공하기 위한 광대역 음성 코덱이에요.",
    "practical": "지원 단말의 SDP에 EVS가 포함되고 실제 통화에서 정상 협상되는지 확인합니다.",
    "example": "EVS 지원 단말끼리 통화할 때 SDP의 EVS/16000 항목을 확인합니다."
  },
  {
    "id": "amr-wb",
    "term": "AMR-WB",
    "fullName": "Adaptive Multi-Rate Wideband",
    "category": "미디어·코덱",
    "simple": "넓은 음성 대역을 사용하는 이동통신용 광대역 음성 코덱이에요.",
    "practical": "EVS를 사용할 수 없을 때 AMR-WB로 정상 대체 협상되는지 확인합니다.",
    "example": "SDP의 AMR-WB/16000 항목과 통화 음질을 확인합니다."
  },
  {
    "id": "amr-nb",
    "term": "AMR-NB",
    "fullName": "Adaptive Multi-Rate Narrowband",
    "category": "미디어·코덱",
    "simple": "좁은 음성 대역을 사용하는 이동통신용 음성 코덱이에요.",
    "practical": "망이나 상대 단말 조건에 따라 AMR 계열 코덱으로 대체되는지 확인합니다.",
    "example": "SDP에서 AMR/8000 항목이 협상되는 시나리오를 확인합니다."
  },
  {
    "id": "h263",
    "term": "H.263",
    "fullName": "ITU-T H.263 Video Coding",
    "category": "미디어·코덱",
    "simple": "낮은 전송률의 영상통신에 사용되는 영상 압축 표준이에요.",
    "practical": "구형 또는 3G 영상통화 단말과의 호환성에서 SDP 지원 여부를 확인합니다.",
    "example": "H.263 단말과 통화할 때 영상 연결과 화질이 정상인지 확인합니다."
  },
  {
    "id": "h264",
    "term": "H.264",
    "fullName": "Advanced Video Coding",
    "category": "미디어·코덱",
    "simple": "영상 데이터를 효율적으로 압축하는 널리 사용되는 영상 코덱이에요.",
    "practical": "SDP의 profile, level, packetization mode와 영상 비트레이트를 확인합니다.",
    "example": "H.264 영상통화에서 목표 비트레이트 이상으로 영상이 전송되는지 확인합니다."
  },
  {
    "id": "h265",
    "term": "H.265",
    "fullName": "High Efficiency Video Coding",
    "category": "미디어·코덱",
    "simple": "H.264보다 높은 압축 효율을 목표로 하는 고효율 영상 코덱이에요.",
    "practical": "지원 단말의 SDP에 H.265가 포함되고 고화질 영상통화로 연결되는지 확인합니다.",
    "example": "H.265 단말끼리 연결했을 때 720p급 영상과 목표 비트레이트를 확인합니다."
  },
  {
    "id": "frame-bundling",
    "term": "Frame Bundling",
    "fullName": "RTP Frame Bundling",
    "category": "미디어·코덱",
    "simple": "여러 미디어 프레임을 하나의 전송 단위에 묶어 보내는 방식이에요.",
    "practical": "RTP 패킷에 포함된 프레임 수와 시간 간격이 협상 조건에 맞는지 확인합니다.",
    "example": "EVS 통화의 RTP 패킷에서 프레임 묶음 구성을 확인합니다."
  },
  {
    "id": "candidate-attribute",
    "term": "Candidate Attribute",
    "fullName": "SDP Candidate Attribute",
    "category": "미디어·코덱",
    "simple": "미디어 연결에 사용할 수 있는 IP 주소와 포트 후보를 표현하는 SDP 속성이에요.",
    "practical": "candidate 번호, component ID, transport, priority, IP, port, type 구성을 확인합니다.",
    "example": "SDP의 candidate 항목에 주소와 포트가 빠짐없이 포함되는지 확인합니다."
  },
  {
    "id": "sim",
    "term": "SIM",
    "fullName": "Subscriber Identity Module",
    "category": "SIM·단말",
    "simple": "이동통신 가입자 식별 정보를 저장하는 모듈이에요.",
    "practical": "통화·문자·데이터에 사용할 SIM 선택과 망 등록 상태를 확인합니다.",
    "example": "두 개의 SIM이 있는 단말에서 발신 SIM과 데이터 SIM 설정을 확인합니다."
  },
  {
    "id": "esim",
    "term": "eSIM",
    "fullName": "Embedded SIM",
    "category": "SIM·단말",
    "simple": "단말에 내장되어 프로파일을 내려받아 사용하는 디지털 SIM 방식이에요.",
    "practical": "eSIM과 물리 SIM을 함께 사용할 때 통화 수신과 데이터 전환 동작을 확인합니다.",
    "example": "eSIM으로 영상통화 중 다른 SIM으로 들어오는 통화 처리 결과를 확인합니다."
  },
  {
    "id": "usim",
    "term": "USIM",
    "fullName": "Universal Subscriber Identity Module",
    "category": "SIM·단말",
    "simple": "3세대 이후 이동통신에서 가입자 인증과 서비스 정보를 제공하는 범용 SIM이에요.",
    "practical": "USIM 교체 후 망 등록, 통화, 메시지, 가입 서비스가 정상인지 확인합니다.",
    "example": "다른 요금제가 설정된 USIM으로 교체한 뒤 영상통화를 확인합니다."
  },
  {
    "id": "uicc",
    "term": "UICC",
    "fullName": "Universal Integrated Circuit Card",
    "category": "SIM·단말",
    "simple": "SIM·USIM 같은 통신 애플리케이션을 담는 범용 집적 회로 카드예요.",
    "practical": "카드 이동 후 단말이 가입자 정보를 다시 읽고 IMS에 정상 등록되는지 확인합니다.",
    "example": "UICC를 다른 단말로 옮긴 뒤 영상통화가 정상 동작하는지 확인합니다."
  },
  {
    "id": "dsds",
    "term": "DSDS",
    "fullName": "Dual SIM Dual Standby",
    "category": "SIM·단말",
    "simple": "두 개의 SIM을 대기 상태로 유지하고 필요할 때 하나를 사용하도록 하는 방식이에요.",
    "practical": "음성·메시지·데이터 기본 SIM 조합에 따라 영상통화 수발신이 정상인지 확인합니다.",
    "example": "SIM A와 SIM B의 망 모드를 다르게 설정한 뒤 각각 영상통화를 확인합니다."
  },
  {
    "id": "mep",
    "term": "MEP",
    "fullName": "Multiple Enabled Profiles",
    "category": "SIM·단말",
    "simple": "여러 eSIM 프로파일을 동시에 활성화할 수 있도록 하는 기능이에요.",
    "practical": "MEP 지원 단말에서 eSIM 프로파일 조합별 통화와 데이터 동작을 확인합니다.",
    "example": "eSIM1과 eSIM2를 함께 활성화한 상태에서 영상통화 수발신을 확인합니다."
  },
  {
    "id": "ipsec",
    "term": "IPsec",
    "fullName": "Internet Protocol Security",
    "category": "SIM·단말",
    "simple": "IP 패킷을 인증하고 암호화해 안전하게 전달하는 보안 기술 모음이에요.",
    "practical": "IMS 접속 보안이 적용된 단말과 미적용 단말 사이의 호환성을 확인합니다.",
    "example": "IPsec 지원 단말과 영상통화 연결이 정상적으로 유지되는지 확인합니다."
  },
  {
    "id": "mvno",
    "term": "MVNO",
    "fullName": "Mobile Virtual Network Operator",
    "category": "SIM·단말",
    "simple": "자체 무선망 없이 다른 이동통신사의 망을 빌려 서비스를 제공하는 사업자예요.",
    "practical": "알뜰폰 SIM을 장착했을 때 IMS 등록과 음성·영상통화 호환성을 확인합니다.",
    "example": "MVNO SIM으로 영상통화 수발신이 정상인지 확인합니다."
  },
  {
    "id": "video-bitrate",
    "term": "Video Bitrate",
    "fullName": "Video Data Rate",
    "category": "품질·화질",
    "simple": "1초 동안 전송되는 영상 데이터의 양을 나타내는 값이에요.",
    "practical": "코덱과 망 조건에 따라 영상 비트레이트가 기준 이상으로 유지되는지 확인합니다.",
    "example": "H.265 영상통화에서 비트레이트가 목표 기준 이상인지 확인합니다."
  },
  {
    "id": "vga",
    "term": "VGA",
    "fullName": "Video Graphics Array",
    "category": "품질·화질",
    "simple": "일반적으로 640×480 픽셀 해상도를 가리키는 영상 규격이에요.",
    "practical": "특정 영상통화 시나리오에서 요구되는 화면 크기와 실제 전송 해상도를 확인합니다.",
    "example": "긴급 영상통화가 VGA급 화면으로 연결되는지 확인합니다."
  },
  {
    "id": "qcif",
    "term": "QCIF",
    "fullName": "Quarter Common Intermediate Format",
    "category": "품질·화질",
    "simple": "낮은 전송률 영상통화에 쓰이는 176×144 픽셀급 영상 형식이에요.",
    "practical": "3G 영상통화 등 제한된 환경에서 협상된 해상도와 화면 품질을 확인합니다.",
    "example": "3G 긴급 영상통화가 QCIF급으로 연결되는지 확인합니다."
  }
];
