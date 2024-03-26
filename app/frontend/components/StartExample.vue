<template>
    <div>
      <h1>Data from deleteDataFromBackend</h1>
      <div v-if="backendData.length > 0">
        <h2 v-for="{ title, id } in backendData" :key="id">
          {{ title }}
          <button @click="deleteDataFromBackend(id)">Удалить</button>
        </h2>
      </div>
  
      <div>
        <form @submit.prevent="sendDataToBackend">
          <div>
            <label for="sentData">Введите данные</label>
            <div>
              <input
                id="sentData"
                name="sentData"
                type="text"
                required
                v-model="sentData"
              />
            </div>
          </div>
  
          <div>
            <button type="submit">Отправить</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  const url_backend = "http://localhost:8080/api/data";
  const backendData = ref([]);
  const sentData = ref("");
  
  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch(url_backend);
      const data = await response.json();
      backendData.value = data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const sendDataToBackend = async () => {
    try {
      const response = await fetch(url_backend, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: sentData.value,
        }),
      });
      console.log(response);
      fetchDataFromBackend(); // Refresh data after sending new data
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  
  const deleteDataFromBackend = async (id) => {
    try {
      const response = await fetch(`${url_backend}/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.status === 200) {
        backendData.value = backendData.value.filter((item) => item.id !== id);
        console.log("Data deleted successfully");
      } else {
        console.log("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  
  onMounted(fetchDataFromBackend);
  </script>
  