import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { X } from "@phosphor-icons/react";
import { defaultSkill, skillSchema } from "@reactive-resume/schema";
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
  Slider,
} from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SectionDialog } from "../sections/shared/section-dialog";

const formSchema = skillSchema;

type FormValues = z.infer<typeof formSchema>;

const fieldValueSwitch = (value: number) => {
  switch (value) {
    case 0:
      return `隐藏`;
      break;
    case 1:
      return `一般`;
      break;
    case 2:
      return `良好`;
      break;
    case 3:
      return `熟练`;
      break;
    case 4:
      return `精通`;
      break;
    default:
      return `隐藏`;
      break;
  }

};

export const SkillsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultSkill,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="skills" form={form} defaultValues={defaultSkill}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`技能名称`}</FormLabel>
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
              <FormLabel>{t`相关描述`}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t`相关证书、奖项等`}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="level"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`掌握程度`}</FormLabel>
              <FormControl className="py-2">
                <div className="flex items-center gap-x-4">
                  <Slider
                    {...field}
                    min={0}
                    max={4}
                    value={[field.value]}
                    orientation="horizontal"
                    onValueChange={(value) => field.onChange(value[0])}
                  />

                  <span className="w-10">{t`${fieldValueSwitch(field.value)}`}</span>


                </div>
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
                <FormLabel>{t`技能名称`}</FormLabel>
                <FormControl>
                  <BadgeInput {...field} />
                </FormControl>
                <FormDescription>
                  {t`可输入多个技能名称, 按","或回车键保存技能名称.`}
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
