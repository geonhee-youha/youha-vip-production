import { atom } from "recoil";
import { AgeProps, FilterProps, SexProps } from "../constants";
import { v1 } from "uuid";
import { CampaignProps } from "../datas";
export type DrawerProps = {
  queryName?: string;
  open: boolean;
};
export const searchDrawerState = atom<DrawerProps>({
  key: `searchDrawerState/${v1()}`,
  default: {
    open: false,
  },
});
export const alarmDrawerState = atom<DrawerProps>({
  key: `alarmDrawerState/${v1()}`,
  default: {
    queryName: `alarmDrawer`,
    open: false,
  },
});
export const campaignDrawerDefaultProps = {
  queryName: `campaignDrawer`,
  open: false,
  selectedCampaignIds: [],
};
export const campaignDrawerState = atom<
  DrawerProps & { selectedCampaignIds: any[] }
>({
  key: `campaignDrawerState/${v1()}`,
  default: campaignDrawerDefaultProps,
});
export const creatorDrawerDefaultProps = {
  queryName: `creatorDrawer`,
  open: false,
  selectedCreatorIds: [],
  selectedPlanIds: [],
  pass: false,
};
export const creatorDrawerState = atom<
  DrawerProps & {
    selectedCreatorIds: any[];
    selectedPlanIds: any[];
    pass: boolean;
  }
>({
  key: `creatorDrawerState/${v1()}`,
  default: creatorDrawerDefaultProps,
});
export type EstimateInputProps = {
  budget: string;
  duration: string;
  purposies: FilterProps[];
  medias: FilterProps[];
  categories: FilterProps[];
  channelCount: string;
  keyword: string;
  sellingPoint: string;
  description: string;
  request: string;
  file: any;
  ages: FilterProps[];
  sex?: FilterProps;
};
export const estimateInputDefaultProps = {
  budget: "",
  duration: "",
  purposies: [],
  medias: [],
  categories: [],
  channelCount: "",
  keyword: "",
  sellingPoint: "",
  description: "",
  request: "",
  file: "",
  ages: [],
  sex: undefined,
};
export const estimateDrawerDefaultProps = {
  queryName: `estimateDrawer`,
  open: false,
  input: estimateInputDefaultProps,
  mix: undefined,
};
export const estimateDrawerState = atom<DrawerProps & { input: EstimateInputProps, mix?: boolean }>({
  key: `estimateDrawerState/${v1()}`,
  default: estimateDrawerDefaultProps,
});
export type PopupProps = DrawerProps & {
  title?: string;
  body?: string;
  lottie?: string;
  cancel?: {
    hide?: boolean;
    title?: string;
    onClick?: any;
  };
  confirm?: {
    hide?: boolean;
    title?: string;
    onClick?: any;
  };
};
export const alertDialogState = atom<PopupProps>({
  key: `alertDialogState/${v1()}`,
  default: {
    queryName: "alertDialog",
    open: false,
  },
});
export const campaignDialogState = atom<PopupProps & { id?: any }>({
  key: `campaignDialogState/${v1()}`,
  default: {
    queryName: "campaignDialog",
    open: false,
  },
});

export type EstimateConfirmDialogProps = PopupProps & {
  temp?: boolean;
  campaign?: CampaignProps;
  creators?: any[];
  input: EstimateInputProps;
  mix?: boolean;
}
export const estimateConfirmDialogDefaultProps = {
  queryName: "estimateConfirmDialog",
  open: false,
  temp: undefined,
  campaign: undefined,
  creators: undefined,
  input: estimateInputDefaultProps,
  mix: undefined,
}
export const estimateConfirmDialogState = atom<
  EstimateConfirmDialogProps
>({
  key: `estimateConfirmDialogState/${v1()}`,
  default: estimateConfirmDialogDefaultProps
});
export const adDialogState = atom<PopupProps & {
  id?: any
}>({
  key: `adDialogState/${v1()}`,
  default: {
    queryName: "adDialog",
    open: false,
  },
});
export const estimateInputDialogState = atom<PopupProps & { mix?: boolean }>({
  key: `estimateInputDialogState/${v1()}`,
  default: {
    queryName: "estimateInputDialog",
    open: false,
  },
});
export const campaignPopupState = atom<
  DrawerProps & { mode?: string; id?: any }
>({
  key: `campaignPopupState/${v1()}`,
  default: {
    queryName: "campaignPopup",
    open: false,
  },
});
export const creatorPopupState = atom<DrawerProps>({
  key: `creatorPopupState/${v1()}`,
  default: {
    queryName: "creatorPopup",
    open: false,
  },
});
//
//
//
//
//공통
export type DialogProps = {
  queryName: string;
  id: any;
  open: boolean;
  index?: number;
}
export const dialogDefaultProps = {
  queryName: "",
  id: '',
  open: false,
  index: 0,
}
//광고세트 다이얼로그
export type AdSetDialogProps = DialogProps
export const adSetDialogDefaultProps = {
  ...dialogDefaultProps,
  queryName: "playlistDialog",
}
export const adSetDialogState = atom<AdSetDialogProps>({
  key: `adSetDialogState/${v1()}`,
  default: adSetDialogDefaultProps
});
//크리에이터 다이얼로그
export type CreatorDialogProps = DialogProps & {
  checkMode?: boolean;
  forceCheck?: boolean;
}
export const creatorDialogDefaultProps = {
  ...dialogDefaultProps,
  queryName: "creatorDialog",
}
export const creatorDialogState = atom<
  CreatorDialogProps
>({
  key: `creatorDialogState/${v1()}`,
  default: creatorDialogDefaultProps
});
//기획안 다이얼로그
export type PlaylistDialogProps = DialogProps & {
  checkMode?: boolean;
  forceCheck?: boolean;
}
export const playlistDialogDefaultProps = {
  ...dialogDefaultProps,
  queryName: "playlistDialog",
}
export const playlistDialogState = atom<
  PlaylistDialogProps
>({
  key: `playlistDialogState/${v1()}`,
  default: playlistDialogDefaultProps
});
//견적서 다이얼로그
export type EstimateDialogProps = DialogProps
export const estimateDialogDefaultProps = {
  ...dialogDefaultProps,
  queryName: "creatorDialog",
}
export const estimateDialogState = atom<
  EstimateDialogProps
>({
  key: `creatorDialogState/${v1()}`,
  default: estimateDialogDefaultProps
});