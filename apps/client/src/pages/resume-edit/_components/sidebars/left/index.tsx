import { Fragment, useRef } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Separator,
  Switch,
} from "@reactive-resume/ui";
import { BasicsSection } from "./sections/basics";
import { SectionBase } from "./sections/shared/section-base";
import {
  Award,
  Certification,
  CustomSection,
  Education,
  Experience,
  Interest,
  Language,
  Project,
  Skill,
} from "@reactive-resume/schema";
import { SummarySection } from "./sections/summary";
import { t } from "@lingui/macro";
import { SectionIcon, getSectionIcon } from "./sections/shared/section-icon";
import { useResumeStore } from "@/client/stores/resume";
import { TemplateSection } from "../right/sections/template";
import { LayoutSection } from "../right/sections/layout";
import { Plus, PlusCircle } from "@phosphor-icons/react";

export const LeftSidebar = () => {
  //用于实现滚动,见scrollIntoView函数
  const containterRef = useRef<HTMLDivElement | null>(null);
  const addSection = useResumeStore((state) => state.addSection);
  const customSections = useResumeStore((state) => state.resume.data.sections.custom);


  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex">
      <div
        className="flex-col items-center justify-between hidden py-4 basis-12 sm:flex"
        style={{ backgroundColor: "black" }}
      >
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="w-20 h-8 rounded-full"
                style={{ color: "white" }}
              >
                {getSectionIcon("diamondsFour", { size: 14 })}
                <div className="mx-1">{t`更换模版`}</div>
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-96">
              <ScrollArea orientation="vertical" className="flex-1 h-screen pb-10 pl-1 pr-1">
                <div className="px-1">
                  <TemplateSection />
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="w-20 h-8 rounded-full"
                style={{ color: "white" }}
              >
                {getSectionIcon("layout", { size: 14 })}
                <div className="mx-1">{t`模块布局`}</div>
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-96">
              <ScrollArea orientation="vertical" className="flex-1 h-screen pb-10 pl-1 pr-1">
                <div className="px-1">
                  <LayoutSection />
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>

        <Separator />
        <div style={{ color: "grey" }}>简历编辑</div>
        <SectionIcon
          id="basics"
          onClick={() => scrollIntoView("#basics")}
          name={t({
            message: "个人信息",
            context:
              "The basics section of a resume consists of User's Picture, Full Name, Location etc.",
          })}
        />
        <SectionIcon id="experience" onClick={() => scrollIntoView("#experience")} />
        <SectionIcon id="education" onClick={() => scrollIntoView("#education")} />
        <SectionIcon id="projects" onClick={() => scrollIntoView("#projects")} />
        <SectionIcon id="summary" onClick={() => scrollIntoView("#summary")} />
        <SectionIcon id="skills" onClick={() => scrollIntoView("#skills")} />
        <SectionIcon id="languages" onClick={() => scrollIntoView("#languages")} />
        <SectionIcon id="certifications" onClick={() => scrollIntoView("#certifications")} />
        <SectionIcon id="awards" onClick={() => scrollIntoView("#awards")} />
        <SectionIcon id="interests" onClick={() => scrollIntoView("#interests")} />

        <SectionIcon
            id="custom"
            variant="outline"
            icon={<Plus size={14} />}
            onClick={() => {
              addSection();
              // eslint-disable-next-line lingui/no-unlocalized-strings
              scrollIntoView("& > section:last-of-type");
            }}
          />
      </div>

      <ScrollArea orientation="vertical" className="flex-1 h-screen pb-16 lg:pb-0">
        <div
          ref={containterRef}
          style={{ backgroundColor: "white" }}
          className="grid gap-y-6 p-6 @container/left"
        >
          <BasicsSection />
          <Separator />
          <SectionBase<Experience>
            id="experience"
            title={(item) => item.company}
            description={(item) => item.position}
          />
          <Separator />
          <SectionBase<Education>
            id="education"
            title={(item) => item.institution}
            description={(item) => item.area}
          />
          <Separator />
          <SectionBase<Project>
            id="projects"
            title={(item) => item.name}
            description={(item) => item.description}
          />
          <Separator />
          <SummarySection />
          <Separator />
          <SectionBase<Skill>
            id="skills"
            title={(item) => item.name}
            description={(item) => {
              if (item.description) return item.description;
              if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
            }}
          />
          <Separator />
          <SectionBase<Language>
            id="languages"
            title={(item) => item.name}
            description={(item) => item.description}
          />
          <Separator />
          <SectionBase<Certification>
            id="certifications"
            title={(item) => item.name}
            description={(item) => item.issuer}
          />
          <Separator />
          <SectionBase<Award>
            id="awards"
            title={(item) => item.title}
            description={(item) => item.awarder}
          />
          <Separator />

          <SectionBase<Interest>
            id="interests"
            title={(item) => item.name}
            description={(item) => {
              if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
            }}
          />
          <Separator />
          {/* Custom Sections */}
          {Object.values(customSections).map((section) => (
            <Fragment key={section.id}>
              <Separator />

              <SectionBase<CustomSection>
                id={`custom.${section.id}`}
                title={(item) => item.name}
                description={(item) => item.description}
              />
            </Fragment>
          ))}

          <Separator />

          <Button size="lg" variant="outline" onClick={addSection}>
            <PlusCircle />
            <span className="ml-2">{t`添加自定义模块`}</span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};
