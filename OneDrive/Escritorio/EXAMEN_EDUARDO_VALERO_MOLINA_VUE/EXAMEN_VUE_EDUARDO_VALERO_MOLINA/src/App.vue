<script>

</script>

<template>
  <h1>Hello App!</h1>
 
  <nav class="navbar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
body {
  background: linear-gradient(to bottom right, #4facfe, #00f2fe);
  font-family: 'Arial', sans-serif;
  margin: 0;
  color: #fff;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align:start;
  margin-top: 50px;
  font-size: 3rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.navbar {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.navbar a {
  text-decoration: none;
  font-size: 1.2rem;
  color: #42b983;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 5px;
}

.navbar a:hover {
  background: #42b983;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.navbar a.router-link-exact-active {
  font-weight: bold;
  color: #fff;
  background: #42b983;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

main {
  padding: 40px;
  text-align: center;
  font-size: 1.5rem;
}
</style>
