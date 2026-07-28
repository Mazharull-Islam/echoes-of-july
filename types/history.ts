export interface HistoryEntry {
  title: string;
  content: string;
}

export interface History {
  chapter: string;
  title: string;
  entries: HistoryEntry[];
}