import { combineReducers } from 'redux'
import { usersReducers} from "./usersReducers"
import { carsReducers} from "./carsReducers"

const rootReducer = combineReducers({
  log: (_, action) => ({}),
  users: usersReducers,
  cars: carsReducers,
})

export default rootReducer
