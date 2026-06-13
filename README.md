
# Overview

The **Proverbs-Hub** web app showcases Yoruba proverbs and their cultural wisdom in an interactive, dynamic way. My goal with this project is to strengthen my skills in building modular web applications, integrating APIs, and applying CRUD‑style operations to cultural data.  

To start a test server on your computer:  
- Clone the repository.  
- Run a simple local server (e.g., `npx serve` or `npm start`).  
- Open `http://localhost:3000` (or the port shown in your terminal) to view the first page of the app.  

The purpose of this software is to preserve cultural heritage while practicing modern web development techniques such as modular JavaScript, API integration, and responsive UI design.  

[Software Demo Video](https://youtu.be/3DtBl0Wx9pY)

---

# Web Pages

- **Home Page (index.html)** → Displays the header, search bar, filters, and dynamically loaded list of proverbs.  
- **Favorites Section** → Allows users to save and manage their favorite proverbs, stored in localStorage.  
- **Search & Filter Sidebar** → Provides dynamic filtering by category (wisdom, family, community) and region (Yoruba).  
- **Cultural Video Section (Footer)** → Embeds a YouTube video related to Yoruba proverbs, fetched dynamically via API.  

All proverbs are dynamically created from `proverbs.json` and rendered through `ui.js`. Translations are fetched via the Google Translation API, and videos are embedded using the YouTube Data API.

---

# Development Environment

- **Tools Used:** VS Code, GitHub, Node.js, npm, and browser DevTools.  
- **Languages & Libraries:**  
  - HTML, CSS, JavaScript (ES6 modules).  
  - External APIs: Google Translation API, YouTube Data API.  
  - LocalStorage for favorites persistence.  

---

# Useful Websites

* [MDN Web Docs](https://developer.mozilla.org/)  
* [W3Schools JavaScript Reference](https://www.w3schools.com/js/)  
* [YouTube Data API Documentation](https://developers.google.com/youtube/v3)  
* [Google Cloud Translation API](https://cloud.google.com/translate/docs)  

---

# Future Work

* Add full CRUD functionality (create, update, delete proverbs directly in the app).  
* Improve UI/UX with responsive design and animations.  
* Expand dataset with more Yoruba proverbs and additional regions.  
* Implement authentication so users can save favorites across devices.  
* Add multi‑language support beyond English translations.  
