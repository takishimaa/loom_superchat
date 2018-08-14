import { reduxForm, formValueSelector, Form, Field } from 'redux-form'
import { connect } from 'react-redux'
import presentIcon from 'Images/present.svg'
import closeIcon from 'Images/close.svg'

class MessageInput extends Component {
  static get propTypes() {
    return {      
      assetSelectOpend: PropTypes.bool.isRequired,
      onPresentClicked: PropTypes.func.isRequired,
      onSendClicked: PropTypes.func.isRequired,
    }
  }

  onClickPresent() {
    this.props.onPresentClicked()
  }  

  onClickSubmit(e) {
    e.preventDefault()
    this.props.onSendClicked(this.props.resultValue.body)

  }

  render() {
    const { assetSelectOpend, selectedAsset } = this.props
    let assetButtonImage;
    if (selectedAsset) {
      assetButtonImage = selectedAsset.image
    } else {
      assetButtonImage = assetSelectOpend ? closeIcon : presentIcon
    }

    return (
      <Wrap>
        <Inner onSubmit={this.onClickSubmit.bind(this)}>
          <TextInput
            component="textarea"
            placeholder="Input message here"
            name="body" />
          <ButtonGroup>
            <AssetSelectButton onClick={this.onClickPresent.bind(this)}>
              <AssetSelectButtonImage src={assetButtonImage} />
            </AssetSelectButton>
            <SendButton onClick={this.onClickSubmit.bind(this)}>送信</SendButton>
          </ButtonGroup>
        </Inner>
      </Wrap>
    )
  }
}

const selector = formValueSelector('MessageInput')
const MessageInputForm = reduxForm({ form: 'MessageInput' })(MessageInput)
export default connect(state => ({
  initialValues: {},
  resultValue: {
    body: selector(state, 'body')
  }
}))(MessageInputForm)

const Wrap = styled.div`
  height: 114px;
  background: ${Colors.MAIN20};
  border-top: 1px solid ${Colors.MAIN80};
  border-bottom: 1px solid ${Colors.MAIN80};
`

const Inner = styled(Form)`
  padding: 12px 10px;
`

const TextInput = styled(Field)`
  width: 100%;
  height: 60px;
  background: ${Colors.WHITE100};
  border: 1px solid ${Colors.BLACK54};
  border-radius: 4px;
  padding: 4px 6px;
  resize: none;
`

const ButtonGroup = styled.div`
  float: right;
  margin-top: 5px;
`

const AssetSelectButton = styled.button`
  margin-right: 8px;
  cursor: pointer;
`

const AssetSelectButtonImage = styled.img`
  width: 20px;
  height: 20px;
  margin-top: -2px;
`

const SendButton = styled.button`
  background-color: ${Colors.MAIN100};
  color: ${Colors.WHITE100};
  padding: 4px 8px;
  font-weight: bold;
  font-size: 1.0rem;
  border-radius: 4px;
  cursor: pointer;  
`