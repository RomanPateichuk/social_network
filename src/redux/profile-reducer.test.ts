import profileReducer, { actions } from "./profile-reducer";


let state = {
  posts: [
    { id: 1, message: "'Hi, how are you", likesCount: "0" },
    { id: 2, message: "'Hi, how are you", likesCount: '23' },
    { id: 3, message: "It's, my first post", likesCount: "0" },
    { id: 4, message: "It's, my first post", likesCount: "0" },
    { id: 5, message: "It's, my first post", likesCount: "0" },
    { id: 6, message: "It's, my first post", likesCount: "0" },
  ],
  profile: null,
  status: ''
}

it('Length of posts should be incremented', () => {

  // 1. test data
  let action = actions.addPostActionCreator("it-kamasutra.com")


  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectation
  expect(newState.posts.length).toBe(7)
  expect(newState.posts[6].message).toBe("it-kamasutra.com")
})

it('Message of new post should be correct', () => {

  // 1. test data
  let action = actions.addPostActionCreator("it-kamasutra.com")


  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectation
  expect(newState.posts[6].message).toBe("it-kamasutra.com")
})

it('After deleting length of messages should be decrement', () => {

  // 1. test data
  let action = actions.deletePost(1)

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectation
  expect(newState.posts.length).toBe(5)
})


it(`After deleting length shouldn't be decrement if id is incorrect`, () => {

  // 1. test data
  let action = actions.deletePost(1000)

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectation
  expect(newState.posts.length).toBe(6)
})