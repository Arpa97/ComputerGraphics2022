//Buffers degli Obj
let bufferInfo_sphere
let bufferInfo_cube
let bufferInfo_skybox
let bufferInfo_floor
let bufferInfo_cow
let bufferInfo_rotella
let bufferInfo_folder
//Buffers delle texture
let texture_sphere
let texture_cube
let texture_skybox
let texture_cow
let texture_floor
let texture_rotella
let texture_folder
let texture_foto
let texture_face

function setGeo(gl) {
    loadSphere()
    loadCube()
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

function loadFoto()
{
        const position= [
                //1 bottom
                    -0.5, -0.5,  -0.5,
                    -0.5,  0.5,  -0.5,
                     0.5, -0.5,  -0.5,
                    -0.5,  0.5,  -0.5,
                     0.5,  0.5,  -0.5,
                     0.5, -0.5,  -0.5,
                //2 top
                    -0.5, -0.5,   0.5,
                    -0.5,  0.5,   0.5,
                     0.5, -0.5,   0.5,
                     0.5, -0.5,   0.5,
                    -0.5,  0.5,   0.5,
                     0.5,  0.5,   0.5,
                //3 right
                    -0.5,   0.5, -0.5,
                    -0.5,   0.5,  0.5,
                     0.5,   0.5, -0.5,
                    -0.5,   0.5,  0.5,
                     0.5,   0.5,  0.5,
                     0.5,   0.5, -0.5,
                //4 left
                    -0.5,  -0.5, -0.5,
                     0.5,  -0.5, -0.5,
                    -0.5,  -0.5,  0.5,
                    -0.5,  -0.5,  0.5,
                     0.5,  -0.5, -0.5,
                     0.5,  -0.5,  0.5,
                //5 back
                    -0.5,  -0.5, -0.5,
                    -0.5,  -0.5,  0.5,
                    -0.5,   0.5, -0.5,
                    -0.5,  -0.5,  0.5,
                    -0.5,   0.5,  0.5,
                    -0.5,   0.5, -0.5,
                //6 front
                     0.5,  -0.5, -0.5,
                     0.5,   0.5, -0.5,
                     0.5,  -0.5,  0.5,
                     0.5,  -0.5,  0.5,
                     0.5,   0.5, -0.5,
                     0.5,   0.5,  0.5,
                    ];
                
            const normal= [
                
                    //1 bottom
                        0, 0, -1,
                        0, 0, -1,
                        0, 0, -1,
                        0, 0, -1,
                        0, 0, -1,
                        0, 0, -1,
                    //2 top
                        0, 0, 1,
                        0, 0, 1,
                        0, 0, 1,
                        0, 0, 1,
                        0, 0, 1,
                        0, 0, 1,
                    //3 right
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                    //4 left
                        0, -1, 0,
                        0, -1, 0,
                        0, -1, 0,
                        0, -1, 0,
                        0, -1, 0,
                        0, -1, 0,
                    //5 back
                        -1, 0, 0,
                        -1, 0, 0,
                        -1, 0, 0,
                        -1, 0, 0,
                        -1, 0, 0,
                        -1, 0, 0,
                    //6 front
                        1, 0, 0,
                        1, 0, 0,
                        1, 0, 0,
                        1, 0, 0,
                        1, 0, 0,
                        1, 0, 0.
                        ];
            const texcoord= [
                //1 bottom
                1.0  , 0.0,
                0.0   , 0.0,
                1.0  , 1.0,
                0.0   , 0.0,
                0.0  , 1.0,
                1.0  , 1.0,
                //2 top
                1.0  , 0.0,
                1.0   , 1.0,
                0.0  , 0.0,
                0.0   , 0.0,
                1.0  , 1.0,
                0.0  , 1.0,
                //3 right
                1.0 , 1.0  ,
                1.0 , 0.0,
                0.0, 1.0  ,
                1.0 , 0.0,
                0.0, 0.0,
                0.0, 1.0,
                //4 left
                0.0 , 1.0  ,
                1.0 , 1.0,
                0.0, 0.0  ,
                0.0 , 0.0,
                1.0, 1.0,
                1.0, 0.0,
                //5 back
                1.0 , 1.0  ,
                1.0 , 0.0,
                0.0, 1.0  ,
                1.0 , 0.0,
                0.0, 0.0,
                0.0, 1.0,
                //6 front
                0.0 , 1.0  ,
                1.0 , 1.0,
                0.0, 0.0  ,
                0.0 , 0.0,
                1.0, 1.0,
                1.0, 0.0,
              ];
        
		const arrays_foto = {
            position: {numComponents: 3, data:position},
            texcoord: {numComponents: 2, data:texcoord,},
            normal: {numComponents: 3, data:normal,},
        }

        
        texture_foto = loadTextureFromImg("resources/images/faccione.jpg")

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


function loadCube() {
    //cubo
    loadObj("resources/obj/computer.obj")
    const cube_array = {
        position: {numComponents: 3, data:webglVertexData[0],},
        texcoord: {numComponents: 2,data:webglVertexData[1],},
        normal: {numComponents: 3, data:webglVertexData[2],},
    }
    bufferInfo_cube = webglUtils.createBufferInfoFromArrays(gl, cube_array)
    //texture_cube = loadTextureFromImg("resources/images/macbookbis.png")
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




