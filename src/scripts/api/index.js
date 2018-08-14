import Contract from './contract'

export const initializeContract = () => (
  new Promise(async (resolve, reject) => {
    try {
      const contract = new Contract()
      await contract.loadContract()
      window.contract = contract
      resolve({
        payload: {
          contract
        }
      })
    } catch(error) {
      reject({ error })
    }
  })
)

export const getMessages = args => (
  new Promise(async (resolve, reject) => {
    try {
      const messages = await window.contract.getMessages(args)
      resolve({ 
        payload: {
          messages
        }
      })
    } catch(error) {
      reject({ error })
    }
  })
)

export const createRoom = args => (
  new Promise(async (resolve, reject) => {
    try {
      const result = await window.contract.createRoom(args)
      resolve({ 
        payload: {
          roomId: args,
          result
        }
      })
    } catch(error) {
      reject({ error })
    }
  })
)

export const postMessage = args => (
  new Promise(async (resolve, reject) => {
    try {
      const result = await window.contract.postMessage(args.roomId, args.message)
      resolve({ 
        payload: {
          result
        }
      })
    } catch(error) {
      reject({ error })
    }
  })
)