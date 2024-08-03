import { FaRegClock } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
export const DOMAIN = "http://localhost:3000/api/";

export const FREE_URL_LIMIT = 5;

export const FILTER_OPTIONS = [
  { value: "", label: "Filter" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const MENU_ITEMS = [
  { icon: FaRegClock, label: "History" },
  { icon: IoStatsChartOutline, label: "Statistics" },
  { icon: IoSettingsOutline, label: "Settings" },
];
