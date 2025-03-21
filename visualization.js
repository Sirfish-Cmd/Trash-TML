// Visualization Module for Structural Analysis
class TrussVisualizer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.scale = 1;
        this.offset = { x: 0, y: 0 };
        this.gridSize = 20;
    }

    // Draw force arrow
    drawForce(x, y, magnitude, angle, color = '#e74c3c') {
        const arrowLength = Math.min(50, Math.abs(magnitude) * 5);
        const arrowWidth = 8;
        
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        
        // Draw arrow shaft
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(arrowLength, 0);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw arrowhead
        this.ctx.beginPath();
        this.ctx.moveTo(arrowLength, 0);
        this.ctx.lineTo(arrowLength - 10, -arrowWidth);
        this.ctx.lineTo(arrowLength - 10, arrowWidth);
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
        
        // Draw magnitude label
        this.ctx.rotate(-angle);
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`${Math.abs(magnitude)} kN`, 10, -10);
        
        this.ctx.restore();
    }

    // Draw support
    drawSupport(x, y, type) {
        this.ctx.save();
        this.ctx.translate(x, y);
        
        switch(type) {
            case 'pin':
                this.drawPinSupport();
                break;
            case 'roller':
                this.drawRollerSupport();
                break;
            case 'fixed':
                this.drawFixedSupport();
                break;
        }
        
        this.ctx.restore();
    }

    // Draw pin support (triangle)
    drawPinSupport() {
        const size = 20;
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-size, size);
        this.ctx.lineTo(size, size);
        this.ctx.closePath();
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fill();
        
        // Draw ground line
        this.ctx.beginPath();
        this.ctx.moveTo(-size - 5, size);
        this.ctx.lineTo(size + 5, size);
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    // Draw roller support (circle with ground line)
    drawRollerSupport() {
        const radius = 10;
        
        // Draw circle
        this.ctx.beginPath();
        this.ctx.arc(0, radius, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fill();
        
        // Draw ground line
        this.ctx.beginPath();
        this.ctx.moveTo(-radius - 10, radius * 2);
        this.ctx.lineTo(radius + 10, radius * 2);
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    // Draw fixed support (filled rectangle)
    drawFixedSupport() {
        const width = 10;
        const height = 30;
        
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(-width/2, 0, width, height);
        
        // Draw hatching lines
        this.ctx.beginPath();
        for(let y = 5; y < height; y += 5) {
            this.ctx.moveTo(-width/2 - 5, y);
            this.ctx.lineTo(width/2 + 5, y);
        }
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    // Draw member with force indication
    drawMemberWithForce(start, end, force) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const angle = Math.atan2(dy, dx);
        const length = Math.sqrt(dx * dx + dy * dy);
        
        // Draw member
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        
        // Color based on force type
        const color = force > 0 ? '#27ae60' : '#c0392b';
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Draw force value
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        
        this.ctx.save();
        this.ctx.translate(midX, midY);
        this.ctx.rotate(angle);
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`${Math.abs(force.toFixed(1))} kN`, 0, -10);
        
        // Draw force indication arrows
        if(force !== 0) {
            const arrowSpacing = 15;
            const numArrows = Math.floor(length / arrowSpacing);
            const arrowSize = 5;
            
            for(let i = 1; i < numArrows; i++) {
                const x = -length/2 + i * arrowSpacing;
                
                if(force > 0) {  // Tension
                    this.ctx.beginPath();
                    this.ctx.moveTo(x - arrowSize, -arrowSize);
                    this.ctx.lineTo(x, 0);
                    this.ctx.lineTo(x - arrowSize, arrowSize);
                    this.ctx.strokeStyle = color;
                    this.ctx.stroke();
                } else {  // Compression
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + arrowSize, -arrowSize);
                    this.ctx.lineTo(x, 0);
                    this.ctx.lineTo(x + arrowSize, arrowSize);
                    this.ctx.strokeStyle = color;
                    this.ctx.stroke();
                }
            }
        }
        
        this.ctx.restore();
    }

    // Draw grid
    drawGrid() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#eee';
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for(let x = 0; x < width; x += this.gridSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, height);
        }
        
        // Horizontal lines
        for(let y = 0; y < height; y += this.gridSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(width, y);
        }
        
        this.ctx.stroke();
    }

    // Clear canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Set scale for zoom
    setScale(scale) {
        this.scale = scale;
    }

    // Set offset for pan
    setOffset(x, y) {
        this.offset.x = x;
        this.offset.y = y;
    }

    // Convert screen coordinates to grid coordinates
    screenToGrid(x, y) {
        return {
            x: Math.round((x - this.offset.x) / (this.gridSize * this.scale)) * this.gridSize,
            y: Math.round((y - this.offset.y) / (this.gridSize * this.scale)) * this.gridSize
        };
    }

    // Convert grid coordinates to screen coordinates
    gridToScreen(x, y) {
        return {
            x: x * this.scale + this.offset.x,
            y: y * this.scale + this.offset.y
        };
    }
}

// Export the visualizer
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrussVisualizer;
} 