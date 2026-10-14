# Viking Cricket Club — Portfolio Demo v1

A responsive cricket club website built by **Kokila Chandramohan** using React and Vite.

Inspired by Viking Cricket Club in Stavanger, Norway, this project demonstrates a welcoming club website and an interactive membership application flow.

> This is a portfolio prototype with sample content and fictional contact details.

## Live demo

[View Viking Cricket Club](https://kokila-c.github.io/Viking-cricket-club/)

## Features

- Responsive layouts for mobile and desktop.
- Desktop section navigation and a mobile menu.
- Club information, team details, fixtures, results and news.
- Three-step individual and family membership applications.
- Form validation, consent and guardian details for junior applicants.
- Saved drafts, application references and status tracking.
- A demo review screen for approving or rejecting applications and adding notes.
- A gallery viewer, cricket illustrations and an animated Norwegian flag.
- Keyboard-accessible dialogs and reduced-motion support.

## Technologies

- **React** — components and interactive features.
- **JavaScript** — application logic and validation.
- **CSS** — responsive layouts and styling.
- **SVG** — illustrations and flag animation.
- **Vite** — development and production builds.
- **localStorage** — browser-local demo data.
- **GitHub Pages** — website hosting.
- **GitHub Actions** — automated deployment.

## Membership demo

Visitors can complete an application, receive a reference and check its status. The demo review screen allows application decisions and notes to be explored.

Membership drafts and applications are stored only in the visitor’s browser on that device. Each browser has its own independent demo data.

Please use fictional details when trying the form. Submitting an application does not create a real club membership, send an email or take payment. The displayed fees are demo figures.

The review screen demonstrates the workflow; it is not an authenticated club administration system.

Select **Reset demo** in the review screen to clear the saved demo data in that browser.

## Design

The website uses a navy, off-white and orange colour palette, cricket line art and a transparent club crest.

The layout aims to balance clear navigation, readable content and a welcoming community feel across screen sizes.

## Project structure

| Folder | Purpose |
| --- | --- |
| `src/components` | Page sections, navigation, membership forms and dialogs |
| `src/data` | Sample content, fictional contact details and membership rules |
| `src/services` | Browser-local membership storage |
| `src/hooks` | Membership state |
| `public` | Artwork and browser-tab icon |
| `.github/workflows` | Automated GitHub Pages deployment |

## Deployment

The website is hosted on **GitHub Pages**.

Changes pushed to the `main` branch trigger a GitHub Actions workflow that builds and deploys the updated website.

## Author

**Kokila Chandramohan**

[GitHub profile](https://github.com/kokila-c)
