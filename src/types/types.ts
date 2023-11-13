export type PostType = {
  id: string
  message: string
  likesCount: string
}

export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type PhotosType = {
  small: string | null
  large: string | null
}

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: PhotosType
}

export type UserType = {
  name: string
  id: number
  photos: PhotosType
  status: string | null,
  followed: boolean
}