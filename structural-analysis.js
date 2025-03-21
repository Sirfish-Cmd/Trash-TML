// Structural Analysis Calculator
class StructuralAnalyzer {
    constructor() {
        this.nodes = [];
        this.members = [];
        this.forces = [];
        this.supports = [];
    }

    // Check structural determinacy
    checkDeterminacy() {
        const numNodes = this.nodes.length;
        const numMembers = this.members.length;
        const numReactions = this.calculateReactions();
        
        // 2m + r = 2j (for 2D trusses)
        const isStaticallyDeterminate = 2 * numNodes === numMembers + numReactions;
        
        return {
            isStaticallyDeterminate,
            numEquations: 2 * numNodes,
            numUnknowns: numMembers + numReactions
        };
    }

    // Calculate number of reactions from supports
    calculateReactions() {
        return this.supports.reduce((total, support) => {
            switch(support.type) {
                case 'pin': return total + 2;  // Fx and Fy
                case 'roller': return total + 1;  // Perpendicular force only
                case 'fixed': return total + 3;  // Fx, Fy, and moment
                default: return total;
            }
        }, 0);
    }

    // Method of Joints analysis
    methodOfJoints() {
        const equations = this.generateEquilibrium();
        const solution = this.solveSystem(equations);
        return this.interpretResults(solution);
    }

    // Generate equilibrium equations for each node
    generateEquilibrium() {
        const equations = [];
        
        this.nodes.forEach(node => {
            // Sum of forces in x-direction = 0
            const xEquation = {
                coefficients: new Array(this.members.length).fill(0),
                constant: 0
            };
            
            // Sum of forces in y-direction = 0
            const yEquation = {
                coefficients: new Array(this.members.length).fill(0),
                constant: 0
            };
            
            // Add member contributions
            this.members.forEach((member, index) => {
                if (member.start === node.id || member.end === node.id) {
                    const angle = this.calculateAngle(member);
                    const sign = member.start === node.id ? -1 : 1;
                    
                    xEquation.coefficients[index] = sign * Math.cos(angle);
                    yEquation.coefficients[index] = sign * Math.sin(angle);
                }
            });
            
            // Add external forces
            this.forces.forEach(force => {
                if (force.nodeId === node.id) {
                    xEquation.constant -= force.magnitude * Math.cos(force.angle);
                    yEquation.constant -= force.magnitude * Math.sin(force.angle);
                }
            });
            
            equations.push(xEquation, yEquation);
        });
        
        return equations;
    }

    // Calculate angle between two nodes
    calculateAngle(member) {
        const startNode = this.nodes.find(n => n.id === member.start);
        const endNode = this.nodes.find(n => n.id === member.end);
        
        return Math.atan2(
            endNode.y - startNode.y,
            endNode.x - startNode.x
        );
    }

    // Solve system of linear equations using Gaussian elimination
    solveSystem(equations) {
        const n = equations.length;
        const augmentedMatrix = equations.map(eq => [...eq.coefficients, eq.constant]);
        
        // Forward elimination
        for (let i = 0; i < n; i++) {
            let maxRow = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(augmentedMatrix[j][i]) > Math.abs(augmentedMatrix[maxRow][i])) {
                    maxRow = j;
                }
            }
            
            [augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]];
            
            for (let j = i + 1; j < n; j++) {
                const factor = augmentedMatrix[j][i] / augmentedMatrix[i][i];
                for (let k = i; k <= n; k++) {
                    augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
                }
            }
        }
        
        // Back substitution
        const solution = new Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < n; j++) {
                sum += augmentedMatrix[i][j] * solution[j];
            }
            solution[i] = (augmentedMatrix[i][n] - sum) / augmentedMatrix[i][i];
        }
        
        return solution;
    }

    // Interpret the numerical results
    interpretResults(solution) {
        return this.members.map((member, index) => ({
            id: member.id,
            force: solution[index],
            type: solution[index] > 0 ? 'tension' : 'compression',
            magnitude: Math.abs(solution[index])
        }));
    }

    // Calculate support reactions
    calculateSupportReactions() {
        const reactions = {};
        
        this.supports.forEach(support => {
            const node = this.nodes.find(n => n.id === support.nodeId);
            
            // Calculate forces from members connected to support
            const connectedMembers = this.members.filter(m => 
                m.start === node.id || m.end === node.id
            );
            
            let Fx = 0, Fy = 0, M = 0;
            
            connectedMembers.forEach(member => {
                const force = this.memberForces.find(f => f.id === member.id);
                const angle = this.calculateAngle(member);
                
                Fx += force.magnitude * Math.cos(angle);
                Fy += force.magnitude * Math.sin(angle);
            });
            
            // Add external forces
            const externalForces = this.forces.filter(f => f.nodeId === node.id);
            externalForces.forEach(force => {
                Fx += force.magnitude * Math.cos(force.angle);
                Fy += force.magnitude * Math.sin(force.angle);
            });
            
            reactions[support.id] = { Fx, Fy, M };
        });
        
        return reactions;
    }

    // Check stability
    checkStability() {
        const determinacy = this.checkDeterminacy();
        const numNodes = this.nodes.length;
        const numMembers = this.members.length;
        
        // Basic stability checks
        const hasMinimumMembers = numMembers >= 2 * numNodes - 3;
        const hasAdequateSupports = this.calculateReactions() >= 3;
        
        // Triangulation check
        const isTriangulated = this.checkTriangulation();
        
        return {
            isStable: hasMinimumMembers && hasAdequateSupports && isTriangulated,
            details: {
                hasMinimumMembers,
                hasAdequateSupports,
                isTriangulated,
                isStaticallyDeterminate: determinacy.isStaticallyDeterminate
            }
        };
    }

    // Check if the truss is properly triangulated
    checkTriangulation() {
        if (this.nodes.length < 3) return false;
        
        // Check if basic triangulation rule is satisfied
        // For a properly triangulated truss: m = 2n - 3
        // where m is number of members and n is number of nodes
        const expectedMembers = 2 * this.nodes.length - 3;
        return this.members.length >= expectedMembers;
    }

    // Calculate internal forces using method of sections
    methodOfSections(sectionPoint) {
        // Implement method of sections analysis
        // This will be expanded in the next iteration
    }
}

// Export the analyzer
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StructuralAnalyzer;
} 