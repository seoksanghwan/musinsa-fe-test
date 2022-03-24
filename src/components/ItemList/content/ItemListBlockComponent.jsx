import React from "react";
import styled from "styled-components";
import * as _ from 'lodash';
import { ItemDataBoxComponent } from "./ItemDataBoxComponent";
import { NoneItemComponent } from "./NoneItemComponent";

export const ItemListBlockComponent = ({
  itemListArr, 
  setLastElement, 
  handleImgError,
  mappingFilterFuntion,
  selectCatreGorisArr,
  isLoading
}) => {

  // 세일, 단독, 품절 전용 필터링
  const CategoriesItem = _.filter(itemListArr, data =>  mappingFilterFuntion(data, selectCatreGorisArr));

  return(
    <>
      <ItemListBlock> 
      {
      isLoading &&
        _.map(CategoriesItem, (data, idx) => 
          <ItemDataBoxComponent 
            data={data} 
            key={`${data.goodsNo}-${idx}`} 
            setLastElement={setLastElement}
            handleImgError={handleImgError}
          /> 
        ) 
      }
    </ItemListBlock> 
    {!CategoriesItem.length && <NoneItemComponent/>}
    </>
  );
}



const ItemListBlock = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  background-color:#FFFFFF;
`;
