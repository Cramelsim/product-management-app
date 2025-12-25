# Product Management App

A Vue 3 based product management application for AlienSoft Technologies internship technical test.

## Features

- User authentication with token-based session management
- Product listing with search and category filtering
- Product detail view
- Add new products
- Delete products with confirmation
- State management with Pinia
- Responsive design with Tailwind CSS
-  Route protection and navigation guards

## Tech Stack

- Vue 3 (Composition API)
- Vue Router
- Pinia (State Management)
- Tailwind CSS
- Axios (HTTP client)
- DummyJSON API (Mock backend)

## Project Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd product-management-app
2. Install dependencies
bash
npm install
3. Run development server
bash
npm run dev
4. Build for production
bash
npm run build
5. Preview production build
bash
npm run preview
Project Structure
text
src/
├── api/              # API service modules
├── components/       # Reusable UI components
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
├── views/           # Page components
├── App.vue          # Root component
├── main.js          # Application entry point
└── style.css        # Global styles
API Integration
The app uses DummyJSON for mock API endpoints:

Authentication
Login: POST https://dummyjson.com/auth/login

Current User: GET https://dummyjson.com/auth/me (requires token)

Products
List Products: GET https://dummyjson.com/products

Get Product: GET https://dummyjson.com/products/:id

Add Product: POST https://dummyjson.com/products/add

Update Product: PUT https://dummyjson.com/products/:id

Delete Product: DELETE https://dummyjson.com/products/:id

Search Products: GET https://dummyjson.com/products/search?q=:query

Get Categories: GET https://dummyjson.com/products/categories

Demo Credentials
Use the following credentials to login:

Username: emilys
Password: emilyspass

Username: atuny0
Password: 9uQFF1Lh

Features Details
Authentication
JWT token based authentication

Automatic token storage in localStorage

Session restoration on page refresh

Route guards for protected routes

Product Management
Paginated product listing

Real-time search by title and description

Category-based filtering

Stock level visualization

Product preview during creation

Responsive image handling

State Management
Centralized auth state with Pinia

Product state with loading and error handling

Optimistic updates for better UX

Proper error handling and user feedback

UI/UX
Responsive design (mobile, tablet, desktop)

Loading states and skeletons

Form validation

Confirmation dialogs for destructive actions

Smooth transitions and animations

Deployment
GitHub Pages Deployment
Update vite.config.js:

javascript
export default defineConfig({
  base: '/repository-name/', // Replace with your repo name
  // ... other config
})
Build and deploy:

bash
npm run build
Deploy the dist folder to GitHub Pages.

Alternative Hosting
You can also deploy to services like:

Netlify

Vercel

Firebase Hosting

AWS Amplify

Assumptions & Notes
The DummyJSON API doesn't actually persist data, so all CRUD operations are simulated.

Authentication tokens from DummyJSON expire, so you may need to re-login periodically.

Product images may return 404 errors - the app includes fallback placeholders.

The mockup link provided was inaccessible (404), so the UI was designed based on the written requirements.

Primary color (#000080) is used throughout as requested.

Future Enhancements
Edit product functionality

Advanced filtering (price range, rating)

Bulk operations

Export data (CSV, Excel)

Dark mode

Multi-language support

Advanced analytics dashboard

Image upload functionality

Contact
For any questions or issues, please contact the development team.

Built for AlienSoft Technologies Frontend Developer Internship Technical Test

text

## PostCSS Configuration (postcss.config.js)
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
