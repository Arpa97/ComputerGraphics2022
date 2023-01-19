//Buffers degli Obj
let bufferInfo_sphere
let bufferInfo_cube
let bufferInfo_skybox
let bufferInfo_floor
let bufferInfo_cow
let bufferInfo_folder
//Buffers delle texture
let texture_sphere
let texture_cube
let texture_skybox
let texture_cow
let texture_floor
let texture_folder
let texture_face

function setGeo(gl) {
    loadSphere()
    loadFolder()
    loadCow()
    loadFloor()
    loadSkyBox()  
}

function loadFloor()
{
		const S =70; 		
		const H = 0; 
		const textureCoords = [ 0,0, 1,0, 0,1, 1,1,];

		const arrays_floor = {
		   position: 	{ numComponents: 3, data: [-S,H,-S, S,H,-S, -S,H,S,  S,H,S, ], },
		   texcoord: 	{ numComponents: 2, data: textureCoords, },
		   //color: 	{ numComponents: 3, data: [0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7], },
		   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
		   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
		};

		bufferInfo_floor = webglUtils.createBufferInfoFromArrays(gl, arrays_floor);
        texture_floor = loadTextureFromImg("resources/images/grass.png")
	
}


function loadFolder() {
    loadObj("resources/obj/Milk.obj")
    const folder_array = {
        position: {numComponents: 3, data:webglVertexData[0],},
        texcoord: {numComponents: 2, data:webglVertexData[1],},
        normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfo_folder = webglUtils.createBufferInfoFromArrays(gl, folder_array)
    texture_folder = loadTextureFromImg("resources/images/MILK.jpg")
}


function loadSphere() {
    loadObj("resources/obj/sphere.obj")
    const sphere_array = {
        position: {numComponents: 3, data: webglVertexData[0],},
        texcoord: {numComponents: 2, data: webglVertexData[1],},
        normal: {numComponents: 3, data: webglVertexData[2],},
    }

    bufferInfo_sphere = webglUtils.createBufferInfoFromArrays(gl, sphere_array)
    texture_sphere = loadTextureFromImg("resources/images/FACCIONE.jpg")
    
}

function loadCow() {
    loadObj("resources/obj/cow.obj")
    const cow_infos = {
        position: {numComponents: 3, data: webglVertexData[0],},
        texcoord: {numComponents: 2, data: webglVertexData[1],},
        normal: {numComponents: 3, data: webglVertexData[2],},
    }
    bufferInfo_cow = webglUtils.createBufferInfoFromArrays(gl, cow_infos)
    texture_cow = loadTextureFromImg("resources/images/cow.png")
}


function loadSkyBox(){
    texture_skybox = loadSkyboxTexture()
    bufferInfo_skybox = webglUtils.createBufferInfoFromArrays(gl, {
       position: {
           data: new Float32Array([
               -1, -1, // bottom-left triangle
                1, -1,
               -1,  1,
               -1,  1, // top-right triangle
                1, -1,
                1,  1,
           ]),
           numComponents: 2,
       },
   });
}





