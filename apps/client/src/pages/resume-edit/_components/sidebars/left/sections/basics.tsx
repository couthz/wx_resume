import { t } from "@lingui/macro";
import { basicsSchema } from "@reactive-resume/schema";
import { Input, Label } from "@reactive-resume/ui";
import { getSectionIcon } from "./shared/section-icon";
import { PictureSection } from "./picture/section";
import { useResumeStore } from "@/client/stores/resume";
import { CustomFieldsSection } from "./custom/section";

export const BasicsSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const basics = useResumeStore((state) => state.resume.data.basics);

  return (
    <section id="basics" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("basics")}
          <h2 className="text-2xl font-bold line-clamp-1">{t`个人信息`}</h2>
        </div>
      </header>

      <main className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <PictureSection />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="basics.name">{t`姓名`}</Label>
          <Input
            id="basics.name"
            value={basics.name}
            hasError={!basicsSchema.pick({ name: true }).safeParse({ name: basics.name }).success}
            onChange={(event) => setValue("basics.name", event.target.value)}
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="basics.headline">{t`个性签名`}</Label>
          <Input
            id="basics.headline"
            value={basics.headline}
            onChange={(event) => setValue("basics.headline", event.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.email">{t`邮箱`}</Label>
          <Input
            id="basics.email"
            placeholder="zhc@example.com"
            value={basics.email}
            hasError={
              !basicsSchema.pick({ email: true }).safeParse({ email: basics.email }).success
            }
            onChange={(event) => setValue("basics.email", event.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.phone">{t`联系方式`}</Label>
          <Input
            id="basics.phone"
            placeholder="13000000000"
            value={basics.phone}
            onChange={(event) => setValue("basics.phone", event.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.location">{t`所在城市`}</Label>
          <Input
            id="basics.location"
            value={basics.location}
            onChange={(event) => setValue("basics.location", event.target.value)}
          />
        </div>

        <CustomFieldsSection className="sm:col-span-2" />
      </main>
    </section>
  );
};
