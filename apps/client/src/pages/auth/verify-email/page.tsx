import { t, Trans } from "@lingui/macro";
import { ArrowRight, Info, SealCheck } from "@phosphor-icons/react";
import { Alert, AlertDescription, AlertTitle, Button } from "@reactive-resume/ui";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useToast } from "@/client/hooks/use-toast";
import { queryClient } from "@/client/libs/query-client";
import { useVerifyEmail } from "@/client/services/auth";

export const VerifyEmailPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { verifyEmail, loading } = useVerifyEmail();

  useEffect(() => {
    const handleVerifyEmail = async (token: string) => {
      await verifyEmail({ token });
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      toast({
        variant: "success",
        icon: <SealCheck size={16} weight="bold" />,
        title: t`Your email address has been verified successfully.`,
      });

      navigate("/dashboard/resumes", { replace: true });
    };

    if (!token) return;

    handleVerifyEmail(token);
  }, [token, navigate, verifyEmail]);

  return (
    <div className="space-y-6">
      <Helmet>
        <title>
          {t`验证您的邮箱`} - {t`微行简历`}
        </title>
      </Helmet>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{t`Verify your email address`}</h2>
        <p className="leading-relaxed opacity-75">
          <Trans>
            您的邮箱应该已经收到来自 <strong>微行简历</strong> 的验证链接
          </Trans>
        </p>
      </div>

      <Alert variant="info">
        <Info size={18} />
        <AlertTitle>{t`注意这一步是可选的.`}</AlertTitle>
        <AlertDescription>
          {t`我们验证您的电子邮件地址只是为了确保在您忘记密码的情况下，我们可以向您发送密码重置链接`}
        </AlertDescription>
      </Alert>

      <Button asChild disabled={loading}>
        <Link to="/dashboard">
          {t`前往工作台`}
          <ArrowRight className="ml-2" />
        </Link>
      </Button>
    </div>
  );
};
