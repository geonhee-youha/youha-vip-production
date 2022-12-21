// 공지사항
export type NoticeProps = {
    id: number;
    title: string;
    body: string;
    createdAt: any;
}
export const testNotices: NoticeProps[] = [
    {
        id: 1,
        title: '브랜드 2개 이상 등록하신 고객님 대상 이벤트',
        body: '유하 VIP 서비스가 런칭되었어요.',
        createdAt: '2022-10-27T15:43:00.000Z'
    },
    {
        id: 2,
        title: '서버 점검 공지',
        body: '유하 VIP 서비스가 런칭되었어요.',
        createdAt: '2022-10-16T05:43:00.000Z'
    },
    {
        id: 3,
        title: '유하 VIP 서비스가 런칭 기념 이벤트',
        body: '유하 VIP 서비스가 런칭되었어요.',
        createdAt: '2022-09-06T05:43:00.000Z'
    }
]