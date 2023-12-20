import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { X } from "@phosphor-icons/react";
import { defaultProject, projectSchema } from "@reactive-resume/schema";
import {
  Badge,
  BadgeInput,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RichInput,
} from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { AiActions } from "@/client/components/ai-actions";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = projectSchema;

type FormValues = z.infer<typeof formSchema>;

export const ProjectsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultProject,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="projects" form={form} defaultValues={defaultProject}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`项目名称`}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`项目简述`}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`项目时间`}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t`2023.3 - 至今`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t``}</FormLabel>
              <FormControl>
                <URLInput {...field} placeholder="https://rxresu.me" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          name="summary"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`详细描述`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  content={field.value}
                  onChange={(value) => field.onChange(value)}
                  // footer={(editor) => (
                  //   <AiActions value={editor.getText()} onChange={editor.commands.setContent} />
                  // )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          name="keywords"
          control={form.control}
          render={({ field }) => (
            <div className="space-y-3 sm:col-span-2">
              <FormItem>
                <FormLabel>{t`关键词`}</FormLabel>
                <FormControl>
                  <BadgeInput {...field} />
                </FormControl>
                <FormDescription>
                  {t`可按","或回车键保存关键词`}
                </FormDescription>
                <FormMessage />
              </FormItem>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                <AnimatePresence>
                  {field.value.map((item, index) => (
                    <motion.div
                      layout
                      key={item}
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <Badge
                        className="cursor-pointer"
                        onClick={() => {
                          field.onChange(field.value.filter((v) => item !== v));
                        }}
                      >
                        <span className="mr-1">{item}</span>
                        <X size={12} weight="bold" />
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        /> */}
      </div>
    </SectionDialog>
  );
};
