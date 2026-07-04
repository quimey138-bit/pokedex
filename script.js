// ===============================
// GAMING STORE
// script.js
// ===============================

// ======== PRODUCTOS ========

const productos = [

{
    id:1,
    nombre:"Remera Minecraft",
    categoria:"Minecraft",
    precio:25000,
    stock:12,
    imagen:"img/minecraft.jpg",
    descripcion:"Remera gamer de Minecraft 100% algodón."
},

{
    id:2,
    nombre:"Remera GTA V",
    categoria:"GTA",
    precio:28000,
    stock:8,
    imagen:"img/gta.jpg",
    descripcion:"Remera edición especial GTA V."
},

{
    id:3,
    nombre:"Remera Valorant",
    categoria:"Valorant",
    precio:27000,
    stock:15,
    imagen:"img/valorant.jpg",
    descripcion:"Diseño inspirado en Valorant."
},

{
    id:4,
    nombre:"Remera Counter Strike",
    categoria:"Counter Strike",
    precio:26500,
    stock:9,
    imagen:"img/cs2.jpg",
    descripcion:"Ideal para fans de CS2."
},

{
    id:5,
    nombre:"Remera League of Legends",
    categoria:"League of Legends",
    precio:25500,
    stock:13,
    imagen:"img/lol.jpg",
    descripcion:"Diseño exclusivo LoL."
},

{
    id:6,
    nombre:"Remera Mario Bros",
    categoria:"Mario",
    precio:24000,
    stock:20,
    imagen:"img/mario.jpg",
    descripcion:"Remera clásica de Mario."
},

{
    id:7,
    nombre:"Remera Zelda",
    categoria:"Zelda",
    precio:29500,
    stock:7,
    imagen:"img/zelda.jpg",
    descripcion:"Edición Legend of Zelda."
},

{
    id:8,
    nombre:"Remera Fortnite",
    categoria:"Fortnite",
    precio:24500,
    stock:11,
    imagen:"img/fortnite.jpg",
    descripcion:"Skin gamer Fortnite."
},

{
    id:9,
    nombre:"Remera Roblox",
    categoria:"Roblox",
    precio:22000,
    stock:18,
    imagen:"img/roblox.jpg",
    descripcion:"Remera Roblox."
},

{
    id:10,
    nombre:"Remera Among Us",
    categoria:"Among Us",
    precio:21500,
    stock:16,
    imagen:"img/amongus.jpg",
    descripcion:"Diseño Among Us."
},

{
    id:11,
    nombre:"Remera Five Nights at Freddy's",
    categoria:"FNAF",
    precio:29000,
    stock:10,
    imagen:"img/fnaf.jpg",
    descripcion:"Five Nights at Freddy's."
},

{
    id:12,
    nombre:"Remera Call of Duty",
    categoria:"COD",
    precio:31000,
    stock:6,
    imagen:"img/cod.jpg",
    descripcion:"Call of Duty Black Ops."
}

];

// ===============================
// VARIABLES
// ===============================

let carrito =
JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos =
document.getElementById("productos");

const listaCarrito =
document.getElementById("listaCarrito");

const total =
document.getElementById("total");

const cantidadProductos =
document.getElementById("cantidadProductos");

const contador =
document.getElementById("contadorCarrito");

// ===============================
// MOSTRAR PRODUCTOS
// ===============================

function mostrarProductos(lista){

contenedorProductos.innerHTML="";

lista.forEach(producto=>{

contenedorProductos.innerHTML += `

<div class="card">

<img src="${producto.imagen}" alt="${producto.nombre}">

<div class="card-body">

<h3>${producto.nombre}</h3>

<p>${producto.descripcion}</p>

<div class="precio">

$${producto.precio}

</div>

<div class="stock">

Stock disponible:
${producto.stock}

</div>

<button onclick="agregarCarrito(${producto.id})">

Agregar al carrito

</button>

</div>

</div>

`;

});

}

mostrarProductos(productos);
// ===============================
// FUNCIONES DEL CARRITO
// ===============================

function agregarCarrito(id){

    const producto = productos.find(p => p.id === id);

    const existe = carrito.find(p => p.id === id);

    if(existe){

        if(existe.cantidad < producto.stock){

            existe.cantidad++;

        }else{

            alert("No hay más stock disponible.");

            return;

        }

    }else{

        carrito.push({

            ...producto,

            cantidad:1

        });

    }

    guardarCarrito();

}

function guardarCarrito(){

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

    mostrarCarrito();

}

// ===============================
// MOSTRAR CARRITO
// ===============================

