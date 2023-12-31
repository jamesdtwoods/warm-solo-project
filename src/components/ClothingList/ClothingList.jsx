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

  const isHat = (item) => {
    return item.clothing_type_id === 1;
  }

  const isGloves = (item) => {
    return item.clothing_type_id === 2;
  }

  const isSocks = (item) => {
    return item.clothing_type_id === 3;
  }

  const isBaseTorso = (item) => {
    return item.clothing_type_id === 4;
  }

  const isBaseLegs = (item) => {
    return item.clothing_type_id === 5;
  }

  const isJacket = (item) => {
    return item.clothing_type_id === 6;
  }

  const isPants = (item) => {
    return item.clothing_type_id === 7;
  }

  const isAccessories = (item) => {
    return item.clothing_type_id === 8;
  }

  const isOther = (item) => {
    return item.clothing_type_id === 9;
  }


  return (
    <div className="container">
      <h3>This is the clothing list</h3>
      <h3>Hats:</h3>
      <ul>
          {clothesList.filter(isHat).map((clothingItem) => (
              
              <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
              
          ))}
      </ul>
      <h3>Gloves:</h3>
      <ul>
          {clothesList.filter(isGloves).map((clothingItem) => (
              
              <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
              
          ))}
      </ul>
      <h3>Socks:</h3>
      <ul>
          {clothesList.filter(isSocks).map((clothingItem) => (
              
              <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
              
          ))}
      </ul>
      <h3>Base Layer - Torso:</h3>
      <ul>
          {clothesList.filter(isBaseTorso).map((clothingItem) => (
              
              <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
              
          ))}
      </ul>
      <h3>Base Layer - Legs:</h3>
      <ul>
          {clothesList.filter(isBaseLegs).map((clothingItem) => (
              
              <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
              
          ))}
      </ul>
      <h3>Jackets:</h3>
      <ul>
          {clothesList.filter(isJacket).map((clothingItem) => (
              
              <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
              
          ))}
      </ul>
      <h3>Pants:</h3>
      <ul>
          {clothesList.filter(isPants).map((clothingItem) => (
              
              <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
              
          ))}
      </ul>
      <h3>Accessories:</h3>
      <ul>
          {clothesList.filter(isAccessories).map((clothingItem) => (
              
              <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
              
          ))}
      </ul>
      <h3>Other:</h3>
      <ul>
          {clothesList.filter(isOther).map((clothingItem) => (
              
              <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
              
          ))}
      </ul>
    </div>
  );
}

export default ClothingList;