
// Movimento della mucca.

var posX, posY, posZ, // posizione
facing;               // orientamento
var sterzo; 
var vx, vy, vz;       // velocita' attuale

// queste di solito rimangono costanti
var velSterzo, velRitornoSterzo, accMax, attrito,
    raggioRuotaA, raggioRuotaP, grip,
    attritoX, attritoY, attritoZ; // attriti
var key;


//Inizializziamo le variabili utili  al movimento della mucca
function cowInit() {
    // inizializzo lo stato della macchina
    posX = posY = posZ = facing = 0; // posizione e orientamento
    sterzo = 0;   // stato
    vx = vy = vz = 0;      // velocita' attuale
    // inizializzo i controlli
    key = [false, false, false, false];
   

    velSterzo = 3.2;         // A
    velRitornoSterzo = 0.84; // B, sterzo massimo = A*B / (1-B)

    accMax = 0.005;

    // attriti: percentuale di velocita' che viene mantenuta
    // 1 = no attrito
    // <<1 = attrito grande
    attritoZ = 0.99;  // piccolo attrito sulla Z 
    attritoX = 0.8;  // grande attrito sulla X 
    attritoY = 1.0;  // attrito sulla y nullo


    grip = 0.35; // quanto il facing macchina si adegua velocemente allo sterzo
}

//Indipendente dal rendering 
//permette i movimenti della mucca

//funzione presa dall'esempio "car2" visto in classe
//cardostep()
function cowMove() {

    var vxm, vym, vzm; // velocita' sugli assi

    // da vel frame mondo a vel frame 
    var cosf = Math.cos(facing * Math.PI / 180.0);
    var sinf = Math.sin(facing * Math.PI / 180.0);
    vxm = +cosf * vx - sinf * vz;
    vym = vy;
    vzm = +sinf * vx + cosf * vz;

    // gestione dello sterzo
    if (key[1]) sterzo += velSterzo;
    if (key[3]) sterzo -= velSterzo;
    sterzo *= velRitornoSterzo; // ritorno fermo

    if (key[0]) vzm -= accMax; // accelerazione in avanti
    if (key[2]) vzm += accMax; // accelerazione indietro
    

    // attriti (semplificando)
    vxm *= attritoX;
    vym *= attritoY;
    vzm *= attritoZ;

    // l'orientamento della mucca segue quello dello "sterzo"
    // (a seconda della velocita' sulla z)
    facing = facing - (vzm * grip) * sterzo;


    // ritorno a vel coord mondo
    vx = +cosf * vxm + sinf * vzm;
    vy = vym;
    vz = -sinf * vxm + cosf * vzm;
  
		posX+=vx;
		posY+=vy;
		posZ+=vz;


//controllo se il fattore mi prende
    if (posX >= x_enemu-6 && posX <= x_enemu+6 && posZ >= z_enemu-6 && posZ <= z_enemu+6) {
            morte=1;
		}

//controllo se il recupero un barile
    if (posX >= bar1xz[0]-6 && posX <= bar1xz[0]+6 && posZ >= bar1xz[1]-6 && posZ <= bar1xz[1]+6) {
        barile1=true;
     
        }

    if (posX >= bar2xz[0]-6 && posX <= bar2xz[0]+6 && posZ >= bar2xz[1]-6 && posZ <= bar2xz[1]+6) {
        barile2=true;
       
        
        }
		
       
    if (posX >= bar3xz[0]-6 && posX <= bar3xz[0]+6 && posZ >= bar3xz[1]-6 && posZ <= bar3xz[1]+6) {
        barile3=true;
       
        
        }

//controllo se esco dalla mappa
    if (posX >= 67 || posX <= -67 || posZ >= 67 || posZ <= -67) {
           morte=true;
      }

}
