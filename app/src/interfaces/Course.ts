export interface Main {
  status:  number;
  success: boolean;
  count:   number;
  data:    Course[];
}

// TODO: Make sure this is in accordance with the backend

export interface Course {
  _id:               string;
  title:             string;
  category:          string;
  coverImg?:         string;
  description:       string;
  creator:           string;
  status:            string;
  estimatedHours:    number;
  rating:            number;
  difficulty:        number;
  numOfSubscriptions:   number;
  modifiedAt:        Date;
  createdAt:         Date;
  sections:          Section[];
  __v:               number;
}

export interface contentCreator {
  firsteName: string,
  lastName: string,
  email: string,
  motivation: string,
  approved: boolean,
  rejectionReason: string,
  createdAt: Date,
  modifiedAt: Date,
}

export interface Section {
  _id:          string;
  title:        string;
  description:  string;
  totalPoints:  number;
  parentCourse: string;
}

export interface Lecture {
  components:     string[];
  title:          string
  description:    string;
  image:          string;
  video:          string;
  createdAt:      Date;
  updatedAt:      Date;
  parentSection:  string;
  __v:            number;
}
