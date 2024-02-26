const formulario = document.querySelector("#formulario");
const FormVacio = document.querySelector("#formulario-vacio");
const tarea = document.querySelector("#tareas");
const Total = document.querySelector("#Total");
const Completadas = document.querySelector("#Completadas");
const Pendientes = document.querySelector("#Pendientes");
let tareas = [];

(() => {
    // Agregar evento al enviar el formulario para validar y agregar tarea
    formulario.addEventListener("submit", validarFormulario);
    // Agregar eventos para eliminar, completar y editar tareas
    tarea.addEventListener("click", EliminarTarea);
    tarea.addEventListener("click", CompletarTarea);
    tarea.addEventListener("click", EditarTarea);
})();

// Función para validar el formulario y agregar tarea
function validarFormulario(e) {
    e.preventDefault();

    // Obtener el valor del campo de texto
    const tarea = document.querySelector("#tarea").value;
    // Verificar si el campo está vacío
    if (!tarea.trim()) {
         // Mostrar mensaje si está vacío
        FormVacio.textContent = 'Formulario Vacio';
        setTimeout(() => {
            FormVacio.textContent = '';
        }, 2000);
        return;
    }

    // Crear objeto de tarea
    const ObjetoTa = {
        id: Date.now(),
        tarea: tarea,
        estado: false
    };

    // Agregar tarea al arreglo
    tareas = [...tareas, ObjetoTa];
    // Limpiar formulario
    formulario.reset();
    // Mostrar tareas actualizadas
    mostrarHTML();
}

// Función para mostrar las tareas
function mostrarHTML() {
    // Limpiar contenedor de tareas
    tarea.innerHTML = '';

    // Verificar si no hay tareas
    if (tareas.length < 1) {
        // Mostrar mensaje si no hay tareas
        const mensaje = document.createElement("p");
        mensaje.textContent = "SIN TAREAS";
        return;
    }


    //Agregar las tareas en la lista de tareas y agregar los botones

    tareas.forEach((item) => {
        const itemTarea = document.createElement("div");
        itemTarea.classList.add("item-tarea");

         // Crear el HTML para la tarea con su estado (completada o no completada)
        itemTarea.innerHTML = `
        <div class="d-flex align-items-center">
        ${item.estado ? (
                `<p class="me-auto text-decoration-line-through">${item.tarea}</p>`
            ) : (
                `<p class="me-auto">${item.tarea}</p>`
            )}
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button data-id="${item.id}" type="button" class="btn btn-success"><i class="bi bi-check2-square"></i></button>
                    <button data-id="${item.id}" type="button" class="btn btn-primary"><i class="bi bi-pencil-square"></i></button>
                    <button data-id="${item.id}" type="button" class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
                </div>
        </div>
    </div> 
    `;
    
        // Agregar elemento de tarea al contenedor
        tarea.appendChild(itemTarea)
    });

    // Actualizar información sobre las tareas
    const TotTareas = tareas.length;
    Total.textContent = `Total de Tareas: ${TotTareas}`;
    const TaCompletadas = tareas.filter(item => item.estado === true).length;
    Completadas.textContent = `Tareas Completadas: ${TaCompletadas}`;
    const TaPendientes = tareas.filter(item => item.estado === false).length;
    Pendientes.textContent = `Tareas Pendientes: ${TaPendientes}`;
}

// Función para eliminar una tarea
function EliminarTarea(e) {
    if (e.target.classList.contains("btn-danger")) {
        // Obtener el ID de la tarea que se quiere eliminar
        const tareaID = Number(e.target.getAttribute("data-id"));
        // Filtrar las tareas para obtener un nuevo arreglo sin la tarea que se quiere eliminar
        const tareaN = tareas.filter((item) => item.id !== tareaID);
        // Actualizar el arreglo de tareas
        tareas = tareaN;
        // Mostrar tareas actualizadas
        mostrarHTML();
    }
}

// Función para completar una tarea
function CompletarTarea(e) {
    if (e.target.classList.contains("btn-success")) {
        // Obtener el ID de la tarea que se quiere marcar como completada
        const tareaID = Number(e.target.getAttribute("data-id"));
        // Cambiar el estado de la tarea con el ID correspondiente
        const tareaN = tareas.map((item) => {
            if (item.id === tareaID) {
                // Cambiar el estado de la tarea a su opuesto (completada o no completada)
                item.estado = !item.estado;
                return item;
            } else {
                return item;
            }
        });
        // Mostrar tareas actualizadas
        mostrarHTML();
    }
}

// Función para editar una tarea
function EditarTarea(e) {
    if (e.target.classList.contains("btn-primary")) {
        // Obtener el ID de la tarea que se quiere editar
        const tareaID = Number(e.target.getAttribute("data-id"));
         // Encontrar la tarea en el arreglo de tareas
        const tareaEditar = tareas.find(item => item.id === tareaID);

        // Solicitar al usuario un nuevo nombre para la tarea
        const nuevoNombre = prompt("Ingrese el nuevo nombre de la tarea:", tareaEditar.tarea);
        // Verificar si el usuario ingresó un nombre nuevo y no canceló la operación
        if (nuevoNombre !== null) {
            // Actualizar el nombre de la tarea
            tareaEditar.tarea = nuevoNombre;
            // Mostrar tareas actualizadas
            mostrarHTML();
        }
    }
}
