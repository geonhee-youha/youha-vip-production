import { IconName } from "@fortawesome/fontawesome-svg-core";
export type PageProps = {
  thumbnails?: { [key: string]: string };
  category?: string;
  titles: { [key: string]: string };
  descriptions: { [key: string]: React.ReactNode };
  iconName?: IconName;
  href: string;
  pages?: PageProps[];
};
export const pageDefaultProps: PageProps = {
  titles: {
    nav: "",
    card: "",
    page: "",
  },
  descriptions: {
    card: "",
    page: "",
  },
  href: "",
};
export const pages: PageProps[] = [
  {
    titles: {
      nav: "Core",
      card: "Core",
      page: "Core",
    },
    descriptions: {
      card: "",
      page: "YOUHA Design에 기본이 되는 공통의 가치와 원칙은 YOUHA 서비스를 통일된 디자인 언어로 일치시키는데 도움을 줍니다.",
    },
    href: "/core",
    pages: [
      {
        thumbnails: {
          md: "/images/thumbnails/core-colors-md.png",
          lg: "/images/thumbnails/core-colors-lg.png",
        },
        titles: {
          nav: "Colors",
          card: "Colors",
          page: "Colors",
        },
        descriptions: {
          card: (
            <>
              YOUHA Color Guide는 표준화된 컬러 및
              <br />
              사용 가이드를 제공하여 디자이너가 일관성 있는
              <br />
              브랜드 경험을 만들어 나갈 수 있도록 돕습니다.
            </>
          ),
          page: "",
        },
        href: "/core/colors",
        pages: [
          {
            titles: {
              nav: "YOUHA Color Guide",
              card: "YOUHA Color Guide",
              page: "YOUHA Color Guide",
            },
            descriptions: {
              card: "",
              page: "YOUHA Color Guide는 표준화된 컬러 및 사용가이드를 제공하여 디자이너가 일관성 있는 브랜드 경험을 만들어 나갈 수 있도록 돕습니다. 디자이너는 목적성 있는 컬러 사용을 통해 유저와 서비스 간의 명확한 의사소통이 이루어질 수 있도록 해야 합니다.",
            },
            href: "/core/colors/youha-color-guide",
          },
          {
            titles: {
              nav: "Usage Guide",
              card: "Usage Guide",
              page: "Usage Guide",
            },
            descriptions: {
              card: "",
              page: "Usage Guide는 디자이너의 효율적인 작업을 돕기 위하여 제작되었습니다. 디자이너는 가이드가 제시하는 기준 이상의 가독성을 확보하는 경우 어떤 컬러도 자유롭게 구성하여 사용할 수 있습니다.",
            },
            href: "/core/colors/usage-guide",
          },
          {
            titles: {
              nav: "Text Legibility",
              card: "Text Legibility",
              page: "Text Legibility",
            },
            descriptions: {
              card: "",
              page: "우리는 Product를 제작할 때 항상 모든 사용자의 상황을 고려해야 합니다. Text Legibility Guide는 색맹, 저시력, 저속력 네트워크 등 개인의 능력이나 환경의 제약과 관계없이 모두가 동등하게 정보를 탐색하고 혜택을 누릴 수 있도록 기준을 제시합니다.",
            },
            href: "/core/colors/text-legibility",
          },
        ],
      },
      {
        thumbnails: {
          md: "/images/thumbnails/core-iconography-md.png",
          lg: "/images/thumbnails/core-iconography-lg.png",
        },
        titles: {
          nav: "Iconography",
          card: "Iconography",
          page: "Icon Guideline",
        },
        descriptions: {
          card: (
            <>
              YOUHA의 아이콘은 사용자에게 아이디어 및
              <br />
              오브젝트를 전달하는 가장 효율적인 도구입니다.
            </>
          ),
          page: (
            <>
              YOUHA의 아이콘은 사용자에게 아이디어 및 오브젝트를 전달하는 가장
              효율적인 도구입니다.
              <br />
              YOUHA 서비스에서 사용되는 아이콘의 적용 및 제작 가이드라인을
              확인할 수 있습니다.
            </>
          ),
        },
        href: "/core/iconography",
      },
      {
        thumbnails: {
          md: "/images/thumbnails/core-typography-md.png",
          lg: "/images/thumbnails/core-typography-lg.png",
        },
        titles: {
          nav: "Typography",
          card: "Typography",
          page: "Typography",
        },
        descriptions: {
          card: (
            <>
              YOUHA Typography는 모바일과 웹에서
              <br />
              각각 가장 가시성 높은 시스템을 제공합니다.
            </>
          ),
          page: "YOUHA Typography는 뷰포트별 폰트 사이징을 채택하여 디자인과 개발단의 효율적인 작업을 가능하게 합니다. 정의된 타입 스케일과 컬러를 고려하여 적용된 타이포그래피는 콘텐츠의 중요한 정도를 구분하고, 텍스트 전체의 밸런스를 맞추어 사용자의 프로덕트 경험을 향상시킵니다.",
        },
        href: "/core/typography",
      },
      {
        thumbnails: {
          md: "/images/thumbnails/core-layout-md.png",
          lg: "/images/thumbnails/core-layout-lg.png",
        },
        titles: {
          nav: "Layout",
          card: "Layout Updated",
          page: "Layout",
        },
        descriptions: {
          card: (
            <>
              스크린과 컴포넌트 사이의 마진을 정의합니다.
              <br />
              컴포넌트 내에서 사용되는 마진을 확인할 수 있도록
              업데이트되었습니다.
            </>
          ),
          page: "YOUHA 서비스에서 사용되는 모든 스크린과 컴포넌트 사이의 마진을 정의합니다.",
        },
        href: "/core/layout",
      },
    ],
  },
  {
    titles: {
      nav: "Components",
      card: "Components",
      page: "Components",
    },
    descriptions: {
      card: "",
      page: "Component는 각자의 기능을 가진 Element의 조합을 의미합니다. YOUHA의 Component Guidelines는 유관부서 간의 원활한 의사소통을 위해 명칭을 통일시키고 structure, usage, type, pattern에 대해 정의한 가이드라인입니다.",
    },
    href: "/components",
  },
  {
    titles: {
      nav: "Guidelines",
      card: "Guidelines",
      page: "UX Guidelines",
    },
    descriptions: {
      card: "",
      page: "UX Guidelines는 YOUHA 서비스의 고유의 일관성 있는 UX를 유지하기 위한 가이드라인입니다. 일반적 사용성 기준이 아닌 YOUHA 서비스의 특성과 YOUHA 서비스 사용 경험을 고려한 의미있는 UX 가이드라인을 제시합니다. 본 가이드라인은 각 프로젝트 담당자가 실질적으로 활용할 수 있도록 작성하였습니다. YOUHA에서 공통으로 사용되는 UX pattern을 정의하고, 상세한 use case 예시를 통해 각 화면 구성에 적합한 UX pattern의 type을 빠르게 선정할 수 있도록 도와줍니다.",
    },
    href: "/guidelines",
  },
];
