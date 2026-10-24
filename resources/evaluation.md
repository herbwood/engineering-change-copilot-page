# Evaluation summary

Phase 6B.1, 2026-10-25. Earlier results are preserved; no best-of model rerun was substituted.

## Automated and deterministic checks

| Population | Result | Evidence |
| --- | --- | --- |
| Fresh normal Release/x64/net48 regressions | 155/155 groups | `artifacts/tests_20261024_212029_631.log` |
| Historical temporary diagnostic build | 162/162 groups | `artifacts/phase6a2/native-suppression-diagnosis/tests_20261024_194152_419.log` |
| Fresh standalone WebView2 | 64/64 checks | `artifacts/phase6b1/run_20261024_211601_859/web-smoke.log` |
| Fresh deterministic evaluation | 32/32 exact cases | `artifacts/phase6b1/run_20261024_211601_859/deterministic/deterministic.json` |

Normal/diagnostic counts are alternative builds, not 317 independent tests. The temporary diagnostic is absent from the normal binary. COM callback checks inspect real .NET Framework CCWs; CAD host/reader tests use managed stubs. Browser checks render a standalone WebView2 with synthetic inputs, not a native Task Pane acceptance session.

The deterministic set comprises 26 engine scenarios with 79 labeled finding expectations and 35 identity decisions plus six schema/staleness rejection cases. Independent labels check exact output types/statuses and decisions; this is bounded synthetic coverage, not field accuracy.

## Real local inference with a synthetic managed host

Source: `evaluation/results/phase6a1/comparison.json`, `original-after.json`, `holdout-after.json`, `model-environment.json`. Earlier Phase 6A results remain intact. Each set used one stochastic run with the unchanged production profile.

| Metric | Phase 6A before (original) | Phase 6A.1 after (same original) | Independent holdout |
| --- | --- | --- | --- |
| Completion | 22/22 | 21/22 | 11/12 |
| Appropriate tool selection, strict name set | 20/22 | 21/22 | 12/12 |
| Structured tool validity, per call | 22/23 | 23/24 | 13/14 |
| Tool execution success, per call | 22/23 | 23/24 | 13/14 |
| Narrow lexical grounding screen | 21/22 | 21/22 | 11/12 |
| Issued citation check, applicable answers | 3/4 | 4/4 | 3/3 |

After completion requires the bounded evidence contract, stricter than receiving any text. Original D08 made an extra read and failed strict selection. D20 requested invalid bounds without a valid replacement; holdout H07 did likewise. Those answers were withheld. Name selection can pass while arguments fail, hence separate denominators. Failures are retained.

Backend: Ollama 0.40.8, `qwen3:4b-instruct`, 4.0B Q4_K_M. Declared context 4096 tokens; output 1024, eligible recovery 2048; four rounds/eight executions; 16000 conversation characters; timeout 90 seconds. Recorded sampling: temperature 0.7, top_k 20, top_p 0.8, repeat penalty 1. No seed-controlled repeatability or best-of selection is claimed. Client context budgeting is not proof of server allocation or GPU capacity.

Recorded after-set chat latency: original n=22 median 1716.01495 ms, p95 4257.0273 ms; holdout n=12 median 1873.8534 ms, no reported p95 for n<20. These are managed-host chat measurements, not native COM latency or CAD/model GPU co-residency benchmarks. Recorded hardware identifies an RTX 3070 8 GiB; these are not RTX 3080 measurements.

Semantic human review, adjudicated hallucination totals and unsupported-approval counts remain pending. Narrow flags and valid citations cannot prove every statement correct.

## Native video observations

The preserved 79.9-second real-host recording shows selected-component properties, a fresh comparison with one reported modified occurrence, fresh validation with four test-rule PASS findings, real Qwen completion after both saved-evidence tools succeeded, and native Component2 selection/focus followed by clear. [Timeline and media review](../index.html#demonstration).

The original visible-unsuppressed-versus-stored-suppressed discrepancy remains open. The video does not diagnose the original capture, authenticate requirements or establish atomic correspondence between revision/validation captures.

## Formal native acceptance remains pending

All 12 rows of `evaluation/manual-checklist.json` remain pending. The video supports selected behaviors, not certification of complete protocols:

| Row | Outstanding protocol |
| --- | --- |
| C01 | Unchanged baseline/current |
| C02 | Controlled suppress-target transition |
| C03 | Anchored target validation |
| C04 | Restore/revalidate and resolution comparison |
| C05 | Close/reopen identity reconciliation |
| C06 | Verified Locate selection and visible focus |
| C07 | Exact owned-clear postcondition |
| C08 | Preserve manual component/face/mixed selections |
| C09 | Disable/re-enable idle and during inference |
| C10 | SOLIDWORKS restart and private persistence |
| C11 | Native cancellation, stale context and unload |
| C12 | Native timing and GPU co-residency |

Next QA sequence: controlled two-state suppression diagnosis, formal native checklist, independent semantic review and repeatable lifecycle/performance measurements. Do not combine populations into one accuracy percentage.
