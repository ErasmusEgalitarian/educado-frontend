export interface Profile {
    id:           string;
    groups:       any[];
    firstName:    string;
    lastName:     string;
    user:         string;
    courseMember: any[];
    institution:  any[];
}


//Profile page interfaces
export interface FormData {
  UserName: string;
  UserEmail: string;
  bio: string;
  linkedin: string;
  photo: any;
  }

export interface EducationFormData {
  status: string;
  institution: string;
  course: string;
  educationLevel: string;
  startDate: string;
  endDate: string;
  _id: string | null;
}

export interface ExperienceFormData {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  checkBool: boolean;
  description: string;
  _id: string | null;
}