function mostrarCarrito(){

    listaCarrito.innerHTML="";

    let totalCompra=0;

    let cantidadTotal=0;

    carrito.forEach(producto=>{

        totalCompra += producto.precio * producto.cantidad;

        cantidadTotal += producto.cantidad;

        listaCarrito.innerHTML += `

        <div class="itemCarrito">

            <div class="itemInfo">

                <h4>${producto.nombre}</h4>

                <p>$${producto.precio}</p>

            </div>

            <div class="controlesCantidad">

                <button onclick="restarCantidad(${producto.id})">

                    -

                </button>

                <span>

                    ${producto.cantidad}

                </span>

                <button onclick="sumarCantidad(${producto.id})">

                    +

                </button>

                <button

                    class="eliminar"

                    onclick="eliminarProducto(${producto.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    total.textContent = totalCompra.toLocaleString("es-AR");

    cantidadProductos.textContent = cantidadTotal;

    contador.textContent = cantidadTotal;

}

// ===============================
// SUMAR CANTIDAD
// ===============================

function sumarCantidad(id){

    const producto = carrito.find(p => p.id === id);

    if(producto.cantidad < producto.stock){

        producto.cantidad++;

    }else{

        alert("No hay más stock.");

    }

    guardarCarrito();

}

// ===============================
// RESTAR CANTIDAD
// ===============================

function restarCantidad(id){

    const producto = carrito.find(p => p.id === id);

    producto.cantidad--;

    if(producto.cantidad <= 0){

        carrito = carrito.filter(

            p => p.id !== id

        );

    }

    guardarCarrito();

}

// ===============================
// ELIMINAR PRODUCTO
// ===============================

function eliminarProducto(id){

    carrito = carrito.filter(

        p => p.id !== id

    );

    guardarCarrito();

}

// ===============================
// VACIAR CARRITO
// ===============================

document

.getElementById("vaciar")

.addEventListener("click",()=>{

    if(carrito.length===0){

        alert("El carrito ya está vacío.");

        return;

    }

    if(confirm("¿Vaciar el carrito?")){

        carrito=[];

        guardarCarrito();

    }

});

// ===============================
// FINALIZAR COMPRA
// ===============================

document

.getElementById("comprar")

.addEventListener("click",()=>{

    if(carrito.length===0){

        alert("El carrito está vacío.");

        return;

    }

    alert(

        "¡Gracias por tu compra! 🎮"

    );

    carrito=[];

    guardarCarrito();

});

mostrarCarrito();
// ===============================
// BUSCADOR
// ===============================

const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup", () => {

    const texto = buscador.value.toLowerCase();

    const filtrados = productos.filter(producto =>

        producto.nombre.toLowerCase().includes(texto) ||

        producto.categoria.toLowerCase().includes(texto)

    );

    mostrarProductos(filtrados);

});

// ===============================
// FILTRO POR CATEGORÍA
// ===============================

const categoria = document.getElementById("categoria");

categoria.addEventListener("change", () => {

    if(categoria.value === "Todos"){

        mostrarProductos(productos);

        return;

    }

    const filtrados = productos.filter(producto =>

        producto.categoria === categoria.value

    );

    mostrarProductos(filtrados);

});

// ===============================
// ORDENAR POR PRECIO
// ===============================

const orden = document.getElementById("orden");

orden.addEventListener("change", () => {

    let copia = [...productos];

    if(orden.value === "menor"){

        copia.sort((a,b)=>a.precio-b.precio);

    }

    if(orden.value === "mayor"){

        copia.sort((a,b)=>b.precio-a.precio);

    }

    mostrarProductos(copia);

});

// ===============================
// BOTÓN HERO
// ===============================

document

.getElementById("btnHero")

.addEventListener("click",()=>{

    document

    .getElementById("productos")

    .scrollIntoView({

        behavior:"smooth"

    });

});

// ===============================
// TOAST
// ===============================

const toast = document.createElement("div");

toast.id="toast";

toast.innerText="Producto agregado al carrito";

document.body.appendChild(toast);

// ===============================
// MOSTRAR TOAST
// ===============================

function mostrarToast(){

    toast.classList.add("mostrar");

    setTimeout(()=>{

        toast.classList.remove("mostrar");

    },2000);

}

// ===============================
// MODIFICAR AGREGAR CARRITO
// ===============================

const agregarOriginal = agregarCarrito;

agregarCarrito = function(id){

    agregarOriginal(id);

    mostrarToast();

}

// ===============================
// INICIALIZAR
// ===============================

mostrarCarrito();

mostrarProductos(productos);