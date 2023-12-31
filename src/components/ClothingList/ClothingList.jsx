import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import ClothingItem from '../ClothingItem/ClothingItem';

function ClothingList() {
  const dispatch = useDispatch();
  const clothesList = useSelector(store => store.clothingReducer.clothingList);

  useEffect(() => {
      dispatch({
          type: 'SAGA/FETCH_CLOTHES'
        })
  }, []); 

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
      return(
      <>
        <ul>
          <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
        </ul>
      </>)
    })
  }

  return (
    <div className="container">
      <h3>This is the clothing list</h3>
      {checkFunction(clothesList, 1) ? 
        <> <h3>Hats:</h3> 
          {mapFunction(clothesList, 1)}
        </> 
      : <></>}
      {checkFunction(clothesList, 2) ? 
        <> <h3>Gloves:</h3> 
          {mapFunction(clothesList, 2)}
        </> 
      : <></>}
      {checkFunction(clothesList, 3) ? 
        <> <h3>Socks:</h3> 
          {mapFunction(clothesList, 3)}
        </> 
      : <></>}
      {checkFunction(clothesList, 4) ? 
        <> <h3>Base Layer - Torso:</h3> 
          {mapFunction(clothesList, 4)}
        </> 
      : <></>}
      {checkFunction(clothesList, 5) ? 
        <> <h3>Base Layer - Legs:</h3> 
          {mapFunction(clothesList, 5)}
        </> 
      : <></>}
      {checkFunction(clothesList, 6) ? 
        <> <h3>Jackets:</h3> 
          {mapFunction(clothesList, 6)}
        </> 
      : <></>}
      {checkFunction(clothesList, 7) ? 
        <> <h3>Pants:</h3> 
          {mapFunction(clothesList, 7)}
        </> 
      : <></>}
      {checkFunction(clothesList, 8) ? 
        <> <h3>Accessories:</h3> 
          {mapFunction(clothesList, 8)}
        </> 
      : <></>}
      {checkFunction(clothesList, 9) ? 
        <> <h3>Other:</h3> 
          {mapFunction(clothesList, 9)}
        </> 
      : <></>}
    </div>
  );
}

export default ClothingList;