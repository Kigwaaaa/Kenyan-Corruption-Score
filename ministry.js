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

// Chart configuration
const chartConfig = {
    type: 'bar',
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Budget Analysis'
            }
        }
    }
};

class MinistryPage {
    constructor() {
        this.ministryId = new URLSearchParams(window.location.search).get('id');
        this.ministryData = null;
        this.leadershipData = null;
        this.charts = {};
        this.init();
    }

    async init() {
        try {
            await Promise.all([
                this.fetchMinistryData(),
                this.fetchLeadershipData()
            ]);
            
            this.renderMinistryDetails();
            this.initializeCharts();
            this.renderLeadership();
            this.renderIrregularities();
        } catch (error) {
            this.showError('Failed to load ministry data. Please try again later.');
            console.error('Initialization error:', error);
        }
    }

    async fetchMinistryData() {
        const response = await fetch('data.json');
        const data = await response.json();
        this.ministryData = data.ministries.find(m => m.id === parseInt(this.ministryId));
        
        if (!this.ministryData) {
            throw new Error('Ministry not found');
        }
    }

    async fetchLeadershipData() {
        const response = await fetch('leadership.json');
        const data = await response.json();
        this.leadershipData = data.ministry_leaders[this.ministryId];
        
        if (!this.leadershipData) {
            throw new Error('Leadership data not found');
        }
    }

    renderMinistryDetails() {
        document.title = `${this.ministryData.name} - Kenya Finance Watch`;
        document.getElementById('ministry-name').textContent = this.ministryData.name;
        document.getElementById('budget-amount').textContent = formatCurrency(this.ministryData.budgeted_amount);
        document.getElementById('expenditure-amount').textContent = formatCurrency(this.ministryData.actual_expenditure);
        document.getElementById('discrepancy-amount').textContent = formatCurrency(this.ministryData.discrepancy);
        
        // Render detailed breakdown
        const detailsGrid = document.getElementById('details-grid');
        detailsGrid.innerHTML = Object.entries(this.ministryData.details)
            .map(([key, value]) => `
                <div class="detail-card">
                    <h3>${key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h3>
                    <p class="amount">${formatCurrency(value)}</p>
                </div>
            `)
            .join('');
    }

    initializeCharts() {
        // Budget vs Expenditure Chart
        const budgetCtx = document.getElementById('budgetChart').getContext('2d');
        this.charts.budget = new Chart(budgetCtx, {
            ...chartConfig,
            data: {
                labels: ['Budgeted', 'Actual'],
                datasets: [{
                    label: 'Amount (KES)',
                    data: [this.ministryData.budgeted_amount, this.ministryData.actual_expenditure],
                    backgroundColor: ['#007bff', '#28a745']
                }]
            }
        });

        // Discrepancy Chart
        const discrepancyCtx = document.getElementById('discrepancyChart').getContext('2d');
        this.charts.discrepancy = new Chart(discrepancyCtx, {
            ...chartConfig,
            data: {
                labels: ['Discrepancy'],
                datasets: [{
                    label: 'Amount (KES)',
                    data: [this.ministryData.discrepancy],
                    backgroundColor: ['#dc3545']
                }]
            }
        });
    }

    renderLeadership() {
        const leadershipSection = document.getElementById('leadership');
        if (!leadershipSection) return;

        // For now, using placeholder data
        const leadershipData = {
            cabinetSecretary: {
                name: "John Doe",
                title: "Cabinet Secretary",
                image: "placeholder.svg",
                bio: "Appointed in 2023. Former economist with 20 years of experience."
            },
            principalSecretary: {
                name: "Jane Smith",
                title: "Principal Secretary",
                image: "placeholder.svg",
                bio: "Appointed in 2023. Former financial analyst with 15 years of experience."
            }
        };

        leadershipSection.innerHTML = `
            <div class="leadership-grid">
                <div class="leadership-card">
                    <img src="${leadershipData.cabinetSecretary.image}" 
                         alt="${leadershipData.cabinetSecretary.name}"
                         onerror="this.src='placeholder.svg'">
                    <h3>${leadershipData.cabinetSecretary.name}</h3>
                    <p class="title">${leadershipData.cabinetSecretary.title}</p>
                    <p>${leadershipData.cabinetSecretary.bio}</p>
                </div>
                <div class="leadership-card">
                    <img src="${leadershipData.principalSecretary.image}" 
                         alt="${leadershipData.principalSecretary.name}"
                         onerror="this.src='placeholder.svg'">
                    <h3>${leadershipData.principalSecretary.name}</h3>
                    <p class="title">${leadershipData.principalSecretary.title}</p>
                    <p>${leadershipData.principalSecretary.bio}</p>
                </div>
            </div>
        `;
    }

    renderIrregularities() {
        // This would typically come from an API
        const irregularities = [
            {
                title: 'Budget Overrun',
                date: '2024-03-15',
                description: 'Significant budget overrun in primary operations',
                amount: 50000000
            },
            {
                title: 'Unexplained Expenditure',
                date: '2024-02-28',
                description: 'Large unexplained expenditure in equipment maintenance',
                amount: 25000000
            }
        ];

        const irregularitiesList = document.getElementById('irregularities-list');
        irregularitiesList.innerHTML = irregularities
            .map(irregularity => `
                <div class="irregularity-item">
                    <h3>${irregularity.title}</h3>
                    <p class="date">${new Date(irregularity.date).toLocaleDateString()}</p>
                    <p class="description">${irregularity.description}</p>
                    <p class="amount">${formatCurrency(irregularity.amount)}</p>
                </div>
            `)
            .join('');
    }

    showError(message) {
        const container = document.querySelector('.container');
        const errorDiv = createElement('div', 'error-message', message);
        container.prepend(errorDiv);
    }
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MinistryPage();
}); 