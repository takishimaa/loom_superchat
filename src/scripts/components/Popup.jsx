import MessageInput from 'Components/MessageInput'
import TextMessageCell from 'Components/TextMessageCell'
import AssetSelect from 'Components/AssetSelect'
import icon48 from 'Images/icon48.png'

export default class Popup extends Component {
  static get propTypes() {
    return {
      initializingContract: PropTypes.bool.isRequired,
      creatingRoom: PropTypes.bool.isRequired,      
      messages: PropTypes.array,
      assetSelectOpend: PropTypes.bool.isRequired,
      initializeContract: PropTypes.func.isRequired,
      openAssetSelect: PropTypes.func.isRequired,
      closeAssetSelect: PropTypes.func.isRequired,
      getMessages: PropTypes.func.isRequired,
      postMessage: PropTypes.func.isRequired,
      sending: PropTypes.bool.isRequired
    }
  }

  constructor(args) {
    super(args)
    this.roomId = 72346; // Math.floor(Math.random() * 99999);
  }

  componentDidMount() {
    this.props.initializeContract()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initializingContract && 
      !this.props.initializingContract) {      
      // this.props.createRoom(this.roomId)
      this.props.getMessages(this.roomId)
      this.watchEvents()
    }

    if (prevProps.sending && !this.props.sending) {
      this.props.getMessages(this.roomId)
    }
  }

  watchEvents() {
    window.contract.mainInstance.events.PostMessage({}, (err, event) => {
      if (err) {
        console.error('Error on event', err)
        return
      }
      this.props.getMessages(this.roomId)
    })
  }

  toggleAssetSelect() {
    const { assetSelectOpend, openAssetSelect, closeAssetSelect } = this.props
    assetSelectOpend ? closeAssetSelect() : openAssetSelect()
  }

  sendMessage(text) {
    if (!text || text.length === 0) {
      return
    }
    this.props.postMessage(this.roomId, text)
  }

  onAssetSelect(asset) {
    this.props.closeAssetSelect()
    this.props.selectAsset(asset)
  }

  render() {
    const { messages, assetSelectOpend, selectedAsset } = this.props
    return (
      <Wrapper>
        <TopFixed>
          <Header>
            <HeaderIcon src={icon48} />
            <Title>nagesen</Title>
          </Header>

          <MessageInput
            selectedAsset={selectedAsset}
            assetSelectOpend={assetSelectOpend}
            onPresentClicked={this.toggleAssetSelect.bind(this)}
            onSendClicked={this.sendMessage.bind(this)} />
        </TopFixed>

        <MainArea>          
          {assetSelectOpend ? (
            <AssetSelect
              onSelect={this.onAssetSelect.bind(this)} />
          ) : (
            <MessageTable>
              {messages ? messages.map(message => (
                <TextMessageCell
                  key={message.createdAt}
                  message={message} />
              )) : null}
            </MessageTable> 
          )}
        </MainArea>

      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-width: 400px;
  min-height: 500px;
`

const TopFixed = styled.div`
  position: fixed;
  width: 100%;
`

const Header = styled.header`
  display: flex;
  padding: 12px 10px;
  background-color: ${Colors.WHITE100};
  align-items: center;
`
const HeaderIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px; 
  border: 1px solid ${Colors.BLACK12};
`

const Title = styled.h1`
  font-size: 1.4rem;
  margin-left: 6px;
  color: ${Colors.MAIN80};
`

const MainArea = styled.div`
  padding-top: 168px;
  overflow: scroll;
`
const MessageTable = styled.div`
`