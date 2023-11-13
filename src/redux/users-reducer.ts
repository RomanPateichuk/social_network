import { usersAPI } from "../api/api"
import { UserType } from "../types/types"
import { updateObjectInArray } from "../utils/objects-helpers"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users ids
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
        // users: state.users.map(item => {
        //   if (item.id === action.userId) {
        //     return { ...item, followed: true }
        //   }
        //   return item
        // })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
        // users: state.users.map(item => {
        //   if (item.id === action.userId) {
        //     return { ...item, followed: false }
        //   }
        //   return item
        // })
      }
    case SET_USERS:
      return { ...state, users: [...action.users] }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    default: return state
  }
}

type FollowSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}

type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}

export const followSuccess = (id: number): FollowSuccessActionType => ({ type: FOLLOW, userId: id })
export const unfollowSuccess = (id: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId: id })
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })
export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage: pageNumber })
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount })
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching })
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })



export const requestUsers = (page: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))

  }
}


const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleFollowingProgress(true, userId))
  let response = await apiMethod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)
    let actionCreator = followSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
  }
}


export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI)
    let actionCreator = unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
  }
}

export default usersReducer