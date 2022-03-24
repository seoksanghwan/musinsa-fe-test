import { action, observable } from "mobx";
import { autobind } from 'core-decorators';
import * as _ from 'lodash';
import { _MAXCOUNT } from "contents/const";
import { getItemData } from "api/item";

let params = new URLSearchParams();
let liSelected, index = -1, next;

@autobind
export default class FilterStore {

  @observable AlldataList = [];
  @observable selectCatreGorisArr = [];
  @observable keysArray = [];
  @observable searchBoxShowHideBoolean = false;
  @observable searchBox = false;
  @observable selectIndex = -1;
  @observable filterParameter = '';
  @observable searchTextValue = '';
  @observable autoSearchValue = '';

  constructor() {
    this.getAllData();
  };

  @action.bound
  deleteParameter = () => {
    let ativedata = [];
    let keywordParameter;
    let labelParameter = [];
    let mark = '';
    if (this.selectCatreGorisArr.length) {
      ativedata = this.selectCatreGorisArr.reduce((prev, curr) => {
        if (curr !== null) {
          const data = curr.info === 'keyword' ? curr : curr.info;
          return [...prev, data]
        }
      }, []);

      if (ativedata.length) {
        if (ativedata.filter(data => typeof data !== 'object')) {
          labelParameter = ativedata.filter(data => typeof data !== 'object');
          if (labelParameter.length) labelParameter = `${labelParameter.join('=y&')}${labelParameter.length === 1 ? '=y' : '=y'}`;
        }

        if (ativedata.filter(data => typeof data === 'object')) {
          keywordParameter = ativedata.filter(data => data.info === 'keyword')[0]?.name;
          if (keywordParameter) keywordParameter = `keyword=${keywordParameter}`;
        }
      }


      if (keywordParameter && labelParameter.length) {
        this.filterParameter = `${keywordParameter}${'&' + labelParameter}`;
      } else if (keywordParameter && !labelParameter.length) {
        this.filterParameter = `${keywordParameter}`;
      } else if (!keywordParameter && labelParameter.length) {
        this.filterParameter = `${labelParameter}`;
      } else {
        this.filterParameter = ``;
      }
    } else {
      this.filterParameter = ``;
      this.selectCatreGorisArr = [];
      params.delete("keyword");
      params.delete("isSale");
      params.delete("isExclusive");
      params.delete("isSoldOut");
    }

    if (this.filterParameter !== '') mark = '?';

    const resultUrl = `${window.location.origin}/${mark}${this.filterParameter}`;
    window.history.pushState({}, null, resultUrl);
  }

  @action.bound
  searchBoxShowHideClick = e => {
    this.searchBoxShowHideBoolean = !this.searchBoxShowHideBoolean;
  }

  @action.bound
  getAllData = () => {
    const MaxData = Array.from({ length: _MAXCOUNT });
    MaxData.map((data, idx) => {
      return new Promise(async (resolve, reject) => {
        await getItemData(idx).then(res => {
          if (res.status === 200 && res.data) {
            const { data: { data: { list } } } = res;
            this.AlldataList = new Set([...this.AlldataList, ...list]);
            this.AlldataList = [...this.AlldataList];
            this.AlldataList = _.uniqBy(this.AlldataList, 'goodsName');
            return;
          }
        }).catch(err => {
          if (err.response.status) {
            console.log(err.response.status) // 키워드 검색 시, 모든 데이터 로드 후에 멈 추기 위해서 일부러 404 에러 발생
            console.log('데이터가 더 이상 없습니다.');
            return false;
          }
        })
      });
    });
  }

  @action.bound
  reloadData = (fx) => {
    this.selectCatreGorisArr.length && fx();
    this.selectCatreGorisArr = [];
    this.keysArray = [];
    this.searchBox = false;
    this.searchBoxShowHideBoolean = false;
    this.autoSearchValue = '';
    this.searchTextValue = '';
    this.filterParameter = '';
    params.delete("keyword");
    params.delete("isSale");
    params.delete("isExclusive");
    params.delete("isSoldOut");
    const resultUrl = `${window.location.origin}/`;
    window.history.pushState({}, null, resultUrl);
  }

  @action.bound
  appendParameter = () => {
    this.selectCatreGorisArr.map(data => {
      if (data.info === 'keyword') {
        params.append("keyword", data.name);
        return data;
      } else {
        params.append(data.info, 'y');
        return data;
      }
    });
    this.filterParameter = `${params}`;
    this.createParameter(this.filterParameter);
    return;
  }

  @action.bound
  typoSearchValue = (e, searchInput, fx) => {
    e.preventDefault();
    var blank_pattern = (/^\s+|\s+$/g);
    if (searchInput && searchInput.current !== null) {
      if (searchInput.current.value.replace(blank_pattern, '') !== '') {
        const targetObj = {
          name: searchInput.current.value,
          info: 'keyword',
          value: true
        };
        if (!this.selectCatreGorisArr.filter(data => data.info === 'keyword').length) {
          this.selectCatreGorisArr.push(targetObj);
          this.selectCatreGorisArr = _.uniqBy(this.selectCatreGorisArr, 'name');
          this.searchTextValue = this.selectCatreGorisArr.filter(data => data.info === 'keyword')[0]?.name.toUpperCase().trim().replace(/(\s*)/g, "");
          this.appendParameter();
        } else {
          this.searchTextValue = '';
        }
        searchInput.current.value = "";
        this.searchBoxShowHideBoolean = false;
        fx && fx();
      } else {
        return false;
      }
    }
  }

