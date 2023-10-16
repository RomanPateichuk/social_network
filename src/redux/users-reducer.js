const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

let initialState = {
  users: [
    // { id: "1", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: true, fullName: "name1", status: "status1", location: { city: "city1", country: 'country1' } },
    // { id: "2", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: false, fullName: "name2", status: "status2", location: { city: "city2", country: 'country2' } },
    // { id: "3", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: true, fullName: "name3", status: "status3", location: { city: "city3", country: 'country3' } },
    // { id: "4", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: false, fullName: "name4", status: "status4", location: { city: "city4", country: 'country4' } },
    // { id: "5", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: true, fullName: "name5", status: "status5", location: { city: "city5", country: 'country5' } },
    // { id: "6", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: false, fullName: "name6", status: "status6", location: { city: "city6", country: 'country6' } },
  ],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
}
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(item => {
          if (item.id === action.userId) {
            return { ...item, followed: true }
          }
          return item
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(item => {
          if (item.id === action.userId) {
            return { ...item, followed: false }
          }
          return item
        })
      }
    case SET_USERS:
      return { ...state, users: [...action.users] }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }
    default: return state
  }
}

export const follow = (id) => ({ type: FOLLOW, userId: id })
export const unfollow = (id) => ({ type: UNFOLLOW, userId: id })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (pageNumber) => ({ type: SET_CURRENT_PAGE, currentPage: pageNumber })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching })


export default usersReducer