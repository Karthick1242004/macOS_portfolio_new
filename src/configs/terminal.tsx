/* eslint-disable prettier/prettier */
import type { TerminalData } from "~/types";

export const getTerminalData = (portfolioData: any): TerminalData[] => {
  if (!portfolioData) return [];
  
  return [
    {
      id: "about",
      title: "about",
      type: "folder",
      children: [
        {
          id: "about-bio",
          title: "bio.txt",
          type: "file",
          content: (
            <div className="py-1">
              <div>
                {portfolioData.about.bio.map((line: string, index: number) => (
                  <div key={index}>- {line}</div>
                ))}
              </div>
              <div className="mt-1">
                {portfolioData.about.education}
              </div>
            </div>
          )
        },
        {
          id: "about-interests",
          title: "interests.txt",
          type: "file",
          content: portfolioData.about.interests
        },
        {
          id: "about-hobbies",
          title: "hobbies.txt",
          type: "file",
          content: portfolioData.about.hobbies
        },
        {
          id: "about-contact",
          title: "contact.txt",
          type: "file",
          content: (
            <ul className="list-disc ml-6">
              <li>
                Name: {portfolioData.about.name}
              </li>
              <li>
                Email:{" "}
                <a
                  className="text-blue-300"
                  href={`mailto:${portfolioData.about.contact.email}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {portfolioData.about.contact.email}
                </a>
              </li>
              <li>
                Github:{" "}
                <a
                  className="text-blue-300"
                  href={portfolioData.about.contact.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {portfolioData.about.contact.github}
                </a>
              </li>
              <li>
                Linkedin:{" "}
                <a
                  className="text-blue-300"
                  href={portfolioData.about.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  {portfolioData.about.name}
                </a>
              </li>
            </ul>
          )
        }
      ]
    },
  ];
};

export default getTerminalData;
