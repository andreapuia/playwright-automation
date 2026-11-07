# PERF-001: Slow checkout flow
 
**User:** `performance_glitch_user`
**Severity:** Medium
**Priority:** Medium
 
**Steps to reproduce:**
1. Log in with `performance_glitch_user` / `secret_sauce`
2. Go through the complete checkout flow (Scenario 1)
**Actual result:** the complete flow takes ~13-14s. The order is completed successfully, but with visible delays, especially at login.
 
**Expected result:** the flow duration is comparable to `standard_user` (~3-4s).
 
**Observation:** degraded user experience. Login needs a 10s timeout in the fixture, and in WebKit the full flow exceeds the default 30s test timeout, so the test is marked with `test.slow()`.