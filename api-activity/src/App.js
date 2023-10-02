import { useState, useEffect } from "react";
import "./App.css";
import Modal from "react-modal";
import ReactStars from "react-stars";

Modal.setAppElement("#root");

function App() {
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const itemRequest = await fetch("https://fakestoreapi.com/products");
      const itemData = await itemRequest.json();
      setShopItems(itemData);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>El Yunque</h1>
      <h3>Amazons' baby cousin</h3>
      <div className="ItemWindow">
        {shopItems.map((currentItem, index) => {
          return <Item key={index} itemInfo={currentItem} />;
        })}
      </div>
    </div>
  );
}

const Item = ({ itemInfo }) => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <div className="Item" onClick={openModal}>
        <img className="ItemImage" src={itemInfo.image} alt={itemInfo.title} />
      </div>{" "}
      <Modal className="ModalStyle" isOpen={modal} onRequestClose={closeModal}>
        <img className="ItemImage" src={itemInfo.image} alt={itemInfo.title} />
        <h1>{itemInfo.title}</h1>
        <h1>£{itemInfo.price}</h1>
        <div className="rating">
          <ReactStars value={itemInfo.rating.rate} size={24} edit={false} />
          <h2>{itemInfo.rating.rate}</h2>
        </div>
        <h3>Total reviews : {itemInfo.rating.count}</h3>
        <p>Description : {itemInfo.description}</p>
        <p>Category : {itemInfo.category}</p>
      </Modal>
    </>
  );
};
export default App;
