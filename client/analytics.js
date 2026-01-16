/**
 * Analytics Dashboard - Chart.js Implementation
 * Real-time property market analytics and visualizations
 */

// Chart instances
let bhkChart, locationChart, areaChart, bathChart;

// Sample data (in production, this would come from API)
const analyticsData = {
    bhkDistribution: {
        labels: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'],
        data: [15, 45, 25, 10, 5],
        avgPrices: [45, 75, 110, 165, 220]
    },
    topLocations: {
        labels: ['Whitefield', 'Electronic City', 'Marathahalli', 'Hebbal', 'HSR Layout', 
                 'Koramangala', 'Indira Nagar', 'JP Nagar', 'Banashankari', 'BTM Layout'],
        avgPrices: [95, 88, 92, 87, 98, 105, 102, 78, 72, 75]
    },
    areaVsPrice: {
        areas: [500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000],
        prices: [35, 52, 68, 84, 98, 115, 132, 165, 195]
    },
    bathAnalysis: {
        labels: ['1 Bath', '2 Bath', '3 Bath', '4 Bath', '5 Bath'],
        avgPrices: [55, 78, 105, 145, 190]
    }
};

// Chart color schemes
const colors = {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#06d6a0',
    info: '#00b4d8',
    warning: '#ffd166',
    danger: '#ef476f',
    gradient1: ['rgba(102, 126, 234, 0.8)', 'rgba(118, 75, 162, 0.8)'],
    gradient2: ['rgba(6, 214, 160, 0.8)', 'rgba(5, 150, 105, 0.8)'],
    gradient3: ['rgba(0, 180, 216, 0.8)', 'rgba(0, 150, 198, 0.8)'],
    gradient4: ['rgba(255, 209, 102, 0.8)', 'rgba(255, 159, 64, 0.8)']
};

/**
 * Initialize BHK Distribution Pie Chart
 */
function initBHKChart() {
    const ctx = document.getElementById('bhkChart');
    
    bhkChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: analyticsData.bhkDistribution.labels,
            datasets: [{
                label: 'Properties',
                data: analyticsData.bhkDistribution.data,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(6, 214, 160, 0.8)',
                    'rgba(0, 180, 216, 0.8)',
                    'rgba(255, 209, 102, 0.8)',
                    'rgba(239, 71, 111, 0.8)'
                ],
                borderColor: [
                    'rgb(102, 126, 234)',
                    'rgb(6, 214, 160)',
                    'rgb(0, 180, 216)',
                    'rgb(255, 209, 102)',
                    'rgb(239, 71, 111)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12,
                            family: 'Poppins'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.parsed || 0;
                            let avgPrice = analyticsData.bhkDistribution.avgPrices[context.dataIndex];
                            return `${label}: ${value}% (Avg: ₹${avgPrice}L)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize Top Locations Bar Chart
 */
function initLocationChart() {
    const ctx = document.getElementById('locationChart');
    
    locationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: analyticsData.topLocations.labels,
            datasets: [{
                label: 'Average Price (Lakh)',
                data: analyticsData.topLocations.avgPrices,
                backgroundColor: 'rgba(6, 214, 160, 0.7)',
                borderColor: 'rgb(6, 214, 160)',
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value + 'L';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Avg Price: ₹' + context.parsed.y + ' Lakh';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize Area vs Price Line Chart
 */
function initAreaChart() {
    const ctx = document.getElementById('areaChart');
    
    areaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: analyticsData.areaVsPrice.areas,
            datasets: [{
                label: 'Price (Lakh)',
                data: analyticsData.areaVsPrice.prices,
                borderColor: 'rgb(102, 126, 234)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: 'rgb(102, 126, 234)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value + 'L';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        callback: function(value) {
                            return this.getLabelForValue(value) + ' sqft';
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label + ' sq ft';
                        },
                        label: function(context) {
                            return 'Estimated Price: ₹' + context.parsed.y + ' Lakh';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize Bathroom Analysis Chart
 */
function initBathChart() {
    const ctx = document.getElementById('bathChart');
    
    bathChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: analyticsData.bathAnalysis.labels,
            datasets: [{
                label: 'Average Price (Lakh)',
                data: analyticsData.bathAnalysis.avgPrices,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.7)',
                    'rgba(6, 214, 160, 0.7)',
                    'rgba(0, 180, 216, 0.7)',
                    'rgba(255, 209, 102, 0.7)',
                    'rgba(239, 71, 111, 0.7)'
                ],
                borderColor: [
                    'rgb(102, 126, 234)',
                    'rgb(6, 214, 160)',
                    'rgb(0, 180, 216)',
                    'rgb(255, 209, 102)',
                    'rgb(239, 71, 111)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value + 'L';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Avg Price: ₹' + context.parsed.y + ' Lakh';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize all charts on page load
 */
function initializeAnalytics() {
    console.log('Initializing Analytics Dashboard...');
    
    // Initialize all charts
    initBHKChart();
    initLocationChart();
    initAreaChart();
    initBathChart();
    
    console.log('✓ Analytics Dashboard Initialized');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAnalytics);
