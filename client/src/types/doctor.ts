export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  availability: string;
  image: string;
  schedule: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  }[];
}
