import React from "react";
import styled from "styled-components";

export const ItemDataBoxComponent = ({data, setLastElement, handleImgError}) => {

  const {brandLinkUrl, linkUrl, brandName, goodsName, imageUrl, isExclusive, isSale, isSoldOut, normalPrice, price} = data;
  let priceElement =  <ItemPrice>{normalPrice.toLocaleString('en')}원</ItemPrice>

  if(isSale) {
    priceElement = (
      <ItemPrice>
        {price.toLocaleString('en')}원
        <SalePrice>
          {normalPrice.toLocaleString('en')}원
        </SalePrice>
      </ItemPrice>
    );
  }

  return(
    <ItemBox ref={setLastElement}>
    <ImgBox>
      <ImgBoxContent>
        <img 
          src={imageUrl} 
          alt={`${brandName} ${goodsName} `} 
          onError={handleImgError}
        />
        <a href={linkUrl}/>
      </ImgBoxContent>
      {isExclusive && <Exclusive>단독</Exclusive>}
      {isSoldOut && <SoldOut>SOLD OUT</SoldOut>}
    </ImgBox>
    <ItemInfo>
      <ItemBrand>
        <a href={brandLinkUrl}>{brandName}</a>
      </ItemBrand>
      <ItemName>
        <a href={linkUrl}>{goodsName}</a>
      </ItemName>
      {priceElement}
    </ItemInfo>
  </ItemBox>
  );
}

const ItemBox = styled.div`
  border:none;
  margin-bottom:20px;
`;

 const ImgBox = styled.div`
  height:226px;
  position:relative;
 `;
 
 const ImgBoxContent = styled.div`
 height:226px;
 overflow: hidden;
 position:relative;
 img {
   position: absolute;
   top: 50%;
   left: 0;
   width: 100%;
   transform: translateY(-50%);
   z-index:5;
 }
 a {
  width:100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
  z-index:10;
}
`;

const SoldOut = styled.div`
  display:flex;
  align-items:center;
  justify-content: center;
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  color: #777777;
  background-color:rgba(255,255,255,0.8);
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  z-index:15;
`;

const Exclusive = styled.span`
  width: 33px;
  height: 26px;
  position: absolute;
  background-color: #18A286;
  color: #FFFFFF;
  font-size: 12px;
  display:flex;
  align-items:center;  
  justify-content: center;
  letter-spacing: -0.5px;
  font-style: normal;
  font-weight: 400;
  left:10px;
  bottom:-13px;
  z-index:20;
`;

 const ItemInfo = styled.div`
  padding:0 10px;
  margin-top:20px;
  color: #000000;
 `;

 const ItemBrand = styled.div`
  font-weight: 400;
  font-size: 11px;
  margin-bottom:8px;
  color: #000000;
 `;

 const ItemName = styled.div`
  display: block;
  overflow: hidden;
  max-height: 36px;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  word-break: break-all;
  margin-bottom:4px;
 `;

 const ItemPrice = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
 `;

 const SalePrice = styled.div`
  font-weight: 500;
  font-size: 11px;
  color: #AAAAAA;
  line-height: 12px;
  text-decoration-line: line-through;
 `;