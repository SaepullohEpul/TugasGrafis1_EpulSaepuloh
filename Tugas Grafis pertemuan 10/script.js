var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');


if (!gl) { 
    console.log('Browser tidak mendukung WebGL'); 
} else { 
    console.log('Browser mendukung WebGL.'); 
}


gl.clearColor(0.0, 0.0, 1.0, 1.0); 
gl.clear(gl.COLOR_BUFFER_BIT);


var vertexShaderSource = `
    attribute vec2 a_position; 
    void main() { 
        gl_Position = vec4(a_position, 0.0, 1.0); 
    }
`;


var fragmentShaderSource = `
    precision mediump float; 
    uniform vec4 u_color; // tambahkan variabel untuk warna
    void main() { 
        gl_FragColor = u_color; // gunakan warna yang diberikan
    }
`;

var vShader = gl.createShader(gl.VERTEX_SHADER); 
gl.shaderSource(vShader, vertexShaderSource); 
gl.compileShader(vShader);

var fShader = gl.createShader(gl.FRAGMENT_SHADER); 
gl.shaderSource(fShader, fragmentShaderSource); 
gl.compileShader(fShader);

var shaderProgram = gl.createProgram(); 
gl.attachShader(shaderProgram, vShader); 
gl.attachShader(shaderProgram, fShader); 
gl.linkProgram(shaderProgram); 
gl.useProgram(shaderProgram);

var rotationAngleClockwise = 0;
var rotationAngleCounterClockwise = 0;

function drawTriangle(positionX, positionY, rotationAngle, color) {
    var center = [positionX, positionY]; 
    var radius = 0.2; 
    var numSides = 3; 
    var angleIncrement = (2 * Math.PI) / numSides;

    var vertices = [center[0], center[1]]; 

    for (var i = 0; i <= numSides; i++) {
        var angle = i * angleIncrement + rotationAngle; 

        var x = center[0] + Math.cos(angle) * radius;
        var y = center[1] + Math.sin(angle) * radius;

        vertices.push(x, y);
    }

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.enableVertexAttribArray(positionLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);


    if (positionY === -0.02 || positionY === -0.6) {
        var whiteColor = [0.0, 1.0, 0.0, 1.0];
        var colorLocation = gl.getUniformLocation(shaderProgram, 'u_color');
        gl.uniform4fv(colorLocation, whiteColor);
    } else {
        var randomColor = [Math.random(), Math.random(), Math.random(), 1.0];
        var colorLocation = gl.getUniformLocation(shaderProgram, 'u_color');
        gl.uniform4fv(colorLocation, randomColor);
    }

    gl.drawArrays(gl.TRIANGLE_FAN, 0, numSides + 2);
}

function updateRotations() { 
    rotationAngleClockwise -= 0.01;
    rotationAngleCounterClockwise -= 0.01;
}

function animateTriangles() { 
    gl.clear(gl.COLOR_BUFFER_BIT);
    updateRotations();

    
    drawTriangle(-0.4, 0.5, rotationAngleCounterClockwise); 
    
   
    drawTriangle(0.4, 0.5, rotationAngleClockwise); 

   
    drawTriangle(0, -0.02, rotationAngleClockwise * 2); 

 
    drawTriangle(0, -0.6, rotationAngleClockwise * 2); 

    requestAnimationFrame(animateTriangles);
}

animateTriangles();