# 서울클리어교정치과 부산서면점 - 개발 컨텍스트 문서

> 최종 수정: 2026-03-30
> 프로젝트: 서울클리어교정치과 부산서면점 홈페이지
> 라이브: https://misoworks1.github.io/orthodontic-clinic-website/

---

## 1. 프로젝트 개요

### 클라이언트
- **병원명**: 서울클리어교정치과 부산서면점
- **대표원장**: 박주환 (서울대 출신 교정과 전문의)
- **개원일**: 2026년 5월
- **소재지**: 부산광역시 부산진구 서면로

### 기획 배경
113개 교정 전문 치과 홈페이지를 분석한 뒤, 원장님의 니즈(스펙 강조, 간단한 증례, 미니멀, 팝업)에 맞춰 제작.
단순히 경쟁사 구성을 따라하지 않고, 박주환 원장만의 차별점인 **"진단 중심 교정"** 철학을 사이트 전체의 컨셉으로 설정.

### 사이트 컨셉
> **"교정치료는 진단이 90%입니다"**

같은 증상도 원인에 따라 치료 방법이 달라야 한다는 원장님의 진료 철학을 사이트 전체에 반영.
히어로 메시지, 진료과정 섹션, 의료진 소개 모두 이 메시지를 중심으로 구성.

---

## 2. 기술 스택

### 코어
```
HTML5 + CSS3 + Vanilla JavaScript (프레임워크 없음)
```

### 선택 근거
- 정적 콘텐츠 중심 → React/Vue 불필요
- 단일 HTML 파일 구조 → Tailwind 불필요, 커스텀 CSS 유지
- jQuery 대신 Vanilla JS (경량화)
- 외부 라이브러리는 CDN으로 최소한만 사용

### 외부 라이브러리 (CDN)
| 라이브러리 | 버전 | 용도 |
|-----------|------|------|
| Swiper.js | 11.x | 히어로 슬라이더, 치료사례 캐러셀 |
| Pretendard | 1.3.9 | 웹폰트 (한글+영문) |
| Material Symbols | - | 아이콘 (Outlined) |

### 스크롤 애니메이션
- AOS.js **사용하지 않음** (제거됨)
- CSS transition + IntersectionObserver API로 자체 구현
- reveal, reveal-left, reveal-right, reveal-stagger 4가지 방향 지원

### 배포
```
GitHub Pages: https://misoworks1.github.io/orthodontic-clinic-website/
저장소: https://github.com/misoworks1/orthodontic-clinic-website
```

---

## 3. 디렉토리 구조

```
orthodontic-clinic-website/
├── index.html                  # 싱글페이지 (메인+서브 통합)
├── css/
│   └── style.css               # 메인 스타일시트 (커스텀 CSS)
├── js/
│   └── main.js                 # 메인 스크립트 (Vanilla JS)
├── images/
│   └── icons/
│       ├── seoulclear-logo.png        # 서울클리어 헤더 로고
│       ├── seoulclear-footer-logo.png # 서울클리어 푸터 로고
│       └── logo.svg                   # (미사용, 구 SVG 로고)
├── CONTEXT.md                  # 이 문서
├── REFERENCES.md               # 레퍼런스 분석 문서 (113개 사이트)
└── README.md                   # 프로젝트 설명
```

---

## 4. 브랜딩

### 서울클리어교정치과 브랜드
서울클리어교정치과는 전국 11개 지점의 교정 전문 네트워크.
각 지점별로 동일한 로고와 브랜드 컬러를 사용.

### 색상 팔레트 (확정)
```css
:root {
  --primary: #4aacc6;       /* 서울클리어 메인 (틸/시안) */
  --primary-dark: #3a8fa6;  /* 메인 다크 */
  --primary-light: #eaf5f8; /* 메인 라이트 배경 */
  --accent: #00b2b2;        /* 그라데이션 끝점 */
  --navy: #0a2e4d;          /* 제목/강조 */
  --text: #222;             /* 본문 */
  --text-light: #666;       /* 보조 텍스트 */
  --bg-gray: #f7f9fa;       /* 섹션 배경 교차 */
  --bg-dark: #0a1f33;       /* 푸터 배경 */
}
```

CTA 버튼 그라데이션: `linear-gradient(135deg, #4aacc6, #00b2b2)`

### 폰트
```
Pretendard Variable (CDN: jsdelivr)
본문 16px, 제목 28~48px, line-height 1.7
```

### 로고
- `seoulclear-logo.png`: seoulclear.com에서 다운로드한 공식 로고
- 헤더에서 스크롤 전/후 동일 로고 사용 (투명 헤더 → 흰 배경 전환)
- 푸터: `filter: brightness(0) invert(1)`로 흰색 반전

