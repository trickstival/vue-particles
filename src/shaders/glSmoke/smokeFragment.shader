#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
uniform vec2 u_resolution;
uniform sampler2D u_bufferTexture;
 
void main() {
    vec2 pixel = gl_FragCoord.xy / u_resolution.xy;
    // Just set the output to a constant reddish-purple
    outColor = texture2D(u_bufferTexture, pixel);

    //Get the distance of this pixel from the center of the screen
    float dist = distance(outColor.xy, u_resolution.xy / 2.0);
    if(dist < 15.0){ //Create a circle with a radius of 15 pixels
        outColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
}
