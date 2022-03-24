# 무신사 FE 테스트

## Built With

- Javascript
- React
- Mobx
- Sass
- styled-components
- npm

## 구성

첫 번째로 크게 생각 했던 부분은
상단 header component와 하단 itemList component 나누고 작업을 시작하려했습니다.

상단 component에는 메인 타이틀, 필터 리스트, 검색 박스 나눴으며,

하단 component에는 아이템 리스트 및 아이템 리스트가 없을 때 나타나는 component로 나눴습니다.

상단 필터 및 검색어 입력시 값을 배열로 저장 하여, 먼저 view 페이지에 map으로 선택한 카테고리를 뿌려줍니다.

각 component마다 기능들을 관리하기위해 상태 관리툴인 mobx를 선택하여 기능 및 값을 관리하였습니다.

제일 처음 먼저 전체적인 스타일을 잡기위해서, 상단, 하단(리스트)를 먼저 퍼블리싱을 한 후 기능을 단위 별로 작업 하였습니다.

### 기능

- 페이지는 필터 기능을 제공합니다
- 페이지는 검색어 입력 후 Enter를 누르면 해당 데이터가 필터링 됩니다.
- 페이지는 검색어 입력 시 해당 글자가 포함된 데이터 목록을 보여주 며, 클릭시 검색이 됩니다.
- 페이지는 검색어 입력 시 해당 글자가 포함된 데이터 목록을 보여주 며, 키보드 Up/Down 키로 선택후 Enter키를 누르면
  선택 된 데이터로 검색이 됩니다.
- 페이지는 선택 된 필터 목록이 활성화 되어있으면, 필터 초기화 버튼 활성화 되며 클릭시, 선택된 필터 및 검색어가 초기화 됩니다.
- 페이지는 무한스크롤 기능 제공하며 하단으로 내려 갈 시 다음 데이터가 로드 됩니다.

## Installation

1. Clone the repo
   ```
   git clone https://github.com/seoksanghwan/musinsa-fe-test.git
   ```
2. Package install
   ```
   npm install
   ```
3. Running a start script
   ```
   npm run start
   ```
