export interface personDetailsType {
  age: number;
  name: string;
  gender: 'Male' | 'Female';
  pets: null | petsType[];
}

export interface petsType {
  type: string;
  name: string;
}

export interface sortedType {
  gender: string;
  cats: string[];
}
