## 띱!

**내 주변 사람들과 무엇이든 무료로 나눌 수 있는, 아나바다를 위한 서비스**

"나눔은 즐거움이다": 일상속의 나눔을 어렸을 적 하던 "딥!"과 같은 재미 요소로 풀어냄으로써 

나누는 사람에게는 처리하기 곤란한, 나누고 싶은 물건을 빠르게 나눌 수 있는 편리함을,

나눔을 받는 사람에게는 생활에 필요한 여러 물건들을 무료로 제공받을 수 있는 기회를

사용자 모두에게 나눔의 즐거움을 충족시켜줄 수 있는 서비스



## API 명세서

https://royal-fennel-664.notion.site/API-d33703f9b0704affbd2879ece5beb572



## 개발 역할 분담

| 수진                                                         | 유정                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - rdb 설계<br />- 배포환경 구축<br />- 회원가입 구현<br />- 메인 뷰 조회<br />- 메인 뷰 띱 기능 | - rdb 설계<br />- 배포환경 구축<br />- 게시글 작성<br />- 게시글 조회 |



## 코드 컨벤션

- JS: camelCase 쓰기
- SQL: snake_case 쓰기
- response body: util 사용하기
- console.log 주석 처리하기



## 브랜치 전략

- main: 배포 브랜치

- suzieep/hujumee: 각자 작성한 api 코드 push

  **[API 코드 작성 push => PR 날리기 => 코드 리뷰 => API 배포]**



##### Commit Message

- feat: 새로운 기능 구현
- update: 기능 업데이트
- fix: 버그 수정
- add: constants, lib 등 부수적인 파일 추가
- docs: README 수정



## 프로젝트 폴더링

```
├── api
│   ├── index.js
│   └── routes
├── config
│   └── dbConfig.js
├── constants
│   ├── responseMessage.js
│   └── statusCode.js
├── db
│   ├── db.js
│   ├── index.js
│   └── user.js
├── index.js
├── lib
│   ├── convertSnakeToCamel.js
│   └── util.js
├── node_modules
│   ...
├── package-lock.json
├── package.json
├── sopkathon-ddip-firebase-adminsdk-ihf3b-a84c58dffc.json
└── ui-debug.log
```
## package.json

![image](https://user-images.githubusercontent.com/61377122/142740776-843dce28-02b4-4dfd-b912-7af7ad5515d2.png)
## ERD

![ddip (1)](https://user-images.githubusercontent.com/61377122/142740781-63ccb5a4-7d58-4101-be4e-c3d94bd5204f.png)

## Tables
![image (3)](https://user-images.githubusercontent.com/61377122/142740782-4e699752-55c3-4a01-841d-9d3cfd0336ae.png)
![image (2)](https://user-images.githubusercontent.com/61377122/142740783-c5c9d5c5-4b89-4fc7-b2f3-eadbaa8cf91f.png)
![image (1)](https://user-images.githubusercontent.com/61377122/142740785-09248e48-264c-4263-9083-043a503bd6e6.png)
