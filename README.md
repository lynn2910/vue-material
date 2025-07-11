# Vue-Material

## Installation

### 1. Setup git

... 

### 2. GitHub Pages

Si vous souhaitez supprimer le système de déploiement sur GitHub Pages:
- Supprimez ".github/workflows/deploy-github-pages.yml"
- Supprimez la ligne suivante:
```ts
publicDir: process.env.NODE_ENV === 'production' ? '/vue-material' : '/'
```

Sinon, modifiez `"vue-material"` dans [`vite.config.ts`](vite.config.ts) et mettez le nom du dépôt Github.

Afin de déployez 