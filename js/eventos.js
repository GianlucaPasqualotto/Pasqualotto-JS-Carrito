// Variables
const bienvenida = localStorage.getItem('bienvenida');
let nombreUsuario = localStorage.getItem('nombreUsuario');
let apellidoUsuario = localStorage.getItem('apellidoUsuario');
let autoUsuario = localStorage.getItem('autoUsuario');
let modeloUsuario = localStorage.getItem('modeloUsuario');
let inputNombre = localStorage.getItem('inputNombre');
let inputApellido = localStorage.getItem('inputApellido');
let inputAuto = localStorage.getItem('inputAuto');
let inputModelo = localStorage.getItem('inputModelo');

//Variables DOM
const saludoUsuario = document.querySelector('#saludoUsuario');
const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const auto = document.querySelector('#auto');
const modelo = document.querySelector('#modelo');
const contFormulario = document.querySelector('#contFormulario');
const contenido = document.querySelector('#contenido');
const borrarUsuario = document.querySelector('#borrarUsuario');
const btnSalir = document.querySelector('#btn-salir');
const contenidoBody = document.querySelector('#contenidoBody');

btnSalir.style.display = 'none';
contenidoBody.style.display = 'none';
saludoUsuario.innerHTML = bienvenida;

// Funciones
const ocultarFormulario = () => {
    contFormulario.style.display = 'none';
    btnSalir.style.display = 'flex';
    contenidoBody.style.display = 'block';
    contenido.innerHTML = `Hola ${nombreUsuario} ${apellidoUsuario}. Tienes un ${autoUsuario} ${modeloUsuario}.`
}

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
    ocultarFormulario()
})

if (nombreUsuario != null) {
    ocultarFormulario()
}

//E-Commerce

// CONSTANTES EVENTOS
const listaProductos = document.getElementById("listado");
const precioElementos = document.getElementById("precio");

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
        <p class="precio">$ ${producto.precio}</p>    
        `;
        contenidoProducto.onclick = () => {
            clickProducto(producto)
        };
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
    fletch('./datos/productos.json')
        .then(respuesta => respuesta.json())
        .then(resultados => {
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
                contenidoProducto.onclick = () => {
                    clickProducto(producto)
                };
                listaProductos.appendChild(contenidoProducto);
            }
        }).catch(error => {
            alert('No hay resultados');
        }).finally()
}

//FETCH PRODUCTOS ASYNC/AWAIT
const insertarProductosAsync = async () => {
    try {
        const respuesta = await fetch('./datos/productos.json');
        const resultados = await respuesta.json();
        insertarProductosEnElDom(resultados.productos);
    } catch {
        alert("Error!");
    } finally {

    }
}

insertarProductosAsync();

const verificarStorage = () => {
    if (!!carritoStorage && carritoStorage.length > 0) {
        for (const producto of carritoStorage) {
            insertarProductosAlDOM(new ProductoEnCarrito(producto));
        }
    }
}

verificarStorage();

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        selectable: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: function (info) {
        },
        select: function (info) {
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

const borrarLocal = () => {
    localStorage.clear(borrarUsuario);
    document.location.reload()
}