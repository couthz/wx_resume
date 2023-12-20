import { t } from "@lingui/macro";
import {
  ArrowCounterClockwise,
  Broom,
  Columns,
  Eye,
  EyeSlash,
  List,
  PencilSimple,
  Plus,
  TrashSimple,
} from "@phosphor-icons/react";
import { defaultSections, SectionKey, SectionWithItem } from "@reactive-resume/schema";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Input,
} from "@reactive-resume/ui";
import get from "lodash.get";
import { useMemo } from "react";

import { useDialog } from "@/client/stores/dialog";
import { useResumeStore } from "@/client/stores/resume";

type Props = { id: SectionKey };

export const SectionOptions = ({ id }: Props) => {
  const { open } = useDialog(id);

  const setValue = useResumeStore((state) => state.setValue);
  const removeSection = useResumeStore((state) => state.removeSection);

  const originalName = get(defaultSections, `${id}.name`, "") as SectionWithItem;
  const section = useResumeStore((state) => get(state.resume.data.sections, id)) as SectionWithItem;

  const hasItems = useMemo(() => "items" in section, [section]);
  const isCustomSection = useMemo(() => id.startsWith("custom"), [id]);

  const onCreate = () => open("create", { id });
  const toggleVisibility = () => setValue(`sections.${id}.visible`, !section.visible);
  const onResetName = () => setValue(`sections.${id}.name`, originalName);
  const onChangeColumns = (value: string) => setValue(`sections.${id}.columns`, Number(value));
  const onResetItems = () => setValue(`sections.${id}.items`, []);
  const onRemove = () => removeSection(id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <List weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {hasItems && (
          <>
            <DropdownMenuItem onClick={onCreate}>
              <Plus />
              <span className="ml-2">{t`添加${section.name}`}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={toggleVisibility}>
            {section.visible ? <EyeSlash /> : <Eye />}
            <span className="ml-2">{section.visible ? t`隐藏` : t`取消隐藏`}</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
            <PencilSimple />
              <span className="ml-2">{t`重命名`}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <div className="relative col-span-2">
                <Input
                  id={`sections.${id}.name`}
                  value={section.name}
                  onChange={(event) => {
                    setValue(`sections.${id}.name`, event.target.value);
                  }}
                />
                <Button
                  size="icon"
                  variant="link"
                  onClick={onResetName}
                  className="absolute inset-y-0 right-0"
                >
                  <ArrowCounterClockwise />
                </Button>
              </div>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
            <Columns />
              <span className="ml-2">{t`拆分多列`}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={`${section.columns}`} onValueChange={onChangeColumns}>
                {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
                  <DropdownMenuRadioItem key={value} value={`${value}`}>
                    {`${value}列`}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem disabled={!hasItems} onClick={onResetItems}>
          <Broom />
          <span className="ml-2">{t`清空`}</span>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-error" disabled={!isCustomSection} onClick={onRemove}>
          <TrashSimple/>
          <span className="ml-2">{t`删除模块`}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
