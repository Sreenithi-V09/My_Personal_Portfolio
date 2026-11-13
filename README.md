# Sreenithi V — Personal Developer Portfolio

A modern, responsive, standalone personal portfolio website built exclusively with semantic **HTML5**, **CSS3**, and **Vanilla JavaScript**. Features Warm Linen / Ivory Cream (default) and Obsidian Dark dual-theme support, scroll-reveal animations, interactive project detail modals, and zero framework or build-tool dependencies.

---

## Overview & Branding

- **Name:** Sreenithi V
- **Degree:** B.Tech — Computer Science and Business Systems (CSBS)
- **Institution:** K. Ramakrishnan College of Engineering (2023–Present | CGPA: 7.7 / 10)
- **Focus Areas:** Software Development | Web Development | Cybersecurity | Generative AI
- **Primary Email:** [sreenithivenkatesan09@gmail.com](mailto:sreenithivenkatesan09@gmail.com)
- **Location:** Aranthangi, Pudukkottai, Tamil Nadu, India

---

## Project Directory Structure

```text
portfolio/
├── index.html                   # Complete semantic HTML5 portfolio (all 11 sections + SEO & JSON-LD)
├── css/
│   └── style.css                # Pure CSS3 design system (Warm Ivory & Obsidian Dark themes + responsive queries)
├── js/
│   └── script.js                # Vanilla JavaScript (theme toggle, nav tracking, scroll animations, modals, copy email)
├── assets/
│   ├── images/
│   │   ├── sreenithi-profile.png
│   │   ├── sreenithi-profile.jpg
│   │   ├── hero-tech.jpg
│   │   ├── cyber-threat.jpg
│   │   ├── task-tracker.jpg
│   │   ├── news-hub.jpg
│   │   ├── bakery-web.jpg
│   │   ├── medical-ai.jpg
│   │   └── portfolio-arch.jpg
│   ├── icons/
│   │   └── favicon.svg          # Brand monogram SVG icon (section & UI icons are inline SVGs)
│   └── Sreenithi_V_Resume.pdf   # Resume PDF copy in assets
├── README.md                    # Setup and deployment guide
└── Sreenithi_V_Resume.pdf       # Resume PDF at portfolio root
```

---

## Portfolio Sections Included

1. **Home / Hero** — Arched framing, dual CTA actions, quick tech summary, and verified social links
2. **About Me** — Background, Beyond Technical Skills cards, languages, and "What I Focus On" callout
3. **Technical Skills** — Categorized badges across languages, web tech, databases, tools, concepts, and soft skills
4. **Featured Projects** — Interactive project cards with modal architecture & technology breakdowns
5. **Research & Publications** — Peer-reviewed IJSART paper card (`AI-Based Cyber Threat Prediction System`)
6. **Patents & Innovations** — Two filed patent cards (`Smart Acoustic Thermal Ventilation Brick` and `Self-Organizing Food Storage Container`)
7. **Professional Experience** — Timeline cards for Menmozhi Technologies Pvt Ltd & Quehive Technologies
8. **Education** — B.Tech (CSBS) and Higher Secondary Education cards
9. **Certifications** — AWS, GUVI, NPTEL/IIT, Cisco, Coursera/Meta verified courses
10. **Activities & Achievements** — NIT Trichy Workshop, AKKADIANZ25 Paper Presentation, Coding Marathon Coordinator, AICTE UHV Workshop
11. **Contact** — Direct Gmail compose link, 1-click copy email with toast feedback, location, and developer profiles

---

## How to Run Locally

### Option 1: VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. Go to **File → Open Folder...** and select the `portfolio` folder.
3. Install the **Live Server** extension (`ritwickdey.LiveServer`) if not already installed.
4. Right-click `index.html` and click **"Open with Live Server"**.
5. The site launches at `http://127.0.0.1:5500/index.html`.

### Option 2: Direct Browser Launch
- Double-click `index.html` in your file explorer. All CSS, JavaScript, image, and icon paths use relative `./` or `assets/` references and run without any server or build step.

### Option 3: Python Built-In HTTP Server
```bash
cd portfolio
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## Deployment Instructions

### GitHub Pages
1. Push the contents of the `portfolio/` folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Deploy Sreenithi V portfolio"
   git branch -M main
   git remote add origin https://github.com/Sreenithi-V09/portfolio.git
   git push -u origin main
   ```
2. Open **Settings → Pages** in your GitHub repository.
3. Select the `main` branch and `/ (root)` directory, then click **Save**.

### Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Drag and drop the `portfolio/` folder directly onto the Netlify Sites dashboard.
3. Your portfolio deploys immediately with HTTPS enabled (no build command required).

---

## Verified Profile Links

- **GitHub:** `https://github.com/Sreenithi-V09`
- **LinkedIn:** `https://www.linkedin.com/in/sreenithi-v-7a24692a4`
- **Email:** `sreenithivenkatesan09@gmail.com`
