import { User } from "./User";

export interface Main {
  status: number;
  success: boolean;
  count: number;
  data: Course[];
}

// TODO: Make sure this is in accordance with the backend
interface CommonCourse {
  _id: string;
  title: string;
  description: string;

  //1: beginner, 2: intermediate, 3: advanced. This should be changed to enums on database instead of numbers
  difficulty: 0 | 1 | 2 | 3;
  dateCreated?: Date;
  dateUpdated?: Date;
  coverImg?: string;
  category:
    | "personal finance"
    | "health and workplace safety"
    | "sewing"
    | "electronics";
  sections?: Section[];
  status: "draft" | "published" | "hidden";
  estimatedHours?: number;
  rating?: number;
  numOfSubscriptions?: number;
  __v?: number;
}

export interface Course extends CommonCourse {
  creator: string;
}

export interface CreatorPopulatedCourse extends CommonCourse {
  creator: {
    _id: string;
    approved: boolean;
    rejected: boolean;
    baseUser: User;
  };
}

export interface NewCourse extends Omit<CommonCourse, "_id"> {
  creator: string;
}

export interface contentCreator {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  motivation: string;
  approved: boolean;
  rejectionReason: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface Section {
  _id: string;
  title: string;
  description: string;
  totalPoints: number;
  parentCourse: string;
}

export interface Lecture {
  components: string[];
  title: string;
  description: string;
  image: string;
  video: string;
  dateCreated: Date;
  updatedAt: Date;
  parentSection: string;
  __v: number;
}
