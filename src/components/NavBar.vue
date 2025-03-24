<script setup>
import MapLocationIcon from '@/components/Icon/MapLocationIcon.vue'
import GithubIcon from '@/components/Icon/GithubIcon.vue'

const NavbarItems = [
  { name: '地圖主頁', url: '/' },
  { name: '比較表格', url: '/comparsion' },
]
</script>

<template>
  <nav class="navbar">
    <!-- nav 標題 -->
    <h1 class="navbar-title">
      <MapLocationIcon size="1.5rem" />
      地圖套件比較
    </h1>
    <!-- nav 欄位 -->
    <div class="navbar-list">
      <!-- 內部連結 -->
      <ul class="navbar-list__item">
        <li v-for="item of NavbarItems" :key="item.name">
          <RouterLink :to="item.url" class="navbar-list--link">
            {{ item.name }}
          </RouterLink>
        </li>
      </ul>
      <!-- 外部連結 -->
      <ul class="navbar-list__connect">
        <li>
          <a
            href="https://github.com/alex7008uk/Web-Mapping-Libraries-Comparsion"
            target="_blank"
            class="navbar-list--link"
          >
            <GithubIcon size="1.35rem" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  padding: 1.1rem 13rem;
  background-color: #2f6279;
  display: flex;
  justify-content: space-between;
}

.navbar-title {
  margin: 0;
  color: #f0f0f0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: default;
}

.navbar-list {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.navbar-list__item {
  display: flex;
  gap: 4rem;
  padding-right: 2.5rem;
  border-right: 0.13rem solid #cccccc91;
}

.navbar-list--link {
  padding: 0.16rem 0;
  text-decoration: none;
  color: #f0f0f0;
  font-size: 1.2rem;
  display: flex;
}

.navbar-list--link:hover {
  opacity: 0.7;
}

:deep(.router-link-exact-active) {
  font-weight: bold;
  border-bottom: 0.18rem solid #f0f0f0;
}
</style>
