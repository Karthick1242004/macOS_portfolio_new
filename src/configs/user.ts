import type { UserData } from "~/types";

export const getUserData = (portfolioData: any): UserData => {
  if (!portfolioData) return { name: "", avatar: "", password: "" };
  
  return {
    name: portfolioData.name,
    avatar: portfolioData.avatar,
    password: ""
  };
};

export default getUserData;
