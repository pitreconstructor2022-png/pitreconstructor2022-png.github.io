function mostrar(seccion) {
  const contenido = document.getElementById('contenido');

  if (seccion === 'alquileres') {
    contenido.innerHTML = `
      <div class="card">
        <h3>Registro de Alquileres</h3>
        <input id="nombre" placeholder="Nombre del cliente">
        <input id="documento" placeholder="Documento del cliente">
        <input id="telefono" placeholder="Número de teléfono">
        <input id="direccion" placeholder="Dirección">
        <input id="equipo" placeholder="Equipo alquilado">
        <input id="fechaInicio" type="date">
        <input id="dias" type="number" placeholder="Días de alquiler">
        <input id="precio" type="number" placeholder="Precio unitario">
        <button class="save" onclick="guardarAlquiler()">Guardar alquiler</button>
      </div>
      <h3>Listado de alquileres</h3>
      <table id="tablaAlquileres">
        <tr><th>Cliente</th><th>Equipo</th><th>Total</th><th>Acciones</th></tr>
      </table>`;
    mostrarAlquileres();
  }

  if (seccion === 'precios') {
    contenido.innerHTML = `
      <div class="card">
        <h3>Agregar producto</h3>
        <input id="producto" placeholder="Nombre del producto">
        <input id="precioProd" type="number" placeholder="Precio unitario">
        <button class="save" onclick="guardarProducto()">Guardar</button>
      </div>
      <h3>Lista de precios</h3>
      <table id="tablaPrecios">
        <tr><th>Producto</th><th>Precio</th><th>Acciones</th></tr>
      </table>`;
    mostrarProductos();
  }

  if (seccion === 'ventas') {
    contenido.innerHTML = `
      <div class="card">
        <h3>Registrar venta</h3>
        <input id="clienteV" placeholder="Nombre del cliente">
        <input id="cedulaV" placeholder="Cédula">
        <input id="direccionV" placeholder="Dirección">
        <input id="telefonoV" placeholder="Teléfono">
        <select id="productoV"></select>
        <input id="cantidadV" type="number" placeholder="Cantidad">
        <button class="save" onclick="guardarVenta()">Guardar venta</button>
      </div>
      <h3>Listado de ventas</h3>
      <table id="tablaVentas">
        <tr><th>Cliente</th><th>Producto</th><th>Cantidad</th><th>Total</th></tr>
      </table>`;
    cargarProductosVenta();
    mostrarVentas();
  }
}

// -------- FUNCIONES DE ALQUILERES --------
function guardarAlquiler() {
  const nombre = document.getElementById("nombre").value;
  const equipo = document.getElementById("equipo").value;
  const dias = Number(document.getElementById("dias").value);
  const precio = Number(document.getElementById("precio").value);
  const total = dias * precio;

  const alquileres = JSON.parse(localStorage.getItem("alquileres")) || [];
  alquileres.push({ nombre, equipo, total });
  localStorage.setItem("alquileres", JSON.stringify(alquileres));
  mostrarAlquileres();
}

function mostrarAlquileres() {
  const tabla = document.getElementById("tablaAlquileres");
  if (!tabla) return;
  const alquileres = JSON.parse(localStorage.getItem("alquileres")) || [];
  tabla.innerHTML = "<tr><th>Cliente</th><th>Equipo</th><th>Total</th><th>Acciones</th></tr>";
  alquileres.forEach((a, i) => {
    tabla.innerHTML += `<tr><td>${a.nombre}</td><td>${a.equipo}</td><td>$${a.total}</td>
    <td><button onclick="eliminarAlquiler(${i})">❌</button></td></tr>`;
  });
}

function eliminarAlquiler(i) {
  const alquileres = JSON.parse(localStorage.getItem("alquileres")) || [];
  alquileres.splice(i, 1);
  localStorage.setItem("alquileres", JSON.stringify(alquileres));
  mostrarAlquileres();
}

// -------- FUNCIONES DE PRECIOS --------
function guardarProducto() {
  const nombre = document.getElementById("producto").value;
  const precio = Number(document.getElementById("precioProd").value);
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.push({ nombre, precio });
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
}

function mostrarProductos() {
  const tabla = document.getElementById("tablaPrecios");
  if (!tabla) return;
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  tabla.innerHTML = "<tr><th>Producto</th><th>Precio</th><th>Acciones</th></tr>";
  productos.forEach((p, i) => {
    tabla.innerHTML += `<tr><td>${p.nombre}</td><td>$${p.precio}</td>
    <td><button onclick="eliminarProducto(${i})">❌</button></td></tr>`;
  });
}

function eliminarProducto(i) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.splice(i, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
}

// -------- FUNCIONES DE VENTAS --------
function cargarProductosVenta() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const select = document.getElementById("productoV");
  select.innerHTML = "<option value=''>Seleccione un producto</option>";
  productos.forEach(p => {
    select.innerHTML += `<option value="${p.nombre}" data-precio="${p.precio}">${p.nombre} - $${p.precio}</option>`;
  });
}

function guardarVenta() {
  const cliente = document.getElementById("clienteV").value;
  const producto = document.getElementById("productoV").value;
  const cantidad = Number(document.getElementById("cantidadV").value);
  const precio = Number(document.querySelector(`#productoV option[value='${producto}']`).dataset.precio);
  const total = cantidad * precio;

  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
  ventas.push({ cliente, producto, cantidad, total });
  localStorage.setItem("ventas", JSON.stringify(ventas));
  mostrarVentas();
}

function mostrarVentas() {
  const tabla = document.getElementById("tablaVentas");
  if (!tabla) return;
  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
  tabla.innerHTML = "<tr><th>Cliente</th><th>Producto</th><th>Cantidad</th><th>Total</th></tr>";
  ventas.forEach(v => {
    tabla.innerHTML += `<tr><td>${v.cliente}</td><td>${v.producto}</td><td>${v.cantidad}</td><td>$${v.total}</td></tr>`;
  });
}

function cerrarSesion() {
  window.location.href = "index.html";
}
