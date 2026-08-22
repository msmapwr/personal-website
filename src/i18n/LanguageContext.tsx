import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { content } from "../content";
import type { LocaleContent } from "../content/types";

const STORAGE_KEY = "msmapwr-language";

interface LanguageContextValue {
  lang: string;
  setLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "",
  setLang: () => {},
});

function detectInitial(languages: string[]): string {
  if (typeof window === "undefined") return languages[0];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && languages.includes(stored)) return stored;
  const nav = navigator.language?.split("-")[0];
  if (nav && languages.includes(nav)) return nav;
  return languages[0];
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const languages = content.languages.map((l) => l.id);
  const [lang, setLangState] = useState(() => detectInitial(languages));

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: string) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** 返回当前语言的内容快照 */
export function useT(): LocaleContent {
  const { lang } = useContext(LanguageContext);
  const fallback = content.languages[0]?.id;
  return content.locales[lang] ?? (fallback ? content.locales[fallback] : content.locales.zh);
}
