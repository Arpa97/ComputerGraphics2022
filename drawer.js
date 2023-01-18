// Variabili 

var texture_enable=true;

var barile1=0;
var barile2=0;
var barile3=0;

var morte=false;
var vittoria = false;

var numBarili=0;
var barile=false;

var gameOver =new Image();
gameOver.src="resources/images/gameOver.gif";
gameOver.addEventListener('load', function() {});

var campagna =new Image();
campagna.src="resources/images/CAMPAGNA.jpeg";
campagna.addEventListener('load', function() {});


var wasd_keys= new Image(); 
wasd_keys.src = "resources/images/wasd.png";
wasd_keys.addEventListener('load', function() {});


var freccie = new Image();
freccie.src = "resources/images/freccie.png";
freccie.addEventListener('load', function() {});

        
var retry = new Image(); 
retry.src = "resources/images/RETRY.png";
retry.addEventListener('load', function() {});


var restart = new Image(); 
restart.src = "resources/images/REPLAY.png";
restart.addEventListener('load', function() {});


// -----------------------------------------------------------

// Set di funzioni per disegnare gli oggetti 3D nella scena

function drawCow(ProgramInfo){
    let u_model4 = m4.scale(m4.translation(posX, posY, posZ), 0.1, 0.1, 0.1)
    u_model4 = m4.yRotate(u_model4, degToRad(facing))
    u_model4 = m4.yRotate(u_model4, degToRad(90))
    u_model4 = m4.xRotate(u_model4, degToRad(-90))
    u_model4 = m4.zRotate(u_model4, degToRad(90))
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_cow)
    webglUtils.setUniforms(ProgramInfo, {
        u_world: u_model4,
        u_texture: texture_cow,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_cow)
    }

function drawEnemy(ProgramInfo, time, bufferInf, x_enemy, z_enemy){
    let u_model = m4.identity()
    u_model = m4.scale(m4.translation(x_enemy, (5.5), z_enemy), 5,5,5)
    u_model = m4.yRotate(u_model, time)
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInf)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_model,
        u_texture: (texture_sphere)
    })
    webglUtils.drawBufferInfo(gl, bufferInf)
    
    if(clock==0){    
        if(x_enemy>posX){
            x_enemu--;
        }else x_enemu++;
        if(z_enemy>posZ){
            z_enemu--;
        }else z_enemu++;
        clock++
    }else if(clock==15) clock=0
    else clock++
}


function drawBarile(ProgramInfo,time){
    let u_modelfolder = m4.scale(m4.translation(bar1xz[0],1,bar1xz[1]), 10, 10, 10)
    u_modelfolder = m4.yRotate(u_modelfolder, time);
    u_modelfolder = m4.yRotate(u_modelfolder, degToRad(180))
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_folder)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modelfolder,
        u_texture: texture_folder,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_folder)
}

    
function drawBarile2(ProgramInfo,time){
    let u_modelfolder = m4.scale(m4.translation(bar2xz[0],1,bar2xz[1]), 10,10,10)
    u_modelfolder = m4.yRotate(u_modelfolder, time);
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_folder)
    webglUtils.setUniforms(ProgramInfo, {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modelfolder,
        u_texture: texture_folder,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_folder)
}


function drawBarile3(ProgramInfo,time){
    let u_modelfolder = m4.scale(m4.translation(bar3xz[0],1,bar3xz[1]), 10,10,10)
    u_modelfolder = m4.yRotate(u_modelfolder, time);
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_folder)
    webglUtils.setUniforms(ProgramInfo, {
        //u_colorMult: [0.5, 0.5, 1, 1],
        u_world: u_modelfolder,
        u_texture: texture_folder,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_folder)
}

