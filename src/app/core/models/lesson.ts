import { Identifiable, Referenceable } from './identifiable';
import { Traceable } from './traceable';

export interface CreateLesson extends Identifiable, Referenceable {
  label: string;
  cover?: File;
}

export interface UpdateLesson extends Referenceable {
  label?: string;
  cover?: File;
}

export interface Lesson extends Identifiable, Referenceable, Traceable {
  label: string;
  cover?: string;
}

export interface LessonContent extends Lesson {
  content: string;
}
