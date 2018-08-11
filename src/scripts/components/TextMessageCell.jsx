
export default class TextMessageCell extends Component {
  static get propTypes() {
    return {
      message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      }).isRequired
    }
  }

  render() {
    return (
      <Wrap>        
        text cell
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  min-height: 50px;
  border-bottom: 1px solid ${Colors.BLACK12}
`