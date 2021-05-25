export interface IUser extends Document {
  id?: string;
  email?: string;
  name: string;
  userId?: string;
}

export interface ICars {
  id?: string;
  name?: string;
  type?: string;
  mark?: string;
  abut?: string;
}

export interface IComment {
  id?: string;
  date: Date;
  body?: string;
  car?: ICars;
  users?: IUser;
}

export interface IProps {
  cars?: Array<ICars>;
  users?: Array<IUser>;
  comments?: Array<IComment>;
  match?: any;
  me?: IUser;
  getAllUser: Function;
  getAllCars: Function;
  login: Function;
  signup: Function;
  logout: Function;
  currentUser: Function;
  addComment: Function;
  getAllComment: Function;
  deleteComment: Function;
}
