import React, { useEffect } from "react";
import styled from 'styled-components';
import {logoIMG} from 'contents/const';
import { inject, observer } from "mobx-react";
import { useLocation, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import QueryString from 'qs';
import { FilterBlockComponent } from "./content/FilterBlockComponent";
import { SearchBlockComponent } from "./content/SearchBlockComponent";
import { SelectFilterListComponent } from "./content/SelectFilterListComponent";

const HeaderComponent = props => {

  const {
    store : {
      filterStore : {
        searchBoxShowHideBoolean,
        selectCatreGorisArr,
        searchBoxShowHideClick,
        createSeleactFilterArr,
        closeSelectFilter,
        typoSearchValue,
        reloadData,
        reloadQueryData,
        searchBox,
        autoTypingAction,
        typingDebounce,
        AlldataList,
        autoSearchValue,
        autofilter,
        clickSearhvalue,
        keyBoardSearchvalueSelect,
        selectIndex
      },
      itemListStore : {
        formatData,
        keyEnterEvent,
      }
    }
  } = props;

  const selectBoxBoolean = selectCatreGorisArr.length ? true : false;
  const params = useParams();
  const location = useLocation();
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    if(Object.keys(queryData).length) {
      reloadQueryData(queryData, location.search, 'load') 
    }
  }, [Object.keys(queryData).length])

  useEffect(() => {
    if(!Object.keys(queryData).length) {
      reloadData(formatData);
    } else {
      reloadQueryData(queryData, location.search, 'load') 
    }
}, [params]);

  return (
    <HeaderBox>
      <TitleBlock>
        <NavLink exact to="/"></NavLink>
      </TitleBlock>
      
      {/* 필터링 토글 버튼*/}
      <FilterBlockComponent 
        searchBoxShowHideClick={searchBoxShowHideClick}
        searchBoxShowHideBoolean={searchBoxShowHideBoolean}
        createSeleactFilterArr={createSeleactFilterArr}
        selectCatreGorisArr={selectCatreGorisArr}
      />

      {/* 검색 폼*/}
      {searchBoxShowHideBoolean && 
        <SearchBlockComponent 
          typoSearchValue={typoSearchValue} 
          keyEnterEvent={keyEnterEvent}
          searchBox={searchBox}
          autoTypingAction={autoTypingAction}
          typingDebounce={typingDebounce}
          AlldataList={AlldataList}
          autoSearchValue={autoSearchValue}
          autofilter={autofilter}
          clickSearhvalue={clickSearhvalue}
          keyBoardSearchvalueSelect={keyBoardSearchvalueSelect}
          selectIndex={selectIndex}
      />}

      {/* 활성화 된 필터링 리스트 */}
      {selectBoxBoolean && 
        <SelectFilterListComponent 
          selectCatreGorisArr={selectCatreGorisArr}
          closeSelectFilter={closeSelectFilter}
          formatData={formatData}
          reloadData={reloadData}
        />
      }
    </HeaderBox>
  );
}

const HeaderBox = styled.div`
  width:100%;
  position: sticky;
  background-color:#FFFFFF;
  top: 0;
  z-index:30;
  margin-bottom:10px;
 
`;

const TitleBlock = styled.div`
width:100%;
height:50px;
background-color:#FFFFFF;
display:flex;
align-items: center;
justify-content: center;

a {
  display:block;
  width: 94.89px;
  height: 16px;
  background-image:url('${logoIMG}');
  background-size:contain;
  background-repeat:no-repeat;
}
`;

export default inject("store")(observer(HeaderComponent));