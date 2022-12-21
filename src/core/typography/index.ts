export type TypographyVariantProps =
    | "heading-1"
    | "heading-2"
    | "heading-3"
    | "heading-4"
    | "subtitle-1"
    | "subtitle-2"
    | "body-1"
    | "body-2"
    | "body-3"
    | "body-4"
    | "caption-1"
    | "caption-2"
export type FontStyleProps = {
    fontSize: number;
    lineHeight?: string;
    fontWeight?: string;
    letterSpacing?: string;
}
export const fontStyles: {
    [key: string]: FontStyleProps
} = {
    "heading-1": {
        fontSize: 60,
        lineHeight: '84px',
        fontWeight: '700',
        letterSpacing: '-1px !important'
    },
    "heading-2": {
        fontSize: 48,
        lineHeight: '60px',
        fontWeight: '700'
    },
    "heading-3": {
        fontSize: 32,
        lineHeight: '44px',
        fontWeight: '700'
    },
    "heading-4": {
        fontSize: 24,
        lineHeight: '34px',
        fontWeight: '700'
    },
    "subtitle-1": {
        fontSize: 20,
        lineHeight: '28px',
        fontWeight: '700'
    },
    "subtitle-2": {
        fontSize: 18,
        lineHeight: '24px',
        fontWeight: '700'
    },
    "body-1": {
        fontSize: 18,
        lineHeight: '28px',
        fontWeight: '400'
    },
    "body-2": {
        fontSize: 16,
        lineHeight: '24px',
        fontWeight: '400'
    },
    "body-3": {
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: '400'
    },
    "body-4": {
        fontSize: 12,
        lineHeight: '16px',
        fontWeight: '400'
    },
    "caption-1": {
        fontSize: 11,
        lineHeight: '16px',
        fontWeight: '400'
    },
    "caption-2": {
        fontSize: 9,
        lineHeight: '12px',
        fontWeight: '400'
    },
};