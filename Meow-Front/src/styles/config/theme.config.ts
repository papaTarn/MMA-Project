import { ThemeConfig } from 'antd';

const themeVariables = {
  PrimaryColor: '#E10000',
  BlackColor: '#000000',
  WhiteColor: '#ffffff',
  Primary_50Color: '#FFF0F0',
  Primary_100Color: '#FFDDDD',
  Primary_200Color: '#FFC1C1',
  Primary_300Color: '#FF9595',
  Primary_400Color: '#FF5959',
  Primary_500Color: '#FF2626',
  Primary_600Color: '#FC0606',
  Primary_700_MainColor: '#E10000',
  Primary_800Color: '#AF0505',
  Primary_900Color: '#900C0C',
  Greyscale_0Color: '#ffffff',
  Greyscale_100Color: '#f9f9f9',
  Greyscale_200Color: '#f5f5f5',
  Greyscale_300Color: '#e7e7e7',
  Greyscale_400Color: '#b0b0b0',
  Greyscale_500Color: '#888888',
  Greyscale_600Color: '#5d5d5d',
  Greyscale_700Color: '#4f4f4f',
  Greyscale_800Color: '#212020',
  Greyscale_900Color: '#000000',
  Info_100Color: '#EAF9FE',
  Info_200Color: '#9BC9FA',
  Info_300Color: '#498FF0',
  Info_400Color: '#1B5BD1',
  Info_500Color: '#0A41AC',
  Success_100Color: '#F6FFED',
  Success_200Color: '#B7EB8F',
  Success_300Color: '#73CB39',
  Success_400Color: '#579B30',
  Success_500Color: '#275112',
  Warning_100Color: '#FFF7E8',
  Warning_200Color: '#F9D69A',
  Warning_300Color: '#F6A546',
  Warning_400Color: '#ED903A',
  Warning_500Color: '#D67223',
  Error_100Color: '#FDF1F0',
  Error_200Color: '#F3A7A1',
  Error_300_BaseColor: '#E33C39',
  Error_400Color: '#BF2E2C',
  Error_500Color: '#A82223',
  Volcano_100Color: '#FFF2E8',
  Volcano_300_BaseColor: '#FA541C',
  Volcano_500Color: '#D4380D',
  PolarGreen_100Color: '#F6FFED',
  PolarGreen_300_BaseColor: '#52C41A',
  PolarGreen_500Color: '#389E0D',
  Cyan_100Color: '#E6FFFB',
  Cyan_300_BaseColor: '#13C2C2',
  Cyan_500Color: '#08979C',
  Purple_100Color: '#F9F0FF',
  Purple_300_BaseColor: '#722ED1',
  Purple_500Color: '#531DAB',
  Magenta_100Color: '#FFF0F6',
  Magenta_300_BaseColor: '#EB2F96',
  Magenta_500Color: '#C41D7F',
  Table_100Color: '#EFF5FF',
  Table_200Color: '#9BC9FA',
  Table_300Color: '#BDD8FF',
  Table_400Color: '#90C0FF',
  Table_500Color: '#5C9EFE',

  FontSize: 14,
  FontSizeXS: 10,
  FontSizeSM: 12,
  FontSizeLG: 16,
  fontSizeHeading1: 48,
  fontSizeHeading2: 40,
  fontSizeHeading3: 32,
  fontSizeHeading4: 24,
  fontSizeHeading5: 20,
};

// https://ant.design/theme-editor
export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: themeVariables.PrimaryColor,
    colorPrimaryText: themeVariables.Greyscale_900Color,
    colorInfo: themeVariables.PrimaryColor,
    fontFamily: 'inherit',
  },
  components: {
    Menu: {
      dangerItemActiveBg: 'rgb(249,249,249)',
      dangerItemSelectedColor: 'rgb(225,0,0)',
      colorText: 'rgb(93,93,93)',
      dangerItemSelectedBg: 'rgb(249,249,249)',
      darkDangerItemActiveBg: 'rgb(249,249,249)',
    },
    Typography: {
      fontSize: themeVariables.FontSize,
      fontSizeSM: themeVariables.FontSizeXS,
      fontSizeLG: themeVariables.FontSizeSM,
      fontSizeXL: themeVariables.FontSizeLG,
      fontSizeHeading1: themeVariables.fontSizeHeading1,
      fontSizeHeading2: themeVariables.fontSizeHeading2,
      fontSizeHeading3: themeVariables.fontSizeHeading3,
      fontSizeHeading4: themeVariables.fontSizeHeading4,
      fontSizeHeading5: themeVariables.fontSizeHeading5,
      lineHeight: 1.5,
      lineHeightSM: 1.4,
      lineHeightHeading1: 1.5,
      lineHeightHeading2: 1.5,
      lineHeightHeading3: 1.5,
      lineHeightHeading4: 1.5,
      lineHeightHeading5: 1.5,
    },
    Input: {
      inputFontSize: themeVariables.FontSize,
      colorFillTertiary: themeVariables.Greyscale_0Color,
      lineHeight: 1.75,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      paddingInline: 12,
      paddingInlineSM: 12,
      paddingInlineLG: 12,
      fontSize: 14,
      colorText: themeVariables.Greyscale_900Color,
      colorTextPlaceholder: themeVariables.Greyscale_400Color,
    },
  },
};
