
import React from "react";
import styled from 'styled-components';
import {close, refresh} from 'contents/const';

export const SelectFilterListComponent = props => {
  const {
    selectCatreGorisArr,
    closeSelectFilter,
    formatData,
    reloadData
  } = props;

  return (
    <SelectFilterBlock>
      <SelectFilterListContainer>
      {
        selectCatreGorisArr?.map(data => {
          return(
            <SelectFilterItem key={data.name}> 
              {data.name}
              <CloseButton onClick={e => closeSelectFilter(e, data.name, data.info, formatData)}/>
            </SelectFilterItem>
          );
        })
      }
      </SelectFilterListContainer>
      <Refresh onClick={_ => reloadData(formatData)}/>  
  </SelectFilterBlock>
  );
}

const SelectFilterBlock = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  padding:12px 15px;
`;

const SelectFilterListContainer = styled.div`
  display:flex;
  flex-direction: row;
  align-items:center;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  *:not(:last-of-type) {
    margin-right:5px;
  }
`;

const SelectFilterItem = styled.div`
  display:flex;
  background-color: #0078FF;
  border-radius: 4px;
  color: #FFFFFF;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  padding:5px 10px;
`;

const CloseButton = styled.span`
  display:flex;
  background-image:url('${close}');
  background-repeat:no-repeat;
  background-size:cover;
  margin-left:7px;
  width:14px;
  height:14px;
  cursor:pointer;
`;

const Refresh = styled.div`
  width:22px;
  height:22px;
  margin:0 2px 0 14px;
  background-image:url('${refresh}');
  background-repeat:no-repeat;
  background-size:cover;
  cursor:pointer;
`;