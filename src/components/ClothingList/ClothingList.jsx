import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import ClothingItem from '../ClothingItem/ClothingItem';

function ClothingList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const clothesList = useSelector(store => store.clothingReducer.clothingList);

  useEffect(() => {
      dispatch({
          type: 'SAGA/FETCH_CLOTHES'
        })
  }, []); 

  const checkAllFunction = (clothesList) => {
    let check = false;
    for (let item of clothesList) {
      check = true;
    }
    return check;
  }

  const checkFunction = (clothesList, clothing_type_id) => {
    let check = false;
    for (let item of clothesList) {
      if (item.clothing_type_id === clothing_type_id) {
        check = true;
      }
    }
    return check;
  }

  const mapFunction = (clothesList, clothing_type_id) => {
    let itemArray=[]
    for (let item of clothesList) {
      if(item.clothing_type_id === clothing_type_id){
        itemArray.push(item);
      }
    }
    return itemArray.map((clothingItem) => {
      return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
    })
  }

  const addClothes = () => {
    history.push(`/newClothes`)
  }

  return (
    <div className="container">
      {checkAllFunction(clothesList) ?  
        <div>
          <button onClick={addClothes}>Add Clothes to Closet</button>
          <h2>Closet</h2>
          {checkFunction(clothesList, 1) ? 
            <> <h3>Hats:</h3> 
              <ul>
                {mapFunction(clothesList, 1)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 2) ? 
            <> <h3>Gloves:</h3> 
              <ul>
                {mapFunction(clothesList, 2)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 3) ? 
            <> <h3>Socks:</h3> 
              <ul>
                {mapFunction(clothesList, 3)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 4) ? 
            <> <h3>Base Layer - Torso:</h3> 
              <ul>
                {mapFunction(clothesList, 4)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 5) ? 
            <> <h3>Base Layer - Legs:</h3> 
              <ul>
                {mapFunction(clothesList, 5)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 6) ? 
            <> <h3>Jackets:</h3> 
              <ul>
                {mapFunction(clothesList, 6)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 7) ? 
            <> <h3>Pants:</h3> 
              <ul>
                {mapFunction(clothesList, 7)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 8) ? 
            <> <h3>Accessories:</h3> 
              <ul>
                {mapFunction(clothesList, 8)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 9) ? 
            <> <h3>Other:</h3> 
              <ul>
                {mapFunction(clothesList, 9)}
              </ul>
            </> 
          : <></>}
        </div>
        : <>
            <h1>No clothes in your inventory</h1>
            <button onClick={addClothes}>Add Clothes</button>
          </>}
    </div>
  );
}

export default ClothingList;