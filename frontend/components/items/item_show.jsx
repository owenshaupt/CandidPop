import React from 'react';
import { Link } from 'react-router-dom';

class ItemShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.itemId);
  }
  
  componentDidUpdate(prevProps) { // when props or state change this will run
    if (prevProps.match.params.itemId !== this.props.match.params.itemId) {
      this.props.fetchItem(this.props.match.params.itemId);
    }
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteItem(this.props.item.id)
      .then(() => { this.props.history.push('/items/') })
  }

  render() {
    if (!this.props.item || !this.props.item.user || !this.props.item.photos) {
      return null; // returning react-spinner loader (component)
    }

    return (
      <div className='item-show-page-body'>
        <div className='item-show'>

          <div className='item-show-item-photos'>
            <ul>
              {this.props.item.photos.map(photo => {
                return (<li key={photo.photoUrl} className='item-image-container'>
                  <img className='item-image' src={photo.photoUrl}/>
                </li>)
              })}
            </ul>
          </div>

          <div className='item-show-item-info'>
            <Link to={`/${this.props.user}`}>
              <div>
                <div id='userphoto'></div>
              </div>
            </Link>

            <div className='item-show-seller'>
              <Link to={`/${this.props.user}`}>
                  <div className='item-seller-username'>
                    {this.props.item.user.username}
                  </div>
              </Link>
              
              <Link to={`/${this.props.user}`}>
                <div className='item-seller-location'>
                  {this.props.item.user.location}
                </div>
              </Link>
            </div>

            <div className='item-show-description'>
              {this.props.item.description}
            </div>

            <div className='item-show-table-holder'>
              <table className='item-price-table'>
                <tbody className='item-price-table-body'>
                  <tr className='item-price-table-row'>
                    <th className='item-price-header'>Price</th>
                    <td className='item-price-data'>${this.props.item.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='item-show-listed-time'>
              <table className='item-price-table'>
                <tbody className='item-price-table-body'>
                  <tr className='item-price-table-row item-show-listed-time'>
                    <th className='item-price-header'>LISTED 1 HOUR AGO -- CHANGE THIS</th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='item-purchase'>
              {(this.props.user === this.props.item.seller_id) ? 
                <div>
                  <Link to={`/items/${this.props.item.id}/edit/`}>
                    <button
                      id='update-item-button'
                      className='button item-purchase-button'>Update item
                    </button>
                  </Link>

                  <button
                    onClick={this.handleDelete}
                    id='delete-item-button'
                    className='button item-purchase-button'
                  >Delete item</button>
                </div> :
                
                <button
                  className='button item-purchase-button'
                  onClick={this.handleDelete}
                >Buy now</button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default ItemShow;
