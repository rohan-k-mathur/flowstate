// Vertex Shader
varying vec2 vUv;

void main() {
    vUv = uv; // Pass the UV coordinates to the fragment shader
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // Calculate position in clip space
}
