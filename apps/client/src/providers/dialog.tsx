import { ImportDialog } from "../pages/dashboard/resumes/_dialogs/import";
import { LockDialog } from "../pages/dashboard/resumes/_dialogs/lock";
import { ResumeDialog } from "../pages/dashboard/resumes/_dialogs/resume";
import { TwoFactorDialog } from "../pages/dashboard/settings/_dialogs/two-factor";
import { AwardsDialog } from "../pages/resume-edit/_components/sidebars/left/dialogs/awards";
import { CertificationsDialog } from "../pages/resume-edit/_components/sidebars/left/dialogs/certifications";
import { CustomSectionDialog } from "../pages/resume-edit/_components/sidebars/left/dialogs/custom-section";
import { EducationDialog } from "../pages/resume-edit/_components/sidebars/left/dialogs/education";
import { ExperienceDialog } from "../pages/resume-edit/_components/sidebars/left/dialogs/experience";
import { InterestsDialog } from "../pages/resume-edit/_components/sidebars/left/dialogs/interests";
import { LanguagesDialog } from "../pages/resume-edit/_components/sidebars/left/dialogs/languages";
import { ProjectsDialog } from "../pages/resume-edit/_components/sidebars/left/dialogs/projects";
import { SkillsDialog } from "../pages/resume-edit/_components/sidebars/left/dialogs/skills";
import { useResumeStore } from "../stores/resume";

type Props = {
  children: React.ReactNode;
};

export const DialogProvider = ({ children }: Props) => {
  const isResumeLoaded = useResumeStore((state) => Object.keys(state.resume).length > 0);

  return (
    <>
      {children}

      <div id="dialog-root">
      <ResumeDialog />
        <LockDialog />
        <ImportDialog />
        <TwoFactorDialog />
        {isResumeLoaded && (
          <>
            <ExperienceDialog />
            <EducationDialog />
            <ProjectsDialog />
            <SkillsDialog />
            <LanguagesDialog />
            <AwardsDialog />
            <CertificationsDialog />
            <InterestsDialog />
            <CustomSectionDialog />
          </>
        )}
      </div>
    </>
  );
};
