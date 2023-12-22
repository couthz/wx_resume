import { t } from "@lingui/macro";
import { ArrowRight } from "@phosphor-icons/react";
import { Badge, buttonVariants } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { defaultTiltProps } from "@/client/constants/parallax-tilt";

import { HeroCTA } from "./call-to-action";
import { Decoration } from "./decoration";

export const HeroSection = () => (
  <section id="hero" className="relative">
    <Decoration.Grid />
    <Decoration.Gradient />

    <div className="px-6 mx-auto lg:flex lg:h-screen lg:items-center lg:px-12">
      <motion.div
        className="max-w-3xl mx-auto mt-32 shrink-0 lg:mx-0 lg:mt-0 lg:max-w-xl lg:pt-8"
        viewport={{ once: true }}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        {/* <div className="items-center hidden gap-x-4 sm:flex">
          <Badge>{t`Version 4`}</Badge>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.rxresu.me/overview/features"
            className={cn(buttonVariants({ variant: "link" }), "space-x-2 text-left")}
          >
            <p>{t`What's new in the latest version`}</p>
            <ArrowRight />
          </a>
        </div> */}

        <div className="mt-10 space-y-2">
          {/* <h6 className="text-base font-bold tracking-wide">{t`Finally,`}</h6> */}
          <h3 className="text-2xl font-bold tracking-tight sm:text-2xl">
            {t`微行简历`}
          </h3>
        </div>

        <p className="mt-6 text-lg leading-8 prose prose-base prose-zinc dark:prose-invert">
          {t`轻松、高效管理个人简历`}
        </p>

        <div className="flex items-center mt-10 gap-x-8">
          <HeroCTA />
        </div>
      </motion.div>

      <div className="relative hidden ml-40 left-10 lg:block">
        <div>
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
              <img
                width={3600}
                height={2078}
                src="/screenshots/builder.jpg"
                alt="Reactive Resume - Screenshot - Builder Screen"
                className="rounded-lg shadow-2xl bg-background/5 ring-1 ring-foreground/10"
              />
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);
