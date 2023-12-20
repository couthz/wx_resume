/* eslint-disable lingui/no-unlocalized-strings */

import { t } from "@lingui/macro";
import { Button, Combobox, ComboboxOption, Label, Slider, Switch } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { fonts } from "@reactive-resume/utils";
import { useCallback, useEffect, useState } from "react";
import webfontloader from "webfontloader";

import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "../shared/section-icon";

export const TypographySection = () => {


  const setValue = useResumeStore((state) => state.setValue);
  const typography = useResumeStore((state) => state.resume.data.metadata.typography);
  const page = useResumeStore((state) => state.resume.data.metadata.page);


  const loadFontSuggestions = useCallback(async () => {
    fonts.forEach((font) => {
      const fontFamily  = font.family;
      webfontloader.load({
        events: false,
        classes: false,
        //google: { families: [font], text: font },
        custom: {
          families: [fontFamily],
          urls: ["../styles/fonts/_fonts_local.css"],
        },
      });
    });
  }, [fonts]);

  useEffect(() => {
    loadFontSuggestions();
  }, []);

  return (
    <section id="typography" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("typography")}
          <h2 className="text-2xl font-bold line-clamp-1">{t`页面格式`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        <div className="grid-cols-2">
          <Label>{t`字体`}</Label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {fonts.map((font) => (
            <Button
              key={font.family}
              variant="outline"
              style={{ fontFamily: font.family }}
              disabled={typography.font.family === font.family}
              onClick={() => {
                setValue("metadata.typography.font.family", font.family);
                setValue("metadata.typography.font.subset", "");
                setValue("metadata.typography.font.variants", ["400"]);
              }}
              className={cn(
                "flex h-8 items-center justify-center overflow-hidden rounded border text-center text-sm ring-primary transition-colors hover:bg-secondary-accent focus:outline-none focus:ring-1 disabled:opacity-100",
                typography.font.family === font.family && "ring-1",
              )}
            >
              {font.alias}
            </Button>
          ))}
        </div>

        <div className="space-y-1.5">
          <Label>{t`字体大小`}</Label>
          <div className="flex items-center py-1 gap-x-4">
            <Slider
              min={12}
              max={18}
              step={0.05}
              value={[typography.font.size]}
              onValueChange={(value) => {
                setValue("metadata.typography.font.size", value[0]);
              }}
            />

            <span className="text-base font-bold">{typography.font.size}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>{t`行间距`}</Label>
          <div className="flex items-center py-1 gap-x-4">
            <Slider
              min={0}
              max={3}
              step={0.05}
              value={[typography.lineHeight]}
              onValueChange={(value) => {
                setValue("metadata.typography.lineHeight", value[0]);
              }}
            />

            <span className="text-base font-bold">{typography.lineHeight}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>{t`页边距`}</Label>
          <div className="flex items-center py-1 gap-x-4">
            <Slider
              min={0}
              max={48}
              step={2}
              value={[page.margin]}
              onValueChange={(value) => {
                setValue("metadata.page.margin", value[0]);
              }}
            />
            <span className="text-base font-bold">{page.margin}</span>
          </div>
        </div>


        <div className="space-y-1.5">
          <Label>{t`选项`}</Label>

          <div className="flex items-center py-2 gap-x-4">
            <Switch
              id="metadata.typography.hideIcons"
              checked={typography.hideIcons}
              onCheckedChange={(checked) => {
                setValue("metadata.typography.hideIcons", checked);
              }}
            />
            <Label htmlFor="metadata.typography.hideIcons">{t`隐藏图标`}</Label>
          </div>

          <div className="flex items-center py-2 gap-x-4">
            <Switch
              id="metadata.typography.underlineLinks"
              checked={typography.underlineLinks}
              onCheckedChange={(checked) => {
                setValue("metadata.typography.underlineLinks", checked);
              }}
            />
            <Label htmlFor="metadata.typography.underlineLinks">{t`链接添加下划线`}</Label>
          </div>
        </div>
      </main>
    </section>
  );
};
