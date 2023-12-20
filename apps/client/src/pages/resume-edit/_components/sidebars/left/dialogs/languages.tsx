import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultLanguage, languageSchema } from "@reactive-resume/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Slider,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SectionDialog } from "../sections/shared/section-dialog";

const formSchema = languageSchema;

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


export const LanguagesDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultLanguage,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="languages" form={form} defaultValues={defaultLanguage}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`语言名称`}</FormLabel>
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
              <FormLabel>{t`掌握水平`}</FormLabel>
              <FormControl className="py-2">
                <div className="flex items-center gap-x-4">
                  <Slider
                    {...field}
                    min={0}
                    max={4}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />

                    <span className="w-10">{t`${fieldValueSwitch(field.value)}`}</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
