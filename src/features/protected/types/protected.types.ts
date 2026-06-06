import type { StaticImageData } from "next/image";

export interface UserData {
  name: string;
  jobTitle: string;
}

export interface NavItem {
  name: string;
  icon: StaticImageData;
  path: string;
}
