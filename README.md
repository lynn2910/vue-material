# Vue-Material

## Installation

### 1. Setup git

...

### 2. GitHub Pages

Si vous souhaitez supprimer le système de déploiement sur GitHub Pages:

- Supprimez ".github/workflows/deploy-github-pages.yml"
- Supprimez la ligne suivante:

```ts
base: process.env.NODE_ENV === 'production' ? '/vue-material' : '/'
```

Sinon, modifiez `"vue-material"` dans [`vite.config.ts`](vite.config.ts) et mettez le nom du dépôt Github.

Afin de déployer l'application sur Github Pages, vous pouvez:

- Publier une release
- Activer manuellement le _workflow_; voir ci-dessous le bouton 'Run workflow' :
  ![deploy_pages_manual.png](doc-images/deploy_pages_manual.png)

---

## Todo list

### Inputs

- [x] Buttons
- [x] Sliders
- [x] Checkbox
- [x] Radio button
- [x] Switch
- [x] Chips
- [x] Text fields
- [ ] _Date pickers_
- [ ] _Time pickers_

### Navigation

- [x] Navigation bar & rail (rework)
- [x] Tabs
- [ ] App bars
- [ ] Bottom sheets
- [ ] Side sheets
- [ ] Full-view sheets

### Interactions

- [ ] Menus
- [ ] Dialogs
- [ ] FAB menu
- [ ] Button groups
- [ ] Toolbars
- [ ] Tooltips
- [ ] Split buttons

### Elements visuels

- [ ] Carousel
- [ ] Lists
- [ ] _Data table_ (n'existe pas dans la documentation Material)
- [ ] _Graphiques_
- [ ] _Search_ (pas besoin dans l'immédiat)