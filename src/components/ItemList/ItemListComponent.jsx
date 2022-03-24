import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { options } from "contents/const";
import { inject, observer } from "mobx-react";
import * as _ from 'lodash';
import { toJS } from "mobx";
import { ItemListBlockComponent } from "./content/ItemListBlockComponent";
import { NoneItemComponent } from "./content/NoneItemComponent";
import {LoaderSpiner} from "components/Comoon/LoderSpiner";

const ItemListComponent = props => {

  const {
    store : {
      itemListStore : {
        itemListArr,
        isLoading,
        searchAble,
        setPageNum,
        handleImgError,
        mappingFilterFuntion,
        getAllData,
      },
      filterStore : {
        selectCatreGorisArr,
        searchTextValue
      }
    }
  } = props;

  let loadElement = <LoaderSpiner/>;
  const [lastElement, setLastElement] = useState(null);
  
  const observer = useRef(
    new IntersectionObserver( (entries) => {
      const first = entries[0];
      if (first.isIntersecting) setPageNum()
    }, options)
  );

  useEffect(() => {
    if(searchTextValue) {
      getAllData(searchTextValue);
    }
  }, [searchTextValue]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    
    if (currentElement) currentObserver.observe(currentElement);

    return () => {
      if (currentElement) currentObserver.unobserve(currentElement);
    };
  }, [lastElement]);

  if(isLoading) {
    if(!itemListArr.length) {
      if(searchAble) {
        loadElement = <NoneItemComponent/>;
      }
    }
  }
  
  return (
    <ItemListContainer>
      {
        !toJS(itemListArr).length ? 
        loadElement :
        <ItemListBlockComponent 
          itemListArr={toJS(itemListArr)}
          setLastElement={setLastElement}
          handleImgError={handleImgError}
          mappingFilterFuntion={mappingFilterFuntion}
          selectCatreGorisArr={selectCatreGorisArr}
          isLoading={isLoading}
        />
      }
    </ItemListContainer>
  );
} 

const ItemListContainer = styled.div`
  width:100%;
  height:100%;
  position:relative;
  background-color:#FFFFFF;
  padding-bottom:20px;
`;

export default inject("store")(observer(ItemListComponent));