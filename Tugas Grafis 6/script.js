var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

// Cek browser
if (!gl) { 
    console.log('Browser tidak mendukung WebGL'); 
} else { 
    console.log('Browser mendukung WebGL.'); 
}

// Warna canvas 
gl.clearColor(0.0, 0.0, 1.0, 1.0); 
gl.clear(gl.COLOR_BUFFER_BIT);

// Vertex shader source 
var vertexShaderSource = `
    attribute vec2 a_position; 
    uniform float u_rotation; 
    uniform vec2 u_translation; // Translasi
    void main() { 
        float cosTheta = cos(u_rotation); 
        float sinTheta = sin(u_rotation); 
        mat2 rotationMatrix = mat2(cosTheta, -sinTheta, sinTheta, cosTheta); 
        vec2 rotatedPosition = rotationMatrix * a_position; 
        gl_Position = vec4(rotatedPosition + u_translation, 0.0, 1.0); // Penambahan translasi
    }
`;

// Fragment shader source 
var fragmentShaderSource = `
    precision mediump float; 
    void main() { 
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

// Buat vertex shader 
var vShader = gl.createShader(gl.VERTEX_SHADER); 
gl.shaderSource(vShader, vertexShaderSource); 
gl.compileShader(vShader);

// Buat fragment shader 
var fShader = gl.createShader(gl.FRAGMENT_SHADER); 
gl.shaderSource(fShader, fragmentShaderSource); 
gl.compileShader(fShader);

// Program shader
var shaderProgram = gl.createProgram(); 
gl.attachShader(shaderProgram, vShader); 
gl.attachShader(shaderProgram, fShader); 
gl.linkProgram(shaderProgram); 
gl.useProgram(shaderProgram);

// Variabel untuk menyimpan sudut rotasi 
var rotationAngleClockwise = 0;
var rotationAngleCounterClockwise = 0;

// Translasi untuk kedua persegi panjang
var translationClockwise = [-0.5, 0.0];
var translationCounterClockwise = [0.5, 0.0];

function drawRectangle(rotationAngle, translation) {
    var vertices = [
        -0.25, 0.35,
        0.25, 0.35,
        0.25, -0.35,
        -0.25, -0.35
    ];

    // Buffer persegi panjang
    var vBuffer = gl.createBuffer(); 
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Location
    var positionLocation = gl.getAttribLocation(shaderProgram, 'a_position'); 
    gl.enableVertexAttribArray(positionLocation);

    // Menghubungkan buffer dengan a_position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0); 

    // Set uniform untuk rotasi
    var rotationUniformLocation = gl.getUniformLocation(shaderProgram, 'u_rotation'); 
    gl.uniform1f(rotationUniformLocation, rotationAngle);

    // Set uniform untuk translasi
    var translationUniformLocation = gl.getUniformLocation(shaderProgram, 'u_translation'); 
    gl.uniform2fv(translationUniformLocation, translation);

    // Gambar persegi panjang.
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function updateRotation() { 
    rotationAngleClockwise += 0.02; 
    rotationAngleCounterClockwise -= 0.02;
}

function animateRectangles() { 
    gl.clear(gl.COLOR_BUFFER_BIT);
    updateRotation();
    drawRectangle(rotationAngleClockwise, translationClockwise);
    drawRectangle(rotationAngleCounterClockwise, translationCounterClockwise);
    requestAnimationFrame(animateRectangles);
}

animateRectangles();