  @action.bound
  typingDebounce = (e, searchInput) => {
    e.persist();
    const value = searchInput.value.toUpperCase().trim().replace(/(\s*)/g, "");
    var blank_pattern = (/^\s+|\s+$/g);
    if (value.replace(blank_pattern, '') !== '') {
      this.autoSearchValue = searchInput.value.toUpperCase().trim().replace(/(\s*)/g, "");
    } else {
      this.autoSearchValue = '';
    }
  }

  @action.bound
  autofilter = (data) => {
    if (data) {
      const { goodsName } = data;
      const label = goodsName.toUpperCase().trim().replace(/(\s*)/g, "");
      if (label.indexOf(this.autoSearchValue) >= 0) {
        return data;
      }
    } else {
      return false;
    }
  }

  @action.bound
  autoTypingAction = e => {
    this.searchBox = true;
    this.autoSearchValue = '';
    this.selectIndex = -1;
  }

  @action.bound
  clickSearhvalue = (e, data) => {
    this.searchBox = false;
    this.searchBoxShowHideBoolean = false;
    const targetObj = {
      name: data,
      info: 'keyword',
      value: true
    };
    this.selectCatreGorisArr.push(targetObj);
    this.selectCatreGorisArr = _.uniqBy(this.selectCatreGorisArr, 'name');
    this.searchTextValue = this.selectCatreGorisArr.filter(data => data.info === 'keyword')[0]?.name.toUpperCase().trim().replace(/(\s*)/g, "");
    this.appendParameter();
  }

  @action.bound
  keyBoardSearchvalueSelect = (e, fillBox) => {
    if (fillBox.current !== null) {
      const { keyCode } = e;
      const { current } = fillBox;
      const { childElementCount } = current;
      const len = childElementCount - 1;
      const currentDiv = current.getElementsByTagName('div');
      if (keyCode === 38 || keyCode === 40) {
        if (keyCode === 40) {
          index++;
          if (liSelected) {
            next = currentDiv[index];
            if (typeof next !== undefined && index <= len) {
              liSelected = next;
            } else {
              index = 0;
              liSelected = currentDiv[0];
            }
            this.selectIndex = index;
          } else {
            index = 0;
            liSelected = currentDiv[0];
            this.selectIndex = index;
          }
          return;
        } else {
          if (liSelected) {
            this.selectIndex = index;
            index--;
            next = currentDiv[index];
            if (typeof next !== undefined && index >= 0) {
              liSelected = next;
            } else {
              index = len;
              liSelected = currentDiv[len];
            }
            this.selectIndex = index;
          } else {
            index = 0;
            liSelected = currentDiv[len];
            this.selectIndex = index;
          }
          return;
        }
      } else if (keyCode === 13) {
        const goodsName = liSelected?.dataset.name;
        this.clickSearhvalue(e, goodsName)
        return;
      }
    }

  }

  @action.bound
  createSeleactFilterArr = e => {
    e.preventDefault();
    this.searchBoxShowHideBoolean = false;
    if (e.target.tagName === 'BUTTON') {
      const targetObj = {
        name: e.target.dataset.name,
        info: e.target.dataset.info,
        value: true
      };

      if (e.target.ariaSelected === "true") {
        this.selectCatreGorisArr = _.filter(this.selectCatreGorisArr, data => data.name !== targetObj.name);
        this.deleteParameter();
      } else {
        this.selectCatreGorisArr.push(targetObj);
        this.selectCatreGorisArr = _.uniqBy(this.selectCatreGorisArr, 'info');
        this.appendParameter();
      }
    }
  }

  @action.bound
  closeSelectFilter = (e, name, info, fx) => {
    e.preventDefault();

    this.selectCatreGorisArr = _.filter(this.selectCatreGorisArr, data => {
      if (data.name !== name) {
        return true;
      }
    });

    if (info === 'keyword') {
      this.searchTextValue = '';
      fx();
    }
    this.deleteParameter();
  }

  @action.bound
  createParameter = (url) => {
    url = decodeURIComponent(url);
    var query = url;

    if (query) {
      var parts = query.split('&');
      var params = {};
      for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        var value = nv[1] || true;
        if (params[nv[0]] && params[nv[0]].indexOf(value)) {
          params[nv[0]].push(value);
        } else {
          params[nv[0]] = [value];
        }
      }

      url = '';
      var keys = Object.keys(params);

      for (var i = 0; i < keys.length; i++) {
        url += keys[i] + '=' + params[keys[i]].join(' ');
        if (i !== keys.length - 1) url += '&';
      }
      this.filterParameter = url;
      const resultUrl = `${window.location.origin}/?${this.filterParameter}`;
      window.history.pushState({}, null, resultUrl);
    }
  }

  @action.bound
  reloadQueryData = (query, search, type) => {

    var keys = Object.keys(query);
    if (type === 'load') {
      for (var j = 0; j < keys.length; j++) {
        this.keysArray.push(keys[j]);
      }
    }
    if ('keyword' in query) {
      this.searchTextValue = query.keyword.toUpperCase().trim().replace(/(\s*)/g, "");
    }

    this.selectCatreGorisArr = this.keysArray.reduce((prev, curr) => {
      if (curr !== null) {
        let selectName;
        if (curr === 'isSale') {
          selectName = '세일상품';
        } else if (curr === 'isExclusive') {
          selectName = '단독상품';
        } else if (curr === 'isSoldOut') {
          selectName = '품절포함';
        }
        const name = curr === 'keyword' ? query.keyword : selectName
        return [...prev, { name, info: curr, value: true }]
      }
    }, []);
    this.selectCatreGorisArr = _.uniqBy(this.selectCatreGorisArr, 'name');
    this.filterParameter = `${search.replace('?', '')}`;
  }
}