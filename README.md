# 서울클리어교정치과 부산서면점

서울대 출신 교정과 전문의 박주환 원장의 교정 전문 치과 홈페이지.

**Live**: https://misoworks1.github.io/orthodontic-clinic-website/

## 기술 스택

- HTML5 + CSS3 + Vanilla JavaScript
- Swiper.js 11 (CDN) — 히어로 슬라이더, 치료사례 캐러셀
- Pretendard Variable (CDN) — 웹폰트
- Material Symbols Outlined (CDN) — 아이콘
- 스크롤 애니메이션: CSS + IntersectionObserver (외부 라이브러리 없음)

## 구조

```
index.html          싱글페이지
css/style.css       스타일시트
js/main.js          스크립트
images/icons/       로고 이미지
CONTEXT.md          개발 컨텍스트 (상세 기획/설계)
REFERENCES.md       레퍼런스 분석 (113개 사이트)
```

## 섹션 구성

| 섹션 | 설명 |
|------|------|
| 팝업 | 개원 기념 혜택 (하루 닫기) |
| 히어로 | Swiper 2슬라이드, 텍스트 순차 등장 |
| 의료진 | 사진+프로필 비대칭 레이아웃, 약력 모달 |
| 진료과정 | "왜 진단에 시간을 쓰는가" 4단계 스텝 |
| 진료안내 | 탭 UI (투명교정/세라믹/설측) |
| 치료사례 | Before/After 캐러셀 |
| 오시는길+상담 | 지도+진료시간+상담폼 |

## 브랜드

- 메인 컬러: `#4aacc6` (서울클리어 브랜드)
- 그라데이션: `#4aacc6 → #00b2b2`
- 사이트 컨셉: **"교정치료는 진단이 90%입니다"**

## 로컬 실행

별도 빌드 없이 `index.html`을 브라우저에서 열면 됩니다.
CDN으로 외부 리소스를 로드하므로 인터넷 연결이 필요합니다.

## 제작

미소웍스 (치과 전문 마케팅 대행사)
