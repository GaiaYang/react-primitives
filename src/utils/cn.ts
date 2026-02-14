import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** 合併 tailwind class 並同時支援 clsx */
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
