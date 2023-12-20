import { t } from "@lingui/macro";
import { AspectRatio } from "@reactive-resume/ui";
import { cn, templatesList } from "@reactive-resume/utils";
import { motion } from "framer-motion";

import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "../shared/section-icon";

export const TemplateSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const currentTemplate = useResumeStore((state) => state.resume.data.metadata.template);

  return (
    <section id="template" className="grid gap-y-6">

      <main className="grid grid-cols-2 gap-5 @lg/right:grid-cols-3 @2xl/right:grid-cols-4">
        {templatesList.map((template, index) => (
          <AspectRatio key={template} ratio={1 / 1.4142}>
            <div
              onClick={() => setValue("metadata.template", template)}
              className={cn(
                "relative cursor-pointer rounded-sm ring-primary transition-all hover:ring-1",
                currentTemplate === template && "ring-2",
              )}
            >
              <img src={`/templates/jpg/${template}.jpg`} alt={template} className="rounded-sm" />

              <div className="absolute inset-x-0 bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-background/80">
                <p className="absolute inset-x-0 font-bold text-center capitalize bottom-2 text-primary">
                  {template}
                </p>
              </div>
            </div>
          </AspectRatio>
        ))}
      </main>
    </section>
  );
};
