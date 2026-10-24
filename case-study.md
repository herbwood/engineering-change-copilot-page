# Engineering Change Copilot: portfolio case study

## 1. Industrial engineering problem

Assembly change review requires tracing what changed, which occurrence is affected and whether independently specified requirements hold. Names/part numbers alone fail when references move, components repeat or properties become unavailable. This project puts review inside SOLIDWORKS so engineers can inspect models and supporting evidence together.

## 2. Why ordinary chat-based LLMs are insufficient

A chat model cannot infer active CAD selection, distinguish cached fields from physical attributes or establish suppressed-occurrence identity from prose alone. Answers do not establish an approved BOM. CAD reads and deterministic decisions therefore remain outside the model, exposed through typed read-only tools with issued saved-evidence citations.

## 3. Native CAD integration architecture

A C#/.NET Framework 4.8 x64 COM add-in hosts a WebView2 Task Pane in SOLIDWORKS 2026. UI-STA readers produce bounded managed snapshots. Revision and independent BOM/rule engines preserve evidence/completeness. Optional local Qwen3-4B uses structured calls via Ollama. An evidence registry connects findings to explicit native selection/focus. [Architecture](index.html#architecture).

## 4. Implementation challenges and solutions

**Temporary references and identity.** SOLIDWORKS temporary reference paths can change without design changes; suppression can remove property access. The resolver combines same-document lineage, unique persistent identity and qualified hierarchy/reference/configuration evidence, normalizes recognized temporary locations and preserves original observations. Scan indices are not identity. Ambiguity withholds attribution; technical drift is separate from physical modifications.

**From AI evidence to real CAD navigation.** A generated name cannot authorize selection. Context-bound registry handles expire when reports/context change. Locate rechecks current identity and selection/camera postconditions before reporting success. Partial focus and no-op clear remain distinct. Only UI actions navigate; the model has no mutation/navigation tool. Owned-clear preserves unrelated manual selections when ownership changes.

**Incomplete evidence and suppression history.** Known suppression is independent from unavailable properties; incomplete reads cannot become removals. However, the user reported a visibly unsuppressed original target whose baseline says suppressed. A read-only UI-STA diagnostic was prepared to compare native methods and the reader pipeline in controlled states. That discrepancy remains **open**; later comparison output does not prove the original capture correct.

## 5. Demonstrated end-to-end workflow

A continuous 79.9-second actual SOLIDWORKS recording shows Inspect, Compare, Validate, Explain and Locate: one reported modification, four PASS findings under test-only rules, two successful real model tools, a cited answer and native focus/clear. No fabricated UI/response is used. The original remains local; public CAD/media rights are unresolved. [Demo guide](index.html#demonstration).

## 6. Quantitative evaluation

Normal regressions 155/155; historical diagnostic build 162/162; WebView2 64/64; independently labeled deterministic cases 32/32. Real-inference original/holdout completion: 21/22 and 11/12; strict selection: 21/22 and 12/12; valid calls: 23/24 and 13/14; applicable citations: 4/4 and 3/3. Model evaluation uses a managed synthetic host. Populations do not imply combined field accuracy. [Exact results/failures](index.html#results).

## 7. Observed limitations

Twelve formal native protocols and human semantic review remain pending. Cached/bounded evidence may be incomplete, captures are not atomic, identity may be ambiguous and lexical guards do not prove semantics. Suppression history is unresolved. Educational-license eligibility, source/media rights, API/interop redistribution, signing and clean-machine lifecycle remain release gates. The deliverable is a local review candidate.

## 8. Future engineering roadmap

Reproduce/explain the native suppression discrepancy while preserving evidence. Complete identity/navigation/lifecycle acceptance and adjudicate model answers. Resolve rights/dependency decisions before an approved WiX installer. Then test clean install, upgrade, rollback and reversible uninstall. Broader formats and engineering approval workflows remain future scope.

### Korean résumé / portfolio description

SOLIDWORKS 2026 내부에서 동작하는 C#/.NET Framework 4.8 기반 엔지니어링 변경 검토 Copilot을 구현했습니다. COM/UI STA 제약을 지키는 CAD 데이터 수집, 임시 참조 경로를 고려한 부품 식별, 독립 BOM·규칙 검증, 로컬 Qwen3 도구 호출 및 근거 기반 3D 위치 이동을 연결했습니다. 일반 회귀 155/155, WebView2 64/64, 합성 결정론 평가 32/32를 확인했으며 실제 CAD 시연 영상을 확보했습니다. 과거 억제 상태 캡처 불일치, 정식 네이티브 인수 시험 및 배포 권한 검토는 미완료 과제로 명시했습니다.

### English project summary

Built a native SOLIDWORKS change-review add-in combining deterministic comparison, independent BOM/rule validation, local structured LLM tools and evidence-linked 3D navigation. Verified 155 regression groups, 64 browser checks and 32 synthetic cases; recorded a real native workflow. Preserved explicit boundaries around incomplete evidence, unresolved suppression history, semantic review and redistribution eligibility.
