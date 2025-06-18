export interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  type: "education" | "work";
  description?: string;
  location?: string;
  current?: boolean;
}