---

## 5. 페이지 구성 (현재 구현)

싱글페이지 구조. 6개 핵심 섹션 + 팝업/퀵메뉴.

```
[Popup]   개원 기념 혜택 (오늘 하루 보지 않기)
    ↓
[Header]  고정 헤더 + 스크롤 방향 감지 숨김/표시
    ↓
[Hero]    풀스크린 Swiper 2슬라이드 (fade, 5초 자동)
    ↓
[Doctor]  좌측 사진 + 우측 프로필/철학 (비대칭 split)
    ↓
[Process] "왜 진단에 시간을 쓰는가" 4단계 스텝 플로우
    ↓
[Treatment] 탭 UI (투명교정 / 세라믹교정 / 설측교정)
    ↓
[Cases]   Swiper 캐러셀 (Before/After, 좌우 네비게이션)
    ↓
[Location + Contact] 지도 + 진료시간 + 온라인 상담 폼
    ↓
[Footer]  로고 + 사업자 정보 + 링크
    ↓
[Quick Menu] 데스크톱: 우측 플로팅 / 모바일: 하단 바
```

### 삭제한 섹션 (의도적)
| 섹션 | 삭제 이유 |
|------|----------|
| 교정 증상 아이콘 그리드 | 모든 교정치과가 동일하게 사용 → 차별성 없음 |
| 통계 카운터 (경력, 증례 수) | 근거 없는 숫자는 오히려 신뢰 저해 |
| 환자 후기 | 실제 후기 없이 가짜 생성 시 역효과 |
| 시설 안내 | 실제 시설 사진 없이 placeholder만 노출하면 마이너스 |
| 01-04 특장점 카드 | 경쟁사 공통 패턴, 뻔한 구성 |

→ 이 섹션들은 실제 콘텐츠(사진, 후기)가 확보되면 추가 가능

---

## 6. 핵심 컴포넌트 상세

### 6-1. 헤더
- 스크롤 60px 이상: 투명 → 흰 배경 전환
- 스크롤 방향 감지: 아래 스크롤 시 숨김, 위 스크롤 시 재표시 (Headroom 패턴)
- 데스크톱: 로고 + 5개 메뉴 + 상담예약 CTA
- 모바일 (1024px 미만): 햄버거 → 우측 슬라이드 사이드바

### 6-2. 히어로
- Swiper.js: `effect: 'fade'`, `loop: true`, `autoplay: 5000ms`
- 2개 슬라이드 (진단 철학 / 개원 혜택)
- 텍스트 순차 등장 애니메이션 (sub → h1 → desc → buttons)
- 배경: CSS 그라데이션 (실제 이미지 교체 대비)

### 6-3. 의료진 섹션
- 좌측 사진 + 우측 텍스트 비대칭 그리드 (0.45fr : 0.55fr)
- 원장님 직접 인용문 (진단 철학 강조)
- 학력/경력 2컬럼 나열
- "학술활동 및 상세 약력" → 모달 팝업
- 좌우 방향 reveal 애니메이션 (사진 ←, 텍스트 →)

### 6-4. 진료과정
- "왜 진단에 시간을 쓰는가" — 이 치과만의 서사
- 4단계 스텝 플로우 (정밀 검사 → 원인 분석 → 치료 계획 → 교정 치료)
- 번호 마커 pop 애니메이션 + 연결선 드로잉

### 6-5. 진료안내
- 탭 UI (투명교정 / 세라믹교정 / 설측교정)
- 탭 전환 시 fade+slide 애니메이션
- 각 탭: 이미지 placeholder + 설명 + 태그 칩

### 6-6. 치료사례
- Swiper 캐러셀: `slidesPerView: 'auto'`, `spaceBetween: 16`
- 커스텀 좌우 네비게이션 버튼
- Before/After 2분할 카드
- 카드 호버: lift + shadow
- 의료법 제56조 고지 문구 포함

### 6-7. 오시는 길 + 온라인 상담
- 2컬럼 그리드 (1.1fr : 0.9fr)
- 좌측: 지도 placeholder + 주소/전화/진료시간/교통
- 우측: 상담 폼 (이름, 연락처, 진료분야, 문의내용)
- 전화번호 정규식 검증 + 이중 제출 방지

### 6-8. 팝업
- 개원 기념 혜택 (상담 무료, 검사 할인, 인비절라인 할인)
- localStorage 기반 "오늘 하루 보지 않기"
- 배경 클릭으로 닫기
- scale 등장 애니메이션

### 6-9. 퀵메뉴
- 데스크톱: 우측 플로팅 (전화, 카카오톡, 네이버예약, 맨위로)
- 모바일: 하단 고정 바 (전화, 카톡상담, 상담신청, 오시는길)
- 스크롤 400px 이후 표시, 버튼 순차 등장

