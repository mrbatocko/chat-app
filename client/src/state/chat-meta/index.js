const state = {
  chats: [],
  requests: []
}

const subscribers = []

const updateSubscribers = () => {
  subscribers.forEach(sub => sub(state))
}

export const mutate = (type, payload) => {
  if (type === 'ADD_CHATS') {
    state.chats = payload
  }
  updateSubscribers()
}