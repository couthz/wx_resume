import { Copyright } from "@phosphor-icons/react";
import { ScrollArea, Separator } from "@reactive-resume/ui";
import { useRef } from "react";
import { LayoutSection } from "./sections/layout";
import { TemplateSection } from "./sections/template";
import { ThemeSection } from "./sections/theme";
import { TypographySection } from "./sections/typography";


export const RightSidebar = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex bg-secondary-accent/30">
      <ScrollArea orientation="vertical" className="flex-1 h-screen pb-16 lg:pb-0">
        <div ref={containterRef} className="grid gap-y-6 p-6 @container/right">
          <TemplateSection />
          <Separator />
          <LayoutSection />
          <Separator />
          <TypographySection />
          <Separator />
          <ThemeSection />
          <Separator />
          <Copyright className="text-center" />
        </div>
      </ScrollArea>

      <div className="flex-col items-center justify-between hidden py-4 basis-12 bg-secondary-accent/30 sm:flex">
        <div />

        <div className="flex flex-col items-center justify-center gap-y-2">
          {/* <SectionIcon
            id="template"
            name={t`Template`}
            onClick={() => scrollIntoView("#template")}
          />
          <SectionIcon id="layout" name={t`Layout`} onClick={() => scrollIntoView("#layout")} />
          <SectionIcon
            id="typography"
            name={t`Typography`}
            onClick={() => scrollIntoView("#typography")}
          />
          <SectionIcon id="theme" name={t`Theme`} onClick={() => scrollIntoView("#theme")} />
          <SectionIcon id="page" name={t`Page`} onClick={() => scrollIntoView("#page")} />
          <SectionIcon id="sharing" name={t`Sharing`} onClick={() => scrollIntoView("#sharing")} />
          <SectionIcon
            id="statistics"
            name={t`Statistics`}
            onClick={() => scrollIntoView("#statistics")}
          />
          <SectionIcon id="export" name={t`Export`} onClick={() => scrollIntoView("#export")} />
          <SectionIcon id="notes" name={t`Notes`} onClick={() => scrollIntoView("#notes")} />
          <SectionIcon
            id="information"
            name={t`Information`}
            onClick={() => scrollIntoView("#information")}
          /> */}
        </div>

        {/* <ThemeSwitch size={14} /> */}
      </div>
    </div>
  );
};
