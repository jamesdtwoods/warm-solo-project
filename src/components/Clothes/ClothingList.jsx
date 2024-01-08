import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ClothingItem from './ClothingItem';

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
          <Button size='sm' variant='add' onClick={addClothes}>Add Clothes to Closet</Button>
          <h2>Closet</h2>
          {checkFunction(clothesList, 1) ? 
            <> <p className='list-bold'>Hats:</p> 
              <ul>
                {mapFunction(clothesList, 1)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 2) ? 
            <> <p className='list-bold'>Gloves:</p> 
              <ul>
                {mapFunction(clothesList, 2)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 3) ? 
            <> <p className='list-bold'>Socks:</p> 
              <ul>
                {mapFunction(clothesList, 3)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 4) ? 
            <> <p className='list-bold'>Base Layer - Top:</p> 
              <ul>
                {mapFunction(clothesList, 4)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 5) ? 
            <> <p className='list-bold'>Base Layer - Bottom:</p> 
              <ul>
                {mapFunction(clothesList, 5)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 6) ? 
            <> <p className='list-bold'>Jackets:</p> 
              <ul>
                {mapFunction(clothesList, 6)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 7) ? 
            <> <p className='list-bold'>Pants:</p> 
              <ul>
                {mapFunction(clothesList, 7)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 8) ? 
            <> <p className='list-bold'>Accessories:</p> 
              <ul>
                {mapFunction(clothesList, 8)}
              </ul>
            </> 
          : <></>}
          {checkFunction(clothesList, 9) ? 
            <> <p className='list-bold'>Other:</p> 
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