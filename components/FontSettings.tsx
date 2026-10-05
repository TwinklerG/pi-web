"use client";

import { useI18n } from "@/hooks/useI18n";
import { useFontPreferences } from "@/hooks/useFontPreferences";
import { FONT_FAMILY_MAX_LENGTH, FONT_WEIGHT_DEFAULT, FONT_WEIGHT_OPTIONS } from "@/lib/font-preferences";
import { ConfigButton, ConfigField } from "./SettingsUi";

const FONT_FIELDS = [
  { kind: "ui", label: "settings.uiFontFamily", placeholder: "settings.uiFontPlaceholder", reset: "settings.resetUiFont", weightLabel: "settings.uiFontWeight" },
  { kind: "mono", label: "settings.monoFontFamily", placeholder: "settings.monoFontPlaceholder", reset: "settings.resetMonoFont", weightLabel: "settings.monoFontWeight" },
] as const;

export function FontSettings() {
  const { t } = useI18n();
  const fonts = useFontPreferences();

  return (
    <div className="settings-font-options">
      <p id="settings-font-description" className="settings-general-description">{t("settings.fontDescription")}</p>
      {FONT_FIELDS.map(({ kind, label, placeholder, reset, weightLabel }) => (
        <ConfigField key={kind} label={
          <span className="settings-font-label">
            <label htmlFor={`settings-font-${kind}`}>{t(label)}</label>
            <ConfigButton
              variant="ghost"
              size="small"
              className="settings-chat-reset"
              title={t(reset)}
              aria-label={t(reset)}
              disabled={!fonts[kind] && fonts[`${kind}Weight`] === FONT_WEIGHT_DEFAULT}
              onClick={() => fonts.resetFontPreference(kind)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5" />
              </svg>
            </ConfigButton>
          </span>
        }>
          <input
            id={`settings-font-${kind}`}
            className="settings-font-input"
            type="text"
            value={fonts[kind]}
            placeholder={t(placeholder)}
            maxLength={FONT_FAMILY_MAX_LENGTH}
            aria-describedby="settings-font-description"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            onChange={(event) => fonts.setFontPreference(kind, event.target.value)}
          />
          <div className="settings-font-weight-row">
            <label htmlFor={`settings-font-${kind}-weight`}>{t(weightLabel)}</label>
            <select
              id={`settings-font-${kind}-weight`}
              className="settings-font-input settings-font-weight-select"
              value={fonts[`${kind}Weight`]}
              aria-describedby="settings-font-weight-description"
              onChange={(event) => fonts.setFontWeight(kind, Number(event.target.value))}
            >
              {FONT_WEIGHT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{t(option.label)} ({option.value})</option>
              ))}
            </select>
          </div>
          <span className={`settings-font-preview${kind === "mono" ? " is-mono" : ""}`}>
            {t("settings.fontPreview")}
          </span>
        </ConfigField>
      ))}
      <p id="settings-font-weight-description" className="settings-general-description">{t("settings.fontWeightDescription")}</p>
    </div>
  );
}
