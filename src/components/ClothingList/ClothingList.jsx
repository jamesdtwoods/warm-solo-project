import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import ClothingItem from '../ClothingItem/ClothingItem';


function ClothingList() {
  const dispatch = useDispatch();

  const clothesList = useSelector(store => store.clothingReducer.clothingListReducer);

  useEffect(() => {
      dispatch({
          type: 'SAGA/FETCH_CLOTHES'
        })
  }, []); 

  return (
    <div className="container">
      <h3>This is the clothing list</h3>
      <ul>
          {clothesList.map((clothingItem) => (
              
              <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
              
          ))}
      </ul>
    </div>
  );
}

export default ClothingList;