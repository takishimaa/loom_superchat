export default class AssetSelect extends Component {
  getAssets () {
    return [
      {
        name: 'Gold',
        image: 'https://cryptocrystal.io/crystals/acharacters/001.png'
      },
      {
        name: 'Pink Diamond',
        image: 'https://cryptocrystal.io/crystals/acharacters/068.png'
      },
      {
        name: 'Black Diamond',
        image: 'https://cryptocrystal.io/crystals/acharacters/069.png'
      },
      {
        name: 'Copper',
        image: 'https://cryptocrystal.io/crystals/acharacters/003.png'
      },
      {
        name: 'Hauynite',
        image: 'https://cryptocrystal.io/crystals/acharacters/078.png'
      },
      {
        name: 'Alexandrite',
        image: 'https://cryptocrystal.io/crystals/acharacters/024.png'
      },
      {
        name: 'Red Diamond',
        image: 'https://cryptocrystal.io/crystals/acharacters/066.png'
      }
    ]
  }

  onClickCell(e) {
    const index = e.target.getAttribute('data-index')
    const asset = this.getAssets()[index]
    this.props.onSelect(asset)
  }

  render() {
    return (
      <Wrap>
        <Title>Select Token</Title>
        <AssetCollection>
          {this.getAssets().map((asset, i) => (
            <AssetCell key={asset.name}>
              <img src={asset.image} onClick={this.onClickCell.bind(this)} data-index={i} />
            </AssetCell>
          ))}
        </AssetCollection>
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  padding: 16px 10px;
`

const Title = styled.h3`
  font-weight: bold;
  font-size: 1.6rem;
  margin: 0 0 10px 8px;

`

const AssetCollection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`

const AssetCell = styled.div`
  width: 92px;
  height: 92px;
  padding: 6px;
  border-radius: 4px;
  background: ${Colors.WHITE100};
  transition: background-color 0.2s ease-out;
  cursor: pointer;

  &:hover {
    background: ${Colors.BLACK12};
  }
`