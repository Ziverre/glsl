precision mediump float;

uniform vec2 resolution;
uniform float time;

float circle(vec2 coord){
    float distance = pow(coord.x, 2.) + pow(coord.y/2., 2.0);
    return distance < pow(0.5, 2.) ? 1.0 : 0.0;
}

float circleBorder(vec2 coord){
    float distance = pow(coord.x, 2.) + pow(coord.y/2., 2.0);
    return distance < pow(0.5, 2.) && distance > pow(0.46, 2.) ? 1.0 : 0.0;
}

void main() {
    vec2 size = vec2(32., 16.);
    
    vec3 scaleDarkColor = vec3(1.0, 0.25, 0.);
    vec3 scaleBrightColor = vec3(1.0, 0.66, 0.);
    
    vec2 unit = gl_FragCoord.xy / size;
    
    //shift by half a unit
    unit.x += 0.5 * floor(unit.y);
    
    //flip unit.y (since in glsl, y decreases as it moves downwards)
    unit.y = 1.0 - unit.y;
    
    //keep it between 0.0 and 1.0
    unit = fract(unit);
    
    //outside the circular area, the degree is [0.0, 0.5]
    float gradientDegree = unit.y / 2.0;
    
    //translate x position by 0.5 for the circle effect (since the middle is at x = 0.5)
    unit.x -= 0.5;
    
    //add 0.5 to the degree if the pixel is inside the circle, so the degree is [0.5, 1.0]
    vec3 scaleColor = mix(scaleDarkColor, scaleBrightColor, gradientDegree + circle(unit) / 2.);
    
    //border (mix is used as a way to avoid branching :) )
    vec3 color = mix(scaleColor, scaleDarkColor, circleBorder(unit));
    
    gl_FragColor = vec4(color, 1.0);
}