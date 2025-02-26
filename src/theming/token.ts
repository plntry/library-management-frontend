import { AliasToken } from "antd/es/theme/internal";
import { colors } from "./colors";
const { colorPrimary, bgWhite } = colors;

export const token: Partial<AliasToken> = {
  colorPrimary: colorPrimary,
  colorBgBase: bgWhite,
  colorWhite: bgWhite,
  colorIcon: colorPrimary,
  colorLink: colorPrimary,
};
