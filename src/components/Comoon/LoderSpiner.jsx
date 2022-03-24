import styled from 'styled-components';
import { spiner } from 'contents/const';

export const LoaderSpiner = () => {
  return (
    <LoaderSpinerDiv>
      <LoaderSpinerIcon/>
    </LoaderSpinerDiv>
  );
}

const LoaderSpinerDiv = styled.div`
width: 16px;
height: 16px;
margin: 0 auto;
text-align: center;

> div {
  width: 16px;
  height: 16px;
}
`;

const LoaderSpinerIcon = styled.div`
background-image:url('${spiner}');
background-repeat:no-repeat;
background-size:cover;
background-position:center;
position: relative;
animation: load3 1.4s infinite linear;
transform: translateZ(0);

@keyframes load3 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
`