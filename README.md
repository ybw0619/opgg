# OPGG FE 주니어 사전 과제

Node 16  
Vue 3 / script setup  
Vite  
Npm  
VS Code + Volar

# 구조

```sh
├── .src
│ ├── api # api
│ ├── assets # 이미지리소스
│ ├── components
│ │ ├── MatchList.vue # 매치 리스트
│ │ ├── Header.vue # 상단 헤더 및 검색 창 / 자동 완성 창
│ │ ├── Info.vue # 상단 소환사 정보
│ │ ├── MatchDetail.vue # 매치 디테일
│ │ ├── MatchInfo.vue # 최근 20전 / 선호 챔피언 / 선호 포지션
│ │ ├── MostInfo.vue # 챔피언 승률 / 7일간 승률
│ │ ├── RankedFlex.vue # 자랭 정보
│ │ └── RankedSolo.vue # 솔랭 정보
│ ├─── Constans
│ │ ├── champion.js # 챔피언 이름 key(Eng) : val(Kor)
│ │ ├── index.v2.js
│ │ └── url.js # api url 주소 상수화
│ ├── App.vue # App.vue
│ ├── main.js # main.js
│ ├── style.css # tailwind 정의
│ └── Summoners.vue # 소환사 검색 View
├── .gitignore
├── .prettierignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── README.md
├── tailwind.config.cjs # tailwind 설정
└── vite.config.js # vite 설정
```
