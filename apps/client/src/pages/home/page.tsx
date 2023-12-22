import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";

import { HeroSection } from "./sections/hero";

export const HomePage = () => {
  const { i18n } = useLingui();

  return (
    <main className="relative isolate bg-background">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />

        <title>
          {t`微行简历`}
        </title>

        <meta
          name="description"
          content="轻松、高效管理个人简历"
        />
      </Helmet>

      <HeroSection />

    </main>
  );
};
