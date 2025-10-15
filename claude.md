# A-Level Chemistry Flashcards

An interactive web-based flashcard application designed to help A-Level chemistry students master all topics across Organic, Inorganic, and Physical Chemistry using spaced repetition learning techniques.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No build tools or dependencies required - runs entirely in the browser

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bob.git
   cd bob
   ```

2. Open the project:
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

   Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Then visit http://localhost:8000
   ```

## Usage

### Studying with Flashcards

1. Navigate to the topic you want to study (Organic, Inorganic, or Physical Chemistry)
2. Click on a flashcard to reveal the answer
3. Rate your understanding using the difficulty buttons:
   - **Hard** - See the card again soon (shorter interval)
   - **Medium** - Moderate review interval
   - **Easy** - Longer review interval

### Spaced Repetition System

The flashcards use spaced repetition intervals to optimize learning:
- Cards you mark as "Hard" appear more frequently
- Cards you mark as "Easy" appear less frequently
- The system tracks your progress and adapts to your learning

### Past Papers Feature

Navigate to the Past Papers section to:
- Browse AQA A-Level Chemistry past papers
- View papers by year and session (June/November)
- Access question papers and mark schemes
- Filter by topics covered in each paper

### Data Storage

All flashcard data is stored in JSON format:
```javascript
{
  "question": "What is the general formula for alkenes?",
  "answer": "CₙH₂ₙ",
  "explanation": "Alkenes are unsaturated hydrocarbons..."
}
```

## Features

### Core Features

- **Three Chemistry Branches**: Complete coverage of A-Level Chemistry
  - Organic Chemistry
  - Inorganic Chemistry
  - Physical Chemistry

- **Spaced Repetition Learning**: Intelligent algorithm that schedules card reviews based on your performance
  - Adaptive intervals (Hard: short, Medium: moderate, Easy: long)
  - Progress tracking per card
  - Review statistics

- **Interactive Flashcards**: Modern, smooth card-flipping animations
  - Click to flip and reveal answers
  - Detailed explanations for each concept
  - Navigation between cards
  - Session progress tracking

- **Past Papers Integration**: Access to AQA past papers
  - Organized by year and session
  - Question papers and mark schemes
  - Topic breakdowns for each paper
  - PDF access for offline study

- **JSON-Based Storage**: All flashcards stored as structured JSON data
  - Easy to add new cards
  - Portable and version-controllable
  - Simple data structure

### Design & User Experience

- **Modern, Clean Interface**: Minimalist design inspired by contemporary web aesthetics
  - Smooth animations and transitions
  - Responsive layout for all devices
  - Intuitive navigation
  - Accessibility-focused

- **Color Scheme**: Professional blue accent (#2e5cff) with clean typography
  - High contrast for readability
  - Consistent spacing and layout
  - Card-based UI with subtle shadows

## Project Structure

```
bob/
├── index.html              # Landing page
├── topics.html             # Topic selection page
├── Organic.html            # Organic chemistry flashcards
├── physical.html           # Physical chemistry flashcards
├── flashcards.html         # Main flashcard interface
├── progress.html           # Progress tracking
├── styles.css              # Main stylesheet
├── script.js               # Flashcard logic and spaced repetition
├── Organic.js              # Organic chemistry data
├── physical.js             # Physical chemistry data
└── past papers/
    ├── chemistry-tracker.html
    ├── papers.js
    ├── Past styles.css
    └── data/
        └── PastPapers.json # Past paper metadata
```

## Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

### Reporting Issues

If you find a bug or have a suggestion, please open an issue on GitHub with:
- A clear description of the problem
- Steps to reproduce (for bugs)
- Expected vs actual behavior

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
