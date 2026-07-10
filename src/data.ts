import type { Term } from './types';

export const categories = [
  '통신 기초', 'SIP', 'RTP', 'IMS', 'LTE / 5G',
  'Wireshark', 'XCAL', 'ADB / Logcat', '음성통화 QA',
  '영상통화 QA', 'TC 작성법',
];

export const terms: Term[] = [
  {
    id: 'sip',
    term: 'SIP',
    fullName: 'Session Initiation Protocol',
    category: 'SIP',
    simple: '인터넷 전화의 연결과 종료를 관리하는 통신 규칙이에요.',
    practical: 'INVITE, ACK, BYE 등의 메시지를 이용해 음성·영상 세션을 설정하고 종료합니다.',
    example: '발신자가 통화를 시작하면 INVITE 메시지가 전송됩니다.',
  },
  {
    id: 'rtp',
    term: 'RTP',
    fullName: 'Real-time Transport Protocol',
    category: 'RTP',
    simple: '통화 중 실제 음성과 영상 데이터를 전달하는 규칙이에요.',
    practical: 'SIP로 세션을 설정한 뒤 미디어 패킷 전달에 사용됩니다.',
    example: '통화는 연결됐지만 음성이 없을 때 RTP 흐름을 확인합니다.',
  },
  {
    id: 'invite',
    term: 'INVITE',
    fullName: 'SIP INVITE Request',
    category: 'SIP',
    simple: '새로운 통화를 시작할 때 보내는 SIP 요청이에요.',
    practical: 'SDP를 포함해 사용할 코덱과 미디어 주소를 제안할 수 있습니다.',
    example: 'INVITE → 100 Trying → 180 Ringing → 200 OK → ACK',
  },
  {
    id: 'ack',
    term: 'ACK',
    fullName: 'Acknowledgement',
    category: 'SIP',
    simple: '통화 연결 응답을 잘 받았다고 확인하는 메시지예요.',
    practical: '200 OK 응답 이후 ACK가 전달되면 기본 통화 연결 절차가 완성됩니다.',
    example: '200 OK를 받은 발신 측이 ACK를 전송합니다.',
  },
  {
    id: 'wireshark',
    term: 'Wireshark',
    fullName: 'Wireshark Network Protocol Analyzer',
    category: 'Wireshark',
    simple: '네트워크 패킷을 눈으로 확인하는 분석 도구예요.',
    practical: 'sip, rtp 등의 표시 필터를 이용해 통화 시그널링과 미디어 흐름을 분석합니다.',
    example: '표시 필터에 sip를 입력해 SIP 메시지만 확인합니다.',
  },
];

export const callFlow = [
  { id: 'open-app', label: '발신 단말에서 전화 앱을 실행한다.' },
  { id: 'input-number', label: '상대방 번호를 입력한다.' },
  { id: 'tap-call', label: '통화 버튼을 선택한다.' },
  { id: 'receive-call', label: '수신 단말에서 전화를 받는다.' },
  { id: 'check-audio', label: '양방향 음성이 정상적으로 들리는지 확인한다.' },
  { id: 'end-call', label: '통화를 종료한다.' },
];

export const suggestedQuestions = [
  'SIP와 RTP의 차이가 뭐야?',
  'INVITE부터 ACK까지 설명해줘.',
  '음성통화 TC 예시를 만들어줘.',
  '통화는 연결됐는데 음성이 안 들리면 무엇을 확인해야 해?',
];
