import React from "react";
import styled from 'styled-components';
import {search, _filterArr} from 'contents/const';

export const FilterBlockComponent = props => {
  const {
    searchBoxShowHideClick,
    searchBoxShowHideBoolean,
    createSeleactFilterArr,
    selectCatreGorisArr
  } = props;

  

  return (
    <FilterBlock>
        <FilterBlockList>
          <FilterButton 
            searchIcon 
            onClick={searchBoxShowHideClick}
            active={searchBoxShowHideBoolean}
            activeStatus={selectCatreGorisArr.some(data => data.info === 'keyword')}
          >
            검색
          </FilterButton>
          {
            _filterArr?.map((data, idx) => {
              const {name, info} = data;
              return (
                <FilterButton 
                  key={name}
                  data-name={name}
                  data-info={info}
                  aria-selected={selectCatreGorisArr.some(data => data.info === info)}
                  onClick={createSeleactFilterArr}
                  activeStatus={selectCatreGorisArr.some(data => data.info === info)}
                >
                  {name}
                </FilterButton>
              );
            })
          }
        </FilterBlockList>
      </FilterBlock>
  );
}

const FilterBlock = styled.div`
  width:100%;
  padding:10px 0;
`;

const FilterBlockList = styled.div`
  display:flex;
  flex-direction: row;
  flex-wrap:wrap;
  align-items:center;
  margin:0 5px;
  *:not(:last-of-type) {
    margin-right:5px;
  }
`;

const FilterButton = styled.button`
  display:flex;
  align-items:center;
  padding:7px 15px;
  background-color:#FFFFFF;
  color:#000000;
  border: 1px solid #EEEEEE;
  box-sizing: border-box;
  border-radius: 18px;
  cursor:pointer;
  transition:all .2s ease-in;
  &:hover {
    background-color:#0078FF;
    color:#FFFFFF;
  }

  ${props => props.active && `
    background-color:#0078FF;
    color:#FFFFFF;
  `}

  ${props => (!props.active && props.activeStatus) && `
    color:#0078FF;
  `}

  ${props => props.searchIcon && `
    &::after {
      display:block;
      content:'';
      width:18px;
      height:18px;
      background-image:url('${search}');
      background-repeat:no-repeat;
      background-size:cover;
      background-position:center center;
      margin-left:3px;
    }
  `}
`;