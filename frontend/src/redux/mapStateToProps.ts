const mapStateToProps = (state: any) => {
  return {
    users: state.users.users,
    me: state.users.me,
    comments: state.users.comments,
    cars: state.cars.cars,
  };
};

export default mapStateToProps;
