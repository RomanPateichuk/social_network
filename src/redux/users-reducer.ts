import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { usersAPI } from "../api/api"
import { UserType } from "../types/types"
import { updateObjectInArray } from "../utils/objects-helpers"
import { AppStateType, InferActionsTypes } from "./redux-store"

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users ids
}

type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
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
    case 'UNFOLLOW':
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
    case 'SET_USERS':
      return { ...state, users: [...action.users] }
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage }
    case 'SET_TOTAL_USERS_COUNT':
      return { ...state, totalUsersCount: action.totalUsersCount }
    case 'TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.isFetching }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    default: return state
  }
}

export const actions = {
  followSuccess: (id: number) => ({ type: 'FOLLOW', userId: id } as const),
  unfollowSuccess: (id: number) => ({ type: 'UNFOLLOW', userId: id } as const),
  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  setCurrentPage: (pageNumber: number) => ({ type: 'SET_CURRENT_PAGE', currentPage: pageNumber } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount: totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching: isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
}

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}


const _followUnfollowFlow = async (dispatch: DispatchType,
  userId: number, apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes) => {
  dispatch(actions.toggleFollowingProgress(true, userId))
  let response = await apiMethod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)
    let actionCreator = actions.followSuccess
    _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
  }
}


export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI)
    let actionCreator = actions.unfollowSuccess
    _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
  }
}

export default usersReducer