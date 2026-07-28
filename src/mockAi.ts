export function getMockAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('register') || q.includes('401')) {
    return '대표적인 IMS 등록 흐름은 REGISTER → 401 Unauthorized → 인증 정보를 포함한 REGISTER 재전송 → 200 OK입니다. 이후 SUBSCRIBE와 등록 상태까지 함께 확인합니다.';
  }
  if (q.includes('invite') || q.includes('sdp')) {
    return 'INVITE는 통화를 시작하거나 세션을 변경하는 SIP 요청이고, SDP는 그 안에서 사용할 음성·영상 포트와 코덱 조건을 설명합니다.';
  }
  if (q.includes('p-cscf') || q.includes('pcscf')) {
    return 'P-CSCF는 단말이 IMS망에 접속할 때 처음 만나는 SIP 프록시입니다. REGISTER와 INVITE가 설정된 P-CSCF 주소로 전송되는지 확인합니다.';
  }
  if (q.includes('bearer') || q.includes('qci')) {
    return 'Dedicated Bearer는 통화 미디어에 필요한 품질을 위해 별도로 만드는 전달 경로이고, QCI는 그 경로의 지연·우선순위 같은 품질 특성을 구분하는 값입니다.';
  }
  if (q.includes('evs') || q.includes('amr')) {
    return 'EVS와 AMR-WB는 모두 음성 코덱입니다. EVS는 더 넓은 조건에서 높은 음질과 효율을 목표로 하며, 지원 여부와 SDP 협상 결과를 함께 확인합니다.';
  }
  if (
    q.includes('h.264') ||
    q.includes('h264') ||
    q.includes('h.265') ||
    q.includes('h265')
  ) {
    return 'H.264와 H.265는 영상 압축 코덱입니다. H.265는 일반적으로 더 높은 압축 효율을 목표로 하며, SDP 지원 여부와 실제 Video Bitrate를 함께 확인합니다.';
  }
  if (q.includes('dsds') || q.includes('sim')) {
    return 'DSDS 검증에서는 음성·메시지·데이터 기본 SIM 조합, 각 SIM의 망 모드, 통화 중 다른 SIM으로 들어오는 수신 동작을 나누어 확인합니다.';
  }
  if (q.includes('rsrp') || q.includes('약전계')) {
    return 'RSRP는 LTE 기준 신호의 수신 전력을 나타냅니다. 값이 낮은 약전계에서는 통화 끊김, 영상 정지, 비트레이트 저하가 없는지 반복 확인합니다.';
  }
  if (q.includes('bitrate') || q.includes('비트레이트')) {
    return 'Video Bitrate는 초당 전송되는 영상 데이터량입니다. 코덱과 망 조건별 기준을 확인하고 통화가 유지되는 동안 값이 지나치게 떨어지지 않는지 봅니다.';
  }

  return '현재는 데모용 Mock AI예요. REGISTER, INVITE, SDP, P-CSCF, 코덱, DSDS, RSRP 같은 통신 용어를 포함해 질문해 주세요.';
}
