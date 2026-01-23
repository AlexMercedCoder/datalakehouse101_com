# Product Requirements Document (PRD)
## Project: DataLakehouse101.com
## Product Type: Educational Landing Page
## Target User: Data engineers, data architects, analytics engineers, technical decision-makers, and learners new to lakehouse architecture
## Primary Goal: Educate users on the data lakehouse paradigm and guide them to trusted learning resources, communities, and hands-on experiences

media and images are in the `/assets` directory

---

## 1. Product Overview

DataLakehouse101.com is a single-page educational landing site that introduces the concept of the data lakehouse in a clear, vendor-neutral, and ecosystem-oriented manner. The site serves as an on-ramp for users who want to understand what a data lakehouse is, why it matters, and how to start learning or building one.

The site is optimized for:
- Education first, not product marketing
- Clear calls to action
- SEO discoverability
- Mobile-first consumption

---

## 2. Core Objectives

- Clearly define what a data lakehouse is
- Provide authoritative learning paths (video, hands-on, books, podcasts)
- Connect users to active lakehouse communities
- Encourage practical experimentation through hands-on guides and free trials
- Establish the site as a trusted “101-level” resource for lakehouse concepts

---

## 3. Information Architecture

The site is a single-page layout with vertically stacked sections:

1. Hero
2. Definition
3. Learning CTAs
4. Podcasts
5. Books
6. Communities
7. Footer (SEO, metadata, sitemap links)

---

## 4. Hero Section

### Title
**The Data Lakehouse 101**

### Description
A short, clear subtitle explaining the purpose:
> Learn the architecture that combines the flexibility of data lakes with the performance and governance of data warehouses.

### Calls to Action
- **CTA 1: What is a Data Lakehouse?**  
  Link: https://youtube.com/shorts/JDqCJUQXWYk?si=w6MYqZzaZkVoZlek

- **CTA 2: Build a Lakehouse on Your Laptop**  
  Link: https://datalakehousehub.com/blog/2024-10-hands-on-with-iceberg-dremio-laptop/

- **CTA 3: Free Trial of a Cloud Data Lakehouse**  
  Link: https://www.dremio.com/get-started

### Design Notes
- Full-width hero
- Large headline
- Clear button hierarchy
- Navy blue background
- Accent buttons in orange and yellow

---

## 5. Definition Section

### Heading
**What Is a Data Lakehouse?**

### Definition Copy
The data lakehouse is a paradigm that uses a data lake as a data warehouse by creating open tables using table formats such as Apache Iceberg. These tables provide data-warehouse-style performance, reliability, and governance while remaining compatible with the broader data ecosystem. This approach enables ACID guarantees, open interoperability, and flexible analytics across engines and tools.

[Generate a diagram illustrating the above for this section]

### Call to Action
- **Learn More**  
  Link: https://developer.dremio.com

### Design Notes
- Clean typography
- High readability
- Optional diagram placeholder
- Neutral, educational tone

---

## 6. Data Lakehouse Podcasts Section

### Heading
**Data Lakehouse Podcasts**

### Layout
- Grid of podcast thumbnail cards
- Each card includes:
  - Podcast cover image
  - Podcast title
  - Click-through link to Spotify

### Podcasts

Subscribe to these podcasts today on Spotify and iTunes

- **The Data, Lakehouse and AI Show**  
  Link: https://open.spotify.com/show/4PG0O7mu36oSI1B4FKVSA0?si=6ac003f6e3c742ff

- **Alex Merced's Tech Podcast**  
  Link: https://open.spotify.com/show/2PRDrWVpgDvKxN6n1oUsJF?si=288dcf3c60d94a5e

### Design Notes
- Card-based layout
- Consistent image aspect ratios
- Mobile-friendly stacking

---

## 7. Data Lakehouse Books Section

### Heading
**Essential Data Lakehouse Books**

### Layout
- Horizontal or grid layout of book cards
- Each card includes:
  - Book cover image
  - Title
  - Publisher
  - Year
  - Link to publisher page

### Books

| Title | Publisher | Year | Link |
|------|----------|------|------|
| Apache Iceberg: The Definitive Guide | O’Reilly Media | 2024 | https://www.oreilly.com/library/view/apache-iceberg-the/9781098148614 |
| Apache Polaris: The Definitive Guide | O’Reilly Media | 2025 | https://www.oreilly.com/library/view/apache-polaris-the/9781098175481 |
| Architecting an Apache Iceberg Lakehouse | Manning Publications | 2026 | https://www.manning.com/books/architecting-an-apache-iceberg-lakehouse |

### Design Notes
- High-quality book covers
- Clear typography
- Strong visual credibility

---

## 8. Lakehouse Newsletter Section

Signup for Alex Merced's Newsletter on Open Lakehouses and AI

CTA: Sign Up for the Newsletter (https://amdatalakehouse.substack.com/)

---

## 8. Lakehouse Communities Section

### Heading
**Lakehouse Communities**

### Communities

- **Data Lakehouse Hub**  
  Link: https://datalakehousehub.com Slack Link: https://join.slack.com/t/thedatalakehousehub/shared_invite/zt-274yc8sza-mI2zhCW8LGkOh1uxuf8T5Q

- **Dremio Developer Lakehouse and AI Community**  
  Link: https://developer.dremio.com Slack Link: https://dremio-dev.slack.com/join/shared_invite/zt-3c8zajmhw-b6KfiD343kuIopaaJ1bZ6w#/shared-invite/email

### Design Notes
- Simple list or card layout
- Emphasis on community learning and collaboration

---

## 9. Design Requirements

- Material UI–inspired design system
- Sans serif fonts (e.g., Inter, Roboto, or similar)
- Color palette:
  - Primary: Navy Blue
  - Accents: Orange and Yellow
- High contrast for accessibility
- Consistent spacing and rhythm
- Professional and educational tone

---

## 10. SEO & Metadata Requirements

### Meta Tags
- Title: Data Lakehouse 101 | Learn the Modern Data Architecture
- Description: Learn what a data lakehouse is, how it works, and how to get started with open lakehouse technologies.
- Open Graph and Twitter card metadata

### Structured Data
- JSON-LD for:
  - EducationalOrganization
  - Book
  - PodcastSeries
  - WebPage

### Sitemap
- XML sitemap generated and linked
- Robots.txt included

---

## 11. Performance & Responsiveness

- Mobile-first responsive layout
- Optimized images and lazy loading
- Fast page load times
- Accessible navigation on small screens

---

## 12. Non-Goals

- No gated content
- No account creation
- No heavy interactivity beyond links and navigation
- No vendor lock-in messaging

---

## 13. Success Metrics

- Organic search traffic growth
- Click-through rates on CTAs
- Time on page
- Scroll depth
- Outbound link engagement

---

## 14. Future Enhancements (Out of Scope)

- Interactive diagrams
- Embedded video players
- Multi-language support
- Tutorials hosted directly on the site

---

## 15. Summary

DataLakehouse101.com is designed to be the simplest, clearest educational entry point into the data lakehouse ecosystem. The site emphasizes openness, learning, and practical next steps while maintaining a professional, modern presentation aligned with industry standards.

Make sure any links to Dremio have the following UTM tag `?utm_source=datalakehouse101&utm_medium=influencer&utm_campaign=iceberg&utm_term=datalakehouse101_com-01-23-2026&utm_content=alexmerced`