import { t } from "@lingui/macro";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  CircleNotch,
  ClockClockwise,
  CubeFocus,
  FilePdf,
  Hash,
  LineSegment,
  LinkSimple,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react";
import { Button, Separator, Toggle, Tooltip } from "@reactive-resume/ui";
import { motion } from "framer-motion";

import { useToast } from "@/client/hooks/use-toast";
// import { usePrintResume } from "@/client/services/resume";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore, useTemporalResumeStore } from "@/client/stores/resume";

export const BuilderToolbar = () => {
  const { toast } = useToast();
  const setValue = useResumeStore((state) => state.setValue);
  const undo = useTemporalResumeStore((state) => state.undo);
  const redo = useTemporalResumeStore((state) => state.redo);
  const frameRef = useBuilderStore((state) => state.frame.ref);

  const id = useResumeStore((state) => state.resume.id);
  const isPublic = useResumeStore((state) => state.resume.visibility === "public");
  const pageOptions = useResumeStore((state) => state.resume.data.metadata.page.options);
  const leftPanelSize = useBuilderStore((state) => state.panel.left.size);

  // const { printResume, loading } = usePrintResume();

  // const onPrint = async () => {
  //   const { url } = await printResume({ id });

  //   const openInNewTab = (url: string) => {
  //     const win = window.open(url, "_blank");
  //     if (win) win.focus();
  //   };

  //   openInNewTab(url);
  // };

  // const onCopy = async () => {
  //   const { url } = await printResume({ id });
  //   await navigator.clipboard.writeText(url);

  //   toast({
  //     variant: "success",
  //     title: t`A link has been copied to your clipboard.`,
  //     description: t`Anyone with this link can view and download the resume. Share it on your profile or with recruiters.`,
  //   });
  // };

  const onZoomIn = () => frameRef?.contentWindow?.postMessage({ type: "ZOOM_IN" }, "*");
  const onZoomOut = () => frameRef?.contentWindow?.postMessage({ type: "ZOOM_OUT" }, "*");
  const onResetView = () => frameRef?.contentWindow?.postMessage({ type: "RESET_VIEW" }, "*");
  const onCenterView = () => frameRef?.contentWindow?.postMessage({ type: "CENTER_VIEW" }, "*");

  return (
    <motion.div className="fixed inset-x-0 bottom-0 hidden py-6 mx-auto text-center md:block"
    style={{ left: `${leftPanelSize}%`}}
    >
      <div className="inline-flex items-center justify-center px-4 border rounded-full shadow-xl bg-background">
        <Tooltip content={t`撤销`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={() => undo()}>
            <ArrowCounterClockwise />
          </Button>
        </Tooltip>

        <Tooltip content={t`重做`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={() => redo()}>
            <ArrowClockwise />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        <Tooltip content={t`放大页面`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onZoomIn}>
            <MagnifyingGlassPlus />
          </Button>
        </Tooltip>

        <Tooltip content={t`缩小页面`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onZoomOut}>
            <MagnifyingGlassMinus />
          </Button>
        </Tooltip>

        <Tooltip content={t`恢复缩放比例`}>
          <Button size="icon" variant="ghost" className="rounded-none" onClick={onResetView}>
            <ClockClockwise />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" />

        <Tooltip content={t`显示分页线`}>
          <Toggle
            className="rounded-none"
            pressed={pageOptions.breakLine}
            onPressedChange={(pressed) => {
              setValue("metadata.page.options.breakLine", pressed);
            }}
          >
            <LineSegment />
          </Toggle>
        </Tooltip>


        <Separator orientation="vertical" className="h-9" />

        {/* <Tooltip content={t`Copy Link to Resume`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            onClick={onCopy}
            disabled={!isPublic}
          >
            <LinkSimple />
          </Button>
        </Tooltip> */}

        {/* <Tooltip content={t`Download PDF`}>
          <Button
            size="icon"
            variant="ghost"
            onClick={onPrint}
            disabled={loading}
            className="rounded-none"
          >
            {loading ? <CircleNotch className="animate-spin" /> : <FilePdf />}
          </Button>
        </Tooltip> */}
      </div>
    </motion.div>
  );
};
