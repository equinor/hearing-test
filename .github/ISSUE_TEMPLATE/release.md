---
name: Release
about: Release process for Hørselstest
title: Release X.X.X
labels: chore
assignees: ''

---

- [ ] Connect the release pull request to this issue by clicking on the right hand side on `Development` -> Select this repository -> Select the pull request named `chore(main): release x.x.x`.
- [ ] Verify that the build for the linked release PR is available in TestFlight.
- [ ] Add a comment in this issue with the text:
```
@TestersName 

This is ready for testing 👩‍🔬 Find the changes to be tested in the linked pull request 👌 

------------------------------
| Platform     | iOS         |
| Environment  | Test        |
| Version      | X.X.X       |
| Build number | YYYY.MMDD.X |
------------------------------
```
- [ ] Move issue to `🧪 In Test`
- [ ] Get approval from tester
- [ ] Merge PR [chore(main): release X.X.X](https://github.com/equinor/hearing-test/pulls?q=is%3Aopen+is%3Apr+label%3A%22autorelease%3A+pending%22). Merging this PR will trigger a build to production.
- [ ] Create release note in [ServicePortal](https://web-mad-service-portal-web-prod.radix.equinor.com/HearingTest)
- [ ] Verify that the prod build is finished. Build number can be found in the GitHub Action for building to prod. Check under `trigger-build/Build IPA` -> `Set build number to environment variable`.
- [ ] [App Store Connect - Internal Testing](https://appstoreconnect.apple.com/apps/1626051120/testflight/groups/d44cc815-cb52-42f5-80f4-edc009d42799) - Release build to internal testers
- [ ] [App Store Connect - External Testing](https://appstoreconnect.apple.com/apps/1626051120/testflight/groups/2fcf8d9d-7d4d-45f5-a4c7-dc8175f0678b) - Release build to external testers
- [ ] [App Store Connect - App Store](https://appstoreconnect.apple.com/apps/1626051120/appstore/ios/version/deliverable) - Create a new release, submit to review and automatically release
- [ ] When the app submission has been approved in [App Store Connect - App Store](https://appstoreconnect.apple.com/apps/1626051120/appstore/ios/version/deliverable), verify that the app is available for download in the Equinor Hub and that it's working.
- [ ] Write a message about the new release in Teams channel [Hørselstest -> General](https://teams.microsoft.com/l/channel/19%3ag6uyP5sUZ-xRS4otTceCn4glApbAmYDj8H0eI1qeFyw1%40thread.tacv2/General?groupId=31cd468a-fca0-4bbc-86a8-7ab0c2f5b791&tenantId=3aa4a235-b6e2-48d5-9195-7fcf05b459b0)
