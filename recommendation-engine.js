// Company Stack Database
const companyStacks = [
    {
        name: 'Netflix',
        size: 'large',
        industry: 'entertainment',
        year: 2007,
        stack: {
            frontend: ['React', 'TypeScript', 'Jest'],
            backend: ['Node.js', 'Spring Boot', 'Python'],
            database: ['PostgreSQL', 'MongoDB', 'Redis'],
            infrastructure: ['AWS', 'Docker', 'Kubernetes'],
            monitoring: ['Prometheus', 'Grafana']
        },
        evolution: [
            { year: 2007, stack: 'Monolithic Java' },
            { year: 2012, stack: 'Microservices' },
            { year: 2015, stack: 'Cloud Native' }
        ]
    },
    {
        name: 'Airbnb',
        size: 'large',
        industry: 'travel',
        year: 2008,
        stack: {
            frontend: ['React', 'TypeScript', 'Jest'],
            backend: ['Ruby on Rails', 'Node.js'],
            database: ['MySQL', 'Redis'],
            infrastructure: ['AWS', 'Docker'],
            monitoring: ['DataDog']
        }
    },
    // Add more company stacks here
];

// Technology Scoring Weights
const weights = {
    projectType: {
        web: { frontend: 0.4, backend: 0.3, database: 0.2, infrastructure: 0.1 },
        mobile: { frontend: 0.5, backend: 0.3, database: 0.1, infrastructure: 0.1 },
        desktop: { frontend: 0.4, backend: 0.4, database: 0.1, infrastructure: 0.1 },
        ai: { frontend: 0.2, backend: 0.4, database: 0.2, infrastructure: 0.2 },
        blockchain: { frontend: 0.3, backend: 0.4, database: 0.1, infrastructure: 0.2 }
    },
    teamSize: {
        solo: { complexity: 0.3, scalability: 0.2, maintenance: 0.5 },
        small: { complexity: 0.4, scalability: 0.3, maintenance: 0.3 },
        medium: { complexity: 0.5, scalability: 0.4, maintenance: 0.1 },
        large: { complexity: 0.6, scalability: 0.5, maintenance: 0.1 }
    }
};

// Technology Options
const technologies = {
    frontend: [
        { name: 'React', score: { complexity: 0.7, scalability: 0.9, maintenance: 0.8 } },
        { name: 'Vue.js', score: { complexity: 0.6, scalability: 0.8, maintenance: 0.8 } },
        { name: 'Angular', score: { complexity: 0.8, scalability: 0.9, maintenance: 0.7 } }
    ],
    backend: [
        { name: 'Node.js', score: { complexity: 0.6, scalability: 0.8, maintenance: 0.8 } },
        { name: 'Python', score: { complexity: 0.5, scalability: 0.7, maintenance: 0.9 } },
        { name: 'Java', score: { complexity: 0.8, scalability: 0.9, maintenance: 0.7 } }
    ],
    database: [
        { name: 'PostgreSQL', score: { complexity: 0.7, scalability: 0.9, maintenance: 0.8 } },
        { name: 'MongoDB', score: { complexity: 0.6, scalability: 0.8, maintenance: 0.7 } },
        { name: 'Redis', score: { complexity: 0.5, scalability: 0.7, maintenance: 0.9 } }
    ],
    infrastructure: [
        { name: 'AWS', score: { complexity: 0.7, scalability: 0.9, maintenance: 0.6 } },
        { name: 'Docker', score: { complexity: 0.6, scalability: 0.8, maintenance: 0.7 } },
        { name: 'Kubernetes', score: { complexity: 0.9, scalability: 0.9, maintenance: 0.5 } }
    ]
};

// Generate recommendations based on user answers
function generateRecommendations(answers) {
    const projectType = answers.projectType;
    const teamSize = answers.teamSize;
    
    // Get weights for current project type and team size
    const typeWeights = weights.projectType[projectType];
    const teamWeights = weights.teamSize[teamSize];
    
    // Calculate scores for each technology category
    const recommendations = {
        frontend: calculateTechnologyScores('frontend', typeWeights.frontend, teamWeights),
        backend: calculateTechnologyScores('backend', typeWeights.backend, teamWeights),
        database: calculateTechnologyScores('database', typeWeights.database, teamWeights),
        infrastructure: calculateTechnologyScores('infrastructure', typeWeights.infrastructure, teamWeights)
    };
    
    // Find similar company stacks
    const similarStacks = findSimilarStacks(answers);
    
    return {
        recommendations,
        similarStacks,
        riskAssessment: generateRiskAssessment(recommendations)
    };
}

// Calculate scores for technologies in a category
function calculateTechnologyScores(category, typeWeight, teamWeights) {
    return technologies[category].map(tech => {
        const complexityScore = tech.score.complexity * teamWeights.complexity;
        const scalabilityScore = tech.score.scalability * teamWeights.scalability;
        const maintenanceScore = tech.score.maintenance * teamWeights.maintenance;
        
        return {
            name: tech.name,
            score: (complexityScore + scalabilityScore + maintenanceScore) * typeWeight
        };
    }).sort((a, b) => b.score - a.score);
}

// Find similar company stacks based on user answers
function findSimilarStacks(answers) {
    return companyStacks
        .filter(stack => {
            // Filter based on project type and team size
            const sizeMatch = stack.size === answers.teamSize;
            return sizeMatch;
        })
        .map(stack => ({
            name: stack.name,
            industry: stack.industry,
            stack: stack.stack,
            evolution: stack.evolution
        }))
        .slice(0, 3); // Return top 3 matches
}

// Generate risk assessment for recommended technologies
function generateRiskAssessment(recommendations) {
    const risks = {};
    
    Object.entries(recommendations).forEach(([category, techs]) => {
        risks[category] = techs.map(tech => ({
            name: tech.name,
            risks: {
                learningCurve: calculateLearningCurve(tech.score),
                communitySupport: calculateCommunitySupport(tech.name),
                scalability: calculateScalabilityRisk(tech.score)
            }
        }));
    });
    
    return risks;
}

// Helper functions for risk assessment
function calculateLearningCurve(score) {
    return score < 0.6 ? 'High' : score < 0.8 ? 'Medium' : 'Low';
}

function calculateCommunitySupport(techName) {
    // This would typically be based on real data
    return 'Strong';
}

function calculateScalabilityRisk(score) {
    return score < 0.7 ? 'High' : score < 0.85 ? 'Medium' : 'Low';
}

// Export functions for use in the main application
export {
    generateRecommendations,
    companyStacks,
    technologies
}; 