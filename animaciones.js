// Variables
const bienvenida = localStorage.getItem('bienvenida');
let nombreUsuario = localStorage.getItem('nombreUsuario');
let apellidoUsuario = localStorage.getItem('apellidoUsuario');
let autoUsuario = sessionStorage.getItem('autoUsuario');
let modeloUsuario = sessionStorage.getItem('modeloUsuario');
let inputNombre = sessionStorage.getItem('inputNombre');
let inputApellido = sessionStorage.getItem('inputApellido');
let inputAuto = sessionStorage.getItem('inputAuto');
let inputModelo = sessionStorage.getItem('inputModelo');

//Variables DOM
const saludoUsuario = document.querySelector('#saludoUsuario');
const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const auto = document.querySelector('#auto');
const modelo = document.querySelector('#modelo');
const contFormulario = document.querySelector('#contFormulario');
const contenido = document.querySelector('#contenido');

// Funciones
const ocultarFormulario = () => {
    contFormulario.style.display = 'none';
    contenido.innerHTML = `Hola ${nombreUsuario} ${apellidoUsuario}. Tienes un ${autoUsuario} ${modeloUsuario}.`
}
saludoUsuario.innerHTML = bienvenida;

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    nombreUsuario = nombre.value;
    apellidoUsuario = apellido.value;
    autoUsuario = auto.value;
    modeloUsuario = modelo.value;

    localStorage.setItem('nombreUsuario', nombre.value);
    localStorage.setItem('apellidoUsuario', apellido.value);
    localStorage.setItem('autoUsuario', auto.value);
    localStorage.setItem('modeloUsuario', modelo.value);
    ocultarFormulario();
})

if (!!nombreUsuario && !!apellidoUsuario && !!autoUsuario && !!modeloUsuario) {
    ocultarFormulario();
}

nombre.value = inputNombre;
apellido.value = inputApellido;
auto.value = inputAuto;
modelo.value = inputModelo;

nombre.addEventListener('input', (e) => {
    sessionStorage.setItem('inputNombre', e.target.value)
})
apellido.addEventListener('input', (e) => {
    sessionStorage.setItem('inputApellido', e.target.value)
})
auto.addEventListener('input', (e) => {
    sessionStorage.setItem('inputAuto', e.target.value)
})
modelo.addEventListener('input', (e) => {
    sessionStorage.setItem('inputModelo', e.target.value)
})

//E-Commerce
// CONSTANTES
let productosSugeridos = [];

// CONSTANTES EVENTOS
const sugeridos = document.getElementById("sugeridos");
const listaProductos = document.getElementById("listado");
const precioElementos = document.getElementById("precio");
const buscadorProducto = document.getElementById("buscador-producto");

// FUNCIONES
const clickProducto = (producto) => {
    const _producto = new ProductoEnCarrito(producto);
    insertarCarrito(_producto);
    actualizarStorage(carrito);
}

const insertarProductosEnElDom = (productos) => {
    for (const producto of productos) {
        let contenidoProducto = document.createElement("li");
        contenidoProducto.className = "producto";
        contenidoProducto.id = producto.id;
        contenidoProducto.innerHTML = `
        <div class ="imagen-producto">
            <img src="${producto.imagen}">
        </div>
        <p class="nombre">${producto.nombre}</p>
        <p class="precio">$${producto.precio}</p>    
        `;
    contenidoProducto.onclick = () => {clickProducto(producto)};
    listaProductos.appendChild(contenidoProducto);
    }
}

// FETCH PRODUCTOS - PROMESAS
const insertarProductos = () => {
    listaProductos.innerHTML = 'Cargando...';
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const res = true;
            if (res) {
                resolve(productos);
            } else {
            reject(400);
            }
        }, 2000)
    })
}

// FETCH PRODUCTOS
const insertarProductosAJAX = () => {
    fletch('./productos.json')
        .then(respuesta => respuesta.json())
        .then(resultados => {
            console.log(resultados);
            for (const producto of resultados) {
                let contenidoProducto = document.createElement("li");
                contenidoProducto.className = "producto";
                contenidoProducto.id = producto.id;
                contenidoProducto.innerHTML = `
                <div class="imagen-producto">
                    <img src="${producto.imagen}">
                </div>
                <p class="nombre">${producto.nombre}</p>
                <p class="precio">${producto.precio}</p>
                `;
            contenidoProducto.onclick = () => {clickProducto(producto)};
            listaProductos.appendChild(contenidoProducto);
            }
        }).catch(error => {
            alert('No hay resultados');
        }).finally()
}

//FETCH PRODUCTOS ASYNC/AWAIT
const insertarProductosAsync = async () => {
    try {
        const respuesta = await fetch('./productos.json');
        const resultados = await respuesta.json();
        insertarProductosEnElDom(resultados.productos);
        productosSugeridos = resultados.sugeridos;
    } catch {
        alert("Error!");
    } finally {

    }
}

insertarProductosAsync();

const insertarBusquedasSugeridas = () => {
    for (const sugerido of productosSugeridos) {
        const li = document.createElement('li');
        li.classList.add('sugerido');
        li.innerHTML = sugerido;
        sugeridos.append(li);
    }
}

const quitarBusquedasSugeridas = () => {
    sugeridos.innerHTML = '';
}

const verificarStorage = () => {
    if (!!carritoStorage && carritoStorage.length > 0) {
        for (const producto of carritoStorage) {
            insertarProductosAlDOM (new ProductoEnCarrito(producto));
        }
    }
}

verificarStorage();
buscadorProducto.onfocus = () => insertarBusquedasSugeridas();
buscadorProducto.onblur = () => quitarBusquedasSugeridas();


document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
    selectable: true,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dateClick: function(info) {
        // alert('¡Te esperamos! ' + info.dateStr);
    },
    select: function(info) {
        // alert('Tu turno es el día ' + info.startStr );
    }
    });

    calendar.render();
})

const btn = document.querySelector('#myBtn')

btn.addEventListener('click', () => {
    Swal.fire({
        title: '¿Quiere confirmar el turno?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: '¡Sí!',
        cancelButtonText: '¡No!'
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Turno agendado',
                icon: 'success',
                text: 'Lo esperamos'
            })
        }
    })
})