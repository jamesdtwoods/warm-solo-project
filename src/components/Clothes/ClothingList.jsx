import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ClothingItem from './ClothingItem';
import Pagination from '../Pagination/Pagination';

let PageSize = 5;

function ClothingList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const clothesList = useSelector(store => store.clothingReducer.clothingList);

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_CLOTHES'
    })
    window.scrollTo(top)
  }, []);

  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [currentPage5, setCurrentPage5] = useState(1);
  const [currentPage6, setCurrentPage6] = useState(1);
  const [currentPage7, setCurrentPage7] = useState(1);
  const [currentPage8, setCurrentPage8] = useState(1);
  const [currentPage9, setCurrentPage9] = useState(1);
  const [currentPage10, setCurrentPage10] = useState(1);
  const typeArray = (clothesList, clothing_type_id) => {
    let itemArray = []
    for (let item of clothesList) {
      if (item.clothing_type_id === clothing_type_id) {
        itemArray.push(item);
      }
    }
    return itemArray;
  }

  const currentTableData1 = useMemo(() => {
    const firstPageIndex = (currentPage1 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(clothesList, 1).slice(firstPageIndex, lastPageIndex);
  }, [clothesList, currentPage1]);
  const currentTableData2 = useMemo(() => {
    const firstPageIndex = (currentPage2 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(clothesList, 2).slice(firstPageIndex, lastPageIndex);
  }, [clothesList, currentPage2]);
  const currentTableData3 = useMemo(() => {
    const firstPageIndex = (currentPage3 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(clothesList, 3).slice(firstPageIndex, lastPageIndex);
  }, [clothesList, currentPage3]);
  const currentTableData4 = useMemo(() => {
    const firstPageIndex = (currentPage4 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(clothesList, 4).slice(firstPageIndex, lastPageIndex);
  }, [clothesList, currentPage4]);
  const currentTableData5 = useMemo(() => {
    const firstPageIndex = (currentPage5 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(clothesList, 5).slice(firstPageIndex, lastPageIndex);
  }, [clothesList, currentPage5]);
  const currentTableData6 = useMemo(() => {
    const firstPageIndex = (currentPage6 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(clothesList, 6).slice(firstPageIndex, lastPageIndex);
  }, [clothesList, currentPage6]);
  const currentTableData7 = useMemo(() => {
    const firstPageIndex = (currentPage7 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(clothesList, 7).slice(firstPageIndex, lastPageIndex);
  }, [clothesList, currentPage7]);
  const currentTableData8 = useMemo(() => {
    const firstPageIndex = (currentPage8 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(clothesList, 8).slice(firstPageIndex, lastPageIndex);
  }, [clothesList, currentPage8]);
  const currentTableData9 = useMemo(() => {
    const firstPageIndex = (currentPage9 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(clothesList, 9).slice(firstPageIndex, lastPageIndex);
  }, [clothesList, currentPage9]);
  const currentTableData10 = useMemo(() => {
    const firstPageIndex = (currentPage10 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(clothesList, 10).slice(firstPageIndex, lastPageIndex);
  }, [clothesList, currentPage10]);

  const checkAllFunction = (clothesList) => {
    let check = false;
    for (let item of clothesList) {
      check = true;
    }
    return check;
  }

  const checkFunction = (clothesList, clothing_type_id) => {
    let count = null;
    for (let item of clothesList) {
      if (item.clothing_type_id === clothing_type_id) {
        count += 1;
      }
    }
    return count;
  }

  // const mapFunction = (clothesList, clothing_type_id) => {
  //   let itemArray = []
  //   for (let item of clothesList) {
  //     if (item.clothing_type_id === clothing_type_id) {
  //       itemArray.push(item);
  //     }
  //   }
  //   return itemArray.map((clothingItem) => {
  //     return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
  //   })
  // }



  const addClothes = () => {
    history.push(`/newClothes`)
  }

  return (
    <div className="container">
      {checkAllFunction(clothesList) ?
        <div>
          <Button size='md' variant='add' onClick={addClothes}>Add Clothes to Closet</Button>
          <h2>Closet</h2>

          {checkFunction(clothesList, 1) ?
            <>
              <table>
                <tbody>
                  <tr>
                    <th>
                      Hats:
                    </th>
                  </tr>
                  {currentTableData1.map((clothingItem) => {
                    return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage1}
                totalCount={checkFunction(clothesList, 1)}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage1(page)}
              />
            </>
            : <></>}
          {checkFunction(clothesList, 2) ?
            <>
              <table>
                <thead>
                  <tr>
                    <th>
                      Gloves:
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {currentTableData2.map((clothingItem) => {
                    return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage2}
                totalCount={checkFunction(clothesList, 2)}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage2(page)}
              />
            </>
            : <></>}
          {checkFunction(clothesList, 3) ?
            <>
            <table>
              <tbody>
                <tr>
                  <th>
                    Socks:
                  </th>
                </tr>
                {currentTableData3.map((clothingItem) => {
                  return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
                })}
              </tbody>
            </table>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage3}
              totalCount={checkFunction(clothesList, 3)}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage3(page)}
            />
          </>
            : <></>}
          {checkFunction(clothesList, 4) ?
            <>
              <table>
                <tbody>
                  <tr>
                    <th>
                      Base Layer - Tops:
                    </th>
                  </tr>
                  {currentTableData4.map((clothingItem) => {
                    return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage4}
                totalCount={checkFunction(clothesList, 4)}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage4(page)}
              />
            </>
            : <></>}
          {checkFunction(clothesList, 5) ?
            <>
              <table>
                <tbody>
                  <tr>
                    <th>
                      Base Layer - Bottoms:
                    </th>
                  </tr>
                  {currentTableData5.map((clothingItem) => {
                    return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage5}
                totalCount={checkFunction(clothesList, 5)}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage5(page)}
              />
            </>
            : <></>}
          {checkFunction(clothesList, 10) ?
            <>
              <table>
                <tbody>
                  <tr>
                    <th>
                      Mid Layer - Tops:
                    </th>
                  </tr>
                  {currentTableData10.map((clothingItem) => {
                    return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage10}
                totalCount={checkFunction(clothesList, 10)}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage10(page)}
              />
            </>
            : <></>}
          {checkFunction(clothesList, 6) ?
            <>
              <table>
                <tbody>
                  <tr>
                    <th>
                      Jackets:
                    </th>
                  </tr>
                  {currentTableData6.map((clothingItem) => {
                    return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage6}
                totalCount={checkFunction(clothesList, 6)}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage6(page)}
              />
            </>
            : <></>}
          {checkFunction(clothesList, 7) ?
            <>
              <table>
                <tbody>
                  <tr>
                    <th>
                      Pants:
                    </th>
                  </tr>
                  {currentTableData7.map((clothingItem) => {
                    return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage7}
                totalCount={checkFunction(clothesList, 7)}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage7(page)}
              />
            </>
            : <></>}
          {checkFunction(clothesList, 8) ?
            <>
              <table>
                <tbody>
                  <tr>
                    <th>
                      Accessories:
                    </th>
                  </tr>
                  {currentTableData8.map((clothingItem) => {
                    return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage8}
                totalCount={checkFunction(clothesList, 8)}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage8(page)}
              />
            </>
            : <></>}
          {checkFunction(clothesList, 9) ?
            <>
              <table>
                <tbody>
                  <tr>
                    <th>
                      Other:
                    </th>
                  </tr>
                  {currentTableData9.map((clothingItem) => {
                    return <ClothingItem key={clothingItem.id} clothingItem={clothingItem} />
                  })}
                </tbody>
              </table>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage9}
                totalCount={checkFunction(clothesList, 9)}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage9(page)}
              />
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