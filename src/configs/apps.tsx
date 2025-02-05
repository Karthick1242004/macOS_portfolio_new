/* eslint-disable prettier/prettier */
import FaceTime from "~/components/apps/FaceTime";
import Terminal from "~/components/apps/Terminal";
import Safari from "~/components/apps/Safari";
import Notes from "~/components/apps/Notes";
import VSCode from "~/components/apps/VSCode";
import { usePortfolioData } from "~/hooks/usePortfolioData";

import type { AppsData } from "~/types";

// Create a function to get the apps data
export const useApps = (): AppsData[] => {
  const { data } = usePortfolioData();
  
  const apps: AppsData[] = [
    {
      id: "launchpad",
      title: "Launchpad",
      desktop: false,
      img: "img/icons/launchpad.png"
    },
    {
      id: "safari",
      title: "Safari",
      desktop: true,
      show: false,
      width: 1024,
      minWidth: 375,
      minHeight: 200,
      img: "img/icons/safari.png",
      content: <Safari />
    },
    {
      id: "notes",
      title: "Notes",
      desktop: true,
      show: true,
      width: 860,
      height: 500,
      img: "img/icons/notes.png",
      content: <Notes />
    },
    {
      id: "vscode",
      title: "VSCode",
      desktop: true,
      show: false,
      img: "img/icons/vscode.png",
      content: <VSCode />
    },
    {
      id: "facetime",
      title: "FaceTime",
      desktop: true,
      show: false,
      img: "img/icons/facetime.png",
      height: 530,
      content: <FaceTime />
    },
    {
      id: "terminal",
      title: "Terminal",
      desktop: true,
      show: false,
      img: "img/icons/terminal.png",
      content: <Terminal />
    },
    {
      id: "email",
      title: "Mail",
      desktop: false,
      img: "img/icons/mail.png",
      link: data?.about.contact.email ? `mailto:${data.about.contact.email}` : ""
    },
    {
      id: "github",
      title: "Github",
      desktop: false,
      img: "img/icons/github.png",
      link: data?.about.contact.github || ""
    }
  ];

  return apps;
};

export default useApps;
