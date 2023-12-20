import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { ArrowRight } from "@phosphor-icons/react";
import { loginSchema } from "@reactive-resume/dto";
import { usePasswordToggle } from "@reactive-resume/hooks";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { useLogin } from "@/client/services/auth";
import { useAuthProviders } from "@/client/services/auth/providers";

type FormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { login, loading } = useLogin();

  const { providers } = useAuthProviders();
  const emailAuthDisabled = !providers || !providers.includes("email");

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
    } catch (error) {
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>
          {t`登录`} - {t`微行简历`}
        </title>
      </Helmet>

      <div className="space-y-1.5">
        <h6 className={cn(emailAuthDisabled && "hidden")}>
          <span className="opacity-75">{t`还没有账户?`}</span>
          <Button asChild variant="link" className="px-1.5">
            <Link to="/auth/register">
              {t({ message: "去注册", context: "This is a link to create a new account" })}{" "}
              <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </h6>
      </div>

      <div className={cn(emailAuthDisabled && "hidden")}>
        <Form {...form}>
          <form
            ref={formRef}
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`邮箱 或 用户名`}</FormLabel>
                  <FormControl>
                    <Input placeholder="chris.zhc@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`密码`}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center mt-4 gap-x-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {t`登录`}
              </Button>

              <Button asChild variant="link" className="px-4">
                <Link to="/auth/forgot-password">{t`忘记密码?`}</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
