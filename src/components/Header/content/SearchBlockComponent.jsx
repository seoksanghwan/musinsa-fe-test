import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { searchBlock } from "contents/const";
import * as _ from 'lodash';

export const SearchBlockComponent = props => {
  const {
    typoSearchValue,
    keyEnterEvent,
    searchBox,
    autoTypingAction,
    typingDebounce,
    AlldataList,
    autoSearchValue,
    autofilter,
    clickSearhvalue,
    keyBoardSearchvalueSelect,
    selectIndex
  } = props;

  const searchInput = useRef(null)
  const typingDebounceEvent = _.debounce(typingDebounce, 500);
  const fillBox = useRef(null);
  const [lastElement, setLastElement] = useState(null);
  const [activeIndex, setIndex] = useState(0);

  useLayoutEffect(() => {
    const currentElement = lastElement;
    if(currentElement && fillBox.current !== null) {
      window.addEventListener('keydown', e => keyBoardSearchvalueSelect(e, fillBox), false);
    }
    return () => {
      setLastElement(null) 
    }
  }, [lastElement])

  return (
    <SearchBlock>
      <form 
        autoComplete='off' 
        onSubmit={e => typoSearchValue(e, searchInput, keyEnterEvent)}
        onChange={e => typingDebounceEvent(e, searchInput.current)}
      >
        <input 
          type='text'
          ref={searchInput}
          onFocus={autoTypingAction}
        />
      </form>
      {
        searchBox &&
        <AutoFillListBlock>
          <AutoFillBox ref={fillBox}>
          {
           autoSearchValue && _.filter(AlldataList, autofilter).map((data, idx) => {
            const {goodsName} = data;
            let focus = goodsName.replace(autoSearchValue, `<b>${autoSearchValue}</b>`);
            return (
              <AutoFillListText 
                key={idx} 
                ref={setLastElement}
                data-name={goodsName}
                onClick={e => clickSearhvalue(e, goodsName)}
                active={selectIndex === idx}
                dangerouslySetInnerHTML={{ __html: focus }} 
              />
            );
          })
          }
          </AutoFillBox>
        </AutoFillListBlock>
      }
    </SearchBlock>
  );
}

const SearchBlock = styled.div`
  background-color:#F9F9F9;
  padding:15px 20px;
  position:relative;
  input {
    width:100%;
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    background: no-repeat center;
    background-position-x: 15px;
    padding: 10px 10px 10px 42px;
    background-image:url('${searchBlock}');
    background-repeat:no-repeat;
    background-color:#FFFFFF;
    font-size: 16px;
  }
`;

const AutoFillListBlock = styled.div`
  width:100%;
  height:auto;
  background:#FFFFFF;
  background-color:#F9F9F9;
`;

const AutoFillBox = styled.div`
width:100%;
height: auto;
background:#FFFFFF;
margin: 0 auto;
`;

const AutoFillListText = styled.div`
height: auto;
background:#FFFFFF;
margin: 0 auto;
font-size:12px;
padding: 8px 15px 8px 13px;
cursor:pointer;
transition: all .2s ease-in;
b {
  color : #0078FF;
  font-weight:normal;
}
&:hover {
  background:#c7e4f1;
}
${props => props.active && `background:#c7e4f1;`}
`;