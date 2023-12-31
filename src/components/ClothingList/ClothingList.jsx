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
        {clothesList.filter(isHat).map((clothingItem) => (
          <>
            <h3>Hats:</h3>
            <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
          </>
        ))}
        {clothesList.filter(isGloves).map((clothingItem) => (
          <>
            <h3>Gloves:</h3>
            <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
          </>  
        ))}
        {clothesList.filter(isSocks).map((clothingItem) => (
          <>
            <h3>Socks:</h3>
            <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
          </>
        ))}
        {clothesList.filter(isBaseTorso).map((clothingItem) => (
          <>
            <h3>Base Layer - Torso:</h3>
            <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
          </>
        ))}
        {clothesList.filter(isBaseLegs).map((clothingItem) => (
          <>
            <h3>Base Layer - Legs:</h3>
            <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
          </>
        ))}
        {clothesList.filter(isJacket).map((clothingItem) => (
          <>
            <h3>Jackets:</h3>
            <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
          </>  
        ))}
        {clothesList.filter(isPants).map((clothingItem) => (
          <>
            <h3>Pants:</h3>
            <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
          </>  
        ))}
        {clothesList.filter(isAccessories).map((clothingItem) => (
          <>
            <h3>Accessories:</h3>
            <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
          </>  
        ))}
        {clothesList.filter(isOther).map((clothingItem) => (
          <>
            <h3>Other:</h3>
            <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
          </>  
        ))}
    </div>
  );
}

export default ClothingList;