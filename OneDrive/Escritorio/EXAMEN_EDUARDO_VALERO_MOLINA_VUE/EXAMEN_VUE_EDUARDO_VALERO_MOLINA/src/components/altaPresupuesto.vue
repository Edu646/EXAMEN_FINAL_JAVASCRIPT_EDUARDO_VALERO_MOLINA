<script setup>
import { ref, computed } from 'vue';


const presupuestos = ref([]);
const newpresupuestos = ref('');
const maquina = ref('desconocida');
const url = ref("https://jsonplaceholder.typicode.com/users/1/");
const estadomaquina = ref('baja')


fetch('https://jsonplaceholder.typicode.com/users/1/')
  .then((response) => response.json())
  .then((json) => console.log(json));

// Computed para contar y filtrar tareas completadas
const completedpresupuestos = computed(() => presupuestos.value.filter(presupuestos => presupuestos.completed));
const pendingpresupuestos = computed(() => presupuestos.value.filter(presupuestos => !presupuestos.completed));


const addTask = async () => {
  if (newpresupuestos.value.trim() !== '') {
    presupuestos.value.push( {
        id: url.value,
      text: newpresupuestos.value,
      completed: false,
      fecha_alta: newpresupuestos.value,
      Maquina: maquina.value,
      estado: estadomaquina.value
    });
    newpresupuestos.value = '';
  }
};

// Eliminar tarea de Firebase
const removeTask = async (id) => {
   delete(( presupuestos.id));
};

// Marcar tarea como completada en Firebase
const toggleTask = async (presupuestos) => {
  update((presupuestos.id)), {
    completed: !task.completed
  };
};

// Actualizar prioridad en Firebase
const updatePriority = async (presupuestos) => {
   update(( presupuestos.id), {
    maquina: presupuestos.maquina
  });
};

const updateestado = async (presupuestos) => {
    update(( presupuestos.id), {
    maquina: presupuestos.estadomaquina
  });
};
</script>

<template>
  <div>
    <h2>Lista de reparaciones</h2>
    <p>Total de reparaciones: {{ presupuestos.length }}</p>
    <p>reparaciones completadas: {{ completedpresupuestos.length }}</p>
    

    <input v-model="newpresupuestos" placeholder="Agregar nueva tarea" @keyup.enter="addTask" />
    <select v-model="maquina">
      <option value="Microondas">Microondas</option>
      <option value="frigorifico">frigorifico</option>
      <option value="lavadora">lavadora</option>
      <option value="lavavagillas">lavavagillas</option>
    </select>
    <button @click="addTask">Agregar</button>

    <h3>reparaciones Pendientes</h3>
    <ul>
      <li v-for="presupuestos in pendingpresupuestos" :key="presupuestos.maquina">
        <span :class="{ completed: presupuestos.completed }" @click="toggleTask(presupuestos)">
          {{ presupuestos.text }} - maquina: {{ presupuestos.maquina }} - url {{ url.value }}
        </span>
        <select v-model="presupuestos.maquina" @change="updatePriority(presupuestos)">
     <option value="Microondas">Microondas</option>
      <option value="frigorifico">frigorifico</option>
      <option value="lavadora">lavadora</option>
      <option value="lavavagillas">lavavagillas</option>
        </select>

        <select v-model="presupuestos.estadomaquina" @change="updateestado">

            <option value="alta">alta</option>

            <option value="baja">baja</option>

        </select>
        <button @click="removeTask(presupuestos.id)">Eliminar</button>
      </li>
    </ul>

    <h3>reparaciones Completadas</h3>
    <ul>
      <li v-for="presupuestos in completedpresupuestos" :key="presupuestos.maquina">
        <span class="completed" @click="toggleTask(presupuestos)">
          {{ presupuestos.text }} - Prioridad: {{ presupuestos.maquina }}
        </span>
        <button @click="removeTask(presupuestos.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
div {
  text-align: center;
  margin-top: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

h3 {
  font-size: 20px;
  margin-top: 20px;
}

input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  font-size: 16px;
  margin: 5px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369b76;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 18px;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.completed {
  text-decoration: line-through;
  color: gray;
  cursor: pointer;
}
</style>
