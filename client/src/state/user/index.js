const state = {
  user: null
}

const subscribers = []

const updateSubscribers = () => {
  subscribers.forEach(sub => sub.cb(state))
}

export const mutate = (type, payload) => {
  if (type === 'SET_USER') {
    state.user = payload
  }
  updateSubscribers()
}

export const subscribe = (subscriber, cb) => {
  subscribers.push({ subscriber, cb })
}

export const unsubscribe = subscriber => {
  const index = subscribers.findIndex(sub => sub.subscriber === subscriber)
  subscribers.splice(index, 1)
}