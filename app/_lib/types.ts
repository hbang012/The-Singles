export type Article = {
  id: number;
  title: string;
  subtitle: string;
  editor: string;
  date: string;
  image: string;
  photoCredit: string;
  likes: number;
  categoryId: number;
  subcategory: string;
  tags: string[];
  openDate: string;
  closeDate: string;
  do: number;
  dont: number;
};

export type Research = {
  id: number;
  title: string;
  subtitle: string;
  editor: string;
  image: string;
  photoCredit: string;
  likes: number;
  categoryId: number;
  subcategory: string;
  tags: string[];
  openDate: string;
  closeDate: string;
  do: number;
  dont: number;
  date: number;
  done: string;
};

export interface Category {
  id: number;
  name: string;
  subcategorys: string[];
}
