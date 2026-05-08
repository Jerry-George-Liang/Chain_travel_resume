import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useResumeStore } from "@/store/useResumeStore";
import { cn } from "@/lib/utils";
import BasicPanel from "./basic/BasicPanel";
import EducationPanel from "./education/EducationPanel";
import ProjectPanel from "./project/ProjectPanel";
import ExperiencePanel from "./experience/ExperiencePanel";
import CustomPanel from "./custom/CustomPanel";
import SkillPanel from "./skills/SkillPanel";
import SelfEvaluationPanel from "./self-evaluation/SelfEvaluationPanel";
import CertificatesPanel from "./certificates/CertificatesPanel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export function EditPanel() {
  const { activeResume, updateMenuSections, setActiveSection } = useResumeStore();
  if (!activeResume) return;
  const { activeSection = "", menuSections = [] } = activeResume || {};

  const handleDeleteSection = () => {
    if (activeSection === "basic") return;
    const newSections = menuSections.filter((s) => s.id !== activeSection);
    updateMenuSections(newSections);
    const prevIndex = menuSections.findIndex((s) => s.id === activeSection) - 1;
    if (prevIndex >= 0 && newSections[prevIndex]) {
      setActiveSection(newSections[prevIndex].id);
    } else if (newSections.length > 0) {
      setActiveSection(newSections[0].id);
    }
  };

  const renderFields = () => {
    switch (activeSection) {
      case "basic":
        return <BasicPanel />;

      case "projects":
        return <ProjectPanel />;
      case "education":
        return <EducationPanel />;
      case "experience":
        return <ExperiencePanel />;
      case "skills":
        return <SkillPanel />;
      case "selfEvaluation":
        return <SelfEvaluationPanel />;
      case "certificates":
        return <CertificatesPanel />;
      default:
        if (activeSection?.startsWith("custom")) {
          return <CustomPanel sectionId={activeSection} />;
        } else {
          return <BasicPanel />;
        }
    }
  };

  return (
    <motion.div
      className={cn(
        "w-full h-full border-r overflow-y-auto",
        "bg-background border-border"
      )}
    >
      <div className="p-4">
        <motion.div
          className={cn(
            "mb-4 p-4 rounded-lg border",
            "bg-card border-border"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {menuSections?.find((s) => s.id === activeSection)?.icon}
            </span>

            {activeSection === "basic" ? (
              <div>
                <span className="text-lg font-semibold text-primary">
                  {menuSections?.find((s) => s.id === activeSection)?.title}
                </span>
              </div>
            ) : (
              <>
                <input
                  className={cn(
                    "flex-1 text-lg  font-medium  text-primary border-black  bg-transparent outline-none   pb-1 text-primary"
                  )}
                  type="text"
                  value={
                    menuSections?.find((s) => s.id === activeSection)?.title
                  }
                  onChange={(e) => {
                    const newMenuSections = menuSections.map((s) => {
                      if (s.id === activeSection) {
                        return {
                          ...s,
                          title: e.target.value,
                        };
                      }
                      return s;
                    });
                    updateMenuSections(newMenuSections);
                  }}
                />
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Pencil size={16} className="text-primary" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>点击文字部分即可聚焦编辑</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}

            {activeSection !== "basic" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="ml-auto p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>删除板块</AlertDialogTitle>
                    <AlertDialogDescription>
                      确定要删除「{menuSections?.find((s) => s.id === activeSection)?.title}」整个板块吗？此操作不可撤销。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteSection}
                      className="bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-600 hover:to-orange-500 text-white shadow-sm border-0"
                    >
                      确认删除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </motion.div>

        <motion.div
          className={cn(
            "rounded-lg",
            "bg-card border-border"
          )}
        >
          {renderFields()}
        </motion.div>
      </div>
    </motion.div>
  );
}
