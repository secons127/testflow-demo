export function getMockAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('sip') && q.includes('rtp')) {
    return 'SIP는 통화를 연결·변경·종료하는 시그널링 역할을 하고, RTP는 연결된 통화에서 실제 음성·영상 데이터를 전달합니다.';
  }
  if (q.includes('invite') || q.includes('ack')) {
    return '기본 흐름은 INVITE → 100 Trying → 180 Ringing → 200 OK → ACK입니다. INVITE로 통화를 요청하고, 200 OK 이후 ACK로 연결을 확인합니다.';
  }
  if (q.includes('tc') || q.includes('테스트')) {
    return '예시 TC\n\n사전 조건: 두 단말이 LTE 망에 연결되어 있음\n테스트 절차: 발신 → 수신 → 통화 연결\n기대 결과: 양방향 음성과 통화 시간이 정상적으로 확인됨';
  }
  if (q.includes('음성') || q.includes('안 들')) {
    return '통화 연결 상태, 음소거 여부, 오디오 경로, 코덱 협상 결과, RTP 송수신 여부 순서로 확인해보세요.';
  }
  if (q.includes('wireshark')) {
    return 'Wireshark 표시 필터에 sip를 입력하면 SIP 메시지만 볼 수 있고, rtp를 입력하면 RTP 패킷을 확인할 수 있습니다.';
  }

  return '현재는 GitHub Demo용 Mock AI예요. SIP, RTP, Wireshark, 음성통화 또는 TC 작성법처럼 키워드를 포함해 질문해 주세요.';
}
