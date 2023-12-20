import { cn, pageSizeMap } from "@reactive-resume/utils";

import { useArtboardStore } from "../store/artboard";

type Props = {
  mode?: "preview" | "builder";
  pageNumber: number;
  children: React.ReactNode;
};

export const MM_TO_PX = 3.78;

export const Page = ({ mode = "preview", pageNumber, children }: Props) => {

  const page = useArtboardStore((state) => state.resume.metadata.page);
  const fontFamily = useArtboardStore((state) => state.resume.metadata.typography.font.family);

  return (
    <div
      id="resume-page"
      data-page={pageNumber}
      className={cn("relative mx-auto bg-white", mode === "builder" && "shadow-2xl")}
      style={{
        fontFamily,
        width: `${pageSizeMap[page.format].width * MM_TO_PX}px`,
        minHeight: `${pageSizeMap[page.format].height * MM_TO_PX}px`,
      }}
    >

      {children}

      {page.options.breakLine && (
        <div
          id="breakLine"
          className={cn("absolute inset-x-0 border-b border-dashed",mode == "preview" ? "invisible":"")}
          style={{
            top: `${pageSizeMap[page.format].height * MM_TO_PX - page.margin}px`,
          }}
        />
      )}
    </div>
  );
};
