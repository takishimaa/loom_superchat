import {
  Client, LocalAddress, CryptoUtils, LoomProvider
} from 'loom-js'

import Web3 from 'web3'
import Main from 'Contracts/Main.json'

export default class Contract {
  async loadContract() {
    this.onEvent = null
    this._createClient()
    this._createCurrentUserAddress()
    this._createWebInstance()
    await this._createContractInstance()
  }

  _createClient() {
    this.privateKey = CryptoUtils.generatePrivateKey()
    this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey)
    this.client = new Client(
      'default',
      'ws://127.0.0.1:46657/websocket',
      'ws://127.0.0.1:9999/queryws',
    )

    this.client.on('error', msg => {
      console.error('Error on connect to client', msg)
      console.warn('Please verify if loom command is running')
    })
  }

  _createCurrentUserAddress() {
    this.currentUserAddress = LocalAddress.fromPublicKey(this.publicKey).toString()
  }

  _createWebInstance() {
    this.web3 = new Web3(new LoomProvider(this.client, this.privateKey))
  }

  async _createContractInstance() {
    const networkId = await this._getCurrentNetwork()

    this.currentNetwork = Main.networks[networkId]

    if (!this.currentNetwork) {
      throw Error('Contract not deployed on DAppChain')
    }

    const ABI = Main.abi
    this.mainInstance = new this.web3.eth.Contract(ABI, this.currentNetwork.address, {
      from: this.currentUserAddress
    })
  }

  addEventListener(fn) {
    this.onEvent = fn
  }

  async _getCurrentNetwork() {
    return await this.web3.eth.net.getId()
  }

  async getRoom(roomId) {
    return await this.mainInstance.methods.getRoom(roomId).call({ from: this.currentUserAddress })
  }

  async createRoom(id) {
    return await this.mainInstance.methods.createRoom(id).send({ from: this.currentUserAddress })
  }

  async getMessages(roomId) {
    const result = await this.mainInstance.methods.getMessages(roomId).call({ from: this.currentUserAddress })
    return result['owner'].map((owner, i) => ({
      owner,
      text: this.web3.utils.toAscii(result['text'][i]),
      createdAt: parseInt(result['createdAt'][i])
    })).sort((a, b) => b.createdAt - a.createdAt);
  }

  async postMessage(roomId, message) {
    return await this.mainInstance.methods.postMessage(roomId, message).send({ from: this.currentUserAddress })
  }
}