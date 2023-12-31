import { t } from "@lingui/macro";
import { ResumeDto } from "@reactive-resume/dto";
import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { LoaderFunction, redirect } from "react-router-dom";

// import { queryClient } from "@/client/libs/query-client";
// import { findResumeById } from "@/client/services/resume";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";
import { queryClient } from "@/client/libs/query-client";
import { findResumeById } from "@/client/services/resume/resume";

export const BuilderPage = () => {
  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);
  const leftPanelSize = useBuilderStore((state) => state.panel.left.size);

  const resume = useResumeStore((state) => state.resume);
  // const title = useResumeStore((state) => state.resume.title);
  const title = "我的简历";

  const updateResumeInFrame = useCallback(() => {
    console.log("receive")
    if (!frameRef || !frameRef.contentWindow) return;
    const message = { type: "SET_RESUME", payload: resume.data };
    (() => frameRef.contentWindow.postMessage(message, "*"))();
  }, [frameRef, resume.data]);

  // Send resume data to iframe on initial load
  useEffect(() => {
    if (!frameRef) return;
    frameRef.addEventListener("load", updateResumeInFrame);
    return () => frameRef.removeEventListener("load", updateResumeInFrame);
  }, [frameRef]);

  // Send resume data to iframe on change of resume data
  useEffect(updateResumeInFrame, [resume.data]);

  return (
    <>
      <Helmet>
        <title>
          {title} - {t`微行简历`}
        </title>
      </Helmet>

      <iframe
        ref={setFrameRef}
        title={resume.id}
        src="/artboard/builder"
        className="w-full"
        style={{ height: `calc(100vh - 32px)`}}
      />
    </>
  );
};

export const builderLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    const id = params.id as string;

    const resume = await queryClient.fetchQuery({
      queryKey: ["resume", { id }],
      queryFn: () => findResumeById({ id }),
    });

    useResumeStore.setState({ resume });
    useResumeStore.temporal.getState().clear();

    return resume;
  } catch (error) {
    return redirect("/dashboard");
  }
};
