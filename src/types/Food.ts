export interface Food {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  fileId?: string;
  setEdit?: () => void;
  admin?: boolean;
  categoryId: string;
}
