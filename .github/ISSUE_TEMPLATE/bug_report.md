---
name: Bug report
about: Create a report to help us improve
title: 'fix: What does this fix for the user?'
labels: bug
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Smartphone (please complete the following information):**
 - Device: [e.g. iPhone6]
 - OS: [e.g. iOS8.1]
 - Version [e.g. 22]
- Build number [e.g 0.3.0]

**Additional context**
Add any other context about the problem here.

## Checklist for developers
- [ ] Reproduce the bug
- [ ] Discuss potential solution
- [ ] Implement solution
- [ ] Bump the patch version number in app.json
- [ ] Code review
- [ ] Tag QA in issue with the following message:

@TestersGitHubUserName

This is ready for testing 👩‍🔬

```
-----------------------------
| Platform     | iOS        |
| Version      | X.X.X      |
| Build number | XXXXXXXX.X |
| Environment  | Test       |
-----------------------------
```
- [ ] Build from main to Production (Specify `Release` as BuildConfiguration).
- [ ] Create a new release in Apple App Store Connect and send it to review
- [ ] Create a new GitHub release
