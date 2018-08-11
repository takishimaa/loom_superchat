import COLORS from "./styles/colors";

export default class MessageInput extends Component {
  render() {
    return (
      <Wrap>
        <TextInput type="text" value="ここがmessage input" onChange={() => {}} />
        <AssetSelectButton>T</AssetSelectButton>
        <SendButton>送信</SendButton>
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  height: 50px;
  background: tomato;
`

const TextInput = styled.input`
  width: 200px;
  background: ${Colors.WHITE100};
  border: 1px solid ${Colors.BLACK54};
`

const AssetSelectButton = styled.button`

`

const SendButton = styled.button`

`