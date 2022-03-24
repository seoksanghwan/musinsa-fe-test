import { action, observable, reaction, toJS } from "mobx";
import { autobind } from 'core-decorators';
import * as _ from 'lodash';
import { getItemData } from "api/item";
import { noDataImg, _MAXCOUNT } from "contents/const";

@autobind
export default class ItemListStore {

  @observable itemListArr = [];
  @observable pageNum = 0;
  @observable isLoading = true;
  @observable dataUse = true;
  @observable searchAble = false

  constructor() {
    this.loadItemData();
    reaction(
      () => [this.pageNum, this.dataUse],
      ([pageNum, dataUse]) => {
        if (pageNum > -1 && pageNum <= (_MAXCOUNT - 1) && dataUse) {
          this.loadItemData();
          return;
        }
      });
  }

  @action.bound
  keyEnterEvent = () => {
    this.isLoading = true;
  }

  @action.bound
  formatData = () => {
    this.itemListArr = [];
    this.pageNum = 0;
    this.isLoading = true;
    this.dataUse = true;
    this.searchAble = false;
  }

  @action.bound
  fetchData = (num, type, searchvalue) => {
    return new Promise(async (resolve, reject) => {
      await getItemData(num).then(res => {
        if (res.status === 200 && res.data) {
          const { data: { data: { list } } } = res;
          this.itemListArr = new Set([...this.itemListArr, ...list]);
          this.itemListArr = [...this.itemListArr];
          this.itemListArr = _.uniqBy(this.itemListArr, 'goodsName');
          if (type === 'filter') this.searchKeywordFilter(searchvalue);
          this.isLoading = true;
          return;
        }
      }).catch(err => {
        if (err.response.status) {
          // 키워드 검색 시, 모든 데이터 로드 후에 멈 추기 위해서 일부러 404 에러 발생
          console.log(err.response.status)
          console.log('데이터가 더 이상 없습니다.');
          this.searchAble = true;
          this.dataUse = false;
          return false;
        }
      })
    });
  }

  @action.bound
  loadItemData = () => {
    this.fetchData(this.pageNum);
  }

  @action.bound
  getAllData = (searchvalue) => {
    const MaxData = Array.from({ length: _MAXCOUNT });
    this.dataUse = false;
    this.pageNum = 5;
    MaxData.map((data, idx) => this.fetchData(idx, 'filter', searchvalue));
  }

  @action.bound
  handleImgError = (e) => {
    e.target.src = noDataImg;
  }

  @action.bound
  setPageNum = () => {
    return this.pageNum++;
  }

  @action.bound
  mappingFilterFuntion = (data, filterArr) => {
    const { isSale, isExclusive, isSoldOut } = data;
    const sData = toJS(filterArr);
    const filterType = sData.filter(data => data.info !== 'keyword').length;

    let filterResult = [];
    if (filterType) {

      filterResult = sData.filter(data => data.info !== 'keyword').reduce((prev, curr) => {
        if (curr !== null) {
          return [...prev, curr.info]
        }
      }, []).sort().join();

      const onlyIsSale = filterResult.indexOf('isSale') >= 0;
      const onlyIsSoldOut = filterResult.indexOf('isSoldOut') >= 0;
      const onlyIsExclusive = filterResult.indexOf('isExclusive') >= 0;

      if ((onlyIsSale && onlyIsExclusive && onlyIsSoldOut) && (isSale && isExclusive && isSoldOut)) {
        // console.log('모든카테고리 포함')
        return true;
      } else if ((onlyIsSale && !onlyIsExclusive && !onlyIsSoldOut) && (isSale && !isSoldOut)) {
        // console.log('세일상품')
        return true;
      } else if ((onlyIsSale && !onlyIsExclusive && onlyIsSoldOut) && (isSale || isSoldOut)) {
        // console.log('세일상품 및 품절 포함')
        return true;
      } else if ((onlyIsSale && onlyIsExclusive && !onlyIsSoldOut) && (isSale && isExclusive && !isSoldOut)) {
        // console.log('세일상품 및 단독상품')
        return true;
      } else if ((onlyIsExclusive) && (isExclusive && !isSoldOut)) {
        // console.log('단독 상품만')
        return true;
      } else if ((!onlyIsSale && onlyIsExclusive && onlyIsSoldOut) && (isExclusive && isSoldOut)) {
        // console.log('단독 상품 및 품절 포함')
        return true;
      } else if (!onlyIsSale && !onlyIsExclusive && onlyIsSoldOut) {
        // console.log('품절포함 한 리스트')
        return true;
      }
    } else if (!isSoldOut) {
      return true;
    }
  }

  @action.bound
  searchKeywordFilter = (searchText) => {
    return this.itemListArr = _.filter(this.itemListArr, data => {
      const { goodsName } = data;
      const convertName = goodsName.toUpperCase().trim().replace(/(\s*)/g, "");
      if (searchText) {
        if (convertName.indexOf(searchText) >= 0) {
          this.searchAble = false;
          return true;
        } else {
          this.searchAble = true;
          return false;
        }
      } else {
        this.searchAble = false;
        return true;
      }
    })
  }
}