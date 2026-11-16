# AUDIT

Name: Kate Zeumer

## Baseline (home.html before any changes)

| Check | Result |
|---|---|
| Lighthouse accessibility score | 84 |
| Lighthouse failed audits | 4 |
| WAVE errors | 2 |
| WAVE contrast errors | 0 |
| WAVE alerts | 2 |
| HTML validator errors | 1 |
| Keyboard test (notes) | Tab doesn't work on the homepage, Same issue going backwards on the homepage|
| 200% zoom and 320px test (notes) | Text is cutoff, need to side scroll|

Contrast pairs checked:  

| Text color | Background color | Ratio | Pass or fail (4.5:1 normal, 3:1 large) |
|---|---|---|---|
| c9a3e8 | 8a8a8a | 1.62:1 | Fail |
| b8b8b8 | 8a8a8a | 1.74:1 | Fail |
| 8AB4FF | 8a8a8a | 1.65:1| Fail |

## Problems found on home.html (at least 8)

| # | What I saw (evidence) | Tool or test that showed it | POUR principle | WCAG idea | Severity | Planned fix |
|---|---|---|---|---|---|---|
| 1 | Duplicate IDs for Hours of Operation| HTML Validator| Robust | 1.3.1 | AA | Remove Duplicate |
| 2 | Main Heading isn't formatted correctly | HTML Validator | Percievable | 1.3.1 | AA | Recode as a Header|
| 3 | Hours not compatible with ARIA | HTML Validator | Perceivable| 1.3.1 | AAA | Remove ARIA from list|
| 4 | Click Here Link Label Unclear | Wave | Understandable| 2.4.4 | AA | Change text of link so destination is clearer |
| 5 | Request Stay Code Unclear | Wave| Understandable | 2.5.3 | Medium| Remove label so it matches|
| 6 | Request Stay Button not Keyboard Accessible | Keyboard Test | Operable| 2.1.1| AAA | Replace link|
| 7 | Navigation does not follow tab order| Keyboard Test |Operable| 2.4.3 |AAA| Remove Attirbutes |
| 8 | Image not properly displaying alt text| Lighthouse | Perceivable| 1.1.1 |AA | Replace Alt Text |

## ARIA notes (Part 2, step 13)

For each ARIA attribute you kept or added, explain why a native HTML element could not do the job. If you use none, say so.

## Usability review of services.html

Task scenarios:

- Task A: Estimate the cost for a large dog for boarding and grooming.
- Clicked Large, then added boarding and grooming. Total came to 168.50, but with the number given for the individual price it should've been 135.
- Task B: Find out if a stay from December 24, 2026 to December 26, 2026 is possible.
- Added calendar dates; won't let me send the form.
- Task C: You added Training by mistake. Remove only Training.
- Not possible. 

Findings (at least 6, at least 5 different heuristics):

| # | Task | Evidence (what happened) | Heuristic | Severity | Change to test |
|---|---|---|---|---|---|
| 1 | Choose Dog Size | There are available sizes but the descriptions don't make sense and should be required before you add services | Match between System and Real World| High | Clearer Labels |
| 2 | Cost Calculator| Services don't always add up to the total | Visibility | Medium | Add status|
| 3 | Promotional Messages| Distracting on Screen; Don't lead anywhere | Aesthetic | Medium | Remove/Condense |
| 4 | Sending a Form | Do Difference/Action between go and send | Recognition | High | Change Labels to be clearer |
| 5 | Scheduling Dates | Chart Function Works, inputing dates manually is glitchy| Consistency | High| Recode so its clearer|
| 6 | Size Chart| Clicking on Size chart does nothing| Help and Documentation | Medium| Add chart |

Design checklist for this page:

- Who is using this?
- Dog Owners 
- What is the primary action?
- Booking the Services 
- What competes with it?
- Faulty mechanics and unclear guidelines

## Retest of services.html

| Task | Before (result) | After (result) |
|---|---|---|
| A | Clicked Large, then added boarding and grooming. Total came to 168.50, but with the number given for the individual price it should've been 135. | Able to Add Size first then services, estimate break down was clearer.|
| B | Added calendar dates; won't let me send the form. | Added calendar dates, form sucessfully sent with breakdown|
| C | Not possible. | |

## Verification of book.html

| Check | Result |
|---|---|
| HTML validator errors | |
| Lighthouse accessibility score | |
| Keyboard test (notes) | |
| DevTools check of the status message container (what attribute did you see?) | |

## After (home.html final)

| Check | Before | After |
|---|---|---|
| Lighthouse accessibility score | | |
| WAVE errors | | |
| WAVE contrast errors | | |
| HTML validator errors | | |
| Keyboard test | | |
| 200% zoom and 320px test | | |

## Before shipping checklist (all three pages)

- [ ] Keyboard access works everywhere. Proof:
- [ ] Focus is always visible. Proof:
- [ ] Contrast passes. Proof:
- [ ] Layout works on small screens. Proof:
- [ ] Feedback is meaningful (errors and success). Proof:

## One thing I had to check by hand that the tools did not catch

