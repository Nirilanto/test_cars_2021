import {
  getAllUser,
  login,
  logout,
  currentUser,
  addComment,
  getAllComment,
  signup,
  deleteComment
} from "./actions/usersAction";
import { getAllCars } from "./actions/carsAction";

const mapDispatchToProps = (dispatch: any) => ({
  getAllUser: () => dispatch(getAllUser()),
  getAllCars: () => dispatch(getAllCars()),
  login: (user: any) => dispatch(login(user)),
  signup: (user: any) => dispatch(signup(user)),
  logout: () => dispatch(logout()),
  currentUser: () => dispatch(currentUser()),
  addComment: (data: any) => dispatch(addComment(data)),
  getAllComment: () => dispatch(getAllComment()),
  deleteComment: (id: string) => dispatch(deleteComment(id)),
});

export default mapDispatchToProps;