function drawFloor(ProgramInfo){
    let u_modelfloor = m4.identity()
    webglUtils.setBuffersAndAttributes(gl, ProgramInfo, bufferInfo_floor)
    webglUtils.setUniforms(ProgramInfo, {
        u_world: u_modelfloor,
        u_texture: texture_floor,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_floor)
    }   
            

function drawSkybox(gl, skyboxProgramInfo, view, projection) {
    gl.depthFunc(gl.LEQUAL) //specifies a function that compares incoming pixel depth to the current depth buffer value.

    const viewMatrix = m4.copy(view);

    // remove translations
    viewMatrix[12] = 0;
    viewMatrix[13] = 0;
    viewMatrix[14] = 0;

    let viewDirectionProjectionMatrix = m4.multiply(projection, viewMatrix)
    let viewDirectionProjectionInverse = m4.inverse(viewDirectionProjectionMatrix)
    gl.useProgram(skyboxProgramInfo.program);
    webglUtils.setBuffersAndAttributes(gl, skyboxProgramInfo, bufferInfo_skybox)
    webglUtils.setUniforms(skyboxProgramInfo, {
        u_viewDirectionProjectionInverse: viewDirectionProjectionInverse,
        u_skybox: texture_skybox,
    })
    webglUtils.drawBufferInfo(gl, bufferInfo_skybox)
    }

    
function drawScene( projectionMatrix, camera, textureMatrix, lightWorldMatrix, programInfo,time) {
    const viewMatrix = m4.inverse(camera);
	gl.useProgram(programInfo.program);
    if (texture_enable==true){
        webglUtils.setUniforms(programInfo, {
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_bias: bias,
            u_textureMatrix: textureMatrix,
            u_projectedTexture: depthTexture,
            u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
            u_lightDirection: m4.normalize([-1, 3, 5]),
            u_lightIntensity: lightIntensity,
            u_shadowIntensity: shadowIntensity,
        });
    }
    if(texture_enable==false){
        textureMatrix = m4.identity();
        textureMatrix = m4.scale(textureMatrix, 0, 0, 0);
        webglUtils.setUniforms(programInfo, {
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_bias: bias,
            u_textureMatrix: textureMatrix,
            u_reverseLightDirection:lightWorldMatrix.slice(8, 11),
            u_lightDirection: m4.normalize([-1, 3, 5]),
            u_lightIntensity: lightIntensity,
            u_shadowIntensity: shadowIntensity,
        });
    }

    drawCow(programInfo)

    drawEnemy(programInfo, time, bufferInfo_sphere ,x_enemu, z_enemu)

    if (barile1==0){
        drawBarile(programInfo,time)
    }
    if (barile2==0){
        drawBarile2(programInfo,time)
    }
    if (barile3==0){
        drawBarile3(programInfo,time)
    }
    
    if(numBarili==3){
        vittoria=1
   }
    drawFloor(programInfo)    
}     

// -----------------------------------------------------------

// Funzione per il render di testo, menu e bottoni


function drawMiscElements(){
    if( (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
    ctx.drawImage(wasd_keys, 80, 330);
    ctx.drawImage(freccie, 540, 330);  
    } 
    else{
    }
	//testo
	ctx.font = '18pt Arial';
	ctx.fillStyle = 'white';
	ctx.fillText("Prova a raccogliere tutti i barili di latte rubato", 20, 30);
    ctx.font = '18pt Arial';
	ctx.fillStyle = 'black';
	ctx.fillText("Prova a raccogliere tutti i barili di latte rubato", 22, 32);
   


	ctx.font = '18pt Calibri';
	ctx.fillStyle = 'white';
	ctx.fillText("Scappa dal fattore cattivo!", 842, 32);


    ctx.font = '14pt Arial';
	ctx.fillStyle = 'white';
    numBarili=barile1+barile2+barile3;
    if ((numBarili)==0){
        ctx.fillText("Mancano 3 barili", 842, 52);}
    else if ((numBarili)==1){
            ctx.fillText("Forza, ancora 2", 842, 52);}
    else if ((numBarili)==2){
                ctx.fillText("Ne manca solo 1", 842, 52);
            }

    ctx.font = '18pt Calibri';
    ctx.fillStyle = 'red';
    ctx.fillText("Scappa dal fattore cattivo!", 840, 30);


    ctx.font = '14pt Arial';
    ctx.fillStyle = 'red';
    numBarili=barile1+barile2+barile3;
    if ((numBarili)==0){
        ctx.fillText("Mancano 3 barili", 840, 50);}
    else if ((numBarili)==1){
            ctx.fillText("Forza, ancora 2", 840, 50);}
    else if ((numBarili)==2){
                ctx.fillText("Ne manca solo 1", 840, 50);
            }
        

	
   if(morte==1){  
        ctx.drawImage(gameOver,0,0,text.clientWidth,text.clientHeight);
        ctx.drawImage(retry,480, 175);
    }
    if(vittoria==1){  
        ctx.drawImage(campagna,0,0,text.clientWidth,text.clientHeight);
        ctx.drawImage(restart,480, 175);
        ctx.font = '20pt Arial';
        ctx.fillStyle = 'white';
        ctx.fillText("HAI VINTO! HAI RACCOLTO TUTTI I BARILI!!!", 290, 30);
   
    }

}
