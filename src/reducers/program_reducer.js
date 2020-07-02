import { GET_PROGRAMS } from "../actions/action_types"

const initialState = {}

const setProgram = (payload) => {
  const program = {}

  for (var x in payload) {
    payload[x].placeTalks.map((el) => {
      if (!el.talkCategory) {
        return false
      }
      if (!program[el.talkCategory]) {
        program[el.talkCategory] = {}
      }
      if (!program[el.talkCategory][el.talkPlace]) {
        program[el.talkCategory][el.talkPlace] = []
      }
      program[el.talkCategory][el.talkPlace].push(el)
      return true
    })
  }

  return program
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROGRAMS:
      return setProgram(action.payload)

    default:
      return state
  }
}
