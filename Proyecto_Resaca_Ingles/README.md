# LA RESACA VIEWPOINT CAMPESTRE

## PROJECT OVERVIEW
La Resaca Viewpoint Campestre is a static website developed to present a tourist destination focused on sensory experience, reconnection with nature, and the cultural identity of Mogotes, Santander. The project is designed as an informative landing page with multiple internal pages that highlight the essence of the place, its services, experiences, gallery, and a contact channel for reservations or inquiries.

This project is also a collaborative effort between the Software Development program (ADSO) and the Tourism program. It was created as part of a learning experience to practice English while building a functional website for a real local business.

## PROJECT OBJECTIVES
The site aims to:

- Implement web development concepts learned during training and practical exercises.
- Demonstrate Frontend design skills using HTML, CSS, and basic JavaScript.
- Provide a functional and sustainable MVP for the viewpoint while the business continues to grow.
- Present the project in English as part of the collaborative and academic context.

## TECHNOLOGIES USED
The project is built using vanilla web technologies:

- HTML5 for page structure.
- CSS3 for visual design and layout.
- JavaScript for basic interactivity and logic.
- Google Fonts for typography.
- Formspree for contact form submission.
- Google Maps embed for location display.

No framework or backend is used; the website works as a static project.

## PROJECT STRUCTURE
The main files of the project are:

- index.html: main landing page.
- sobre-nosotros.html: page for the identity and concept of the place.
- servicios.html: page for cultural products and alliances.
- experiencias.html: page for gastronomy and experiential content.
- galeria.html: page with a visual gallery and lightbox.
- contacto.html: page with contact information and the contact form.
- styles.css: main stylesheet for the complete site.
- nav.js: behavior for the mobile navigation menu.
- img/: folder containing the visual assets used in the project.

## MAIN PAGES

### Home - index.html
The home page is the main entry point of the site. It includes:

- a hero section with the main message and action buttons;
- a section about transformational experiences;
- a section for cultural products and alliances;
- a section dedicated to gastronomy and identity;
- visitor reviews;
- location information;
- a footer with contact details and links.

### About Us - sobre-nosotros.html
This page presents the identity and conceptual approach of the project. It highlights:

- the idea of sensory and regenerative tourism;
- the relationship between the project and local nature and culture;
- the values and experience offered by the site.

### Services - servicios.html
This page presents the cultural products and activities offered by the project, including:

- creative children’s workshops;
- storytelling sessions with “the grandfather”;
- a family campesina alliance experience.

### Experiences - experiencias.html
This page focuses on the gastronomic and sensory aspects of the experience, including:

- ancestral beverages;
- traditional doughs and fruits;
- the main dish, gallina criolla.

### Gallery - galeria.html
This page contains a collection of images of the place. It includes:

- an image grid;
- an interactive lightbox for enlarged viewing;
- navigation with arrow buttons;
- closing actions through click outside or the Escape key.

### Contact - contacto.html
This page is designed to facilitate communication with the project. It includes:

- general contact information;
- phone number;
- email address;
- business hours;
- a direct WhatsApp link;
- a contact form with basic validation.

## IMPLEMENTED FUNCTIONALITIES

### Navigation Menu
The nav.js file manages the menu behavior on small screens. It allows:

- opening and closing the menu with the hamburger button;
- locking page scroll while the menu is open;
- closing the menu when a link is selected;
- closing the menu when clicking outside it;
- changing the navbar style while scrolling.

### Interactive Gallery
The gallery page includes a lightbox that lets the user view each image in full screen. The logic is integrated directly into the page.

### Contact Form
The contact form is connected to Formspree. It collects:

- first name;
- last name;
- email address;
- phone number;
- subject;
- message;
- an optional experience rating.

It also includes success and error feedback based on the result of the submission.

### External Integrations
The site uses the following external services:

- Google Fonts for typography;
- Google Maps for location display;
- Formspree for form submission;
- WhatsApp links for direct contact.

## STYLING AND DESIGN
The visual styles of the project are centralized in styles.css. This file defines:

- the color palette;
- the main typography;
- the navbar styles;
- the layout of sections and cards;
- reusable buttons and components;
- gallery and lightbox styles;
- specific styles for the contact page.

The project also uses CSS variables in :root to keep the visual system consistent throughout the site.

## VISUAL ASSETS
The project uses images stored in the img/ folder. These assets are used in:

- the home page;
- the gallery;
- the content cards;
- the visual backgrounds of sections.

## PROJECT STATUS
The project is currently in an active development phase and is being completed as a static website. The content and visual assets are being organized and integrated to deliver a functional version of the landing page.

## RUNNING THE PROJECT LOCALLY
This project does not require dependency installation or compilation.

The current deployment for viewing the project is:

https://edwardblanco.github.io/pagina-proyecto-ingles-resaca/galeria.html

The repository is available at:

https://github.com/EdwardBlanco/pagina-proyecto-ingles-resaca

To view it locally, open any HTML file in a browser, or run a simple static server from the project folder.

Example with Python:

```bash
python -m http.server 8000
```

Then open the following URL in the browser:

```text
http://localhost:8000/
```

## CONTENT MAINTENANCE
The project content is mainly maintained through the main HTML, CSS, and JavaScript files:

- updating text and information in the HTML files;
- replacing or adding images in the img/ folder;
- adjusting visual styles in styles.css;
- modifying interactive behavior in nav.js.
