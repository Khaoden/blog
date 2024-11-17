---
title: 友情链接
layout: Layout
---

# 友情链接

<div class="friend-links">
  <div class="friend-link">
    <img src="/images/avatar.jpg" alt="好友名称">
    <div class="info">
      <h3>Khaoden</h3>
      <p>love life</p>
      <a href="https://github.com/Khaoden" target="_blank">GitHub</a>
    </div>
  </div>
</div>

<style>
.friend-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.friend-link {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background: #f5f5f5;
  transition: transform 0.3s;
}

.friend-link:hover {
  transform: translateY(-5px);
}

.friend-link img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.info h3 {
  margin: 0;
  color: #333;
}

.info p {
  margin: 5px 0;
  color: #666;
}

.info a {
  color: #3498db;
  text-decoration: none;
}

.info a:hover {
  text-decoration: underline;
}
</style>