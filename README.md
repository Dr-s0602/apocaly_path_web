# ApocalyPath Web Project

## 프로젝트 소개

`ApocalyPath`는 React와 Next.js를 사용한 웹 애플리케이션 프로젝트입니다. 이 프로젝트는 모던 웹 개발 환경에서의 기능 구현과 상태 관리를 위해 MobX를 활용합니다.

## 설치 및 실행 방법

이 프로젝트를 로컬 시스템에서 실행하기 위한 단계별 가이드입니다.

### 필수 조건

- Node.js 버전 18.17.0이 설치되어 있어야 합니다. (Node.js 공식 사이트에서 설치 가능)
- npm 또는 yarn이 설치되어 있어야 합니다.

### 설치 방법

1. 깃허브 레포지토리를 클론합니다:
   git clone https://github.com/Dr-s0602/apocaly_path.git
2. 프로젝트 폴더로 이동합니다:
   cd apocaly_path_web
3. 필요한 npm 패키지들을 설치합니다:
   npm install 또는 `yarn`을 사용하는 경우: yarn
### 로컬에서 실행하기

로컬 개발 서버를 시작하려면 다음 명령어를 실행합니다:
npm run dev
또는 `yarn`을 사용하는 경우: yarn dev

이 명령은 포트 3005에서 Next.js 개발 서버를 시작합니다. 브라우저에서 `http://localhost:3005`로 접속하여 애플리케이션을 볼 수 있습니다.

### 빌드 및 시작

프로덕션을 위한 애플리케이션 빌드: npm run build
또는 `yarn`을 사용하는 경우:yarn build

빌드 후 프로덕션 모드로 애플리케이션 시작:npm start
또는 `yarn`을 사용하는 경우:yarn start


## 프로젝트 구조

- `components/`: 재사용 가능한 컴포넌트 파일들.
- `hooks/`: React 커스텀 훅.
- `pages/`: 페이지 컴포넌트와 Next.js 라우팅.
- `stores/`: MobX 상태 관리 스토어.
- `styles/`: 전역 CSS 파일과 컴포넌트 스타일.
- `public/image`: 이미지 파일.

## 기타 설정

`package.json`에 정의된 스크립트와 ESLint, Browserslist 설정은 프로젝트의 코드 품질과 호환성 유지를 위해 구성되어 있습니다.

## 문의

프로젝트에 대한 더 많은 정보가 필요하거나 도움이 필요하면, [여기](https://github.com/Dr-s0602/apocaly_path/issues)에 이슈를 등록해 주세요.

