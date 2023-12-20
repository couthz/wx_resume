import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { ArrowLeft } from "@phosphor-icons/react";
import { forgotPasswordSchema } from "@reactive-resume/dto";
import {
  Alert,
  AlertDescription,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useForgotPassword } from "@/client/services/auth";

type FormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { forgotPassword, loading } = useForgotPassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormValues) => {
    await forgotPassword(data);

    setSubmitted(true);
    form.reset();
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        <Helmet>
          <title>
            {t`邮件已发送!`} - {t`微行简历`}
          </title>
        </Helmet>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">{t`邮件已发送`}</h2>
          <Alert variant="success">
            <AlertDescription className="pt-0">
              {t`密码重置链接已发送到您的邮箱.`}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`忘记密码?`}</h2>
        <h6 className="leading-relaxed opacity-75">
          {t`请输入邮箱地址, 我们将给您的邮箱发送重置密码链接.`}
        </h6>
      </div>

      <div>
        <Form {...form}>
          <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`邮箱`}</FormLabel>
                  <FormControl>
                    <Input placeholder="chris.zhc@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center mt-4 gap-x-2">
              <Button variant="link" className="px-5" onClick={() => navigate(-1)}>
                <ArrowLeft size={14} className="mr-2" />
                <span>{t`返回`}</span>
              </Button>

              <Button type="submit" disabled={loading} className="w-full">
                {t`发送邮件`}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
