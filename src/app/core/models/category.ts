import { Identifiable } from './identifiable';
import { Traceable } from './traceable';

export interface CreateCategory extends Identifiable {
  label: string;
  cover?: File;
}

export interface UpdateCategory {
  label?: string;
  cover?: File;
}

export interface Category extends Identifiable, Traceable {
  label: string;
  cover?: string;
}
