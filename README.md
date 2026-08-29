# ajav-de.github.io
JAVILLO AD — PORTFOLIO 
Author: Althea Denielle M. Javillo | CS2A
Personal Portfolio in Compliance to being a Computer Science Person and a student in Web Development

OVERVIEW OF CHANGES
-------------------------------------
HEADER NAVIGATION (Header & Nav Pill)
- Added header with logo for last name and buttons that direct to sections for "Home", "About Me", "Projects", "Achievements"
	-Projects and Achievements used to one but made separately to accommodate the separated card decks for each.
- Navigation links now sit cleanly on the transparent/frosted header background.
- Added smooth scrolling.

HERO SECTION
- Originally displaying a static, single image had now been a series of images shown when scrolling
	- expanded as the hero container so that showcase images span the entire screen width and height (`100%` width, `100vh` sticky stage).
- Updated image styling to `object-fit: cover` with `object-position: center`.
- Added scroll-sticky crossfading animation between hero visuals.

TYPOGRAPHY & FONT INTEGRATION
  ----font-charted: 'Micro 5 Charted', sans-serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'DM Mono', monospace;
  --font-display: 'Syne', sans-serif;

WEBDEV PROJECTS
 - Card 1 Fashion Blog 
	https://ajav-de.github.io/Activity/Fashion/fashionblog.html
 - Card 2 WineFes
	https://ajav-de.github.io/1.2-WineFes/
 - Card 3 Davie's Burgers
	https://ajav-de.github.io/DaviesBurgers/
 - Each card is provided with a related photo or a screenshot with brief discussions and applications of each project.

ACHIEVEMENTS 
  - Card 1 Coursera Certificate
  - Card 2 Globe Kadayawan
  - Card 3 Hainan Sorbet
  - Card 4 Happy Synthesizer: Self-contained video player with no external link.
    Supports instant click-to-pause and click-to-play toggle when you use picture-in-picture.
    Each card displays the date or status, and displays other activities I've done outside the webdev course.

SOCIALS
- Connected About Me social buttons to live profiles:
  - LinkedIn: https://www.linkedin.com/in/althea-denielle-m-javillo
  -  GitHub: https://github.com/ajav-de
  - Instagram: https://www.instagram.com/aljavillo?igsi=aGx6NTZyOW84b3N4
  - Facebook: https://www.facebook.com/alt.javillo/

ERROR HANDLING
- Fixed missing link errors ("Unsupported/Private"):
- Created static fallback assets in `/public` directory (`img.png`, `video.mp4`, and `images/`).
- Updated script tag to modern module syntax: `<script type="module" src="/main.js"></script>`.
- Added video error listeners in `main.js` for error handling if a custom video is missing.

