# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.4](https://github.com/AysllaGomes/angular-components.github.io/compare/v0.1.3...v0.1.4) (2025-09-04)

### [0.1.3](https://github.com/AysllaGomes/angular-components.github.io/compare/v0.1.2...v0.1.3) (2025-09-04)

### [0.1.2](https://github.com/AysllaGomes/angular-components.github.io/compare/v0.1.1...v0.1.2) (2025-09-04)

### [0.1.1](https://github.com/AysllaGomes/angular-components.github.io/compare/v0.0.1...v0.1.1) (2025-09-04)

### 0.0.1 (2025-09-04)

## [0.1.0] - 2025-09-04
### Added
- **Stepper**: estados (ativo/feito/desabilitado), clique opcional, theming por CSS vars, modo compacto.
- **Table**: colunas declarativas, seleção por checkbox, ações (slot `appActions` e/ou `[actions]`), *chips*, células custom, vazio+loading (skeleton), **ordenação** por cabeçalho.
- **Pagination**: componente standalone (bolhas numéricas + setas), controlado por `total`, `pageSize`, `pageIndex`.
- **Toast**: serviço + container, variantes (success/info/warn/error), ação opcional, duração configurável.
- **Demo**: header com troca de tema (light/dark) e idioma (PT/EN), seções `#stepper`, `#table`, `#pagination`, `#toast`.
- **Docs**: README PT/EN; docs por componente (PT/EN).
- **Deploy**: GitHub Pages (roteamento SPA com fallback `404.html`), redirect para `/demo`.

### Changed
- Ajustes de estilo global (tokens para header, table, etc.).

### Fixed
- Base href e 404 de SPA para deep links em GitHub Pages.
