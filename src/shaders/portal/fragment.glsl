uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

void main()
{
    // Displace the UV
    vec2 displacedUv = vUv;

    float strength = sin((( uTime)));

    // Outer glow
    float outerGlow = distance(vUv, vec2(0.5));
    strength += outerGlow;

    // Final color
    vec3 color = mix(uColorStart, uColorEnd, strength);

    gl_FragColor = vec4(color, 1.0);
}