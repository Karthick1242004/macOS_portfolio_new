import type { WebsitesData } from "~/types";
import data from "../data.json"; // Importing data from data.json

const websites: WebsitesData = {
  favorites: data.websites.favorites, // Using favorites from data.json
  freq: data.websites.freq // Using frequently visited from data.json
};

export default websites;
