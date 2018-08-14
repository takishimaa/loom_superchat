
import { connect } from 'react-redux'
import Popup from 'Components/Popup'
import { actions } from 'Modules/popup'

const mapStateToProps = state => ({
  initializingContract: !!state.popup.initializingContract,
  creatingRoom: !!state.popup.creatingRoom,
  assetSelectOpend: !!state.popup.assetSelectOpend,
  messages: state.popup.messages,
  sending: !!state.popup.sending,
  selectedAsset: state.popup.selectedAsset
})

const mapDispatchToProps = dispatch => ({
  initializeContract: () => dispatch(actions.initializeContract()),
  createRoom: roomId => dispatch(actions.createRoom(roomId)),
  getMessages: roomId => dispatch(actions.getMessages(roomId)),
  postMessage: (roomId, message) => dispatch(actions.sendTextMessage({ roomId, message })),
  openAssetSelect: () => dispatch(actions.openAssetSelect()),
  closeAssetSelect: () => dispatch(actions.closeAssetSelect()),
  selectAsset: asset => dispatch(actions.selectAsset(asset)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Popup)