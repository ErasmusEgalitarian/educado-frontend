export interface Main {
  status:  number;
  success: boolean;
  count:   number;
  data:    Course[];
}

export interface Course {
  _id:         string;
  title:       string;
  category:    Category;
  coverImg?:   string;
  description: string;
  author:      Author;
  published:   boolean;
  modifiedAt:  Date;
  createdAt:   Date;
  __v:         number;
}

export interface Author {
  id:       string;
  firstName: string;
  lastName:  string;
}

export interface Category {
  id:   string;
  name:  string;
  icon?: string;
}