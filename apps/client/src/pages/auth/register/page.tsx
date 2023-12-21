import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { ArrowRight } from "@phosphor-icons/react";
import { registerSchema } from "@reactive-resume/dto";
import { usePasswordToggle } from "@reactive-resume/hooks";
import {
  Alert,
  AlertTitle,
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
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useRegister } from "@/client/services/auth";
import { useAuthProviders } from "@/client/services/auth/providers";

type FormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useRegister();
  const disableSignups = import.meta.env.VITE_DISABLE_SIGNUPS === "true";

  const { providers } = useAuthProviders();
  const emailAuthDisabled = !providers || !providers.includes("email");

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      locale: "zh-CN",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await register(data);

      navigate("/auth/verify-email");
    } catch (error) {
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>
          {t`创建新用户`} - {t`微行简历`}
        </title>
      </Helmet>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{t`创建新用户`}</h2>
        <h6 className={cn(emailAuthDisabled && "hidden")}>
          <span className="opacity-75">{t`已经拥有账户?`}</span>
          <Button asChild variant="link" className="px-1.5">
            <Link to="/auth/login">
              {t`去登录`} <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </h6>
      </div>

      {disableSignups && (
        <Alert variant="error">
          <AlertTitle>{t`Signups are currently disabled by the administrator.`}</AlertTitle>
        </Alert>
      )}

      <div
        className={cn(
          emailAuthDisabled && "hidden",
          disableSignups && "pointer-events-none blur-sm",
        )}
      >
        <Form {...form}>
          <form
            ref={formRef}
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`昵称`}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t({
                        message: "Chris zhc",
                        context:
                          "Localized version of a placeholder name. For example, Max Mustermann in German or Jan Kowalski in Polish.",
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`用户名`}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t({
                        message: "chris.zhc",
                        context:
                          "Localized version of a placeholder username. For example, max.mustermann in German or jan.kowalski in Polish.",
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`邮箱`}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t({
                        message: "john.doe@example.com",
                        context:
                          "Localized version of a placeholder email. For example, max.mustermann@example.de in German or jan.kowalski@example.pl in Polish.",
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    <Trans>
                      请确认邮箱正确,以便找回密码
                    </Trans>
                  </FormDescription>
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

            <Button disabled={loading} className="w-full mt-4">
              {t`注册`}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
