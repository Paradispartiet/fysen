# Initial Reykjavík publication

77 offers from the reviewed first-party menus: ROK 30, Gamla Reykjavík 24 and Kröns 23. Four conflicting bilingual prices remain withheld; no claim of complete restaurant coverage or real-time availability. #1324 retains the other research-only restaurant sources. The read-only stage on 8e72072f50d26722a9ba435a4d074e785adccaff verified all 77 and excluded all four (job 139730295699). The next candidate must preserve the newly published 110 second-wave offers as well as all other prior rows and metadata.

Production reader compatibility: verified both public domains READY at 8ad939aa26c1a77331beb3d30832d74e12a28a6c (web dpl_HmG37vBTSzkV3t2ZLkUbjmbwiFD and API dpl_AAR2cT9Dd8SuoeMZcCrMCRD8xh7h). Public Reykjavík query returned HTTP 200 with zero matches before the release, and Oslo and Helsinki returned valid existing matches.

The one-time main push release is gated by the exact preceding main SHA, explicit release record and three fresh official source reports. It rebuilds and verifies the candidate against the latest locked archive, checks exact remote main/index SHAs, then performs a non-force push of only the index and manifest. Ordinary PRs, previews and unrelated pushes cannot publish. An already-existing restaurant slug blocks a second append. No scheduled writes are enabled by this release.