---

## 7. 애니메이션 목록

모든 애니메이션은 외부 라이브러리 없이 CSS + IntersectionObserver로 구현.
이징: `cubic-bezier(.23,1,.32,1)` 통일.

| 효과 | 위치 | 구현 |
|------|------|------|
| 페이지 로드 fade-in | body | CSS `@keyframes pageIn` |
| 스크롤 프로그레스 바 | 페이지 상단 | JS `scroll` 이벤트 |
| 텍스트 순차 등장 | 히어로 슬라이드 | `.swiper-slide-active` + `transition-delay` |
| fade-up reveal | 각 섹션 | `.reveal` + IntersectionObserver |
| 좌측에서 등장 | 의료진 사진 | `.reveal-left` |
| 우측에서 등장 | 의료진 텍스트 | `.reveal-right` |
| 자식 시차 등장 | 학력/경력 | `.reveal-stagger` + `nth-child` delay |
| 마커 pop | 진료과정 번호 | `@keyframes stepPop` |
| 연결선 드로잉 | 진료과정 선 | `.step-line` `scaleY(0→1)` |
| 탭 전환 | 진료안내 | `@keyframes tabIn` |
| 카드 호버 lift | 치료사례 | `translateY(-6px)` + box-shadow |
| 팝업 scale 등장 | 개원 팝업 | `@keyframes popupIn` |
| 모달 scale+slide | 약력 모달 | `transform: scale(.94) translateY(16px)` |
| 퀵메뉴 순차 등장 | 우측 플로팅 | `.qm-btn` nth-child transition-delay |
| 헤더 숨김/표시 | 고정 헤더 | `transform: translateY(-100%)` |
| 네비 언더라인 | 메뉴 링크 | `::after` width 0→100% |

---

## 8. 반응형 브레이크포인트

```css
/* 데스크톱 퍼스트 */
@media (max-width: 1024px)  { /* 태블릿: 1열 전환, 햄버거 메뉴 */ }
@media (max-width: 768px)   { /* 모바일: 히어로 75vh, 모바일 바 표시 */ }
@media (max-width: 480px)   { /* 소형: 폰트 축소 */ }
```

| 브레이크포인트 | 주요 변화 |
|--------------|----------|
| ≤ 1024px | 네비게이션 → 햄버거, 의료진 1열, 탭 가로 스크롤 |
| ≤ 768px | 히어로 75vh, 모바일 하단 바 표시, 퀵메뉴 숨김 |
| ≤ 480px | 타이틀 26px, 팝업 축소, 스텝 마커 40px |

---

## 9. SEO

- 시맨틱 HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- `<meta>` 태그: title, description, keywords, og:title, og:description, og:type
- Schema.org 구조화 데이터: `@type: Dentist` (JSON-LD)
- `aria-label` 적용: 네비게이션, 버튼

---

## 10. 주의사항

### 의료법 관련
- 치료 전후 사진 게시 시 환자 동의 필요 (의료법 제56조)
- 과대광고 금지: "최고", "최초" 등 표현 사용하지 않음
- 치료사례에 법적 고지 문구 포함: "치료 결과는 개인에 따라 차이가 있을 수 있습니다"

### 접근성
- 텍스트 대비 비율 4.5:1 이상 (WCAG AA)
- 키보드 네비게이션 지원
- 이미지 alt 텍스트 적용
- 버튼 aria-label 적용

### 브라우저 지원
- Chrome 90+, Safari 15+, Edge 90+, Firefox 90+
- IE 미지원

---

## 11. 향후 작업 (콘텐츠 확보 후)

- [ ] 히어로 실제 이미지 교체 (원장님 사진 or 의원 사진)
- [ ] 원장님 프로필 사진 교체
- [ ] 진료안내 탭 이미지 교체
- [ ] 치료사례 실제 Before/After 사진 교체
- [ ] 네이버 지도 API 연동
- [ ] 카카오톡 채널 링크 연결
- [ ] 네이버 예약 링크 연결
- [ ] 실제 전화번호 적용 (051-000-0000 → 실제 번호)
- [ ] 실제 주소 적용
- [ ] 사업자등록번호 적용
- [ ] 개인정보처리방침 페이지 작성
- [ ] 실제 환자 후기 확보 시 후기 섹션 추가
- [ ] 시설 사진 확보 시 시설 섹션 추가
- [ ] Google Analytics / 네이버 애널리틱스 연동
- [ ] 네이버 서치어드바이저 등록
- [ ] 상담 폼 백엔드 연동 (이메일 발송 or DB 저장)
