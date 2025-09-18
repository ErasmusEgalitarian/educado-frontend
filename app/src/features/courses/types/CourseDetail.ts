export interface CourseDetail {
  status: number;
  success: boolean;
  data: Data;
}

export interface Data {
  _id: string;
  sections: Section[];
  title: string;
  category: string;
  coverImg: string;
  description: string;
  author: Author;
  dateUpdated: Date;
  dateCreated: Date;
  __v: number;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Section {
  components: Components[];
  _id: string;
  parentCourse: string;
  title: string;
  sectionNumber: number;
  description: string;
  dateCreated: Date;
  dateUpdated: Date;
  __v: number;
}

export interface Exercise {
  id: string;
  dateUpdated: Date;
  answers: Answer[];
  __v: number;
  content?: Content;
  onWrongFeedback?: Content;
}

export interface Answer {
  id: string;
  text: string;
  correct: boolean;
  dateUpdated: Date;
}

export interface Content {
  type: string;
  url: string;
}

export interface Components {
  compId: string;
  comptype: string;
}
