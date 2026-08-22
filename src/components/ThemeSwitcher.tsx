import {
  Menu,
  MenuButton,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import {
  Desktop20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import { ThemeMode } from "../hooks/useThemeMode";
import { useT } from "../i18n/LanguageContext";

interface ThemeSwitcherProps {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}

const GROUP = "theme-mode";

const currentIcon = {
  system: <Desktop20Regular />,
  light: <WeatherSunny20Regular />,
  dark: <WeatherMoon20Regular />,
} as const;

export function ThemeSwitcher({ mode, onModeChange }: ThemeSwitcherProps) {
  const { ui } = useT();
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton icon={currentIcon[mode]} aria-label={ui.switchTheme} />
      </MenuTrigger>
      <MenuPopover>
        <MenuList
          checkedValues={{ [GROUP]: [mode] }}
          onCheckedValueChange={(_, data) => {
            const next = data.checkedItems[0];
            if (next === "system" || next === "light" || next === "dark") {
              onModeChange(next);
            }
          }}
        >
          <MenuItemRadio name={GROUP} value="system">
            跟随系统
          </MenuItemRadio>
          <MenuItemRadio name={GROUP} value="light">
            浅色
          </MenuItemRadio>
          <MenuItemRadio name={GROUP} value="dark">
            深色
          </MenuItemRadio>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
