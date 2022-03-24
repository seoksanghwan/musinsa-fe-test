import React from "react";
import styled from "styled-components";
import { warning } from "contents/const";

export const NoneItemComponent = () => {

  return(
    <NoneItemContainer>
      <NoneInfoContent>
        <WraningIcon/>
        검색 결과 없음
      </NoneInfoContent>
    </NoneItemContainer>
  );
};

const NoneItemContainer = styled.div`
  width:100%;
  height:100%;
  background-color:#FFFFFF;
  position:relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoneInfoContent = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #AAAAAA;
`;

const WraningIcon = styled.div`
  width: 90px;
  height: 90px;
  background-image:url('${warning}');
  background-repeat:no-repeat;
`;