export type AnnounceProps = {
    id: string;
    publishedAt: Date;
    title: string;
    contents: string;
}

export const testAnnounces: AnnounceProps[] = [{
    id: '0',
    title: '브랜드 2개 이상 등록하신 고객님 대상 이벤트',
    contents: '전직대통령의 신분과 예우에 관하여는 법률로 정한다. 국무총리는 국회의 동의를 얻어 대통령이 임명한다. 헌법개정안은 국회가 의결한 후 30일 이내에 국민투표에 붙여 국회의원선거권자 과반수의 투표와 투표자 과반수의 찬성을 얻어야 한다.',
    publishedAt: new Date()
},
{
    id: '1',
    title: '서버 점검 공지',
    contents: '교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에 의하여 보장된다. 모든 국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다.',
    publishedAt: new Date()
},
{
    id: '2',
    title: '유하 VIP 서비스가 런칭 기념 이벤트',
    contents: '대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.',
    publishedAt: new Date()
}]