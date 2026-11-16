# AI LOG

Name:

## My AI setup

- Tool and where it runs (editor, terminal): ChatGPT, Browser
- Version or model, if shown: GPT-^
- Project context file name and location: ai-context-template, docs
- Did the tool correctly list and describe my project files on the first try? What did I fix? Yes

## Prompt log (at least 6)

| # | Where I used it (file or part) | My prompt | What the AI returned (short summary) | What I did (kept, changed, rejected) and why |
|---|---|---|---|---|
| 1 | Part (opening site)| How do I view the current home.html site through this application? (and sent a picture of my VSC editor.| Gave me a step-by-step guide to navigate to the terminal, and type in python3 -m http.server 8000 and go through the port tab to access my site.| Kept because the prompt worked and I was able to access the site. |
| 2 | Part (Keyboard test clarification)| What should my results look like for the keyboard test?| Gave me the expected results for Tab, Shift+Tab, Enter, and Space| Kept because those codes all worked and helped further my troubleshooting.  |
| 3 | Part (Error Message on Validator) | What is the root of this error message? (with picture)| Explained that the title element was missing from the header and gave me a code section to fix it. | Changed because upon further it inspection it was not the code but the outdated editor|
| 4 | Part (WEBAIM)| The hex codes on the WEBAIM are different from what's appearing on my inspected site? | Explained that the style.css file used transparency vs. WEBAIMs use of solid colors, so therefore the codes are different. They were able to give me comparable codes. | Kept, the codes matched |
| 5 |File (Image) | Can you verify that the image is visible within the home.html and style.css code (with the file codes)| It was formatted correctly in the home.html code but absent from the style.css| Kept the suggestions it made to the style.css code because it added the missing img file.  |
| 6 | File (services.html)| The site isn't letting be added the date manually. Can you review my book.html and booking.js file to find the issue? | Gave me code for the drop-off date and pick up date | Changed, the code had duplicate IDs that was causing it to run improperly.|

## Problems I found in the AI booking form (at least 3)

| # | Problem | How I found it (tool, test, or reading the diff) | Fixed by hand or by follow up prompt |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

## A time the AI was wrong or unhelpful

What happened, and how I caught it:

