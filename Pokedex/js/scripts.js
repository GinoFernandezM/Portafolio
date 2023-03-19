const listaPokemon = document.querySelector("#listaPokemon");
let url = "https://pokeapi.co/api/v2/pokemon/";
const botonHeader = document.querySelectorAll(".btn-header");

for(let i=1; i<=151; i++){
    fetch(url+i)
    .then((response) => response.json())
    .then(data => mostraPokemon(data))
}

function mostraPokemon(poke){
    let tipos = poke.types.map(tipo => `<p class="${tipo.type.name} tipo">${tipo.type.name}</p>`);
    tipos = tipos.join('')

    let pokeId = poke.id.toString();
    if(pokeId.length === 1){
        pokeId = "00"+pokeId;
    }else if(pokeId.length === 2){
        pokeId = "0"+pokeId;
    }
    

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src=${poke.sprites.other["official-artwork"].front_default}>
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}Kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}


botonHeader.forEach(boton => boton.addEventListener('click',(even)=>{
    const botonId = even.currentTarget.id;
    listaPokemon.innerHTML=""

    for(let i=1;i<=151;i++){
        fetch(url+i)
        .then(response => response.json())
        .then(data => {
            
            if(botonId === 'ver-todos'){
                mostraPokemon(data);
            }
            else {
                const tipos = data.types.map(tipo => tipo.type.name);
                if(tipos.some(tipo => tipo.includes(botonId))){
                    mostraPokemon(data);
                }
            }
        })
    }
}))

/*<div class="pokemon">
                    <p class="pokemon-id-back">#025</p>
                    <div class="pokemon-imagen">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu">
                    </div>
                    <div class="pokemon-info">
                     
                    
                    <div class="nombre-contenedor">
                            <p class="pokemon-id">#025</p>
                            <h2 class="pokemon-nombre">Pikachu</h2>
                        </div>
                        <div class="pokemon-tipos">
                            <p class="electric tipo">ELECTRIC</p>
                            <p class="fighting tipo">FIGHTING</p>
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">4m</p>
                            <p class="stat">60kg</p>
                        </div>
                    </div>
                </div>
*/