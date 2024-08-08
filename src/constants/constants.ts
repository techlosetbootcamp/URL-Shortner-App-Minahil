import { FaRegClock } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
export const DOMAIN = process.env.NEXTAUTH_URL;

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

export const INPUT_FIELDS = [
  {
    id: "oldPassword",
    type: "password",
    placeholder: "Old Password",
  },
  {
    id: "newPassword",
    type: "password",
    placeholder: "New Password",
  },
  {
    id: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

export const EDIT_INPUT_FIELDS = [
  {
    id: "name",
    label: "Name:",
    type: "text",
    value: "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  },
  {
    id: "email",
    label: "Email:",
    type: "email",
    value: "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  },
];
