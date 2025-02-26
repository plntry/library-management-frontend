import { colors } from "./colors";
import type { ComponentsToken } from "antd/es/theme/context";

const { colorPrimary, bgWhite } = colors;

export const components: ComponentsToken = {
  Layout: {
    headerBg: bgWhite,
    siderBg: bgWhite,
  },
  Menu: {
    itemColor: colorPrimary,
    itemSelectedColor: bgWhite,
    itemHoverBg: colorPrimary,
    itemSelectedBg: colorPrimary,
    colorBgContainer: bgWhite,
    itemHoverColor: bgWhite,
  },
};
