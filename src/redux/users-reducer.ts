import { Dispatch } from "react"
import { ResponseType } from "../api/api"
import { usersAPI } from "../api/users-api"
import { UserType } from "../types/types"
import { updateObjectInArray } from "../utils/objects-helpers"
import { BaseThunkType, InferActionsTypes } from "./store"

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users ids
  filter: {
    term: '',
    friend: null as null | boolean
  }
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/USERS/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
      }
    case 'SN/USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
      }
    case 'SN/USERS/SET_USERS':
      return { ...state, users: [...action.users] }
    case 'SN/USERS/SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage }
    case 'SN/USERS/SET_TOTAL_USERS_COUNT':
      return { ...state, totalUsersCount: action.totalUsersCount }
    case 'SN/USERS/TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.isFetching }
    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    case 'SN/USERS/SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }

    default: return state
  }
}

export const actions = {
  followSuccess: (id: number) => ({ type: 'SN/USERS/FOLLOW', userId: id } as const),
  unfollowSuccess: (id: number) => ({ type: 'SN/USERS/UNFOLLOW', userId: id } as const),
  setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
  setCurrentPage: (pageNumber: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage: pageNumber } as const),
  setFilter: (filter: FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload: filter } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount: totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching: isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
}


export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
  return async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setFilter(filter))
    let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: (userId: number) => Promise<ResponseType>,
  actionCreator: (userId: number) => ActionsTypes) => {
  dispatch(actions.toggleFollowingProgress(true, userId))
  let response = await apiMethod(userId)

  // test users reducer-thunk --> response undefined
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId))
  }

  dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)
    let actionCreator = actions.followSuccess
    await _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI)
    let actionCreator = actions.unfollowSuccess
    await _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
  }
}

export default usersReducer

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>