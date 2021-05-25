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
import { IUser, IComment} from "src/redux/types"

const mapDispatchToProps = (dispatch: any) => ({
  getAllUser: () => dispatch(getAllUser()),
  getAllCars: () => dispatch(getAllCars()),
  login: (user: IUser) => dispatch(login(user)),
  signup: (user: IUser) => dispatch(signup(user)),
  logout: () => dispatch(logout()),
  currentUser: () => dispatch(currentUser()),
  addComment: (comment: IComment) => dispatch(addComment(comment)),
  getAllComment: () => dispatch(getAllComment()),
  deleteComment: (id: string) => dispatch(deleteComment(id)),
});

export default mapDispatchToProps;
