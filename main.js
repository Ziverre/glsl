import * as twgl from "./twgl-full.module.js";

let programInfo, bufferInfo;

const gl = document.querySelector("#drawingarea").getContext("webgl", {
    antialias: true,
    preserveDrawingBuffer: true
});

fetch(gl.canvas.dataset.shader).then(fsFile => fsFile.text()).then(fs => {
    document.getElementById("fs").innerHTML = fs;
    prepareToRender();
    //requestAnimationFrame(render);
});

function prepareToRender() {

    programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

    const arrays = {
        position: [-1,
            -1,
            0,
            1,
            -1,
            0,
            -1,
            1,
            0,
            -1,
            1,
            0,
            1,
            -1,
            0,
            1,
            1,
            0],
    };
    bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
    requestAnimationFrame(render);
}

function render(time) {
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const uniforms = {
        time: time * 0.001,
        resolution: [gl.canvas.width,
            gl.canvas.height],
    };

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);

    requestAnimationFrame(render);
}