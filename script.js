// Data fetching service
class DataService {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 1000 * 60 * 60; // 1 hour cache
    }

    async fetchFromSource(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching from ${url}:`, error);
            throw error;
        }
    }

    async getData() {
        const sources = [
            {
                name: 'Treasury',
                url: 'https://www.treasury.go.ke/api/budget/2024',
                fallback: 'data.json'
            },
            {
                name: 'Parliament',
                url: 'https://www.parliament.go.ke/api/finance-bill/2024',
                fallback: 'data.json'
            }
        ];

        for (const source of sources) {
            try {
                const cachedData = this.getCachedData(source.name);
                if (cachedData) {
                    return cachedData;
                }

                const data = await this.fetchFromSource(source.url);
                this.cacheData(source.name, data);
                return data;
            } catch (error) {
                console.warn(`Failed to fetch from ${source.name}, trying fallback...`);
                try {
                    const fallbackData = await this.fetchFromSource(source.fallback);
                    return fallbackData;
                } catch (fallbackError) {
                    console.error(`Fallback also failed for ${source.name}`);
                }
            }
        }

        throw new Error('All data sources failed');
    }

    cacheData(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    getCachedData(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        return null;
    }
}

// Utility functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        maximumFractionDigits: 0
    }).format(amount);
};

const createElement = (tag, className, text = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
};

// Modal functionality
class Modal {
    constructor() {
        this.modal = createElement('div', 'modal');
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-modal', 'true');
        this.modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">×</button>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(this.modal);

        this.setupEventListeners();
    }

    setupEventListeners() {
        const closeBtn = this.modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.close());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    show(content) {
        this.modal.querySelector('.modal-body').innerHTML = content;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Main application
class KenyaFinanceWatch {
    constructor() {
        this.modal = new Modal();
        this.dataService = new DataService();
        this.ministriesContainer = document.querySelector('.ministries-grid');
        this.errorContainer = createElement('div', 'error-message');
        this.loadingContainer = createElement('div', 'loading-message', 'Loading ministry data...');
        this.lastUpdateContainer = createElement('div', 'last-update');
    }

    async init() {
        try {
            this.ministriesContainer.appendChild(this.loadingContainer);
            const data = await this.dataService.getData();
            this.renderMinistries(data.ministries);
            this.updateLastUpdateTime();
        } catch (error) {
            this.showError('Failed to load ministry data. Please try again later.');
        }
    }

    showError(message) {
        this.loadingContainer.remove();
        this.errorContainer.textContent = message;
        this.ministriesContainer.appendChild(this.errorContainer);
    }

    createMinistryCard(ministry) {
        const card = createElement('div', 'ministry-card');
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');

        const discrepancyClass = ministry.discrepancy > 0 ? 'positive' : 'negative';
        
        card.innerHTML = `
            <h3>${ministry.name}</h3>
            <div class="ministry-stats">
                <p><strong>Budgeted Amount:</strong> ${formatCurrency(ministry.budgeted_amount)}</p>
                <p><strong>Actual Expenditure:</strong> ${formatCurrency(ministry.actual_expenditure)}</p>
                <p class="${discrepancyClass}"><strong>Discrepancy:</strong> ${formatCurrency(ministry.discrepancy)}</p>
            </div>
            <a href="ministry.html?id=${ministry.id}" class="view-details-btn" aria-label="View details for ${ministry.name}">
                View Details
            </a>
        `;

        return card;
    }

    renderMinistries(ministries) {
        this.loadingContainer.remove();
        this.ministriesContainer.innerHTML = '';
        
        ministries.forEach(ministry => {
            const card = this.createMinistryCard(ministry);
            this.ministriesContainer.appendChild(card);
        });
    }

    updateLastUpdateTime() {
        const now = new Date();
        this.lastUpdateContainer.textContent = `Last updated: ${now.toLocaleString()}`;
        this.ministriesContainer.appendChild(this.lastUpdateContainer);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new KenyaFinanceWatch();
    app.init();
});

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('nav') && 
            !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Constants for Corruption Index calculation
const WEIGHTS = {
    BDR: 0.5,  // Budget Discrepancy Ratio weight
    TS: 0.3,   // Transparency Score weight
    HCR: 0.2   // Historical Corruption Risk weight
};

// Transparency Scores (placeholder values)
const TRANSPARENCY_SCORES = {
    'Ministry of Health': 0.8,
    'Ministry of Education': 0.9,
    'Ministry of Agriculture': 0.4,
    'Ministry of Transport': 0.7,
    'Ministry of Interior': 0.6
};

// Historical Corruption Risk scores (placeholder values)
const HISTORICAL_RISK = {
    'Ministry of Health': 0.5,
    'Ministry of Education': 0.3,
    'Ministry of Agriculture': 0.8,
    'Ministry of Transport': 0.4,
    'Ministry of Interior': 0.6
};

class CorruptionIndexCalculator {
    constructor() {
        this.ministries = [];
        this.chart = null;
    }

    async init() {
        try {
            await this.fetchData();
            this.calculateCorruptionIndices();
            this.displayResults();
            this.initializeChart();
        } catch (error) {
            console.error('Error initializing corruption index:', error);
            this.showError('Failed to load corruption index data. Please try again later.');
        }
    }

    async fetchData() {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch ministry data');
        }
        const data = await response.json();
        this.ministries = data.ministries;
    }

    calculateCorruptionIndices() {
        this.ministries.forEach(ministry => {
            // Calculate Budget Discrepancy Ratio (BDR)
            const BDR = Math.abs(ministry.budgeted_amount - ministry.actual_expenditure) / ministry.budgeted_amount;
            
            // Get Transparency Score (TS)
            const TS = TRANSPARENCY_SCORES[ministry.name] || 0.5;
            
            // Get Historical Corruption Risk (HCR)
            const HCR = HISTORICAL_RISK[ministry.name] || 0.5;
            
            // Calculate Corruption Index
            ministry.corruptionIndex = (
                WEIGHTS.BDR * BDR +
                WEIGHTS.TS * (1 - TS) +
                WEIGHTS.HCR * HCR
            );
        });

        // Sort ministries by corruption index (highest to lowest)
        this.ministries.sort((a, b) => b.corruptionIndex - a.corruptionIndex);
        
        // Assign ranks
        this.ministries.forEach((ministry, index) => {
            ministry.rank = index + 1;
        });
    }

    displayResults() {
        const mainSection = document.querySelector('main');
        if (!mainSection) return;

        const resultsHTML = `
            <section class="corruption-index" aria-labelledby="corruption-index-title">
                <h2 id="corruption-index-title">Ministry Corruption Index</h2>
                <div class="table-container">
                    <table class="corruption-table" aria-label="Ministry Corruption Index Rankings">
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Ministry</th>
                                <th scope="col">Corruption Index</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.ministries.map(ministry => `
                                <tr>
                                    <td>${ministry.rank}</td>
                                    <td>${ministry.name}</td>
                                    <td>${ministry.corruptionIndex.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="chart-container">
                    <canvas id="corruptionChart" aria-label="Corruption Index Bar Chart"></canvas>
                </div>
            </section>
        `;

        mainSection.insertAdjacentHTML('beforeend', resultsHTML);
    }

    initializeChart() {
        const ctx = document.getElementById('corruptionChart');
        if (!ctx) return;

        const data = {
            labels: this.ministries.map(m => m.name),
            datasets: [{
                label: 'Corruption Index',
                data: this.ministries.map(m => m.corruptionIndex),
                backgroundColor: this.ministries.map(m => {
                    if (m.corruptionIndex > 0.7) return '#CE1126'; // Kenya Red for high corruption
                    if (m.corruptionIndex > 0.4) return '#009A49'; // Kenya Green for medium corruption
                    return '#FFFFFF'; // White for low corruption
                }),
                borderColor: '#333333', // Dark border for contrast
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw.toFixed(2);
                                let riskLevel = '';
                                if (value > 0.7) riskLevel = ' (High Risk)';
                                else if (value > 0.4) riskLevel = ' (Medium Risk)';
                                else riskLevel = ' (Low Risk)';
                                return `Corruption Index: ${value}${riskLevel}`;
                            }
                        },
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleColor: '#FFFFFF',
                        bodyColor: '#FFFFFF',
                        borderColor: '#CE1126',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1,
                        title: {
                            display: true,
                            text: 'Corruption Index',
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#FFFFFF'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        };

        this.chart = new Chart(ctx, config);
    }

    showError(message) {
        const mainSection = document.querySelector('main');
        if (mainSection) {
            mainSection.insertAdjacentHTML('beforeend', `
                <div class="error-message" role="alert">
                    ${message}
                </div>
            `);
        }
    }
}

// Initialize the calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new CorruptionIndexCalculator();
    calculator.init();
}); 