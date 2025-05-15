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
