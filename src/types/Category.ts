import { Food } from './Food';

export interface Category {
  id: string;
  name: string;
  categoryActiveId?: string;
}

export interface Categories {
  id: string;
  name: string;
  categoryActiveId?: string;
  menu: Food[];
}
