"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { CheckIcon, LanguagesIcon } from "lucide-react";

import { setAdminLocale } from "@/app/(admin)/admin/locale-action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ADMIN_LOCALES, HTML_LANG, LOCALE_NAME } from "./i18n";
import { useAdminI18n } from "./i18n-provider";

export function LanguageSwitcher({ align = "end" }: { align?: "start" | "end" }) {
  const { locale, t } = useAdminI18n();
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="sm" disabled={pending} aria-label={`${t.nav.language}: ${LOCALE_NAME[locale]}`} />}
      >
        <LanguagesIcon />
        <span className="hidden sm:inline" lang={HTML_LANG[locale]}>
          {LOCALE_NAME[locale]}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} sideOffset={6} className="min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">{t.nav.language}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {ADMIN_LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            lang={HTML_LANG[l]}
            onClick={() => {
              if (l === locale) return;
              start(async () => {
                await setAdminLocale(l);
                router.refresh();
              });
            }}
          >
            {LOCALE_NAME[l]}
            {l === locale && <CheckIcon className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
