import {
  Article,
  Books,
  Briefcase,
  Certificate,
  CompassTool,
  GameController,
  GraduationCap,
  HandHeart,
  IconProps,
  Medal,
  PuzzlePiece,
  ShareNetwork,
  Translate,
  User,
  Users,
  DiamondsFour,
  Layout,
} from "@phosphor-icons/react";
import { defaultSection, SectionKey, SectionWithItem } from "@reactive-resume/schema";
import { Button, ButtonProps, Tooltip } from "@reactive-resume/ui";
import get from "lodash.get";

import { useResumeStore } from "@/client/stores/resume";

export const getSectionIcon = (id: SectionKey, props: IconProps = {}) => {
  const iconSize = 20;
  switch (id) {
    // Left Sidebar
    case "basics":
      return <User size={iconSize} {...props} />;
    case "summary":
      return <Article size={iconSize} {...props} />;
    case "awards":
      return <Medal size={iconSize} {...props} />;
    case "profiles":
      return <ShareNetwork size={iconSize} {...props} />;
    case "experience":
      return <Briefcase size={iconSize} {...props} />;
    case "education":
      return <GraduationCap size={iconSize} {...props} />;
    case "certifications":
      return <Certificate size={iconSize} {...props} />;
    case "interests":
      return <GameController size={iconSize} {...props} />;
    case "languages":
      return <Translate size={iconSize} {...props} />;
    case "volunteer":
      return <HandHeart size={iconSize} {...props} />;
    case "projects":
      return <PuzzlePiece size={iconSize} {...props} />;
    case "publications":
      return <Books size={iconSize} {...props} />;
    case "skills":
      return <CompassTool size={iconSize} {...props} />;
    case "references":
      return <Users size={iconSize} {...props} />;
    case "diamondsFour":
      return <DiamondsFour size={iconSize} {...props} />;
    case "layout":
      return <Layout size={iconSize} {...props} />;
    default:
      return null;
  }
};

type SectionIconProps = ButtonProps & {
  id: SectionKey;
  name?: string;
  icon?: React.ReactNode;
};

export const SectionIcon = ({ id, name, icon, ...props }: SectionIconProps) => {
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id, defaultSection),
  ) as SectionWithItem;

  return (
      <Button size="icon" variant="ghost" className="w-20 mx-5 rounded-full" style={{color: "white"}} {...props}>
        {icon ?? getSectionIcon(id, { size: 14 })}
        <div
          className="mx-1"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name ?? section.name}
        </div>
      </Button>
  );
};
