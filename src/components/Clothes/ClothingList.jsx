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
          <table>
            <tbody>
            {checkFunction(clothesList, 1) ? 
              <> 
              <tr>
                <th>
                  Hats:
                </th>
              </tr>
                {mapFunction(clothesList, 1)}
              </> 
            : <></>}
            {checkFunction(clothesList, 2) ? 
              <> 
              <tr>
                <th>
                  Gloves:
                </th>
              </tr>
                  {mapFunction(clothesList, 2)}
              </> 
            : <></>}
            {checkFunction(clothesList, 3) ? 
              <> 
              <tr>
                <th>
                  Socks:
                </th>
              </tr>
                  {mapFunction(clothesList, 3)}
              </> 
            : <></>}
            {checkFunction(clothesList, 4) ? 
              <> 
            <tr>
                <th>
                  Base layer - tops:
                </th>
              </tr>
                  {mapFunction(clothesList, 4)}
              </> 
            : <></>}
            {checkFunction(clothesList, 5) ? 
              <> 
              <tr>
                <th>
                  Base layer - bottoms:
                </th>
              </tr>
                  {mapFunction(clothesList, 5)}
              </> 
            : <></>}
            {checkFunction(clothesList, 10) ? 
              <> 
              <tr>
                <th>
                  Mid layer - tops:
                </th>
              </tr>
                  {mapFunction(clothesList, 10)}
              </> 
            : <></>}
            {checkFunction(clothesList, 6) ? 
              <> 
              <tr>
                <th>
                  Jackets:
                </th>
              </tr>
                  {mapFunction(clothesList, 6)}
              </> 
            : <></>}
            {checkFunction(clothesList, 7) ? 
              <> 
              <tr>
                <th>
                  Pants:
                </th>
              </tr>
                  {mapFunction(clothesList, 7)}
              </> 
            : <></>}
            {checkFunction(clothesList, 8) ? 
              <> 
              <tr>
                <th>
                  Accessories:
                </th>
              </tr>
                  {mapFunction(clothesList, 8)}
              </> 
            : <></>}
            {checkFunction(clothesList, 9) ? 
              <> 
              <tr>
                <th>
                  Other:
                </th>
              </tr>
                  {mapFunction(clothesList, 9)}
              </> 
            : <></>}
            </tbody>
          </table>
        </div>
        : <>
            <h1>No clothes in your inventory</h1>
            <button onClick={addClothes}>Add Clothes</button>
          </>}
    </div>
  );
}

export default ClothingList;