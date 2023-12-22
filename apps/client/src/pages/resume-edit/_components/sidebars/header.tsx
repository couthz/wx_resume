import { TextIcon, FontSizeIcon, BoxModelIcon, LineHeightIcon } from "@radix-ui/react-icons";
import { CaretUpDown } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { t } from "@lingui/macro";
import { HouseSimple, Lock, SidebarSimple } from "@phosphor-icons/react";
import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Tooltip,
} from "@reactive-resume/ui";
import { cn, fonts } from "@reactive-resume/utils";
import { Link } from "react-router-dom";

import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";
import { HexColorPicker } from "react-colorful";
import { usePrintResume } from "@/client/services/resume/print";
import { useAuthStore } from "@/client/stores/auth";
import { toast } from "@/client/hooks/use-toast";

export const BuilderHeader = () => {
  const { printResume } = usePrintResume();

  const locked = useResumeStore((state) => state.resume.locked);

  const toggle = useBuilderStore((state) => state.toggle);
  const isDragging = useBuilderStore(
    (state) => state.panel.left.handle.isDragging || state.panel.right.handle.isDragging,
  );
  const leftPanelSize = useBuilderStore((state) => state.panel.left.size);
  const page = useResumeStore((state) => state.resume.data.metadata.page);

  const setValue = useResumeStore((state) => state.setValue);
  const typography = useResumeStore((state) => state.resume.data.metadata.typography);
  const theme = useResumeStore((state) => state.resume.data.metadata.theme);
  const isLoggedIn = useAuthStore((state) => !!state.user);

  const onPdfExport = async () => {
    if (!isLoggedIn) {
      toast({
        variant: "info",
        title: "",
        description: "下载简历功能需登录后使用",
      });
      return;
    }

    const { resume } = useResumeStore.getState();
    const { url } = await printResume({ id: resume.id });

    const openInNewTab = (url: string) => {
      const win = window.open(url, "_blank");
      if (win) win.focus();
    };

    openInNewTab(url);
  };

  const onToggle = (side: "left" | "right") => toggle(side);

  return (
    <div
      style={{ left: `${leftPanelSize}%`,backgroundColor: "white" }}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-16 bg-secondary-accent/50 backdrop-blur-lg lg:z-20 border",
        !isDragging && "transition-[left,right]",
      )}
    >
      <div className="flex items-center justify-between h-full px-4">
        <Button
          size="icon"
          variant="ghost"
          className="flex lg:hidden"
          onClick={() => onToggle("left")}
        >
          <SidebarSimple />
        </Button>

        <div className="flex items-center justify-center gap-x-1 lg:mx-auto">
          <Button asChild size="icon" variant="ghost">
            <Link to="/dashboard/resumes">
              <HouseSimple />
            </Link>
          </Button>

          <Tooltip side="bottom" content={"字体"}>
            <div>
              <Select
                value={typography.font.family}
                onValueChange={(value) => {
                  setValue("metadata.typography.font.family", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t`字体`} />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem
                      key={font.family}
                      value={font.family}
                    >{t`${font.alias}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Tooltip>

          <Tooltip side="bottom" content={"字号"}>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative flex items-center w-12 h-8 border rounded shadow-sm border-border">
                    <FontSizeIcon className="absolute w-4 h-4 left-1" />
                    <CaretUpDown className="absolute w-4 h-4 opacity-50 left-6" />
                  </div>
                </PopoverTrigger>
                <PopoverContent asChild className="rounded-lg w-128 ">
                  <div className="flex items-center py-1 gap-x-4">
                    <Slider
                      min={12}
                      max={18}
                      step={0.05}
                      value={[typography.font.size]}
                      onValueChange={(value) => {
                        setValue("metadata.typography.font.size", value[0]);
                      }}
                    />
                    <span className="text-base font-bold">{typography.font.size}</span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Tooltip>
          <Tooltip side="bottom" content={"行间距"}>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative flex items-center w-12 h-8 border rounded shadow-sm border-border">
                    <LineHeightIcon className="absolute w-4 h-4 left-1" />
                    <CaretUpDown className="absolute w-4 h-4 opacity-50 left-6" />
                  </div>
                </PopoverTrigger>
                <PopoverContent asChild className="rounded-lg w-128 ">
                  <div className="flex items-center py-1 gap-x-4">
                    <Slider
                      min={0}
                      max={3}
                      step={0.05}
                      value={[typography.lineHeight]}
                      onValueChange={(value) => {
                        setValue("metadata.typography.lineHeight", value[0]);
                      }}
                    />
                    <span className="text-base font-bold">{typography.lineHeight}</span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Tooltip>
          <Tooltip side="bottom" content={"页边距"}>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative flex items-center w-12 h-8 border rounded shadow-sm border-border">
                    < BoxModelIcon className="absolute w-4 h-4 left-1" />
                    <CaretUpDown className="absolute w-4 h-4 opacity-50 left-6" />
                  </div>
                </PopoverTrigger>
                <PopoverContent asChild className="rounded-lg w-128 ">
                  <div className="flex items-center py-1 gap-x-4">
                    <Slider
                      min={0}
                      max={48}
                      step={2}
                      value={[page.margin]}
                      onValueChange={(value) => {
                        setValue("metadata.page.margin", value[0]);
                      }}
                    />
                    <span className="text-base font-bold">{page.margin}</span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Tooltip>
          <Tooltip side="bottom" content={"侧边栏背景色"}>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                  <div className="relative flex items-center w-12 h-8 border rounded shadow-sm border-border">
                  <div
                  className="absolute w-4 h-4 transition-shadow rounded-full cursor-pointer left-1 ring-primary ring-offset-2 ring-offset-background hover:ring-1"
                  style={{ backgroundColor: theme.primary }}
                />
                    <CaretUpDown className="absolute w-4 h-4 opacity-50 left-6" />
                  </div>

              </PopoverTrigger>
              <PopoverContent className="p-0 bg-transparent border-none rounded-lg">
                <HexColorPicker
                  color={theme.primary}
                  onChange={(color) => {
                    setValue("metadata.theme.primary", color);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          </Tooltip>
          <div className="flex items-center py-2 pl-2 gap-x-1">
            <Switch
              id="metadata.typography.hideIcons"
              checked={!typography.hideIcons}
              onCheckedChange={(checked) => {
                setValue("metadata.typography.hideIcons", !checked);
              }}
            />
            <Label htmlFor="metadata.typography.hideIcons">{t`显示图标`}</Label>
          </div>

          <div className="flex items-center py-2 pl-2 gap-x-1">
            <Switch
              id="metadata.typography.underlineLinks"
              checked={typography.underlineLinks}
              onCheckedChange={(checked) => {
                setValue("metadata.typography.underlineLinks", checked);
              }}
            />
            <Label htmlFor="metadata.typography.underlineLinks">{t`链接添加下划线`}</Label>
          </div>
          <div className="relative">
            <Button
            onClick={onPdfExport}
            className="inline-block ml-5 rounded min-w-min"
            >下载简历</Button>
          </div>

          {locked && (
            <Tooltip content={t`This resume is locked, please unlock to make further changes.`}>
              <Lock size={14} className="ml-2 opacity-75" />
            </Tooltip>
          )}
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="flex lg:hidden"
          onClick={() => onToggle("right")}
        >
          <SidebarSimple className="-scale-x-100" />
        </Button>
      </div>
    </div>
  );
};
