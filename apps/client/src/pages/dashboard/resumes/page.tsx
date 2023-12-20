import { t } from "@lingui/macro";
import { List, SquaresFour } from "@phosphor-icons/react";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { GridView } from "./_layouts/grid";
import { ListView } from "./_layouts/list";

type Layout = "grid" | "list";

export const ResumesPage = () => {
  const [layout, setLayout] = useState<Layout>("grid");

  return (
    <>
      <Helmet>
        <title>
          {t`我的简历`} - {t`微行简历`}
        </title>
      </Helmet>

      <Tabs
        value={layout}
        onValueChange={(value) => setLayout(value as Layout)}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            {t`我的简历`}
          </motion.h1>

          <TabsList>
            <TabsTrigger value="grid" className="w-8 h-8 p-0 sm:h-8 sm:w-auto sm:px-4">
              <SquaresFour />
              <span className="hidden ml-2 sm:block">{t`网格视图`}</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="w-8 h-8 p-0 sm:h-8 sm:w-auto sm:px-4">
              <List />
              <span className="hidden ml-2 sm:block">{t`列表视图`}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
          <TabsContent value="grid">
            <GridView />
          </TabsContent>
          <TabsContent value="list">
            <ListView />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </>
  );
};
