import connect from './openConnection'

connect(() => {
  console.log('Connected to mongo server.')
})