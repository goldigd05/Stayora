
# Stayora

An Airbnb-style full stack web application where users can browse, create, edit and delete property listings and leave reviews on them.

> Status: actively being built. Authentication, owner permissions and image upload are in progress.

## Features

- Browse all listings with title, image, price and location
- Create, view, edit and delete listings (full CRUD)
- Add and delete reviews with a 1 to 5 star rating on each listing
- Deleting a listing also deletes all of its reviews (Mongoose post-middleware)
- Server-side validation using Joi, plus client-side Bootstrap form validation
- Flash messages for success and error feedback
- Centralized error handling with a custom `ExpressError` class and a 404 page

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime and server | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Templating | EJS, ejs-mate (layouts and partials) |
| Styling | Bootstrap 5, custom CSS |
| Validation | Joi |
| Sessions and messages | express-session, connect-flash |
| Other | method-override, dotenv |

## Project Structure

```
Stayora/
├── app.js            # Server setup, middleware, routes
├── schema.js         # Joi validation schemas
├── models/           # Mongoose models (Listing, Review)
├── routes/           # Express routers (listings, reviews)
├── views/            # EJS templates (layouts, includes, listings)
├── public/           # Static CSS and JS
├── utils/            # ExpressError, wrapAsync
└── init/             # Sample data and database seeding script
```

## Getting Started

1. Clone the repository

   ```bash
   git clone [your-repo-url]
   cd Stayora
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root

   ```
   MONGO_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   ```

4. (Optional) Seed the database with sample listings

   ```bash
   node init/index.js
   ```

5. Start the server

   ```bash
   node app.js
   ```

   The app runs at `http://localhost:8080/listings`.

## Roadmap

- [ ] User signup and login (Passport.js)
- [ ] Owner-only edit and delete permissions
- [ ] Image upload (Multer with cloud storage)
- [ ] Map view for listing locations
- [ ] Search and category filters
- [ ] Deployment with a live demo link

## Screenshots

_Add screenshots of the listings page, listing details and the new listing form here._

## Author

[Your Name] | [LinkedIn URL] | [GitHub URL]
