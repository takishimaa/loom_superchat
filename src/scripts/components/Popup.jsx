import MessageInput from 'Components/MessageInput'
import TextMessageCell from 'Components/TextMessageCell'

export default class Popup extends Component {
  getMessages() {
    return [
      {
        id: '1',
        owner: '0x6e82597b1ee5efee295c3425da062e238a68d5bd',
        message: 'こんにちはこんにちは！！'
      },
      {
        id: '2',
        owner: '0x6e82597b1ee5efee295c3425da062e238a68d5bd',
        message: 'こんにちはこんにちは！！'
      },
      {
        id: '3',
        owner: '0x6e82597b1ee5efee295c3425da062e238a68d5bd',
        message: 'こんにちはこんにちは！！'
      },
      {
        id: '4',
        owner: '0x6e82597b1ee5efee295c3425da062e238a68d5bd',
        message: 'こんにちはこんにちは！！'
      },
      {
        id: '5',
        owner: '0x6e82597b1ee5efee295c3425da062e238a68d5bd',
        message: 'こんにちはこんにちは！！'
      },
      {
        id: '6',
        owner: '0x6e82597b1ee5efee295c3425da062e238a68d5bd',
        message: 'こんにちはこんにちは！！'
      }
    ]
  }

  render() {
    return (
      <Wrapper>
        <Header>
          <Title>nagesen</Title>
        </Header>        
        <MessageInput />

        <MessageTable>
          {this.getMessages().map(message => (
            <TextMessageCell key={message.id} message={message} />
          ))}
        </MessageTable>

      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-width: 400px;
  min-height: 500px;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  background-color: ${Colors.MAIN80};
  align-items: center;
`
const Title = styled.h1`
  width: 90%;
  margin: auto;
  font-size: 1.4rem;
  color: ${Colors.WHITE100};
`

const MessageTable = styled.div`

`