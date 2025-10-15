// Past Papers Data and Functionality

// Load past papers from JSON file
async function loadPastPapers() {
    try {
        const response = await fetch('data/PastPapers.json');
        const papers = await response.json();
        return papers;
    } catch (error) {
        console.error('Error loading past papers:', error);
        return [];
    }
}

// Open PDF in new tab
function openPaper(fileName) {
    window.open(`data/${fileName}`, '_blank');
}

// Filter papers by exam board
function filterByExamBoard(papers, examBoard) {
    return papers.filter(paper => paper.examBoard === examBoard);
}

// Filter papers by year
function filterByYear(papers, year) {
    return papers.filter(paper => paper.year === year);
}

// Filter papers by topic
function filterByTopic(papers, topic) {
    return papers.filter(paper => paper.topics.includes(topic));
}

// Get paper statistics
function getPaperStats(papers) {
    const examBoards = [...new Set(papers.map(p => p.examBoard))];
    const years = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a);
    const totalPapers = papers.length;

    return {
        examBoards,
        years,
        totalPapers
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadPastPapers,
        openPaper,
        filterByExamBoard,
        filterByYear,
        filterByTopic,
        getPaperStats
    };
}
