const publicUrl = process.env.PUBLIC_URL;
export const logoIMG = `${publicUrl}/images/logo/logo.svg`;
export const search = `${publicUrl}/images/ui/search.svg`;
export const searchBlock = `${publicUrl}/images/ui/searchBlock.svg`;
export const close = `${publicUrl}/images/ui/close.svg`;
export const noDataImg = "https://image.msscdn.net/musinsaUI/homework/data/img.jpg";
export const spiner = `${publicUrl}/images/ui/loader.svg`;
export const warning = `${publicUrl}/images/ui/warning.svg`;
export const refresh = `${publicUrl}/images/ui/refresh.svg`;

export const _MAXCOUNT = 4;

export const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5
}

export const _filterArr = [
  {
    name: "세일상품",
    info: "isSale"
  },
  {
    name: "단독상품",
    info: "isExclusive"
  },
  {
    name: "품절포함",
    info: "isSoldOut"
  }
]