# Pokémon Explorer
This is a Next.js project created with `create-next-app`.

## 🚀 Live Demo
Check out the deployed version of the app: 🔗 🔗 **[Pokémon Explorer](https://pokemon-sooty-alpha.vercel.app/)**  

## 📌 Features

### 🏠 Homepage
* Displays a list of Pokémon fetched from the **PokeAPI**.
* Includes a **search bar** to filter Pokémon by name.
* Styled using **Tailwind CSS** for a modern and responsive UI.

### 🔍 Pokémon Detail Page
* Clicking on a Pokémon navigates to a detailed page.
* Displays Pokémon **image, abilities, type, stats, and moves**.
* Uses **Next.js dynamic routing** (`/pokemon/[id]`).

### ⚡ Performance Optimizations
* **Static Generation (SSG)** with `getStaticProps` and `getStaticPaths` for fast page loads.
* Optimized images using **Next.js Image component**.

## 🛠️ Installation & Setup

**1. Clone the Repository**
```bash
git clone https://github.com/your-username/pokemon-explorer.git
cd next-app
```

**2. Install Dependencies**
```bash
npm install
```

**3. Run the Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

**4. Build & Run for Production**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
next-app/
|-- app/
|   |-- components/              # Reusable UI components
|   |   |-- LoadingSpinner.tsx
|   |   |-- PokemonCard.tsx
|   |   |-- SearchBar.tsx
|   |   |-- StateBar.tsx
|   |-- pokemon/
|   |   |-- [id]/
|   |   |   |-- page.tsx         # Dynamic Pokémon detail page
|   |-- globals.css              # Global styles
|   |-- page.tsx                # Homepage with Pokémon list
|-- public/                     # Static assets
|-- .gitignore
|-- next.config.ts
|-- package-lock.json
|-- package.json                # Project dependencies
|-- README.md                   # Project documentation
|-- tailwind.config.ts
|-- tsconfig.json
```

## 🎯 Technologies Used
* **Next.js** (React Framework)
* **TypeScript** 
* **Tailwind CSS** (For styling)
* **PokeAPI** (Data source)
* **Vercel** (Hosting & deployment)


Enjoy exploring the world of Pokémon with this app! If you have any questions or feedback, feel free to open an issue or contribute to the project. 😊