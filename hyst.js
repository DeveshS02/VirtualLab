const a= document.getElementById('mat1');
const b= document.getElementById('c')
function myf(mat="mat"){

    if(mat==="mat"){
        b.innerHTML=`<div class="desc" id="mat1"> 

        <div class="od">
            <h2>Key Terms</h2> <br>
            <h3>Flux Density</h3> <br>
            <h3>Retentivity</h3> <br>
            <h3>Coercivity</h3> <br>
            <h3>Magnetizing Force</h3> <br>

        </div>

        <div class="te hov">

            <h4> Flux Density: </h4> The magnetic flux per unit area perpendicular to the direction of the magnetic force  <br>
             <h4> Retentivity: </h4> measure of the amount of magnetic field remaining in the material when the external magnetizing field is removed <br>
             <h4> Coercivity: </h4> The measurement of a ferromagnetic substance's ability to withstand an external magnetic field without getting demagnetized <br>
             <h4>Magnetizing Force: </h4>  The magnetizing field, or magnetic field strength H, caused by the current forces some or all of the atomic magnets in the material to align with the field

        </div>
      
    </div>`
    }
    
    if(mat==="mat1"){
        console.log(mat+"hi");
        b.innerHTML=`<div class="desc">
        <div class="re">
            <h2>Retentivity: Very High </h2> <br>
            <h2>Coercivity: Very Low</h2> <br>
            <h4> Soft magnetic materials</h4> <br>
            <h4> Used in applications where magnetic field need to change frequently</h4>
            <h4> Eg. transformer cores, electric motors, and other electrical devices.</h4>
        </div>`

        document.getElementById('img').src='gr1.jpeg'
}

else if(mat==="mat2"){
    b.innerHTML=`<div class="desc">
    <div class="re">
        <h2>Retentivity: High </h2> <br>
        <h4> 
        <h2>Coercivity: Low</h2> <br>
        <h4>This type of magnetic material is able to maintain <br> a strong magnetic field in absence of external <br> magnetic field </h4> <br>
        <h4>Eg. magnetic recording media tapes and disc</h4>
    </div>`
    document.getElementById('img').src='gr2.jpeg'
    
}

else if(mat==="mat3"){
    b.innerHTML=`<div class="desc">
    <div class="re">
        <h2>Retentivity: Fairly High</h2> <br>
        <h2>Coercivity: Fairly High</h2> <br>
        <h4> Hard magnetic material</h4> <br>
        <h4> Suitable for permanent magnetism</h4>
        <h4> Eg. Steel, AlNiCo, etc</h4>
    </div>`

    document.getElementById('img').src='gr3.jpeg'
  
}



}

myf();