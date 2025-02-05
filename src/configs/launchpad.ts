import { usePortfolioData } from "~/hooks/usePortfolioData";
import type { LaunchpadData } from "~/types";

// Create a hook to get launchpad data
export const useLaunchpadApps = (): LaunchpadData[] => {
  const { data } = usePortfolioData();
  
  if (!data?.notes) return [];

  const projectFolder = data.notes.find(folder => folder.id === "project");
  if (!projectFolder) return [];

  return projectFolder.md.map(project => ({
    id: project.id,
    title: project.title,
    img: "img/icons/launchpad/Folio white circle.png", // Using consistent image
    link: project.link || ""
  }));
};

export default useLaunchpadApps;
