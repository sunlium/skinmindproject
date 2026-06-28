// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    
    // Destroy and reinitialize charts
    setTimeout(() => {
        Chart.helpers.each(Chart.instances, function(instance) {
            instance.destroy();
        });
        initializeCharts();
    }, 100);
}

// Load dark mode preference on page load
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
});

// Chart theme colors
function getChartTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    return {
        textColor: isDarkMode ? '#e0e0e0' : '#333',
        gridColor: isDarkMode ? '#444' : '#ddd',
        backgroundColor: isDarkMode ? '#3a3a3a' : '#f9f9f9'
    };
}

// Initialize Charts
function initializeCharts() {
    const theme = getChartTheme();
    
    // Age Distribution Chart
    const ageCtx = document.getElementById('ageChart');
    if (ageCtx) {
        new Chart(ageCtx, {
            type: 'doughnut',
            data: {
                labels: ['10-20 years', '20-30 years', '30-40 years', '40+ years'],
                datasets: [{
                    data: [35, 40, 15, 10],
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#f093fb',
                        '#4facfe'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: theme.textColor
                        }
                    }
                }
            }
        });
    }

    // Triggers Chart
    const triggersCtx = document.getElementById('triggersChart');
    if (triggersCtx) {
        new Chart(triggersCtx, {
            type: 'bar',
            data: {
                labels: ['Stress', 'Anxiety', 'Boredom', 'Frustration', 'Habit'],
                datasets: [{
                    label: 'Frequency (%)',
                    data: [85, 75, 60, 55, 50],
                    backgroundColor: '#667eea'
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        ticks: {
                            color: theme.textColor
                        },
                        grid: {
                            color: theme.gridColor
                        }
                    },
                    y: {
                        ticks: {
                            color: theme.textColor
                        },
                        grid: {
                            color: theme.gridColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: theme.textColor
                        }
                    }
                }
            }
        });
    }

    // Awareness Over Time Chart
    const awarenessCtx = document.getElementById('awarenessChart');
    if (awarenessCtx) {
        new Chart(awarenessCtx, {
            type: 'line',
            data: {
                labels: ['2015', '2017', '2019', '2021', '2023', '2025'],
                datasets: [{
                    label: 'Awareness Index',
                    data: [30, 42, 55, 68, 80, 92],
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: theme.textColor
                        },
                        grid: {
                            color: theme.gridColor
                        }
                    },
                    x: {
                        ticks: {
                            color: theme.textColor
                        },
                        grid: {
                            color: theme.gridColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: theme.textColor
                        }
                    }
                }
            }
        });
    }

    // Treatment Effectiveness Chart
    const treatmentCtx = document.getElementById('treatmentChart');
    if (treatmentCtx) {
        new Chart(treatmentCtx, {
            type: 'radar',
            data: {
                labels: ['CBT', 'HRT', 'ACT', 'Medication', 'Support Groups'],
                datasets: [{
                    label: 'Effectiveness (%)',
                    data: [85, 80, 70, 65, 75],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#667eea'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: theme.textColor
                        },
                        grid: {
                            color: theme.gridColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: theme.textColor
                        }
                    }
                }
            }
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id') || 'home';
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.info-card, .stat-card, .chart-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(card);
});