import { IconName } from '@fortawesome/fontawesome-svg-core';
import { deepOrange, deepPurple, indigo, orange, purple, red } from '@mui/material/colors';
export type FilterProps = {
    value: any;
    title?: string;
    backgroundColor?: string;
    color?: string;
}
export type AgeProps = '10대' | '20~30대' | '40~50대' | '60대 이상'
export type SexProps = '남성' | '여성' | '성별무관'
export type SlugProps = {
    title: string;
    pathName: string;
}
export type PageProps = {
    title: string;
    iconName: IconName;
    pathName: string;
    slugs?: SlugProps[];
    inMainTab?: boolean;
}
export const pages: PageProps[] = [
    {
        title: '내 캠페인',
        iconName: 'grid-2',
        pathName: '/campaign',
        inMainTab: true
    },
    {
        title: '광고집행 관리',
        iconName: 'rectangle-ad',
        pathName: '/ad',
        slugs: [
            {
                title: '견적서 관리',
                pathName: '/estimate'
            },
            {
                title: '광고세트 관리',
                pathName: '/adSet'
            },
        ],
        inMainTab: true
    },
    {
        title: '인사이트',
        iconName: 'lightbulb-exclamation',
        pathName: '/insight',
        slugs: [
            {
                title: '추천 크리에이터',
                pathName: '/creator'
            },
            {
                title: '추천 기획안',
                pathName: '/playlist'
            },
            {
                title: '추천 광고영상',
                pathName: '/video'
            },
        ],
        inMainTab: true
    },
    {
        title: '크리에이터 리스트',
        iconName: 'address-book',
        pathName: '/creator',
        inMainTab: true
    },
    {
        title: '즐겨찾기',
        iconName: 'star',
        pathName: '/favorite',
        inMainTab: true
    },
    {
        title: '공지사항',
        iconName: 'bullhorn',
        pathName: '/notice',
    },
    {
        title: '마이페이지',
        iconName: 'user',
        pathName: '/mypage',
    },
]
export type HomeTabProps = {
    title: string;
    iconName: IconName
};
export const homeTabs: HomeTabProps[] = [
    {
        title: "체크리스트",
        iconName: 'check-circle'
    },
    {
        title: "진행리스트",
        iconName: 'rectangle-list'
    },
];
export type TabProps = {
    id: number;
    title: string;
    subtitle?: string;
    value: string;
}
export const adSetDialogTabs: TabProps[] = [
    {
        id: 0,
        title: '요청사항 확인',
        subtitle: '요청사항을 확인해 주세요',
        value: ''
    },
    {
        id: 1,
        title: '매니저 확인',
        subtitle: '모두 확정될 때까지 기다려 주세요',
        value: ''
    },
    {
        id: 3,
        title: '계약',
        subtitle: '계약서를 확인하세요',
        value: ''
    },
    {
        id: 4,
        title: '광고집행 현황',
        subtitle: '광고가 집행되는 현황을 확인하세요',
        value: ''
    },
    {
        id: 5,
        title: '완료',
        subtitle: '완료된 광고들을 확인하세요',
        value: ''
    },
]
export const favoriteTabs: TabProps[] = [
    {
        id: 0,
        title: '크리에이터',
        value: ''
    },
    {
        id: 1,
        title: '기획안',
        value: ''
    },
    {
        id: 2,
        title: '광고영상',
        value: ''
    },
]
export const estimateDialogTabs: TabProps[] = [
    {
        id: 0,
        title: '상세정보',
        value: ''
    },
    {
        id: 1,
        title: '견적 내용',
        value: ''
    },
]
export const creatorDialogTabs: TabProps[] = [
    {
        id: 0,
        title: '기획안',
        value: ''
    },
    {
        id: 1,
        title: '광고영상',
        value: ''
    },
    {
        id: 2,
        title: '채널정보',
        value: ''
    },
    {
        id: 3,
        title: '채널 스코어',
        value: ''
    },
]
export const creatorPopupTabs: TabProps[] = [
    {
        id: 0,
        title: '추천 크리에이터',
        value: ''
    },
    {
        id: 1,
        title: '즐겨찾기',
        value: ''
    },
]
export const planPopupTabs: TabProps[] = [
    {
        id: 0,
        title: '추천 기획안',
        value: ''
    },
    {
        id: 1,
        title: '즐겨찾기',
        value: ''
    },
]
export const creatorFilters: FilterProps[] = [
    { value: "", title: "모든 크리에이터" },
]
export const creatorSorts: FilterProps[] = [
    { value: "", title: "구독자 순" },
    { value: "1", title: "트렌드 지수 순" },
    { value: "2", title: "예상 노출수 순" },
    { value: "3", title: "타겟 적합도 순" },
    { value: "4", title: "예상 CPV 순" },
    { value: "5", title: "평균 단가 순" },
    { value: "6", title: "집행 가능일 순" },
]
export const purposeFilter: FilterProps[] = [
    { value: "0", title: '인지도 상승', },
    { value: "1", title: '노출 상승', },
    { value: "2", title: '트래픽 증가', },
    { value: "3", title: '참여 증가', },
    { value: "4", title: '앱 설치', },
    { value: "5", title: '동영상 조회', },
    { value: "6", title: '잠재 고객 확보', },
    { value: "7", title: '메시지', },
    { value: "8", title: '전환', },
    { value: "9", title: '카탈로그 판매', },
    { value: "10", title: '매장방문' },
]
export const categoryFilter: FilterProps[] = [
    { value: "0", title: "패션", },
    { value: "1", title: "뷰티", },
    { value: "2", title: "비건/친환경", },
    { value: "3", title: "가구/인테리어", },
    { value: "4", title: "건강", },
    { value: "5", title: "다이어트", },
    { value: "6", title: "여행", },
    { value: "7", title: "게임", },
    { value: "8", title: "펫/동물", },
    { value: "9", title: "IT/앱", },
    { value: "10", title: "가전/전자기기", },
    { value: "11", title: "영화/드라마", },
    { value: "12", title: "웹툰/애니", },
    { value: "13", title: "자동차", },
    { value: "14", title: "음악", },
    { value: "15", title: "운동", },
    { value: "16", title: "시사/정치", },
    { value: "17", title: "교육", },
    { value: "18", title: "키즈", },
    { value: "19", title: "은행", },
    { value: "20", title: "증권", },
    { value: "21", title: "카드", },
    { value: "22", title: "금융", },
    { value: "23", title: "투자/제태크", },
    { value: "24", title: "주류", },
    { value: "25", title: "음료", },
    { value: "26", title: "음식", },
    { value: "27", title: "음식점", },
    { value: "28", title: "출판", },
    { value: "29", title: "공기업/관공서", },
    { value: "30", title: "병원", },
    { value: "31", title: "엔터테인먼트", },
    { value: "32", title: "종교", },
    { value: "33", title: "사회적 기업", },
    { value: "34", title: "기타", },
]
export const mediaFilter: FilterProps[] = [
    { value: "0", title: "자사 SNS", },
    { value: "1", title: "유통/판매 채널", },
    { value: "2", title: "자사 홈페이지", },
    { value: "3", title: "SNS 광고", },
    { value: "4", title: "기타광고", },
    { value: "5", title: "오프라인", },
    { value: "6", title: "직접 입력", },
]
export const ageFilter: FilterProps[] = [
    {
        value: '10',
        title: '10대',
    },
    {
        value: '20',
        title: '20~30대',
    },
    {
        value: '40',
        title: '40~50대',
    },
    {
        value: '60',
        title: '60대 이상',
    },
]
export const sexFilter: FilterProps[] = [
    {
        value: 'male',
        title: '남성',
    },
    {
        value: 'female',
        title: '여성',
    },
    {
        value: 'both',
        title: '성별무관',
    },
]
export const subscriberFilter: FilterProps[] = [
    {
        value: '10000',
        title: '~1만',
    },
    {
        value: '50000',
        title: '1만~5만',
    },
    {
        value: '100000',
        title: '5만~10만',
    },
    {
        value: 'over',
        title: '10만 이상',
    },
    {
        value: 'input',
        title: '직접 입력',
    },
]
export const playlistFilters: FilterProps[] = [
    { value: "", title: "모든 기획안" },
]
export const playlistSorts: FilterProps[] = [
    { value: "", title: "업로드 순" },
]
export const videoFilters: FilterProps[] = [
    { value: "", title: "모든 광고영상" },
]
export const videoSorts: FilterProps[] = [
    { value: "", title: "업로드 순" },
]
export const adSetFilters: FilterProps[] = [
    { value: "", title: "모든 광고세트" },
    { value: "1", title: "계약중인 광고세트" },
    { value: "2", title: "진행중인 광고세트" },
    { value: "3", title: "완료된 광고세트" },
]
export const adSetSorts: FilterProps[] = [
    { value: "", title: "진행도순" },
    { value: "changedAt", title: "최근 변경순" },
]
export const estimateFilters: FilterProps[] = [
    { value: "", title: "모든 견적서" },
    { value: "1", title: "대기중인 견적서" },
    { value: "2", title: "미열람한 광고세트" },
    { value: "3", title: "열람한 광고세트" },
]
export const estimateSorts: FilterProps[] = [
    { value: "", title: "진행도순" },
    { value: "changedAt", title: "최근 변경순" },
]
export const adStatuses: FilterProps[] = [
    {
        value: '1',
        title: "계약 준비중",
        backgroundColor: orange[50],
        color: orange[500],
    },
    {
        value: '2',
        title: "계약",
        backgroundColor: orange[50],
        color: orange[500],
    },
    {
        value: '3',
        title: "기획안 전달",
        backgroundColor: orange[50],
        color: orange[500],
    },
    {
        value: '4',
        title: "기획안 확정",
        backgroundColor: deepOrange[50],
        color: deepOrange[500],
    },
    {
        value: '5',
        title: "촬영",
        backgroundColor: red[50],
        color: red[500],
    },
    {
        value: '6',
        title: "편집본 전달",
        backgroundColor: purple[50],
        color: purple[500],
    },
    {
        value: '7',
        title: "업로드",
        backgroundColor: deepPurple[50],
        color: deepPurple[500],
    },
    {
        value: '8',
        title: "완료",
        backgroundColor: indigo[50],
        color: indigo[500],
    },
];