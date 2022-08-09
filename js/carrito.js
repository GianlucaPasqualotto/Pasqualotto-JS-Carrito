// CLASES
class ProductoEnCarrito {
    constructor(producto) {
        this.nombre = producto.nombre;
        this.id = producto.id;
        this.imagen = producto.imagen;
        this.precio = producto.precio;
        this.cantidad = producto.cantidad || 1;
    }

    modificarCantidad(operacion) {
        switch (operacion) {
            case 'suma':
                this.cantidad += 1;
                document.location.reload();
                break;
            case 'resta':
                if (this.cantidad > 1) {
                    this.cantidad -= 1;
                } else {
                    const findProductIndex = carrito.findIndex(producto => producto.id === this.id);
                    carrito.splice(findProductIndex, 1);
                }
                break;
        }
    }
}

// VARIABLES
const carritoStorage = JSON.parse(localStorage.getItem('carrito'));

var totalProductos = [];
var sumaTotales = 0;

// Total carrito
const Total = document.querySelector('#total');

if (carritoStorage != null) {

    for (let i = 0; i < carritoStorage.length; i++) {
        let sumaProductos = carritoStorage[i].precio * carritoStorage[i].cantidad;
        totalProductos.push(sumaProductos)
    }
}

totalProductos.forEach((num) => {
    sumaTotales += num;
})

Total.innerHTML = `$ ${sumaTotales}`

// productos en carrito
let carrito;

if (carritoStorage) {
    carrito = carritoStorage.map(item => new ProductoEnCarrito(item));
} else {
    carrito = [];
}

// CONSTANTES DOM
const contenedorCarrito = document.getElementById("carrito");

// FUNCIONES
const actualizarStorage = (productosCarrito) => {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

const eliminarProducto = (producto) => {
    const findIndex = carrito.findIndex(p => p.id === producto.id);

    const productoAEliminar = document.querySelector(`#producto-${producto.id}`);
    productoAEliminar.remove();
    carrito.splice(findIndex, 1);

    actualizarStorage(carrito);
}

const insertarProductosAlDOM = (producto) => {
    const contenedor = document.createElement('div');
    contenedor.classList = 'producto-carrito';
    contenedor.id = `producto-${producto.id}`;
    contenedor.innerHTML = `<img src="${producto.imagen}">
    <div class="descripcion-producto">
    <p> Producto: ${producto.nombre}</p>
    <b> $ ${producto.precio}</b>
    <p class="cantidad">Cantidad: ${producto.cantidad}</p>
    </div>`;

    const botonEliminar = document.createElement('button');
    botonEliminar.className = 'boton-eliminar';
    botonEliminar.innerHTML = 'Eliminar';
    botonEliminar.onclick = () => {
        eliminarProducto(producto);
        document.location.reload();
    }

    contenedor.append(botonEliminar);
    contenedorCarrito.append(contenedor);
}

const insertarCarrito = (producto) => {
    const findIndex = carrito.findIndex(p => p.id === producto.id);

    if (findIndex !== -1) {
        carrito[findIndex].modificarCantidad('suma');

        const cantidad = document.querySelector(`#producto-${producto.id} .cantidad`);
        cantidad.innerHTML = `<p class="cantidad">Cantidad: ${carrito[findIndex].cantidad}</p>`;
    } else {
        carrito.push(producto);
        insertarProductosAlDOM(producto)
        document.location.reload();
    }
}

function vaciarCarrito() {
    document.getElementById("refresh").addEventListener("click", function (event) {
        event.preventDefault()
    });
    localStorage.removeItem('carrito')
    document.location.reload();
}