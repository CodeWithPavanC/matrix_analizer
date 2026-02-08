# Interactive Matrix Analysis Web Application

A full-stack web application for performing matrix operations with proper Data Structures & Algorithms implementation, strict frontend-backend separation, and a calm academic UI.

## 📋 Prerequisites

Before running this application, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v18.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - This includes npm (Node Package Manager)

2. **Git** (for cloning the repository)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

### System Requirements
- **OS**: Windows 10/11, macOS, or Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: ~500MB for dependencies and application

---

## 🎯 Features

- **6 Matrix Operations** (all server-side):
  - Row Sum & Average
  - Column Sum & Average
  - Swap Upper & Lower Diagonal (in-place)
  - Determinant (Gaussian Elimination with Partial Pivoting)
  
- **Per-operation result displays** - No combined analytics sections
- **Strict N ≥ 20 constraint** with validation
- **Calm, academic UI** - Minimal design, subtle animations
- **Complete DSA documentation** - All algorithms documented with complexity analysis

---

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **CORS** enabled for frontend communication
- **Dependencies**: express, cors, typescript, tsx

### Frontend
- **React** 18 with TypeScript
- **Vite** for fast development
- **Tailwind CSS** v3 for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **Dependencies**: react, react-dom, react-router-dom, tailwindcss, vite

---

## 🚀 Quick Start (One-Click Setup)

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd pavans_project
```

### Step 2: Install All Dependencies (One Command!)

**Windows:**
```bash
.\setup.bat
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

This will automatically install **all** backend and frontend dependencies via npm.

### Step 3: Start Both Servers

**Windows:**
```bash
.\start.bat
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

This will start both servers:
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:5173

### Step 4: Open in Browser
Navigate to `http://localhost:5173` in your web browser.

---

## 📖 Usage Flow

1. **Home Page**: Enter matrix size N (must be ≥ 20)
2. **Matrix Input Page**: Fill in N×N matrix values (or use "Fill with Random Values")
3. **Analysis Page**: Click any operation button to calculate and view results below

Each operation displays:
- Result data (array or matrix)
- Time complexity
- Space complexity
- Algorithm notes

---

## 🔧 API Endpoints

All endpoints: `POST http://localhost:3001/api/matrix/<operation>`

- `/row-sum` - Calculate row sums
- `/column-sum` - Calculate column sums
- `/row-average` - Calculate row averages
- `/column-average` - Calculate column averages
- `/swap-diagonals` - Swap upper/lower diagonals
- `/determinant` - Calculate determinant

**Request Body**:
```json
{
  "matrix": [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
}
```

**Response**:
```json
{
  "operation": "Row Sum",
  "result": [6, 15, 24],
  "metadata": {
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(n)",
    "matrixSize": 3
  }
}
```

---

## 📚 Algorithm Documentation

### Row Sum
**Algorithm**: Nested loop through all rows and columns  
**Time**: O(n²) - iterate through n×n elements  
**Space**: O(n) - store n row sums  

### Column Sum
**Algorithm**: Nested loop through all columns and rows  
**Time**: O(n²) - iterate through n×n elements  
**Space**: O(n) - store n column sums  

### Row Average
**Algorithm**: Reuses row sum, then divides by n  
**Time**: O(n²) - reuses row sum calculation  
**Space**: O(n) - stores n averages  

### Column Average
**Algorithm**: Reuses column sum, then divides by n  
**Time**: O(n²) - reuses column sum calculation  
**Space**: O(n) - stores n averages  

### Swap Upper & Lower Diagonal
**Algorithm**: In-place swap of elements where i < j with elements where i > j  
**Time**: O(n²) - processes upper triangle only  
**Space**: O(1) - in-place operation, no auxiliary matrix  

### Determinant (Gaussian Elimination)
**Algorithm**: Forward elimination with partial pivoting  
**Time**: O(n³) - three nested loops for row reduction  
**Space**: O(n²) - copy of matrix to preserve original  
**Why not Laplace Expansion?**: O(n!) complexity is impractical for n ≥ 20

For detailed algorithm analysis, see [ALGORITHMS.md](ALGORITHMS.md).

---

## 📁 Project Structure

```
pavans_project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── pages/       # Page components
│   │   │   └── layout/      # Layout components
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── algorithms/      # DSA implementations
│   │   ├── routes/          # API routes
│   │   └── index.ts         # Server entry point
│   └── package.json
├── .gitignore
├── setup.bat / setup.sh    # Install dependencies
├── start.bat / start.sh    # Start both servers
├── ALGORITHMS.md           # Detailed algorithm documentation
└── README.md
```

---

## 🛡️ Constraints

- Matrix size N ≥ 20 (enforced on both frontend and backend)
- All matrix elements must be numeric
- Matrix must be square (N×N)

---

## 🎨 Design Principles

- **Calm & Academic**: No aggressive animations or neon colors
- **Per-Operation Results**: Each button displays results independently below it
- **No General Section**: Results are never combined
- **Subtle Animations**: Slow fade-in effects for result cards only
- **Strict Separation**: All matrix calculations run on the backend

---

## 👨‍💻 Development Commands

### Backend
```bash
cd backend
npm run dev      # Development with hot reload
npm run build    # Compile TypeScript
npm start        # Run compiled version
```

### Frontend
```bash
cd frontend
npm run dev      # Development server
npm run build    # Production build
```

---

## 📝 Files to Commit to GitHub

**Include** (all tracked by Git):
- All source code files (`*.ts`, `*.tsx`, `*.css`, `*.html`)
- Configuration files (`package.json`, `tsconfig.json`, `tailwind.config.js`, etc.)
- Scripts (`setup.bat`, `setup.sh`, `start.bat`, `start.sh`)
- Documentation (`README.md`, `ALGORITHMS.md`, `TESTING.md`)
- `.gitignore`

**Exclude** (in `.gitignore`):
- `node_modules/` - Will be installed via `setup.bat`/`setup.sh`
- `dist/` - Build output
- `.env` - Environment variables
- IDE files (`.vscode/`, `.idea/`)

Your friend only needs to run `setup.bat` (or `setup.sh`) to install all dependencies!

---

## 📄 License

MIT

---

**Academic Project**: Focus on DSA correctness, clean architecture, and maintainability.
