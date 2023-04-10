export interface Food {
  id: string;
  name: string;
  description: string;
  price: string;
  avatar: string;
  fileId?: string;
  setEdit?: () => void;
  admin?: boolean;
  categoryId: string;
}
