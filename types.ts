export interface GeneratedName {
  name: string;
  pinyin: string;
  source: string;
  quote: string;
  meaning: string;
  elements?: string; // Five elements attributes, e.g., "Fire Wood"
}

export interface UserInput {
  surname: string;
  gender: 'boy' | 'girl' | 'unspecified';
  wishes: string;
  wordCount: '1' | '2'; // Single character name or double character name (excluding surname)
  useBazi: boolean;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export const GENDER_OPTIONS = [
  { value: 'boy', label: '男宝' },
  { value: 'girl', label: '女宝' },
  { value: 'unspecified', label: '不限' },
] as const;
