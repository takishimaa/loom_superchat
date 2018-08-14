import TimeAgo from 'javascript-time-ago'

export default class TextMessageCell extends Component {
  static get propTypes() {
    return {
      message: PropTypes.shape({
        createdAt: PropTypes.number.isRequired,
        owner: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired
    }
  }

  constructor(args) {
    super(args)
    this.timeAgo = new TimeAgo('en-US')
  }

  render() {
    const { message } = this.props
    return (
      <Wrap>
        <Inner>
          <Name>{message.owner}</Name>
          <Time>{this.timeAgo.format(message.createdAt * 1000, 'twitter')}</Time>
          <Message>{message.text}</Message>
        </Inner>
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  min-height: 60px;
  border-bottom: 1px solid ${Colors.BLACK12};
`

const Inner = styled.div`
  padding: 8px 10px;
`

const Name = styled.strong`
  font-size: 1.15rem;
  color: ${Colors.BLACK87};
`

const Time = styled.time`
  float: right;
  color: ${Colors.BLACK54}
`

const Message = styled.p`
  font-size: 1.15rem;
  margin-top: 5px;
  color: ${Colors.BLACK87};
  line-height: 120%;
`