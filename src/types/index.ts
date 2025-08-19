export type Photo = {
  id: number;
  title: string;
  url: string;
  date: string;
  liked: boolean;
  tags: string;
};

export type Album = {
  id: number;
  name: string;
  count: number;
  cover: string;
};

export type EditorFilters = {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  grayscale: number;
};

export type TabType = "Gallery" | "Albums" | "Editor" | "Profile";