import {
  Menu,
  MenuButton,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { Globe20Regular } from "@fluentui/react-icons";
import { content } from "../content";
import { useLanguage } from "../i18n/LanguageContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const current = content.languages.find((l) => l.id === lang);

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton icon={<Globe20Regular />} aria-label="切换语言">
          {current?.label ?? lang}
        </MenuButton>
      </MenuTrigger>
      <MenuPopover>
        <MenuList
          checkedValues={{ lang: [lang] }}
          onCheckedValueChange={(_, data) => {
            const next = data.checkedItems[0];
            if (next) setLang(next);
          }}
        >
          {content.languages.map((l) => (
            <MenuItemRadio key={l.id} name="lang" value={l.id}>
              {l.label}
            </MenuItemRadio>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
