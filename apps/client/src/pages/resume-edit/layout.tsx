import { Outlet } from "react-router-dom";
import { Panel, PanelGroup, PanelResizeHandle } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { LeftSidebar } from "./_components/sidebars/left";
import { BuilderHeader } from "./_components/sidebars/header";
import { useBuilderStore } from "@/client/stores/builder";
import { BuilderToolbar } from "./_components/sidebars/toolbar";

const OutletSlot = () => (
  <>
    <BuilderHeader />

    <div className="pt-8" style={{backgroundColor: "grey"}}>
      <Outlet />
    </div>

    <BuilderToolbar />
  </>
);

export const ResumeEditLayout = () => {

  const leftSetSize = useBuilderStore((state) => state.panel.left.setSize);

  const leftHandle = useBuilderStore((state) => state.panel.left.handle);
    return (
        <div className="relative w-full h-full overflow-hidden">
          <PanelGroup direction="horizontal">
            <Panel
              minSizePixels={48}
              maxSizePercentage={45}
              defaultSizePercentage={30}
            onResize={({ sizePercentage }) => leftSetSize(sizePercentage)}
            className={cn("z-10 bg-background", !leftHandle.isDragging && "transition-[flex]")}
            >
              <LeftSidebar />
            </Panel>
            <PanelResizeHandle
              isDragging={leftHandle.isDragging}
              onDragging={leftHandle.setDragging}
            />
            <Panel style={{backgroundColor: "white" }}>
              <OutletSlot />
            </Panel>
          </PanelGroup>
        </div>
      );

}
