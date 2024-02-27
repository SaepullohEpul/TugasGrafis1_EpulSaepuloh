function generatePoints() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
  
    for (let i = 0; i < 11; i++) {
      const x = Math.floor(Math.random() * 400);
      const y = Math.floor(Math.random() * 400);
  
      const point = document.createElement('div');
      point.style.left = `${x}px`;
      point.style.top = `${y}px`;
      point.className = 'point';
  
      grid.appendChild(point);
    }
  
    // Draw grid lines
    for (let x = 0; x <= 400; x += 100) {
      const line = document.createElement('div');
      line.style.position = 'absolute';
      line.style.left = `${x}px`;
      line.style.top = 0;
      line.style.width = 2;
      line.style.height = '100%';
      line.style.backgroundColor = 'black';
  
      grid.appendChild(line);
    }
  
    for (let y = 0; y <= 400; y += 100) {
      const line = document.createElement('div');
      line.style.position = 'absolute';
      line.style.left = 0;
      line.style.top = `${y}px`;
      line.style.width = '100%';
      line.style.height = 2;
      line.style.backgroundColor = 'black';
  
      grid.appendChild(line);
    }
  }