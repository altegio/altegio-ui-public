# 🚀 Release Notes

## 1.135.0 (2026-09-17)


### Features

* **core:** RND-978 управляемый проп `locator` у всех 75 компонентов — `data-locator` больше не затирается именем тега (ec35559)
* **core:** RND-978 декоратор `withLocator` — единый контракт `locator || уже выставленный data-locator || имя тега` (ec35559)
* **core:** RND-978 единые имена атрибутов вложенных локаторов — `locator-label`, `locator-error`, `locator-clear-icon` (ec35559)


### Bug Fixes

* **core:** RND-978 ложный ненулевой exit code у `make test-unit` при нуле упавших тестов (ec35559)
* **core:** RND-978 недействующий `reflect` у `locator` в `SegmentOption` (ec35559)
* **core:** RND-978 демо-значения локаторов `TextField` совпадали с именами атрибутов (ec35559)


### BREAKING CHANGES

* **core:** удалены атрибуты `label-locator`, `error-locator` (`y-core-textarea`) и `clear-icon-locator` (`y-core-text-field`) — вместо них `locator-label`, `locator-error`, `locator-clear-icon`. Потребителей на момент удаления не найдено (ec35559)
* **core:** у `y-core-segment-option` внутри `y-core-segment-control` дефолтный `data-locator` изменён с `y-core-segment-option` на `segment_option_<value>`. У остальных 74 компонентов дефолт по имени тега сохранён

## 1.134.1 (2026-06-15)


### Bug Fixes

* add border-box to collapse item activator to prevent host overflow (3e44884)

# [1.134.0]

* new features 23.03.2026

## [1.132.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.132.1...v1.132.2) (2025-10-02)


### Bug Fixes

* **countField:** PFW-1651 убирает эмит input ([8a39aff](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8a39affbaac47d4ce744b5523575bbd7318c1a25))

## [1.132.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.132.0...v1.132.1) (2025-10-01)


### Bug Fixes

* добавление render функции в FieldInput, что-бы хук рендера вызывался ([1188b2a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1188b2a984c384c5af1799f5e0ffa589a26ed5f4))

# [1.132.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.131.1...v1.132.0) (2025-10-01)


### Features

* **SearchTextHighlighted:** PFW-1686 Добавляет новое свойство caseSensitive в компонент ([ea0b64c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ea0b64c657af6d12fcc9cdbdf9ffae5a0f9f65c2))

## [1.131.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.131.0...v1.131.1) (2025-09-29)


### Bug Fixes

* **SentryPlugin:** добавлено логирование при установке плагина Sentry ([cfbd551](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cfbd551c5fde0e5222b864b9e08630af52beb40a))

# [1.131.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.130.0...v1.131.0) (2025-09-29)


### Bug Fixes

* **package.json:** изменяет порядок экспортов ([5ace6cd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5ace6cdd03d9dffb2a95eb28e9c977f41e127ad6))


### Features

* **GlobalProvider:** добавлен новый экспорт для глобального провайдера в package.json ([88e92bd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/88e92bdc5b30c956bb58a2db05a37ada50ad171e))

# [1.130.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.129.0...v1.130.0) (2025-09-29)


### Features

* **Collapse:** NW-6172 добавлен drag&drop сквозь уровни вложенности ([88f1977](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/88f1977b054bb59ab80fb01d5aa0fbe8d6984d64))

# [1.129.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.128.0...v1.129.0) (2025-09-26)


### Features

* **CountField:** PFW-1642 Перевод CountField на ControlValueAccessor ([7f95612](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7f956129728c9f1b611c5f6e250c2a6e43dd13bc))

# [1.128.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.127.0...v1.128.0) (2025-09-26)


### Features

* **CountField:** PFW-1648 Перевод Toggle на ControlValueAccessor ([c3f8e70](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c3f8e70dc7d4ab18ff99137d66911252484e470f))

# [1.127.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.126.5...v1.127.0) (2025-09-26)


### Features

* PFW-1649 перенос ангуляр обертки TextField на ControlValueAccessor interface ([65d5948](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/65d594888319eba96f937a437b380bbd66f1e382))
* PFW-1664 перенос SimpleRadioButton на ControlValueAccessor interface ([7966a91](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7966a91af213b975afa55da57fad9b5bce364b09))

## [1.126.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.126.4...v1.126.5) (2025-09-24)


### Bug Fixes

* **CollapseItem:** PFW-1652 Добавлен RAF для предотвращения зацикливания... ([885eefd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/885eefdcc898c3e161820d6a89516aaa132f2fd7))

## [1.126.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.126.3...v1.126.4) (2025-09-22)


### Bug Fixes

* **collapse:** Откатывает изменения расчета динамической высоты ([b55d607](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b55d607fcbad628a1f116ad1ec7357a87f9862b7))

## [1.126.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.126.2...v1.126.3) (2025-09-18)


### Bug Fixes

* **Tooltip:** добавляет свойство word-break для корректного отображения текста в подсказках ([1da3024](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1da30245aff618e3dbf180c0977c801a8bf6186a))

## [1.126.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.126.1...v1.126.2) (2025-09-17)


### Bug Fixes

* **angular-build:** Добавляет минификацию кода ([38ce047](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/38ce047fded94e35dbba0d1952eb003bb8328152))

## [1.126.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.126.0...v1.126.1) (2025-09-17)


### Bug Fixes

* PFW-1626 удаление события клика, так как оно конфликтовало с нативным + фикс зависимостей ангуляра ([a5cdb6d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a5cdb6d58cb251e06b7a89cca8e67910484bad64))

# [1.126.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.125.3...v1.126.0) (2025-09-16)


### Bug Fixes

* **Checkbox:** PFW-1459 Исправляет баги в ng обертке чекбокса и добавляет defineCustomElement ([fbfa1b2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fbfa1b237b694eede9367a00d27a8593fa2b7d2e))


### Features

* **Tag:** PFW-1457 Добавляет defineCustomElement ([9b67d45](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9b67d458a9f5f4a11964a90eae24705a488927cb))

## [1.125.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.125.2...v1.125.3) (2025-09-15)


### Bug Fixes

* **tests:** Исправляет тесты ([978f139](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/978f139c2266dd72e1c3b8bafe42d9766fb9d4bc))

## [1.125.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.125.1...v1.125.2) (2025-09-12)


### Bug Fixes

* **searchField:** поправил экспорт типов в searchField.vue ([f518888](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f5188885d4005c0ee46be5acd143bbe213949525))

## [1.125.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.125.0...v1.125.1) (2025-09-11)


### Bug Fixes

* **CollapseItem:** PFW-1604 Добавлена обработка динамической высоты контента ([4f886cd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4f886cdab08f8476b7d2960a36987e6be2486fa9))

# [1.125.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.124.2...v1.125.0) (2025-09-09)


### Features

* **Tabs:** PFW-1445 Добавляет tabs ([cf4b67e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cf4b67eca60f09b9e556f0ad465c08e3cf1f14fe))
* **YBrandButton:** VK-855. добавил css тесты ([6725049](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/67250496c30829d9a3a26a3fe3aa8c1e8975fed8))

## [1.124.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.124.1...v1.124.2) (2025-09-05)


### Bug Fixes

* **YFunctionalModal:** PFW-1606 исправление vue warning non-props attributes (class) ([019960c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/019960cb2490c39b598813a4b25310eadf24c044))

## [1.124.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.124.0...v1.124.1) (2025-09-05)


### Bug Fixes

* **sentry:** Исправляет логирование сентри ошибок перед отправкой ([29db502](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/29db502ed3bafa6bb0a76c0414125b2210a8f08c))

# [1.124.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.123.0...v1.124.0) (2025-08-29)


### Features

* **ButtonDropdownStory:** PFW-1505 ([1448120](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/14481209be8cd622f5a295f370e06e64a91bd8b8))

# [1.123.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.122.1...v1.123.0) (2025-08-29)


### Features

* **fix:** Добавляет публикацию в npm ([b2587f7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b2587f70677fdf7d2eab6708e2513ad385fbd828))

## [1.122.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.122.0...v1.122.1) (2025-08-29)


### Bug Fixes

* **collape:** PFW-1523 Добавляет оптимизации ([f99e947](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f99e94740c60b17d03ae5c8509090caa60153ec7))
* **imports:** PFW-1533 Исправляет re-export типов ([3c93022](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3c93022501e1023ddea0984ae3c91526fb06e971))

# [1.122.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.121.8...v1.122.0) (2025-08-25)


### Features

* **Buttons:** PFW-1347 добавляет outline-filled и убирает secondary variants ([b06c550](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b06c5501cb7420969f6d32e48fde90ccf826ce9b))

## [1.121.8](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.121.7...v1.121.8) (2025-08-22)


### Bug Fixes

* **angular:** Исправляет сборку ([d8e81f7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d8e81f770c43c99fa7870bd00947c1fce91ed34f))
* **button:** Добавляет css переменные для иконок ([ce35b2b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ce35b2beb8fce3e0d17b701a62946c42923b1373))

## [1.121.7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.121.6...v1.121.7) (2025-08-20)


### Bug Fixes

* **storybook:** build ([a29a91f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a29a91f29a1e3cde6307fd391d3b2fc64d8cf74a))

## [1.121.6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.121.5...v1.121.6) (2025-08-20)


### Bug Fixes

* (angular): Добавляет инициализацию чекбокса ([87a6399](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/87a63991d65c3848f026631efc61d31175e275a0))

## [1.121.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.121.4...v1.121.5) (2025-08-19)


### Bug Fixes

* **angular:** Исправляет сборку ([678be9a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/678be9aa4ef7ece9b78955d8377423f0345a0e57))

## [1.121.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.121.3...v1.121.4) (2025-08-19)


### Bug Fixes

* **angular-build:** Прокидывает атрибуты для кнопки ([1f90fba](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1f90fba15c30eb2432cc564c440507d82019d8d5))

## [1.121.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.121.2...v1.121.3) (2025-08-19)


### Bug Fixes

* **CardWrapper:** PFW-1440 Вносит Css правки связанные с border ([f496c11](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f496c112399565ca93106fecfa517c4ebfd150d0))

## [1.121.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.121.1...v1.121.2) (2025-08-18)


### Bug Fixes

* **angular-build:** Исправляет обработку css классов ([15b598f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/15b598f5786a0f235ec7472477b5050efae50151))

## [1.121.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.121.0...v1.121.1) (2025-08-18)


### Bug Fixes

* **angular-build:** Исправляет сборку для ангуляра ([cc0a084](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cc0a0848652c20490acfe8f0be99f762345f4354))

# [1.121.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.120.1...v1.121.0) (2025-08-18)


### Features

* **Tab:** PFW-1442 добавляет обертки Vue/Ng для Core/Tab ([3127692](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3127692ca5ed3d709da30e4937ff4d5f5bdb9e2e))

## [1.120.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.120.0...v1.120.1) (2025-08-15)


### Bug Fixes

* **select:** исправляет ошибки select ([b6c5016](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b6c5016f981676025ce682c6d0fb301f9f202920))

# [1.120.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.119.0...v1.120.0) (2025-08-15)


### Features

* **globalProvider:** [PFW-1423] - Исправить GlobalProvider props ([3cf9230](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3cf92302e49c59b0edfd7d9f0524aa7f705654b7))
* **YBrandButton:** VK-852. Добавил бренд кнопку в core ([f58a680](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f58a68029205f4ac54b123d2e0e77ac1844947e6))

# [1.119.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.118.0...v1.119.0) (2025-08-07)


### Bug Fixes

* **PFW-1343:** Костыль над collapse ([d7dfc6a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d7dfc6a8a4bbe0f48a58fe2ef1261e9b3820ba7f))


### Features

* **text:** PFW-1454 Добавляет prop locator ([d921963](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d921963003f9579862192db93294cdcae5e183b9))

# [1.118.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.117.2...v1.118.0) (2025-08-06)


### Features

* **modal:** PFW-1390 добавляет функционал телепорта для vue обертки ([5692787](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5692787bd8f51ba975458173f7e7cb6af80ba3c2))

## [1.117.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.117.1...v1.117.2) (2025-08-04)


### Bug Fixes

* Экспортированы типы для toggle ([54ac6d7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/54ac6d7f4f0b30b15a0c9b05e4e3854e61a2dcf2))

## [1.117.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.117.0...v1.117.1) (2025-08-04)


### Bug Fixes

* **AutocompleteField:** PFW-1429: фикс компонента перед карантином ([8ee1b52](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8ee1b52ee2dd839bd6c1c50a09367d33a389a87f))

# [1.117.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.116.3...v1.117.0) (2025-08-01)


### Features

* **storybook:** Переиспользует фрагменты истории ([fb02e38](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fb02e388f1d7bfcc8ff516b0fe6c156b77df8726))
* **tokens:** обновляет токены ([399de60](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/399de60a2f1859f562346e67ebb58b007e3e7205))

## [1.116.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.116.2...v1.116.3) (2025-07-31)


### Bug Fixes

* **events:** PFW-1366 убирает из перехвати события навигации ([b6b301c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b6b301cb6a46ca3d5d60e0c5914ae81199f750b0))

## [1.116.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.116.1...v1.116.2) (2025-07-31)


### Bug Fixes

* **FunctionalModal:** PFW-1452: [FRONT] Добавить слот header-media в компонент FunctionalModal ([5e6b69e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5e6b69ed3c5346b36dbfbd3502d385dc0806576d))

## [1.116.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.116.0...v1.116.1) (2025-07-29)


### Bug Fixes

* **AutocompleteField:** PFW-1427: [FRONT] Autocomplete unit/css тесты ([934adf4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/934adf47ecb8325668c05f9edb6fcfb1cfc7cbd1))

# [1.116.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.115.0...v1.116.0) (2025-07-29)


### Features

* **AutocompleteField:** PFW-1426 - [FRONT] Vue/ng обертки для компонент Autocomplete ([bcb032c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/bcb032c7cd5019d1605e64930e83f9c6a63d3d95))

# [1.115.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.114.0...v1.115.0) (2025-07-25)


### Bug Fixes

* **segmentControl:** PFW-1438 убирает всплытие клика с обертки ([805e82c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/805e82cc535e94baa4027db73ffb06152eb23593))


### Features

* **dropdownCell:** PFW-1454 добавляет динамический data-locator ([51e3223](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/51e3223ac8f4ba3a327f1ca2b28b4fb3551985f3))
* **PFW-1019:** Перенесены синхронизированные цвета, фикс таблицы ([4c21384](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4c2138429c248f50affcf1d9bc4acc36d2d280a1))

# [1.114.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.113.0...v1.114.0) (2025-07-23)


### Features

* **AutocompleteField:** PFW-798: [STORY][FRONT] Компонент Autocomplete core ([ea077a7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ea077a7498bac92e026580fe38ffd2dfd60f8aaa))

# [1.113.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.112.0...v1.113.0) (2025-07-18)


### Bug Fixes

* **buttonDropdown:** PFW-1419 фиксит fullWidth ([e783193](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e7831937304a7c17c1445a65335badc50c8cde58))


### Features

* **MultipleSelectField:** PFW-1226: [FRONT] - CSS/Unit тесты для MultipleSelectField ([683e06f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/683e06ffffefa25acb45be262a41d235e8cbdbb1))

# [1.112.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.111.0...v1.112.0) (2025-07-17)


### Features

* **package.json:** Обновляет зависимости ([888b89f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/888b89fcb48d97d3f674cdb8c94821f1b5f9451c))

# [1.111.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.110.0...v1.111.0) (2025-07-17)


### Features

* PFW-842 Удаление атомарности из Core ([912f1bc](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/912f1bc81a007a40425550d7c73224075ef3eae1))

# [1.110.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.109.2...v1.110.0) (2025-07-14)


### Features

* **Avatar:** PFW-954: [FRONT] Перенести компонент Avatar на размерные токены ([b3e76d5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b3e76d5bcbb5ff471650b7f6a14848679290d540))
* **tokens:** обновляет токены ([365fa23](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/365fa2333b56eb52fdde3c585a702c2c467ca6f2))

## [1.109.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.109.1...v1.109.2) (2025-07-14)


### Bug Fixes

* **Collapse:** Добавил эмит события drag-start для touch событий ([f53c869](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f53c8695d1a5299244791757b1681287ddc3fe16))

## [1.109.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.109.0...v1.109.1) (2025-07-11)


### Bug Fixes

* **touchEvents:** добавил таймаут для драга, чтоб работал скролл для touch устройств ([49a1c4a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/49a1c4ae02e369f44a9c42847e1a1603c39282b3))

# [1.109.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.108.7...v1.109.0) (2025-07-10)


### Bug Fixes

* **components:** Переносит логику инициализации с firstUpdated на connected ([cc4aea7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cc4aea7c2c517d6e72f8d8f3cf67cf685aeb7a2f))


### Features

* **SelectField:** PFW-813: [FRONT][TEST-CSS] - Покрыть css / unit тестами Select ([19fde12](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/19fde125aae1866c333f099e3947b559475689ba))
* **tokens:** обновляет токены ([5d6834b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5d6834b53d6164e86a5d31b315a08fe4a83127ba))

## [1.108.7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.108.6...v1.108.7) (2025-07-10)


### Bug Fixes

* **Dragging plugin:** Добавил touch события в таблицу ([d4b7b86](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d4b7b86ace32386288cd551e92bc13ac8a016173))

## [1.108.6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.108.5...v1.108.6) (2025-07-10)


### Bug Fixes

* **Collapse:** Добавляет поддержку Touch events для drag/drop ([8fb861f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8fb861fd9cc7fa83138846b2eb2047a5c6bbfb21))

## [1.108.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.108.4...v1.108.5) (2025-07-09)


### Bug Fixes

* **locales:** PFW-1270 Добавляет импорт локалей ([53673b9](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/53673b93a350b817a7c58b79cb7f1f2d332d78bf))
* PFW-1262 Придумать реализацию статусов для историй сторибука ([9fa1701](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9fa1701f4b775822e51f2a3e66ede1c519d3cd2c))

## [1.108.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.108.3...v1.108.4) (2025-07-08)


### Bug Fixes

* **YButton:** OP-2860 Исправление растягивания YButton в biz.erp ([f16d709](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f16d709a21388f7712b4c1e891bffb03e99e75bc))

## [1.108.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.108.2...v1.108.3) (2025-07-08)


### Bug Fixes

* **CollapseItem:** PFW-1323 Исправляет пересчет высоты контента при открытии ([2e98115](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2e98115fffd79e9a995e281539d90d852d381ff6))

## [1.108.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.108.1...v1.108.2) (2025-07-04)


### Bug Fixes

* **Dropdown:** PFW-1323 - удаляет лишние вычисления ([d5efa58](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d5efa5847ffdf66685204abe3003985298a6f590))

## [1.108.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.108.0...v1.108.1) (2025-07-03)


### Bug Fixes

* **release:** Создание feature каналов ([c3b6eaa](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c3b6eaa20e23d971d0c5d0494c14d7fdab576f74))

# [1.108.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.107.0...v1.108.0) (2025-07-03)


### Features

* PFW-842 Удаление атомарности из Vue ([68a6cf5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/68a6cf5db7ca5eb003c55b5b997309869dc0aa1c))

# [1.107.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.106.0...v1.107.0) (2025-07-03)


### Features

* **YFunctionModal:** OP-2812 Доработки YFunctionalModal для OP-2812 ([594d667](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/594d667ae2d52fbebdbbe4238be247501199bb68))

# [1.106.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.105.0...v1.106.0) (2025-07-03)


### Bug Fixes

* **YEmptyState:** Делает title vue компонента YEmptyState  опциональным ([05fa36d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/05fa36d8438550449a65713dc20a79f49f41f7e5))
* добавление зависимости стилей выравнивания от родителя, что-бы починить центрование календаря ([49f6a61](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/49f6a6116740c171bb1cb875e7bb87c73e47cf4c))


### Features

* **icons:** обновляет иконки ([a618899](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a618899ced6d3ec0fdfc56eab7511a19c5d5f8ca))
* PFW-842 Удаление атомарности из Angular ([d5f8b22](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d5f8b22afdba44dc933f3b8916cdf6e3a2d83913))
* **PhoneField:** PFW-1326 добавляет локализацию стран ([69b49c7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/69b49c7be31b9bd5ac1f80ecac5a018139fdd1fa))
* **tokens:** обновляет иконки ([157b75f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/157b75f9f463b5f2bf95070253d363c24b3f0f4e))

# [1.105.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.104.0...v1.105.0) (2025-07-01)


### Bug Fixes

* **Table:**  Добавляет rowId для Dragging плагина ([120ad51](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/120ad51f97a2151edcf19c00f11991defb07b33f))


### Features

* **hooks:** PFW-1320 Добавляет prepush хук ([2852c8d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2852c8db9dd954248ec854280e2245522dbfd606))
* **Table:** PFW-1266 Правки и улучшения по таблицам ([7eeb641](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7eeb641f46f63fc1cd63528e4da618ecc6752f8f))

# [1.104.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.103.0...v1.104.0) (2025-07-01)


### Bug Fixes

* фикс пропсов segmentControl и фикс цветов, для более приятного UX ([094e535](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/094e535857db9fa0e8a38d57aac7243c10ea74a0))


### Features

* PFW-1356 Добавляет необходимые стили, слоты и иконку для перехода... ([4384202](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/438420213b92ba3f4d09ba495fff2a0795ddacd9))
* **stories:** PFW-1321 Выводит компоненты из карантина ([2f35197](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2f35197b8aa10b26c4d045fbb24626790cf7fd74))

# [1.103.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.102.0...v1.103.0) (2025-06-26)


### Features

* **YDropdownCell:** OP-2816 Добавлено скрытие слота append если там нет контента ([1ce0df9](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1ce0df92106084d20b379e85513821e3b4d0dc9f))

# [1.102.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.101.0...v1.102.0) (2025-06-25)


### Bug Fixes

* **CollapseItem:** PFW-1323 Добавляет состояние loading в CollapseItem ([c993c05](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c993c0539f042d6f42386d69cd1d7d629cca06f0))


### Features

* **locators:** PFW-1364 добавляет локаторы компонентам ([4f7b6e9](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4f7b6e9ee3ae8d83a062145d3f47f0512b70581e))

# [1.101.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.100.0...v1.101.0) (2025-06-25)


### Features

* **YIcon:** OP-2816 Добавлены иконки yCrown и ySend ([42a7295](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/42a7295205c19c3a35efc6da921ea6e0368f1091))

# [1.100.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.99.1...v1.100.0) (2025-06-24)


### Features

* **ButtonDropdown:** OP-2816 Добавить в ButtonDropdown prop autoClose ([0f130f6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0f130f619d67c3d5c4e25a7473e81c82f7400b75))
* **ButtonDropdown:** OP-2823 Добавить в ButtonDropdown slot="activator" ([4429bd2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4429bd2b7f29b56d8bd24ab714c0651052903659))

## [1.99.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.99.0...v1.99.1) (2025-06-23)


### Bug Fixes

* **host:** PFW-1324 добавление display:block в host стили ([8106c88](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8106c88410adbc244131ba0342c052f252191135))
* **MultiSelectField:** PFW-1308 Правки логики тогла ([f541e8b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f541e8b2c96746e79b96e532c395addc2d093e38))

# [1.99.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.98.2...v1.99.0) (2025-06-23)


### Features

* **Tag, Icon:** OP-2791 Карантин YTag, YIcon ([a64468c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a64468cd5f5f41544543f411358cb6538dea072d))

## [1.98.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.98.1...v1.98.2) (2025-06-20)


### Bug Fixes

* **Label:** Правки label slot ([b4af659](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b4af659ca2b73551b81719d2e7853a217581c63a))

## [1.98.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.98.0...v1.98.1) (2025-06-19)


### Bug Fixes

* **Tooltip:** Правки доступности слота ([4a13afb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4a13afbca06527d94d8806cc49d6043a6041560f))

# [1.98.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.97.0...v1.98.0) (2025-06-19)


### Bug Fixes

* **selectField:** PFW-1324 Фиксы для задачи, которые обязательно нужны будут перед тем, как лить в прод ([4a38208](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4a382089979832abc392e57cb00c012a9ef20e4b))


### Features

* **Collapse:** Добавляет полноценную поддержку вложенных Collapse ([005a3ff](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/005a3ff9000b7fbedc54696e556c8707d31e2bda))
* **Table:** PFW-1323 Перетаскивание строк между таблицами ([286ce39](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/286ce39fd826ed7059e2c1c298f135b8740be857))
* **YIcon:** OP-2792 Добавлены иконки YSearchCross и yTrianglePlus ([e9ac3bf](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e9ac3bf189752187e88c9edae99335e45a36189a))

# [1.97.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.96.1...v1.97.0) (2025-06-18)


### Bug Fixes

* **Dragging:** Добавляет экспорт плагина Dragging ([c97206e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c97206ebe7c088aa365e415898f5019cc4baf940))


### Features

* **Tag:** OP-2791 Для Tag добавлено white-space: nowrap; ([58cab3c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/58cab3c40d3d5d63f8ad333a5367a292b1358328))

## [1.96.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.96.0...v1.96.1) (2025-06-18)


### Bug Fixes

* **Dragging:** Добавляет экспорт плагина Dragging ([1e1944b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1e1944ba0a82014f675ca4b8e6a89e8bb19976b3))
* **fieldInput:** PFW-1313 границы FieldInput через box-shadow ([b197775](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b197775f6fac1530e08df74935c261a447a8dc98))

# [1.96.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.95.0...v1.96.0) (2025-06-17)


### Bug Fixes

* **cardButton/cardSelect/cardIcon:** переносит cardButton, cardIcon и cardSelect в ready ([93f440f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/93f440f9e57d39c6a1913dbd63bae575efeb07ee))


### Features

* **FunctionalModal:** PFW-1246 Убрана текстовая обертка со слота content;... ([bcb7384](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/bcb73845efb25ff9bd77da396d3bec27d478afdb))

# [1.95.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.94.2...v1.95.0) (2025-06-12)


### Bug Fixes

* **imports:** PFW-1128 Убирает core компоненты из vue импортов ([5b481d2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5b481d226275a2c0de2becf7fc46cbbacd07505a))
* **YSearchField:** PFW-1323 добавляет экспорт vue обертки YSearchField ([7af0847](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7af0847c9c5a5ed170727d9aba8661c87941cf5c))


### Features

* **sentry:** PFW-1154 Исправляет фильтрацию sentry ошибок ([f5a7e3a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f5a7e3ae9ca10e26fcb78295d4fd702b02cf0ee9))

## [1.94.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.94.1...v1.94.2) (2025-06-11)


### Bug Fixes

* **FieldWrapper:** PFW-1221: [FRONT] - CSS/Unit тесты для FieldWrapper ([46dd22c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/46dd22ca7397128c3bb5efad4a2bea92987749b1))

## [1.94.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.94.0...v1.94.1) (2025-06-11)


### Bug Fixes

* **FieldWrapper:** PFW-1221: [FRONT] - CSS/Unit тесты для FieldWrapper ([436f72b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/436f72b57a63492dab2d153df2d581ad3c9e3696))

# [1.94.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.93.1...v1.94.0) (2025-06-11)


### Features

* **PFW-1246:** Добавлен метод скролла контента наверх, исправлен fullScreen ([3efc9ba](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3efc9ba7a18d9461b3e5d7a67db5dce9cb651c10))

## [1.93.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.93.0...v1.93.1) (2025-06-10)


### Bug Fixes

* **CardSelect, CardButton:** PFW-1271 Исправляет передачу контента в слоты before и after ([dbde451](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/dbde451120fe8b80c5e9c5434bb0c82e07398272))
* **types:** Исправляет vue типы ([092a2dd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/092a2ddf7764beba37427e0fe4f68e987a9d2025))

# [1.93.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.92.2...v1.93.0) (2025-06-10)


### Features

* **vue-tsc:** PFW-1338 Добавляет vue-tsc ([cbd0299](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cbd02990f02b1e0946a967a22274495075e1b0ea))

## [1.92.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.92.1...v1.92.2) (2025-06-10)


### Bug Fixes

* **RadioButton:** PFW-1232 фикс типизации для карантина ([75e39aa](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/75e39aaac10af7a4c129d7c53e841ab1718bc185))

## [1.92.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.92.0...v1.92.1) (2025-06-09)


### Bug Fixes

* **FunctionalModal:** PFW-1246 Правки ширины и исправлен баг анимации ([2e79cd6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2e79cd654a9c962c33ece3c3bb2f11f5d0ac0097))

# [1.92.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.91.4...v1.92.0) (2025-06-09)


### Features

* **CountField:** PFW-1243 Добавляет CountField в карантин ([e127c0f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e127c0f1c1557309667c72882dcfeb27d5a583f9))

## [1.91.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.91.3...v1.91.4) (2025-06-09)


### Bug Fixes

* **PhoneField:** PFW-949 фикс фокуса при очистке поля ([4f9e71f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4f9e71fa5346f8ed616400db412ce87f2667dadc))

## [1.91.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.91.2...v1.91.3) (2025-06-06)


### Bug Fixes

* **actions:** PFW-964 Добавить angular actions для сторибука ([74596d5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/74596d5a31fd8bbd58febf5086f346cc7d8607ee))
* **defaultValue:** PFW-1300 Пересмотреть реализацию функциональности DefaultValue декоратора ([6de031b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6de031bc0463a369d35443c19383cbaa92338f3c))

## [1.91.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.91.1...v1.91.2) (2025-06-06)


### Bug Fixes

* **CountField:** Добавляет поддержку keep-alive ([1a41736](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1a417360340c31b7c55e18697ee3d64840d47e00))

## [1.91.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.91.0...v1.91.1) (2025-06-06)


### Bug Fixes

* **textarea:** Добавляет скроллбар ([6e7934e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6e7934e2316847888c552da83d5da894e96d4bf2))

# [1.91.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.90.0...v1.91.0) (2025-06-06)


### Features

* **FunctionalModal:** PFW-1241 Добавлена логика обновления слотов, работа с... ([d7066ae](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d7066ae91f1aa7fc4478df10be8a328a28a3ec7f))

# [1.90.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.89.0...v1.90.0) (2025-06-06)


### Features

* **CountField:** Добавляет поддержку числовых типов во Vue обертку ([8a8bfd8](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8a8bfd8eddec627d994d9bc3a8bacaf7ba6c2b6d))
* **FunctionalModal:** PFW-1241 Добавлена логика обновления слотов, работа с... ([bc03be0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/bc03be0925b70b266676b1783cd17ab80a71e774))

# [1.89.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.88.5...v1.89.0) (2025-06-05)


### Bug Fixes

* **CountField:** PFW-1315 Вносит исправления по тестированию компонента CountField ([9154ad0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9154ad0d6bf3616d4bc4a2518597fcc535d11917))


### Features

* **CountField:** PFW-1219 Добавляет Unit/CSS тесты ([f7a1d30](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f7a1d3007e41b25ad6335451b2713aabbd92273e))
* **EmptyState:** из карантина в ready ([40492c6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/40492c6fdcfe5c0472b88376abe90b8cafed995b))

## [1.88.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.88.4...v1.88.5) (2025-06-05)


### Bug Fixes

* **CardWrapper:** PFW-1217 чинит скругления карточки (рамки через box-shadow) ([3f4334e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3f4334e3e0f9d5154e73fb378814799558a56e80))

## [1.88.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.88.3...v1.88.4) (2025-06-05)


### Bug Fixes

* **multiselect:** Исправляет баги мультиселекта ([f4d5c95](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f4d5c9557d0f2a6db9ea49464cd6f1e0f145216d))

## [1.88.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.88.2...v1.88.3) (2025-06-05)


### Bug Fixes

* **multiselect:** Исправляет баги мультиселекта ([009a46e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/009a46eef61dbf608555cd37ccac766bddb06ba0))

## [1.88.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.88.1...v1.88.2) (2025-06-05)


### Bug Fixes

* **multiselect:** Исправляет баги мультиселекта ([2ee4e74](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2ee4e74e9a7362eb88bcffbf81a8eeac9e7c014d))

## [1.88.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.88.0...v1.88.1) (2025-06-05)


### Bug Fixes

* **emptystate:** PFW-1072 Исправляет баги EmptyState ([415d8bb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/415d8bba74d58bc4c1d9f0c5af02c79ecccb7a1f))

# [1.88.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.87.1...v1.88.0) (2025-06-04)


### Bug Fixes

* **CardButton/CardSelect:** PFW-1277 исправляет отступы для текста аннотации ([d975b8c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d975b8c68634a06a2a0c0ba2b2631bf545fd35d6))
* **multiselect:** Исправляет баги мультиселекта ([5950d37](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5950d377a3c0c0dd8e7f5153d6e19c713722eb4d))


### Features

* **Modal:** PFW-1228 Core модалка + Story ([c89e976](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c89e976fb570a3d21373ad1026ab52af141533e7))
* **RadioButtonGroup:** PFW-1233 Добавляет обертки Vue и Ng ([2b03c4b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2b03c4b8845c3a1a81eb3f54e687a3aa6bb730bf))

## [1.87.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.87.0...v1.87.1) (2025-06-03)


### Bug Fixes

* **multiselect:** Исправляет баги мультиселекта ([2109f9a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2109f9a64d4d2d15624cb2025d028f2580a2cd83))

# [1.87.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.86.3...v1.87.0) (2025-06-03)


### Features

* **CountField:** PFW-1239 Добавляет Vue и Ng обертки для компонента core CountField ([2992df5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2992df52d089907a6957e12212e2f6e86414af04))

## [1.86.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.86.2...v1.86.3) (2025-06-03)


### Bug Fixes

* **TextField:** Стилистические исправление кода ([26a3b21](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/26a3b213185b10ec5fd391d19b0556dba1ba6810))

## [1.86.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.86.1...v1.86.2) (2025-06-03)


### Bug Fixes

* **Collapse:** PFW-1186 Исправляет ошибки ng обертки Collapse ([da6e27b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/da6e27b46ba136542f01ee90f05670c52908791e))

## [1.86.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.86.0...v1.86.1) (2025-06-03)


### Bug Fixes

* **IsClickOutside:** PFW-1190 Убирает кастомные обработчики клика ([f72b482](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f72b4822f70976563da18ee14a772663f80c1308))

# [1.86.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.85.3...v1.86.0) (2025-06-03)


### Features

* **TextField:** Стилистические исправление кода ([7d62ac4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7d62ac400e995eb677c3caa27f0fa4f74a9b03d2))

## [1.85.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.85.2...v1.85.3) (2025-06-02)


### Bug Fixes

* **IsClickOutside:** PFW-1190 Убирает кастомные обработчики клика ([884cfcd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/884cfcd45a4f41ce40fe49f724dd1f336f6e8510))
* **PhoneField:** PFW-1214: Доработки PhoneField относительно продуктового кода ([7a75a42](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7a75a424f89bcd8e25a4531c16f63bfd65b3949e))

## [1.85.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.85.1...v1.85.2) (2025-06-02)


### Bug Fixes

* **multiselect:** Исправляет баги мультиселекта ([d8985b4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d8985b4e599569632ecd1bb804b96b3cfaf4f805))

## [1.85.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.85.0...v1.85.1) (2025-06-02)


### Bug Fixes

* **datePicker:** PFW-861 фикс маски с minDate ([83086ca](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/83086ca2ce64a93cf27a48859de07bdeacfeb70e))
* **multiselect-field:** Исправляет ошибки мультиселекта ([7a3b2a7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7a3b2a7414c1ca83e0e8982d96cfb308238bbffb))

# [1.85.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.84.0...v1.85.0) (2025-06-02)


### Features

* **RadioButtonGroup:** PFW-1074 Правки после дизайн ревью ([cad6670](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cad66700949d3103780bebac07fe434edaf49caf))

# [1.84.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.83.0...v1.84.0) (2025-05-31)


### Bug Fixes

* **datePicker:** PFW-861 фикс минимальной даты и фокуса иконки ([240bb62](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/240bb62e2cbe36bdb7ea669da13821078d743ff5))


### Features

* **RadioButtonGroup:** PFW-1074 Core RadioButtonGroup ([b2f7df4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b2f7df4039e052d8bbba43750fd542144a7f218c))

# [1.83.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.82.4...v1.83.0) (2025-05-30)


### Features

* **yFolder:** PFW-1217 добавляет новую иконку yFolder ([7a17069](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7a17069af7dd3994c07bd8038f78154d4fb3a6a7))


### Performance Improvements

* **Tooltip:** PFW-1059 рефакторинг ng tooltip ([b2c513c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b2c513c8f25adcffed20ce24573c3c266428084f))

## [1.82.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.82.3...v1.82.4) (2025-05-30)


### Bug Fixes

* **CardIcon/CardCheckbox/CardRadio:** карантин CardIcon, CardCheckbox, CardRadio ([e22cd8c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e22cd8cec6b6dbcabf7ece744d7dcf316e7e480e))
* **TextField/SearchField:** PFW-817 переносит компоненты TextField и SearchField в статус ready ([86f4dae](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/86f4dae3dbf15995f9a6e6319984aee1864f36d0))

## [1.82.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.82.2...v1.82.3) (2025-05-30)


### Bug Fixes

* **FieldTextarea, FieldInput:** PFW-1073 Исправляет ошибки ([9bc672c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9bc672c55004406ec38e40d0c0e121629d714ce4))

## [1.82.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.82.1...v1.82.2) (2025-05-29)


### Bug Fixes

* **datePicker:** PFW-861 исправляет дефолт локаль, фокус и рейндж ([f594999](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f594999196bbe4f7ae528b06ffc88d34b6ccfb38))

## [1.82.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.82.0...v1.82.1) (2025-05-29)


### Bug Fixes

* **Collapse:** PFW-1035 Правки стилей хоста ([b20bbc5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b20bbc59239890f88db2725e72946c1c673911b9))

# [1.82.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.81.0...v1.82.0) (2025-05-29)


### Features

* **CountField:** PFW-1237 Добавляет компонент CountField.core.ts ([31ac0b0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/31ac0b0b770f6408f19aef62e525f4ff9304566c))

# [1.81.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.80.4...v1.81.0) (2025-05-29)


### Bug Fixes

* **MultiSelectField:** Исправляет баги селекта ([874066e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/874066ebdad8d548c4a2441dfe347b5441c1a716))
* **Table:** Исправляет баги таблицы ([4cf476e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4cf476ed1e1a0192ea090f4cb3493035a89df23d))


### Features

* **ButtonDropdown:** PFW-1026 Добавляет ButtonDropdown в карантин ([943767e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/943767e0922c598bf28dfd3aa8c6c1395e6b96ec))

## [1.80.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.80.3...v1.80.4) (2025-05-29)


### Bug Fixes

* **Collapse:** PFW-1035 Карантин компонента ([f4f2d8b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f4f2d8bf964adc47755c2124c27b2c48aeba71c3))

## [1.80.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.80.2...v1.80.3) (2025-05-28)


### Bug Fixes

* **Collapse:** PFW-1031 Правки по QA ([7025e0d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7025e0d57af478961c747641f92ea3c0ca85b5a7))
* **Select:** Исправляет баги селекта ([f7af0ca](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f7af0ca1e1858aeabd52adc8c18c9a31a03aa3a9))

## [1.80.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.80.1...v1.80.2) (2025-05-28)


### Bug Fixes

* **Select:** Исправляет баги селекта ([5ad73e9](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5ad73e9007e64ac65af790d473ecbde013f304db))

## [1.80.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.80.0...v1.80.1) (2025-05-28)


### Bug Fixes

* **Checkbox, RadioButton, Toggle, TextField:** PFW-1189 [FRONT] Фикс багов компонентов checkboxButton/radioButton и всех где есть тултип ([4e44887](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4e448874def959ee88e3bad1f4f27839dee1c10f))

# [1.80.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.79.1...v1.80.0) (2025-05-28)


### Bug Fixes

* **CardButton/CardSelect:** PFW-1217 Карантин компонентов CardButton и CardSelect ([0fa360c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0fa360ce25d42c228d5fff046ffa8a5c8d9f51f1))


### Features

* **tokens:** PFW-1213 добавляет экспорт токенов в js формате ([6e42bbc](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6e42bbc169276afb05f23ff11bfc0b3f0b7326bb))

## [1.79.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.79.0...v1.79.1) (2025-05-28)


### Bug Fixes

* **table-head-cell:** Запрещает выделение текста если колонка может сортироваться ([d7c534b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d7c534b523e3ff534dbacc8b6f627ee38994e738))

# [1.79.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.78.0...v1.79.0) (2025-05-28)


### Bug Fixes

* **Cards:** PFW-1080 правки после тестирования Cards ([08f4109](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/08f41098fadd4f07af74894c540b865bd995996d))
* **Textarea:** PFW-944 Правка стилей ([dff3b72](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/dff3b72b4751c2acfa9d50ef17e3d4f9e14673fa))


### Features

* **ButtonDropdown:** PFW-1026 Правки ButtonDropdown для использования в biz.erp ([261dfdc](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/261dfdc5ff68c879db80e7ebf481608b1a95dec0))

# [1.78.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.77.0...v1.78.0) (2025-05-27)


### Features

* **storybook:** Изменяет структуру папок сторибука ([95b4c8c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/95b4c8c4f7b2dee76efd25516fca7a080278655d))

# [1.77.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.76.0...v1.77.0) (2025-05-27)


### Bug Fixes

* **Textarea:** PFW-927 Правки по QA ([12e3d79](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/12e3d798af6bfde3d4325f33688f81552f44fee3))
* **Textarea:** PFW-944 Карантин компонента ([85a0f03](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/85a0f03fb57319eab16e3ee97ea365864d01fe0a))


### Features

* **breakpoints:** PFW-1249 добавляет новые миксины для работы с media ([a5f0db6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a5f0db6da806d0c96d021455ff92802b81edb46c))
* **CountField:** PFW-1238 Создает основу под CoreCountField компонент ([43a75e2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/43a75e204c3ccf514c1f5f470554e9cc2eec61cc))

# [1.76.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.75.0...v1.76.0) (2025-05-23)


### Features

* **package.json:** Обновляет зависимости ([da4738b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/da4738bcc89e9e8fdb22544d1f8af03ecf5f50fc))

# [1.75.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.74.1...v1.75.0) (2025-05-23)


### Bug Fixes

* **table:** Исправляет тесты ([f4ed749](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f4ed7491e28f43347a9003945712e7c4bb8c14ab))


### Features

* **breakpoints:** PFW-1185 добавляет генерацию scss файла с миксинами ([7cca95f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7cca95f9f522f645fd55aa90b2d4f1f3467e2910))
* **package.json:** Добавляет декларацию типов ([bccb23f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/bccb23ff2994722386ef6e6c33db698655c2c10b))

## [1.74.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.74.0...v1.74.1) (2025-05-23)


### Bug Fixes

* **table:** Исправляет стили ([dce4e51](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/dce4e5147489b16295000d2e1326230b3685a3e0))

# [1.74.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.73.0...v1.74.0) (2025-05-22)


### Bug Fixes

* **table-cell:** Удаляет width ([4f86329](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4f86329eaefd56e7b614cf23986810d62936a61a))


### Features

* **Cards:** PFW-1082 добавляет Css тесты для Cards ([a62e234](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a62e234f5ef5f4c6204aeeb77ba494bbdc64276d))

# [1.73.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.72.2...v1.73.0) (2025-05-22)


### Bug Fixes

* **PhoneField:** PFW-1017: Открывает компонент PhoneField ([02cec23](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/02cec23e63f19260ea044a42fa237eab489c6105))


### Features

* **Cards:** PFW-1081 Добавляет Unit тесты для CardSelect/CardButton ([7bd9d32](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7bd9d3221f2e3660d3fee1bdf8f43714c41418c4))

## [1.72.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.72.1...v1.72.2) (2025-05-22)


### Bug Fixes

* **field-wrapper:** Удаляет prevent эвента ([c848804](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c84880412c0ca834341704731012db6d769e4df5))

## [1.72.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.72.0...v1.72.1) (2025-05-21)


### Bug Fixes

* **table:** Исправляет ошибки ([e41fa9c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e41fa9c8c2d4e6104742c71402ccd2baba593855))

# [1.72.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.71.4...v1.72.0) (2025-05-21)


### Features

* **breakpoints:** PFW-1055 добавляет breakpoint и утилиты, для работы с ними ([9650f77](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9650f774bf70bf08c3819429c004c5ef9f1faa8f))
* **Collapse:** PFW-1032 Vue/Ng Обертки ([797015e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/797015ed05ec0d99d325da4322cf0c8d35c4d8fc))
* **PalettePlugin:** PFW-984 Внедрение палитры для цветов ([dffc932](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/dffc9329d3596605ad7e794a36e68d7ff051df87))

## [1.71.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.71.3...v1.71.4) (2025-05-21)


### Bug Fixes

* **Chip:** PFW-1184 Переносит Chip в ready ([d93dfaf](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d93dfaf46642dbef082f852885293dc258849633))
* **multiselect-field:** Исправляет ошибки ([d159117](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d159117f4ae12ecd70829ead41479dd3839f13f7))

## [1.71.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.71.2...v1.71.3) (2025-05-20)


### Bug Fixes

* **icons:** Добавляет иконку сортировки ([331c9f9](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/331c9f9a3b3af5482edcf02b125645e728ad5d03))

## [1.71.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.71.1...v1.71.2) (2025-05-20)


### Bug Fixes

* **ButtonDropdown:** PFW-1023 Правки ButtonDropdown после тестирования ([019f2b7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/019f2b7e5132d5a30ed2c6078a642b896083bd0e))

## [1.71.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.71.0...v1.71.1) (2025-05-20)


### Bug Fixes

* **select-field:** Исправляет ошибки ([bbbbb05](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/bbbbb05c272885461be07be83a6449dca5340472))

# [1.71.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.70.0...v1.71.0) (2025-05-20)


### Bug Fixes

* **select-field:** Исправляет ошибки ([a621e3e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a621e3eece6b59c6a5e9572888db50a14631eb5d))


### Features

* **Cards:** PFW-1079 Добавляет CardSelect ([e978ce1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e978ce1f6c02d01cefe0596f8b1eb0f183bcd775))
* **Cards:** PFW-1080 Добавляет Vue/Ng обертку для CardSelect ([f6f68e3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f6f68e3e877bc46a90b65ff43589782044ce6568))
* **Cards:** PFW-1089 Добавляет CardButton ([f2acd1c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f2acd1ce9bf4b618909b8d6b0c2ac6dbb7c5f036))
* **Cards:** PFW-1130 Добавляет Vue/Ng обертку для CardButton ([373d62a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/373d62a3b0b7b400212aa313374133384ed83a06))
* **Collapse:** PFW-1031 Основной core компонент ([8f168c0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8f168c0520cd66c9e202b1d0c8dcb53ecfc3f058))

# [1.70.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.69.0...v1.70.0) (2025-05-19)


### Features

* **date-picker:** Добавляет импорт date-picker ([6be3b58](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6be3b580e80f0c61d49879081f4290cddbc1e662))

# [1.69.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.68.0...v1.69.0) (2025-05-19)


### Features

* **ButtonDropdown:** PFW-1024 Добавление unit тестов для ButtonDropdown ([3b11410](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3b11410b62972e53d4a04ed7c676e5b48d91c925))
* **date-picker:** Добавляет date-picker ([2a530bd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2a530bd164d30055d2389a78d09a759f749f7201))

# [1.68.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.67.0...v1.68.0) (2025-05-16)


### Features

* **icons:** CM-212 добавлена новая иконка ([8fe6799](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8fe6799a59b4edd88415796eac64de4be91ca301))

# [1.67.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.66.0...v1.67.0) (2025-05-16)


### Bug Fixes

* **text-field:** Исправляет типизацию emits ([0c231cf](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0c231cff45d02e234b3277e5148e6265caf01345))


### Features

* **ButtonDropdown:** PFW-1023 Добавление Vue и Angular обёрток ButtonDropdown ([f969c8d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f969c8d81cf77115bdd566078ebd9af83015e19b))

# [1.66.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.65.0...v1.66.0) (2025-05-16)


### Features

* **Cards:** PFW-1041 Добавляет quark CardCheckbox ([8fd97db](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8fd97dbd0e136985583d3840cd3f94c3127245c0))
* **Cards:** PFW-1042 Добавляет quark CardRadio ([44c00c3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/44c00c30a8f702ee272f1c7258456286abb4a4b8))
* **text-field:** Добавляет импорт text-field ([6762af2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6762af217d760a718ada53e40fe76cb51ea8f502))

# [1.65.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.64.0...v1.65.0) (2025-05-15)


### Bug Fixes

* **EmptyState:** PFW-937 Добавляет импорт Core во Vue обертке, переносит в... ([ca72afb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ca72afb5c2bc2aa591f1bdbfd58bf9344f06ddb5))
* **Inputs:** PFW-918 Правки багов ([e614f6b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e614f6bd6f9bf3db9d53c4f7e519324ed222ba91))


### Features

* **ButtonDropdown:** PFW-1022 Добавление ButtonDropdown ([1550aa5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1550aa53ab1e542660f6fd596c9ba9e0c198a07c))
* **Cards:** PFW-1039 Добавляет quark CardHeader ([08cd01f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/08cd01f4389e93d8c730e2c24deb866a4d1a1696))
* **Cards:** PFW-1040 добавляет quark CardIcon ([e5dc76b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e5dc76baadf99a579b0b40d3387014e60ee21d9c))
* **ColorIcon:** PFW-1071 Добавляет quark ColorIcon ([e971dc3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e971dc33fff0d689456e91c3a6052e1e0c7c9a43))

# [1.64.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.63.2...v1.64.0) (2025-05-14)


### Bug Fixes

* **Tooltip:** Отключает disabled cursor для dropdown ([5016ca2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5016ca2812ba325c9ee70b904fe82de3bd3ee77f))


### Features

* **Cards:** PFW-1037 Добавляет quark CardWrapper ([e773633](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e7736338b26a05c63c90ea37385e530cd44a4703))
* **Cards:** PFW-1038 Добавляет quark CardMain ([ec802f7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ec802f7dc6a9ff015737311cfcbe1e1cb63de3bf))

## [1.63.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.63.1...v1.63.2) (2025-05-13)


### Bug Fixes

* **Tooltip:** Исправляет отображение тултипа через text пропу ([a8f9edc](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a8f9edcebdfead60018337538516cb1fece53f1e))

## [1.63.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.63.0...v1.63.1) (2025-05-12)


### Bug Fixes

* **chip:** PFW-971 исправляет тип size для core/chip ([e34ba48](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e34ba48cba4b7d605ba9d299ffb5d9dabdb2c446))
* **couter:** PFW-971 исправляет тип size для vue/counter ([ff27c00](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ff27c002851e25319fd5eb226f328ff430cb93c8))
* **Inputs:** PFW-918 Правки багов QA ([af91d51](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/af91d51494bdf0373f6d7c057ab7e92df996c3a6))
* **Slots:** PFW-915 Правки слотов и тестов ([f00f46b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f00f46b280f71630e72d390ce31b367abb499221))

# [1.63.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.62.0...v1.63.0) (2025-05-07)


### Bug Fixes

* **YTooltip:** Доработки тултипа ([9434e6c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9434e6cf3d0f627175e0c8b225072c27ae9fe0c7))


### Features

* **DropdownList:** PFW-870 Добавляет эмиты для vue/ng ([1c0012c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1c0012c59e74f522b59c36388832fdc22728622b))

# [1.62.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.61.4...v1.62.0) (2025-05-06)


### Features

* **chip:** PFW-968 добавляет Vue/Angular обертки для компонента Chip ([3d41b4f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3d41b4f160a54e1b1ff01765ea003b5bb76901fd))
* **Inputs:** PFW-942 Добавляет vue/ng обертки ([f71ecba](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f71ecbaec8054ea930d88d5cecca10250addeb50))

## [1.61.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.61.3...v1.61.4) (2025-05-06)


### Bug Fixes

* **Dropdown:** PFW-988 Правки dropdown & calendar ([9e7af1a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9e7af1ad6385af087ea75abc69357d7cd7780b6c))
* **YTable:** Доработки таблицы ([2429013](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2429013d68d64cd2e9c9d2ce254bee1420d0688b))

## [1.61.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.61.2...v1.61.3) (2025-05-06)


### Bug Fixes

* **YTable:** Доработки таблицы ([279652a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/279652af5dafc77dc597077cccd12cd4c38e0842))

## [1.61.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.61.1...v1.61.2) (2025-05-06)


### Bug Fixes

* **PhoneField:** PFW-1004 Добавляет исправления в core/vue/ng компоненты PhoneField ([91915df](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/91915df81f806375fef0c04906e98137669999b1))

## [1.61.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.61.0...v1.61.1) (2025-05-05)


### Bug Fixes

* **YTable:** Доработки таблицы ([dc41f9f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/dc41f9f9062963c625a8209e91e3b0b4904e176a))

# [1.61.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.60.0...v1.61.0) (2025-04-30)


### Features

* **SearchTextHighlighted:** PFW-985 Добавляет компонент SearchTextHighlighted core/vue/ng ([4ad5808](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4ad5808df30ae261872b12fc4b21b65e4e41faaf))

# [1.60.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.59.2...v1.60.0) (2025-04-30)


### Features

* **chip:** PFW-967 добавляет core компонент Chip ([97b54b1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/97b54b1786d9119e55edbc104cfee5af4e547ad0))
* **Textarea:** Добавляет обертки ([d1b2637](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d1b2637caa38c8466fb1ad4b2bcfbec1eedc2382))

## [1.59.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.59.1...v1.59.2) (2025-04-30)


### Bug Fixes

* **Table:** PFW-1005 Добавляет правки в таблицу и обертки для vue ([0589e17](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0589e171e1300fbe9c7a120f8385eb09b3ca864b))

## [1.59.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.59.0...v1.59.1) (2025-04-29)


### Bug Fixes

* **radioButton:** PFW-935 фикс импорта radioButton во вью ([4acd78e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4acd78e350ff590f5be8c5931ea12797fe303302))

# [1.59.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.58.0...v1.59.0) (2025-04-29)


### Bug Fixes

* **radioButton:** PFW-935 Карантин компонента RadioButton в biz.erp ([addcad3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/addcad31f2d2c77e8f3f3b279315ff595ddbb71e))


### Features

* **Textarea:** PFW-927 Добавляет core компоненты для textarea ([9821ba0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9821ba076cb05f1017f2b542991a39bc2887af58))

# [1.58.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.57.1...v1.58.0) (2025-04-28)


### Bug Fixes

* **TextField:** PFW-918 Правка истории vue ([7c0f03f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7c0f03f43ecf718c2b6a1f79fef913c7e93d06ce))


### Features

* **Inputs:** PFW-918 Добавляет обертки ([1e6be93](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1e6be931fc505f6b7007c9c66639b626c4315da0))
* **Table:** Карантин таблицы ([c713dfc](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c713dfcb3ee3a0c388e76e6b3f21b0e26274f451))

## [1.57.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.57.0...v1.57.1) (2025-04-25)


### Bug Fixes

* **EmptyState:** HOTFIX Правка импорта и наименования компонента в экспорте ([b1a7c5c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b1a7c5c95fb9748705f9e36d5be8dcb6ee900160))
* **YCoreQuarkGlobalProvider:** PFW-965 Рефакторинг работы с globalContext в ангуляре ([09c15e4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/09c15e406d19bade4e221d43619c5d364453569e))

# [1.57.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.56.2...v1.57.0) (2025-04-25)


### Features

* **EmptyState:** PFW-999 Открывает EmptyState для импорта в продуктовом коде ([8de8b89](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8de8b8995a4ccf28c45d8bf1872bdd661d57a6b9))

## [1.56.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.56.1...v1.56.2) (2025-04-25)


### Bug Fixes

* **EmptyState:** PFW-990 Исправляет ошибки отображения ([31446e0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/31446e08b05eeb373a41f8e8f34e97796a3c9b8f))

## [1.56.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.56.0...v1.56.1) (2025-04-24)


### Bug Fixes

* **PhoneField:** PFW-948 Добавляет Unit тесты и вносит небольшие правки ([b122d46](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b122d46cb2a075f42f8349c267aac1be7c16adee))

# [1.56.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.55.1...v1.56.0) (2025-04-24)


### Bug Fixes

* **SegmentOption:** Исправлят event ([8250113](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/82501131e51e5a06f0c0d921bef233f1cf0c9327))


### Features

* **Inputs:** PFW-918 Инпут по новой схеме ([a6f3117](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a6f3117113e59fc18358e636466f0a815d727654))

## [1.55.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.55.0...v1.55.1) (2025-04-24)


### Bug Fixes

* **Popover:** Исправлят отображение пустого слота ([2dac8e3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2dac8e3f8713a453a1b75622190bf682284af81d))
* **radioButton:** PFW-932 фикс багов тестирования ([692e9a6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/692e9a63c56c66f32c31fb922e7fdf9dc9a05f19))

# [1.55.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.54.1...v1.55.0) (2025-04-23)


### Features

* **EmptyState:** PFW-938 Добавляет CSS тесты ([0e0215c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0e0215c4b9116eb5b5d697161e8fb76259c98c18))

## [1.54.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.54.0...v1.54.1) (2025-04-22)


### Bug Fixes

* **radioButton:** PFW-933 RadioButton unit и css тесты ([d640fcd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d640fcd2f8bebf7976f90e62516fc8297497454a))

# [1.54.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.53.0...v1.54.0) (2025-04-22)


### Features

* **release:** Обновляет зависимости ([bab4cf4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/bab4cf4f5251d94b8abbc05e673b798aab25ab39))

# [1.53.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.52.0...v1.53.0) (2025-04-22)


### Bug Fixes

* **release:** Исправляет версию релиза ([ac48248](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ac482488245f2c7578e604d18cbb9b9f768b401b))
* **release:** Исправляет версию релиза ([209fb9f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/209fb9fb63c158fda81abf9e2eb4d3c752b86a1c))
* **tests:** Убирает skip для event тестов ([a792dbb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a792dbb0fb13a02e3d42030540198a293c98e7bd))


### Features

* **dateField:** PFW-859 Создание core компонента DateField ([23e5526](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/23e5526fe804ef75e8fd305050927f6d43fe53c6))
* **dateField:** Правки после QA ([f2640e9](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f2640e931ac215377a3bee2225ad1febee226c0d))
* **EmptyState:** PFW-940 Добавляет vue/ng обертки для EmptyState ([1eb36d6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1eb36d6363c29eda58b3e9fa92c801b6dfb7de1c))
* **PhoneField:** PFW-946 Revert "Merge branch 'PFW-946' into 'main'" ([ab52d03](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ab52d03d043ffb57a0f92f666f779c5977a79607))
* **PhoneField:** PFW-946 Revert "Merge branch 'revert-a91b1266' into 'main'" ([2d9879b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2d9879bb1d34fb997aa41038f64cb39aa06707f1))
* **PhoneField:** PFW-946 Добавляет Vue/ng обертки для PhoneField ([cc3b77c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cc3b77c76aa247bf21af3f6729e724df70d21167))
* **radioButton:** PFW-931 Core компонент RadioButton ([77e5283](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/77e5283a29956d0206930a9a7c505216744602f1))
* **radioButton:** PFW-932 Vue/ng обертки для RadioButton ([3675fe2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3675fe2e5a18cb380b5fa759e17268cb649bf84e))

# [1.53.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.52.0...v1.53.0) (2025-04-22)


### Bug Fixes

* **release:** Исправляет версию релиза ([209fb9f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/209fb9fb63c158fda81abf9e2eb4d3c752b86a1c))
* **tests:** Убирает skip для event тестов ([a792dbb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a792dbb0fb13a02e3d42030540198a293c98e7bd))


### Features

* **dateField:** PFW-859 Создание core компонента DateField ([23e5526](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/23e5526fe804ef75e8fd305050927f6d43fe53c6))
* **dateField:** Правки после QA ([f2640e9](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f2640e931ac215377a3bee2225ad1febee226c0d))
* **EmptyState:** PFW-940 Добавляет vue/ng обертки для EmptyState ([1eb36d6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1eb36d6363c29eda58b3e9fa92c801b6dfb7de1c))
* **PhoneField:** PFW-946 Revert "Merge branch 'PFW-946' into 'main'" ([ab52d03](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ab52d03d043ffb57a0f92f666f779c5977a79607))
* **PhoneField:** PFW-946 Revert "Merge branch 'revert-a91b1266' into 'main'" ([2d9879b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2d9879bb1d34fb997aa41038f64cb39aa06707f1))
* **PhoneField:** PFW-946 Добавляет Vue/ng обертки для PhoneField ([cc3b77c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cc3b77c76aa247bf21af3f6729e724df70d21167))
* **radioButton:** PFW-931 Core компонент RadioButton ([77e5283](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/77e5283a29956d0206930a9a7c505216744602f1))
* **radioButton:** PFW-932 Vue/ng обертки для RadioButton ([3675fe2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3675fe2e5a18cb380b5fa759e17268cb649bf84e))

# [1.53.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.52.0...v1.53.0) (2025-04-22)


### Bug Fixes

* **tests:** Убирает skip для event тестов ([a792dbb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a792dbb0fb13a02e3d42030540198a293c98e7bd))


### Features

* **dateField:** PFW-859 Создание core компонента DateField ([23e5526](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/23e5526fe804ef75e8fd305050927f6d43fe53c6))
* **dateField:** Правки после QA ([f2640e9](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f2640e931ac215377a3bee2225ad1febee226c0d))
* **EmptyState:** PFW-940 Добавляет vue/ng обертки для EmptyState ([1eb36d6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1eb36d6363c29eda58b3e9fa92c801b6dfb7de1c))
* **PhoneField:** PFW-946 Revert "Merge branch 'PFW-946' into 'main'" ([ab52d03](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ab52d03d043ffb57a0f92f666f779c5977a79607))
* **PhoneField:** PFW-946 Revert "Merge branch 'revert-a91b1266' into 'main'" ([2d9879b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2d9879bb1d34fb997aa41038f64cb39aa06707f1))
* **PhoneField:** PFW-946 Добавляет Vue/ng обертки для PhoneField ([cc3b77c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cc3b77c76aa247bf21af3f6729e724df70d21167))
* **radioButton:** PFW-931 Core компонент RadioButton ([77e5283](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/77e5283a29956d0206930a9a7c505216744602f1))
* **radioButton:** PFW-932 Vue/ng обертки для RadioButton ([3675fe2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3675fe2e5a18cb380b5fa759e17268cb649bf84e))

# [1.53.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.52.0...v1.53.0) (2025-04-22)


### Bug Fixes

* **tests:** Убирает skip для event тестов ([a792dbb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/a792dbb0fb13a02e3d42030540198a293c98e7bd))


### Features

* **dateField:** PFW-859 Создание core компонента DateField ([23e5526](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/23e5526fe804ef75e8fd305050927f6d43fe53c6))
* **EmptyState:** PFW-940 Добавляет vue/ng обертки для EmptyState ([1eb36d6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1eb36d6363c29eda58b3e9fa92c801b6dfb7de1c))
* **PhoneField:** PFW-946 Revert "Merge branch 'PFW-946' into 'main'" ([ab52d03](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ab52d03d043ffb57a0f92f666f779c5977a79607))
* **PhoneField:** PFW-946 Revert "Merge branch 'revert-a91b1266' into 'main'" ([2d9879b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2d9879bb1d34fb997aa41038f64cb39aa06707f1))
* **PhoneField:** PFW-946 Добавляет Vue/ng обертки для PhoneField ([cc3b77c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cc3b77c76aa247bf21af3f6729e724df70d21167))
* **radioButton:** PFW-931 Core компонент RadioButton ([77e5283](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/77e5283a29956d0206930a9a7c505216744602f1))
* **radioButton:** PFW-932 Vue/ng обертки для RadioButton ([3675fe2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3675fe2e5a18cb380b5fa759e17268cb649bf84e))

# [1.53.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.52.0...v1.53.0) (2025-04-18)


### Features

* **PhoneField:** PFW-946 Revert "Merge branch 'PFW-946' into 'main'" ([e914f8e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e914f8eed0d305b32846b21dba767df9b2b181fc))
* **PhoneField:** PFW-946 Revert "Merge branch 'revert-a91b1266' into 'main'" ([36e6fa3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/36e6fa32746a645328242839d44f25327784dc6d))
* **radioButton:** PFW-931 Core компонент RadioButton ([77e5283](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/77e5283a29956d0206930a9a7c505216744602f1))

# [1.52.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.51.0...v1.52.0) (2025-04-18)


### Features

* **checkbox:** PFW-941 Добавляет компонент CoreEmptyState ([f536ae5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f536ae5c8073d5d54e3e2611f5ec6c2cb50a2b00))

# [1.51.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.50.1...v1.51.0) (2025-04-18)


### Features

* **i18n:** PFW-887 Добавляет интернализацию ([4158b16](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4158b169e4b25a06ca2875360d156851eaed0bad))

## [1.50.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.50.0...v1.50.1) (2025-04-18)


### Bug Fixes

* **Inputs:** PFW-837 Правки по QA ([880179a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/880179a5bd6eecb6b09134abf7a525006cf0dab9))

# [1.50.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.49.0...v1.50.0) (2025-04-16)


### Features

* **PhoneField:** PFW-873 Добавляет хелперы для стран + id в масив объектов... ([5db95e0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5db95e0b1a77597e3d444e33018573bf90dd852f))

# [1.49.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.48.0...v1.49.0) (2025-04-15)


### Bug Fixes

* **bugs:** PFW-837 фиксы багов Select ([c091354](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c091354808a4e6b15ed91e95a50079fa7bd752d0))
* **Buttons:** PFW-781 Возможность менять ширину molecule/button и molecule/iconButton ([d711d75](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d711d75b21898e840a8288c0742468ff99d0f7a8))
* **props:** PFW-920 Правки пропов с нативным неймингом ([dc1a20b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/dc1a20b557554d2dd8538d22902a4711919f6768))
* **Table:** PFW-916 Правки сортировки при checked ([699b8e5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/699b8e5e4053548e06d330fd7e4fd4cb8698f19c))


### Features

* **DatePicker:** PFW-850 добавляет компонент y-core-date-picker ([1a8a7a5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1a8a7a5ab23b3dfe9471fff8e0724d34b465de10))
* **SearchField:** PFW-797 Компонент SearchField ([9d843fa](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9d843fa3f759ec9d2d76ba7042a6753d355a890d))

# [1.48.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.47.0...v1.48.0) (2025-04-14)


### Features

* **checkbox:** PFW-914 Изменяет значение ограничение максимальной ширины чекбокса ([29d5501](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/29d5501c661aa417c51bb923c3ad59dfbdcfb66f))

# [1.47.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.46.1...v1.47.0) (2025-04-11)


### Bug Fixes

* **sentry:** Исправляет фильтрацию sentry ошибок ([3aa327b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3aa327bd625affe7bdeeb2782b3273e87e81cf2b))


### Features

* **FieldAvatar:** PFW-877 Добавляет компонент аватара для инпута ([1a86980](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1a86980e17dd904bdfea53aeab5c371d79341ce8))
* **FieldInput:** PFW-903 Добавляет FieldInput ([72a5111](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/72a511133cf06b09374fffedd789e9ecc91e4826))

## [1.46.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.46.0...v1.46.1) (2025-04-10)


### Bug Fixes

* **toggle:** исправляет event propagination ([5650a5f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5650a5f8636552b4f58e03a67762f70709e64248))

# [1.46.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.45.0...v1.46.0) (2025-04-10)


### Features

* **DropdownCell:** PFW-910 Добавляет слоты для dropdownCellText ([06bf74d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/06bf74da7336c04b9dac7046987e0d7711e70744))
* **FieldIcon:** PFW-876 Добавляет компонент FieldIcon ([ca40687](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ca406876632ca9e637f28bef1c442ac327442dcc))

# [1.45.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.44.1...v1.45.0) (2025-04-09)


### Features

* **DropdownCell:** PFW-905 Добавляет слоты для dropdownCell ([504a171](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/504a171d049627d60b0ca0d82ff1c50c342ff536))
* **emits:** PFW-788 добавляет stopPropagination к эмитам ([192ceb1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/192ceb1a21e3532ad8ed0dd8848010209e4e1f52))
* **exports:** PFW-858 Убирает компоненты не прошедшие проверку ([63a4afc](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/63a4afc0a2e66f86296e7f808ef4870c51900a86))
* **FieldWrapper:** PFW-874 Добавляет FieldWrapper core компонент ([0a195e2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0a195e2df84742ded615f95e28a680225b3a57b8))
* **PhoneField:** PFW-878 Проектирование компонента PhoneInput ([691e902](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/691e902c1226b352b490f49c13ee6893d98d0c57))

## [1.44.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.44.0...v1.44.1) (2025-04-03)


### Bug Fixes

* **DropdownList:** Pfw 801 - Переводит компонент DropdownList в Quarantine ([56c566d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/56c566d26e95ce0e545be69a14fab484b6284c50))
* **storybook:** Удаляет автоимпорты компонентов ([9e37cab](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9e37cabd790d3484542ee27d98937e29bc721f72))

# [1.44.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.43.1...v1.44.0) (2025-04-03)


### Features

* **icons:** Добавляет export иконок ([86ebe0b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/86ebe0b13e2f07938b10252ed395066f417916dd))

## [1.43.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.43.0...v1.43.1) (2025-04-03)


### Bug Fixes

* **getWCShadowRoot:** PFW-793 замена текста ошибки в методе getWCShadowRoot для unit тестов ([dd685a6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/dd685a697792c03989423c6ff463d86fb5d4c5b6))
* **icons:** Исправляет export иконок ([121f357](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/121f357cff37faba77e557480543dd08221e0915))

# [1.43.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.42.0...v1.43.0) (2025-04-03)


### Features

* **storybook:** PFW-884 переезд из Карантина в Готово (core/Toggle, vue/Checkbox) ([01ac886](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/01ac886f632ff96ab97bc5be125cc9b58d44617e))

# [1.42.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.41.5...v1.42.0) (2025-04-02)


### Features

* **icons:** Добавляет export иконок ([58f56ea](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/58f56ea4148f4c42ff836c4eb03c84376014223f))

## [1.41.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.41.4...v1.41.5) (2025-04-01)


### Bug Fixes

* **sentry:** PFW-780 Добавляет фильтрацию для sentry событий ([cc41986](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cc41986df487f36420fa076370a063677f450e53))
* **tablePagination:** PFW-566 Фикс размера селекта ([f65f7ed](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f65f7edc58d11563005b6ab6787eca666b0c19fb))

## [1.41.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.41.3...v1.41.4) (2025-04-01)


### Bug Fixes

* **figma-tokens:** update tokens ([350e165](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/350e165c4c376c3972b882bf7f0e187effa3b59a))

## [1.41.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.41.2...v1.41.3) (2025-03-31)


### Bug Fixes

* **popover:** PFW-802 Добавляет events ([5fe0e73](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5fe0e73191449d27cb332b4c4e4c3b408b63c4c7))

## [1.41.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.41.1...v1.41.2) (2025-03-31)


### Bug Fixes

* **Tooltip:** PFW-802 Добавляет type для YTooltip ([fe37862](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fe378623c21d4844b55d38d6db14b36568b4cdf6))

## [1.41.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.41.0...v1.41.1) (2025-03-31)


### Bug Fixes

* **Dropdown:** PFW-840 Фиксы дропдауна, селекта и мультиселекта ([029841c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/029841ceff5da4c9a83ee713c5c7e4db49023739))

# [1.41.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.40.2...v1.41.0) (2025-03-28)


### Bug Fixes

* **base.vite.config:** Исправляет публикацию sentry соурсмапов ([0f0e9c7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0f0e9c75767eebe225338922e9153269b6e5e0c7))
* **button:** PFW-802 Исправляет баги компонентов перед карантином ([9f7cba5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9f7cba5a0569d44b8ffcbf30a5f1141e5d6d3864))


### Features

* **Table:** PFW-566 Компонент таблицы ([01b28e1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/01b28e1b77372869a7445baec87fd43d8cc8d1d2))
* **Wrappers:** PFW-810 Добавление оберток для Angular и Vue ([f1a9e21](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f1a9e21d64b067dbecf32e6a054d2313e27c8f43))

## [1.40.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.40.1...v1.40.2) (2025-03-27)


### Bug Fixes

* **calendar:** PFW-838 фикс инициализации даты ([8f405f1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8f405f1d7102aa6b5cd2fa04c08e67c86a59a1c0))

## [1.40.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.40.0...v1.40.1) (2025-03-26)


### Bug Fixes

* **svg:** HOTFIX svg иконки на ту, которая была ([cb19210](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cb192102ce1296ed109f61c71b273b5e72805d19))

# [1.40.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.39.0...v1.40.0) (2025-03-26)


### Bug Fixes

* **storybook:** Исправляет отображение CellText ([efa399b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/efa399b8960c27bea4e91cb4d6700d3ce4bcbc59))
* **storybook:** Исправляет отображение сторибука ([512bf42](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/512bf42647813a6e8315fc9fd49752fbf97e24de))


### Features

* **Calendar:** PFW-804 добавляет компонент Calendar ([5540f3d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5540f3d107a4196ea2a41efffd9345d6c194f95c))

# [1.39.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.38.2...v1.39.0) (2025-03-26)


### Features

* **SelectFields:** PFW-809 - [FRONT] Создание core компонента Select ([d3b9f7b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d3b9f7b93ffef9590d523ac2053ee6f5583a9c3e))
* **YAvatar:** PFW-835 Добавляет компонент YAvatar ([58b6c5c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/58b6c5c36cc5a3f48f9083f57127c23286957cd2))
* **YCellText:** PFW-716 Добавляет компонент YCellText ([e67ed52](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e67ed52880d43e22999bd75dd86504d0a5b851a7))

## [1.38.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.38.1...v1.38.2) (2025-03-21)


### Bug Fixes

* **Buttons:** PFW-826 Правка событий кликов ([1f2575d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1f2575d9d3616623c6e48d683cdb9511ad255769))

## [1.38.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.38.0...v1.38.1) (2025-03-20)


### Bug Fixes

* PFW-825 добавляем icons/index в сборку библиотеки ([b859ce0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b859ce09668dff7a7dda4881ae4d43a35cc579d3))

# [1.38.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.37.1...v1.38.0) (2025-03-20)


### Features

* **icons:** Добавляет новые иконки ([3974765](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3974765de94f9d75f7e5fda59477bb8c8041b3b2))

## [1.37.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.37.0...v1.37.1) (2025-03-14)


### Bug Fixes

* **checkbox/segment control:** PFW-795 - [FRONT] Перенести vue/core toggle и... ([47b4080](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/47b40808a6a46b2ade3692518309d62cffe8e6a7))

# [1.37.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.36.5...v1.37.0) (2025-03-13)


### Bug Fixes

* **checkbox:** PFW-785 - Добавляет Organism/Checkbox в карантин ([8f120dc](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8f120dcb97ed0978d498d9f139bff34a8a659145))


### Features

* PFW-693 Строка таблицы и PFW-702 Компонент ячейки таблицы ([e52dbd4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e52dbd4fe251abedbe93dd4a892dfb756dd4acfa))

## [1.36.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.36.4...v1.36.5) (2025-03-13)


### Bug Fixes

* **Checkbox:** PFW-785 Правки organism checkbox ([29e5b0c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/29e5b0c21df21b783fbbb9881132d86b6c5ee577))

## [1.36.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.36.3...v1.36.4) (2025-03-12)


### Bug Fixes

* **button:** PFW-790 - Добавляет Button в раздел Ready ([2fcf628](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2fcf628e7a009b569905b64a687c46d96751a725))

## [1.36.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.36.2...v1.36.3) (2025-03-12)


### Bug Fixes

* **counter:** PFW-668 - Добавляет Atom/Counter в карантин ([34e5788](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/34e57881094a7f6b6bc04f372029e0dc2f64f924))

## [1.36.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.36.1...v1.36.2) (2025-03-11)


### Bug Fixes

* **quarantine:** POS-3212 Карантин для Segment Control ([3f5d2e3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3f5d2e332209921d9344d2b5723b0fe55868479e))

## [1.36.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.36.0...v1.36.1) (2025-03-11)


### Bug Fixes

* **segment-option:** POS-3212 Добавил locator для segment option ([40dc3e4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/40dc3e444660c6119d320a9ab1a9b0e539f9c379))

# [1.36.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.35.0...v1.36.0) (2025-03-11)


### Bug Fixes

* PFW-771 - Добавляет unit-тесты для atom/counter ([206b72f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/206b72fab88720b061035933ea17667e250790ae))


### Features

* PFW-769 - Добавляет Vue/Angular обертку для Atom/Counter ([5318d67](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5318d67fa7a2cf1cd13769011fc27de5a7ec166b))

# [1.35.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.34.0...v1.35.0) (2025-03-10)


### Features

* PFW-770 - добавляет Css тесты на counter ([5443a4d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5443a4d861e593ea6648ce197862f46950a3cb58))

# [1.34.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.33.0...v1.34.0) (2025-03-10)


### Features

* **tests:** POS-3211 Разработка css test'ов для Segment Option и Segment Control ([5f8958e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5f8958e8f24d30065023f22893aba676e0a912c6))

# [1.33.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.32.0...v1.33.0) (2025-03-07)


### Features

* **events:** PFW-777 Убирает bublingEvents ([63ebd24](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/63ebd24e8d077536c1511ae66d22ab319434ab34))
* PFW-768 - Добавляет core компонент Atom/Counter ([2b2ab28](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2b2ab28265eefca10032da0a59a81d7b768d54cb))

# [1.32.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.31.5...v1.32.0) (2025-03-07)


### Bug Fixes

* **YButton:** Добавляет css vars ([c8bd700](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c8bd700bc5c3975577855440ddfbc55ed7be9973))


### Features

* **icons:** Добавляет export иконок ([be0c72d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/be0c72de11d813eef343f41fa19eedd1dea8808e))

## [1.31.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.31.4...v1.31.5) (2025-03-06)


### Bug Fixes

* **event:** POS-3212 Исправление структуры данных события click в компоненте SegmentControl для обертки Vue ([efa4f99](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/efa4f99397dfbda8173f49ebda28121db6cfcc3e))

## [1.31.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.31.3...v1.31.4) (2025-03-06)


### Bug Fixes

* **d.ts:** Исправляет типизацию d.ts ([452a92d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/452a92d624a6be8be9278e7d6307098b232758ca))

## [1.31.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.31.2...v1.31.3) (2025-03-06)


### Bug Fixes

* **d.ts:** PFW-774 Исправляет типизацию d.ts ([d99caa2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d99caa2209ff965caa344d355c5aea74b2963ae5))

## [1.31.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.31.1...v1.31.2) (2025-03-06)


### Bug Fixes

* **d.ts:** PFW-774 Исправляет типизацию d.ts ([9b3f803](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9b3f8036e4d6c10371d69bbb76f6ed32ac0f1671))

## [1.31.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.31.0...v1.31.1) (2025-03-05)


### Bug Fixes

* **button:** PFW-667 Исправляет sizes ([ac0ca92](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ac0ca928309f8abc0ad1541277c0c761477b4a44))

# [1.31.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.30.0...v1.31.0) (2025-03-04)


### Bug Fixes

* **figma-tokens:** update tokens ([3379f45](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3379f4510e5f3d72add48aef0abd46e40bf5bc5a))


### Features

* **segment-control:** POS-3209 Разработка обертки для Segment Control на Angular ([83207d2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/83207d22ac8c164c43316ca56614e3ff3359661e))
* **tooltip:** PFW-649 добавляет Tooltip на базе Tip ([b3f2bd1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b3f2bd1d2a0bb315fafbde9a1b998318014c4ba6))

# [1.30.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.29.0...v1.30.0) (2025-03-04)


### Features

* **segment-control:** POS-3208 Разработка обертки для Segment Control на Vue ([fc88575](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fc8857545d3c467dfc0e88e16735383ae597d56c))

# [1.29.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.28.0...v1.29.0) (2025-03-03)


### Features

* **release:** Релиз biz.erp ([c157843](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c157843af5d9887bc69c9a6b7b4aa93e77e5e107))

# [1.28.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.27.0...v1.28.0) (2025-02-28)


### Bug Fixes

* **Button:** PFW-763 Исправляет баги после QA ([9b3db1c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9b3db1cb1242c1367d360e204f34ce1c3e4a8d48))


### Features

* **Popover:** PFW-654 Добавил компонент Popover ([76d2446](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/76d2446c055d983f18d3091aad4005f606888873))
* **segment-control:** POS-3207 Разработка компонента Segment Control на Web Components ([f5486ef](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f5486ef3d7c0a6c709dc7153fa57821701893302))
* **tag:** PFW-692 Добавляет тесты ([5627a82](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5627a82e9f3438f99bfa00a7213154aa7c0056a9))
* **YCoreTable:** PFW-681 Добавляет core компонент таблицы ([6d83ba1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6d83ba11c53145723f6cab3e4da82a6cddce1b74))

# [1.28.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.27.0...v1.28.0) (2025-02-28)


### Features

* **Popover:** PFW-654 Добавил компонент Popover ([76d2446](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/76d2446c055d983f18d3091aad4005f606888873))
* **segment-control:** POS-3207 Разработка компонента Segment Control на Web Components ([f5486ef](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f5486ef3d7c0a6c709dc7153fa57821701893302))
* **tag:** PFW-692 Добавляет тесты ([5627a82](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5627a82e9f3438f99bfa00a7213154aa7c0056a9))
* **YCoreTable:** PFW-681 Добавляет core компонент таблицы ([6d83ba1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6d83ba11c53145723f6cab3e4da82a6cddce1b74))

# [1.28.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.27.0...v1.28.0) (2025-02-28)


### Features

* **Popover:** PFW-654 Добавил компонент Popover ([76d2446](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/76d2446c055d983f18d3091aad4005f606888873))
* **segment-control:** POS-3207 Разработка компонента Segment Control на Web Components ([f5486ef](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f5486ef3d7c0a6c709dc7153fa57821701893302))
* **tag:** PFW-692 Добавляет тесты ([5627a82](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5627a82e9f3438f99bfa00a7213154aa7c0056a9))

# [1.28.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.27.0...v1.28.0) (2025-02-28)


### Features

* **Popover:** PFW-654 Добавил компонент Popover ([76d2446](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/76d2446c055d983f18d3091aad4005f606888873))
* **segment-control:** POS-3207 Разработка компонента Segment Control на Web Components ([f5486ef](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f5486ef3d7c0a6c709dc7153fa57821701893302))
* **tag:** PFW-692 Добавляет тесты ([5627a82](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5627a82e9f3438f99bfa00a7213154aa7c0056a9))

# [1.28.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.27.0...v1.28.0) (2025-02-28)


### Features

* **Popover:** PFW-654 Добавил компонент Popover ([76d2446](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/76d2446c055d983f18d3091aad4005f606888873))
* **tag:** PFW-692 Добавляет тесты ([5627a82](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5627a82e9f3438f99bfa00a7213154aa7c0056a9))

# [1.27.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.26.0...v1.27.0) (2025-02-26)


### Features

* **segment-option:** POS-3206 Разработка компонента Segment Option на Web Components ([e215def](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e215defda2f4f16a64984c22f4f281efb128bb2c))

# [1.26.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.25.1...v1.26.0) (2025-02-26)


### Features

* **YCoreTag:** PFW-674 Реализовывает core компонент тега ([7152fa0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7152fa05c80f27814df104279e605f034cb2aecf))
* **YCoreTag:** PFW-691 Реализовывает обертки для тега ([7e1a582](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7e1a5821fabf6aa2137815cc5692daf9b3bbeb9b))

## [1.25.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.25.0...v1.25.1) (2025-02-21)


### Bug Fixes

* **Tip:** PFW-648 Обертки для core ([86c036a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/86c036ad9ffd5358c1fe1f61ef14ec22f17baee1))

# [1.25.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.24.0...v1.25.0) (2025-02-21)


### Bug Fixes

* **figma-tokens:** update tokens ([65d72f1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/65d72f1938ea507470e336efcf5578f4f36aba52))


### Features

* **Button.test.ts:** PFW-613 Исправляет тесты для кнопки ([b678b9f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b678b9f9d70946c47c4b365dc00b7016758a6818))

# [1.24.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.10...v1.24.0) (2025-02-20)


### Features

* **Tip:** PFW-645 Добавляет базовый компонент подсказки ([af90fd8](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/af90fd867d9693f274f3fbb3576d9e38e8283b8b))

## [1.23.10](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.9...v1.23.10) (2025-02-20)


### Bug Fixes

* **release:** PFW-445 Правка версий сборки ([b0b3dd2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b0b3dd2cba523d3f6c9b871146a0ccc6b2ae20d3))

## [1.23.9](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.8...v1.23.9) (2025-02-19)


### Bug Fixes

* **release:** PFW-445 Правка peerDep version ([0a8aad0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0a8aad0a9272c1fbf55bb970c3d473a4df23bea5))

## [1.23.8](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.7...v1.23.8) (2025-02-18)


### Bug Fixes

* **release:** PFW-445 Правки релиза (mjsConfig) ([55f5b97](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/55f5b97e62d359ed710363e6b81f236154909067))
* **release:** PFW-445 Фикс конфига ([7dcf97a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7dcf97aa666e14ceb7acb55070ba8ebc04ebb9aa))

## [1.23.7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.6...v1.23.7) (2025-02-18)


### Bug Fixes

* **release:** PFW-445 Правки релиза (shell) ([250cd22](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/250cd22c992fa299d41cb9830e403e9468ccbe74))
* **release:** PFW-445 Правки релиза (step) ([8cacb58](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8cacb584edfabaf5733a2eaf68ac3827e2b323a6))

## [1.23.6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.5...v1.23.6) (2025-02-18)


### Bug Fixes

* **release:** PFW-445 Правки релиза (постфикс) ([e8de403](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e8de4036857dbf2b48ea1b4f83c7a6a979ea1526))

## [1.23.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.4...v1.23.5) (2025-02-18)


### Bug Fixes

* **release:** PFW-445 Правки релиза (только нода) ([3f10fd2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3f10fd22e16410b63cd9aaa23280018e96575391))

## [1.23.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.3...v1.23.4) (2025-02-18)


### Bug Fixes

* **release:** PFW-445 Правки релиза ([f903e24](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f903e24a2e5ed99cc649f86bb86dd3701bbfbe6c))

## [1.23.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.2...v1.23.3) (2025-02-18)


### Bug Fixes

* **release:** PFW-445 Правка релиза пакета ([dafca93](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/dafca939e2c56fa40118d9f56cb7585e698884ea))

## [1.23.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.1...v1.23.2) (2025-02-18)


### Bug Fixes

* **release:** PFW-445 Правка конфига для релиза ([c06a9a4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c06a9a41046902a595a690f0b94743705bfb43dc))

## [1.23.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.23.0...v1.23.1) (2025-02-17)


### Bug Fixes

* **DropdownList:** PFW-607 Правки компонента и Unit тесты ([af284bb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/af284bbf364e8c5fd2beee5edfd4d85aaf6767ca))

# [1.23.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.22.0...v1.23.0) (2025-02-12)


### Features

* **DropdownList:** PFW-606 Добавляет компоненты Cell и DropdownList ([111b51d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/111b51d52c4c2fde4da61a705f49e788e7308165))
* **GlobalProvider:** PFW-601  Добавляет sentry ([f9e4cc5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f9e4cc52d210279661ebbc196fe559b46bfb3fd6))

# [1.22.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.21.0...v1.22.0) (2025-02-05)


### Features

* **loader:** PFW-597 Разработка angular/vue оберток для компонента quark/Loader ([65950bb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/65950bb43df7cb2a5c98de202056e0079fa3071b))

# [1.21.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.20.0...v1.21.0) (2025-02-05)


### Features

* **event-inteceptor:** PFW-515 Добавляет event-interceptor ([558cbed](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/558cbed4be0794623573c9f6af1bf382a4d8b9b5))
* **loader:** PFW-536 Разработка компонента quark/loader ([796b616](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/796b61610c743de621188a2d6522f3fadac910b2))

# [1.20.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.19.0...v1.20.0) (2025-02-03)


### Features

* **test:** PFW-474 добавлены тесты для orgamism/label, также добавлен генератор тесткейсов ([58ae5b3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/58ae5b30837c5f7205eaef772b2469a7e73a1aa6))
* **toggle.test:** PFW-472 Добавляет тесты для toggle atom ([f38381f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f38381ff4b35932e7675c7a5b65eb35cbf3ad965))

# [1.19.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.18.1...v1.19.0) (2025-01-30)


### Features

* **checkbox:** PFW-525 Фиксит баги верстки ([ae9146d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ae9146d49b2515a880e56eb5854b588f8bb3ea83))
* **tests:** PFW-470 добавление unit - тестов для atom input ([6ad4983](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6ad49836fa494835440aab2fd336d159596c8a32))

## [1.18.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.18.0...v1.18.1) (2025-01-29)


### Bug Fixes

* **css-tests:** PFW-485 Покрыть CSS тестами organism/checkbox ([3c5d6cf](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3c5d6cf766f68e4bd526c40034f5fbd025f4c323))

# [1.18.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.17.0...v1.18.0) (2025-01-28)


### Features

* **globalProvider:** PFW-526 Добавляет компонент globalProvider ([736742a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/736742a23f253467dccdf5fdff0930ce699f1f45))

# [1.17.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.16.0...v1.17.0) (2025-01-28)


### Features

* **unit-tests:** PFW-471 добавление юнит тестов для чекбокса ([8ad2252](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8ad2252ec2048ba5fe5e14ba090fbe0ace96db5b))

# [1.16.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.15.0...v1.16.0) (2025-01-27)


### Features

* **css тесты:** PFW-483 добавлены CSS тесты для  Tooltip ([ea4c56f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ea4c56f414f2b3d03ff2d44bcde7fdbf31dea098))
* **dropdown:** PFW-520 Добавляет технический компонент дропдауна ([12c6084](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/12c6084cf9ef3ebeb07d4456b54d5716d4d48043))
* **тест label:** PFW-484 добавление  CSS тестов для `label` ([1773f71](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1773f71c6f15573cd96efbce2aac19fb6cf4df28))

# [1.15.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.14.1...v1.15.0) (2025-01-27)


### Features

* **YCoreLink:** PFW-381 Добавил новый компонент Link ([09d5d5a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/09d5d5a434cab9459592018b6c45f8d40fad912e))

## [1.14.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.14.0...v1.14.1) (2025-01-23)


### Bug Fixes

* **checkbox:** PFW-480 Правки чекбокса и CSS тесты ([d67904e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d67904ec7635f210db72463f0e8c693d1eba7869))

# [1.14.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.13.0...v1.14.0) (2025-01-22)


### Bug Fixes

* **figma-tokens:** update tokens ([569eefb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/569eefbeafea0cec25ed920594393d7656e4f1de))


### Features

* **checkbox:** PFW-469 Исправляет стили чекбокса ([babc17a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/babc17a9904be2c439a26d0b1cd00e87d51697db))
* **cli:** PFW-399 Добавляет update команду ([9eef7a4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9eef7a4864f25a17f047c3df9d7a0ef7a448ff31))
* **deps:** Обновляет зависимости ([b094199](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b094199e2e0e7aa3f5d71a7022f12596a374b551))
* **effects tokens:** PFW-513 Визуализировать токены эффектов в сторибуке ([227ff25](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/227ff2529cc83e92b7d2c6383781bf587e33964a))

# [1.13.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.12.0...v1.13.0) (2025-01-16)


### Bug Fixes

* **button:** PFW-479 Правки кнопки и CSS тесты ([9025ef2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/9025ef2905b4bc243dc7cb4cf720b86c391999f2))


### Features

* **css:** PFW-436 внедрение CSS переменных радиусы, спейсинги, шрифты ([83dcea6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/83dcea6d8d003e41ea4ad03fe1f5145fcc4bb748))

# [1.12.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.11.2...v1.12.0) (2025-01-14)


### Bug Fixes

* **typography tokens:** PFW-444 доработано отображение группы типографии ([bece2c0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/bece2c0873843526fb612e54ffafb6e23267121d))


### Features

* **mixins:** PFW-253 Добавляет миксины для компонентов ([93056bd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/93056bde54fb91d107a5ce6c0cded4da3e7b1b14))
* **typography tokens:** PFW-418 добавить токены типографии в сторибук ([b4274ff](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b4274ff1e55c29babbc9744dc74cbaf386c7ccfc))

## [1.11.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.11.1...v1.11.2) (2024-12-27)


### Bug Fixes

* **figma-tokens:** update tokens ([6a61199](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6a61199adf054806d19ac32904191e2c09c4aca1))

## [1.11.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.11.0...v1.11.1) (2024-12-24)


### Bug Fixes

* **figma-tokens:** update tokens ([330782e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/330782e7bb8d785f500c234a900f63d1adc9b788))

# [1.11.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.10.0...v1.11.0) (2024-12-23)


### Features

* **stories:** PFW-325 Изменяет структуру сторибука ([d204b57](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d204b57882c31a71326f10874a0eddc9fa20d416))

# [1.10.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.9.7...v1.10.0) (2024-12-20)


### Features

* **color tokens:** PFW-347 добавление токенов в сторибук в частности отображения цветовых токенов ([f30e5d0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f30e5d04501c2784eeadf56e4358686d409a65ad))

## [1.9.7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.9.6...v1.9.7) (2024-12-18)


### Bug Fixes

* **story:** PFW-335 Добавляет аргументы для проверки переполняемости ([306b72c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/306b72c5be9a149bbf14aa37e84f8988c2d335bc))

## [1.9.6](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.9.5...v1.9.6) (2024-12-16)


### Bug Fixes

* **build:** PFW-344 Добавляет иконки к сборке ([3fa418f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3fa418fd3ff48b9c0bdcb926d567d1e2c8ff2dfc))

## [1.9.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.9.4...v1.9.5) (2024-12-16)


### Bug Fixes

* **components:** PFW-345 Исправляет имена компонентов под атомарную структуру ([ba78391](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ba78391685e654c714daec2b36b9fce900aa6d29))

## [1.9.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.9.3...v1.9.4) (2024-12-13)


### Bug Fixes

* **text:** PFW-306 Добавляет кварк текст в компоненты ([24a3174](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/24a3174fd267a02bc6fe20d5c4162767696d1093))

## [1.9.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.9.2...v1.9.3) (2024-12-13)


### Bug Fixes

* **components:** Исправляет имена компонентов под атомарную структуру ([0431923](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0431923233e89a1f31a0a4623108fd7f9c7bea55))

## [1.9.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.9.1...v1.9.2) (2024-12-12)


### Bug Fixes

* **quarks:** PFW-341 Перемещение иконки в кварки, рефактор кварка текста ([cca58b7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cca58b74bf183a1c0d2b313f629d0c87cee04244))

## [1.9.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.9.0...v1.9.1) (2024-12-12)


### Bug Fixes

* **build:** PFW-340 Фиксы билда типов ([4405220](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/44052200a846825d217053d41ca1bdde8c90c4fa))

# [1.9.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.8.0...v1.9.0) (2024-12-11)


### Features

* **stories:** PFW-342 Изменяет структуру сторибука ([d7b9e2c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d7b9e2c63eb1a60f6e360e054219b3c25c45fcbd))

# [1.8.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.7.5...v1.8.0) (2024-12-11)


### Bug Fixes

* **common-button:** PFW-310 Добавляет обертки и стори для атома кнопки ([0e0604d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0e0604d4fc786a4354e5e338791a166e5167987d))
* **quarkText:** Исправляет ошибку при сборке ([d15fccd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d15fccd3e7a23175823bc9fdaaab02f581109527))


### Features

* **quark-text:** PFW-286 Добавляет кварк текста ([8048926](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/80489265c3d3e7243dbf7a6b541fdf25d87a98af))

## [1.7.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.7.4...v1.7.5) (2024-12-11)


### Bug Fixes

* **build:** PFW-331 Правки путей и сборки ассетов ([4a906fd](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4a906fdbee458cfe3812537d2be38a3d1e621ba8))

## [1.7.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.7.3...v1.7.4) (2024-12-10)


### Bug Fixes

* **inputField:** PFW-324 Убирает иконку для короткого текста ([cbfb6d7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cbfb6d72d65d8b82f29b19f7a30e8908fa68636b))

## [1.7.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.7.2...v1.7.3) (2024-12-10)


### Bug Fixes

* **checkbox:** Исправляет импорт типов ([e830f09](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e830f099011bd05e132e7ee97a85ee09a0a627bd))

## [1.7.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.7.1...v1.7.2) (2024-12-10)


### Bug Fixes

* **types:** PFW-326 Рефакторинг типов для компонентов и их оберток ([e8a0aeb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e8a0aeb076e24563f543156d0f4a793af64d9415))

## [1.7.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.7.0...v1.7.1) (2024-12-10)


### Bug Fixes

* **css:** PFW-318 Убирает fallback для css переменных ([29f4a0f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/29f4a0fa99c680be74a86670682d70b8e5f15a7e))
* **styles:** PFW-324 Правки стилей для дизайн приемки ([28bdc80](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/28bdc80155194b9087cfa8b4c43e0022884d3b67))

# [1.7.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.6.0...v1.7.0) (2024-12-10)


### Bug Fixes

* **build:** PFW-319 Правки стилей и шрифтов билда ([97df08f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/97df08f5e6bdd18e48c6f5465d9bd9a50d1ceea8))


### Features

* **checkbox:** PFW-51 Добавляет Angular-обертку и Story над организмом YCoreCheckbox ([f163352](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f163352be9f6b4034d98f37af1d45f45ee8c4b1e))

# [1.6.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.5.2...v1.6.0) (2024-12-09)


### Bug Fixes

* **cicd:** remove --size-only arg for dev branch ([68b3aff](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/68b3aff74f6fef7c5adade31d173b0bb117d2b44))
* **stories:** PFW-279 Исправляет имена компонентов ([ae56451](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ae5645174f73673a1f1e622d7d220d7520713ed4))
* **stories:** PFW-312 Добавляет дефолтные значения для аргументов сторибука ([6d17083](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6d17083e993e3cbcf231ccb12a06baf9ac0d6d12))
* **types:** HOTFIX ошибок в типах ([8618fab](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8618fab131b6233648c29c9bdb2a16ee0f232a6b))


### Features

* **checkbox:** PFW-51 Добавляет Angular-обертку и Story над атомом CoreCommonCheckbox ([8f67c11](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8f67c11054760a70beea32b6d63577b4abf70bdb))

## [1.5.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.5.1...v1.5.2) (2024-12-09)


### Bug Fixes

* **stories:** PFW-289 Добавляет категории для компонентов в историях ([e7937c3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e7937c35bd84b3ed32dbb2a8c721d7dee8c8e59a))

## [1.5.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.5.0...v1.5.1) (2024-12-09)


### Bug Fixes

* **ui:** PFW-316 Правки кнопки и инпута для дизайн приемки ([528f708](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/528f708f07bdcd4eccc2e261895b7476786186e2))

# [1.5.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.4.0...v1.5.0) (2024-12-06)


### Bug Fixes

* **checkbox, toggle:** PFW-317 Исправляет стили полсле дизайн-приемки ([366a4f9](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/366a4f9e1deb04598c938df0eaa3220216eb1e89))


### Features

* **checkbox:** PFW-314 Покрывает токенами атом чекбокс ([b6805a7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b6805a74d99476f79d2d95c6c045d340d3476096))

# [1.4.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.3.5...v1.4.0) (2024-12-05)


### Features

* **annotation:** PFW-301 Разделяет annotation на error и annotation ([17877d3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/17877d3d72747b662fce6b5b06895a3a21912782))

## [1.3.5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.3.4...v1.3.5) (2024-12-05)


### Bug Fixes

* **story:** PFW-313 Добавляет аргумент show errors для упрощенного отображения ошибок ([8ed9d53](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8ed9d539cf2b078ed95ff571e99af0547a955946))

## [1.3.4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.3.3...v1.3.4) (2024-12-05)


### Bug Fixes

* **toggle:** PFW-285 Делает историю toggle читаемее ([0f25715](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0f25715b6409a0b1174522dfd90b83fa84f57675))

## [1.3.3](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.3.2...v1.3.3) (2024-12-04)


### Bug Fixes

* **checkbox:** PFW-300 Добавляет токены для молекулы checkbox ([6972bc7](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6972bc78351fae83d395bb8d4ee7bcbdc8ed36b0))
* **toggle:** PFW-298 Делает историии более понятными ([be7b139](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/be7b139c7aa8413c6c2e74eb3ab2bbc0403fa5ca))

## [1.3.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.3.1...v1.3.2) (2024-12-03)


### Bug Fixes

* **common-button:** PFW-297 Правка стилей ([2a188ab](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2a188ab63a2971b82943769db5736bdaa6056aaf))

## [1.3.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.3.0...v1.3.1) (2024-12-03)


### Bug Fixes

* **common-input:** PFW-264 Добавляет токены в стили CommonInput ([d79b9d8](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d79b9d8cc0fdd5b8d96aa5c5bc40a87bf9ad8eaa))
* **inputField:** PFW-261 Добавляет токены в стили InputField ([3946714](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/394671441b4dd29f29a90592b50132f830fd0ff2))
* **toggle:** Добавляет токены для toggle ([504439a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/504439a1b87595957de9f21901397bf7f2f8c84f))

# [1.3.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.2.0...v1.3.0) (2024-12-02)


### Bug Fixes

* **label:** PFW-262 Добавляет токены для label ([430af8f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/430af8f53f5af033c1a12aae2233d52e6c97c352))


### Features

* PFW-275 Стандартизирует нейминг и работу с компонентами ([2635d36](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2635d36dc7a9f74322435405c87b34f1cb0b8e11))

# [1.2.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.1.1...v1.2.0) (2024-12-02)


### Bug Fixes

* add release url ([cdcda64](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cdcda64cd7b18b73f3600e931dbda190d579b079))
* **annotation:** PFW-263 Добавляет токены для аннотации ([d2d652a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d2d652a5b4726bb02dc0dc0e701a0d66c8f363e2))
* **button:** PFW-209 Актуализация кнопки и историй ([10c2e7e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/10c2e7ec1b6571453b5c584e4640c4129cf7ac31))
* **button:** PFW-209 Убирает слот ([c9344be](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c9344be5f0271418a9a519e28d4c38f1a00e281d))
* **button:** PFW-259 Добавляет токены для кнопки и правки стилей ([b95baa0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b95baa0f3946581ac1fe757d1ada7495e8c4c9e4))
* **checkbox:** PFW-48 Ревью ([fbad37c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fbad37c8b3b5a7b2b9c81a1ad3d0c96521fe8db5))
* **ci:** add argo release ([4095c21](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4095c21848ed95c9d8d97d492697d71617b6407e))
* **cicd:** fixed package publish steps ([790af2e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/790af2ed5c478b821afbf139327affe2c0f3908a))
* **cicd:** fixed private npm registry workflow ([5fbc56e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5fbc56e796877c002e8332848a4a9177ec3f97e9))
* **common-toggle:** PFW-265 Добавляет токены для переменных ([2ab77d0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2ab77d0c27b5e1d8bab74cc425565cedc7feca7e))
* **figma-tokens:** update tokens ([d8d8769](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d8d8769faf0b21b64ff25baf3d7e6747f07da8ab))
* **package:** Удаляет peer зависимости ([fc1ef0b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fc1ef0b609cc3301bbe93c988d798132323a5f20))
* **pipeline:** Правки ошибок в пайплайне ([d638e0d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d638e0d281e291eb6af391e9827c301f944b62e8))
* **postinstall:** Убирает postinstall ([06864f2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/06864f25f336369d3a841fe4bd2a95d6566d3cf2))
* rm release vars ([207ad94](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/207ad942cf6dd8794d16a9e29a701caf4572234d))
* **styles:** PFW-271 Добавляет новый подход для написания css ([6716f1c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6716f1c88721021a99aca8fc3c19366b3703d729))
* toggle.stories ([1176a32](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1176a32e81b161e1bfbe7e1d3f350e2ca05ea9aa))
* **toggle:** add scale for toggle ([da404cb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/da404cb04e443ba2a2ab12615d9a546062dbeecb))
* **toggle:** add scale story for toggle ([411044c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/411044c53766c05da927f19e63ab08716b5a212c))
* **toggle:** bem scale ([452046b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/452046be5c80e16ae3c1b9a85bb9f6fb416a80c8))
* **types:** PFW-276 исправлена satisfied провка на core свойства для vue оберток ([5599222](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5599222ffc905e6906b24ab6b7756b87388b92ed))
* **web:** PFW-270 Добавлены имена в декораторы ([b17c750](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b17c750411918d320de3b64f3f03359630d3bbad))


### Features

* **checkbox:** PFW-47 добавляет template для core компонента ([3349b09](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3349b094964e6c7bc92b6828cc9f7c8ed3ca5315))
* **checkbox:** PFW-48 Добавляет молекулу CoreCheckbox ([6527b6d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6527b6df6901ca7f846d837c8028c95fef95fea6))
* **checkbox:** PFW-50 Добавляет логику, пропсы и эмиты для CoreCommonCheckbox ([e876af5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e876af51eae1bd827771218e6bac035e82975c03))
* **checkbox:** PFW-52 Добавляет VUE обертку и Story для Common Checkbox и Checkbox ([f0d4911](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f0d4911ead67e0face4fabaaada642d8606f8342))
* **common-toggle:** add common togle ([2e9cfbf](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2e9cfbf093696c6b5bafecfafd4beca18b211713))
* **icon-button:** PFW-256 Добавляет компонент iconButton ([ead7a86](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ead7a864e17e23b48c624feeed913305cad03fd6))
* **iconButton:** PFW-266 Добавляет Vue/Angular обертку и Story для IconButton ([ce94dca](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ce94dca3b60bdff6eb4a53a3d46b22ba00126903))
* **tokens:** PFW-268 Добавляет Vite плагин для стилей ([71a4537](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/71a4537fdc110180439992f76a8b3a0b8761fe85))


### Performance Improvements

* **deps:** revert eslint ([2a1f738](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2a1f738f58f53d3f71f28ed7eb6165aefa9e8836))
* **deps:** update deps ([f254f32](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f254f3233bc8025933f4a9f4d7540dfcbda90525))

# [1.2.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.1.1...v1.2.0) (2024-12-02)


### Bug Fixes

* add release url ([cdcda64](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cdcda64cd7b18b73f3600e931dbda190d579b079))
* **button:** PFW-209 Актуализация кнопки и историй ([10c2e7e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/10c2e7ec1b6571453b5c584e4640c4129cf7ac31))
* **button:** PFW-209 Убирает слот ([c9344be](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c9344be5f0271418a9a519e28d4c38f1a00e281d))
* **button:** PFW-259 Добавляет токены для кнопки и правки стилей ([b95baa0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b95baa0f3946581ac1fe757d1ada7495e8c4c9e4))
* **checkbox:** PFW-48 Ревью ([fbad37c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fbad37c8b3b5a7b2b9c81a1ad3d0c96521fe8db5))
* **ci:** add argo release ([4095c21](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4095c21848ed95c9d8d97d492697d71617b6407e))
* **cicd:** fixed package publish steps ([790af2e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/790af2ed5c478b821afbf139327affe2c0f3908a))
* **cicd:** fixed private npm registry workflow ([5fbc56e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5fbc56e796877c002e8332848a4a9177ec3f97e9))
* **common-toggle:** PFW-265 Добавляет токены для переменных ([2ab77d0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2ab77d0c27b5e1d8bab74cc425565cedc7feca7e))
* **figma-tokens:** update tokens ([d8d8769](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d8d8769faf0b21b64ff25baf3d7e6747f07da8ab))
* **package:** Удаляет peer зависимости ([fc1ef0b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fc1ef0b609cc3301bbe93c988d798132323a5f20))
* **pipeline:** Правки ошибок в пайплайне ([d638e0d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d638e0d281e291eb6af391e9827c301f944b62e8))
* **postinstall:** Убирает postinstall ([06864f2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/06864f25f336369d3a841fe4bd2a95d6566d3cf2))
* rm release vars ([207ad94](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/207ad942cf6dd8794d16a9e29a701caf4572234d))
* **styles:** PFW-271 Добавляет новый подход для написания css ([6716f1c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6716f1c88721021a99aca8fc3c19366b3703d729))
* toggle.stories ([1176a32](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1176a32e81b161e1bfbe7e1d3f350e2ca05ea9aa))
* **toggle:** add scale for toggle ([da404cb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/da404cb04e443ba2a2ab12615d9a546062dbeecb))
* **toggle:** add scale story for toggle ([411044c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/411044c53766c05da927f19e63ab08716b5a212c))
* **toggle:** bem scale ([452046b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/452046be5c80e16ae3c1b9a85bb9f6fb416a80c8))
* **types:** PFW-276 исправлена satisfied провка на core свойства для vue оберток ([5599222](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5599222ffc905e6906b24ab6b7756b87388b92ed))
* **web:** PFW-270 Добавлены имена в декораторы ([b17c750](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b17c750411918d320de3b64f3f03359630d3bbad))


### Features

* **checkbox:** PFW-47 добавляет template для core компонента ([3349b09](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3349b094964e6c7bc92b6828cc9f7c8ed3ca5315))
* **checkbox:** PFW-48 Добавляет молекулу CoreCheckbox ([6527b6d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6527b6df6901ca7f846d837c8028c95fef95fea6))
* **checkbox:** PFW-50 Добавляет логику, пропсы и эмиты для CoreCommonCheckbox ([e876af5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e876af51eae1bd827771218e6bac035e82975c03))
* **checkbox:** PFW-52 Добавляет VUE обертку и Story для Common Checkbox и Checkbox ([f0d4911](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f0d4911ead67e0face4fabaaada642d8606f8342))
* **common-toggle:** add common togle ([2e9cfbf](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2e9cfbf093696c6b5bafecfafd4beca18b211713))
* **icon-button:** PFW-256 Добавляет компонент iconButton ([ead7a86](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ead7a864e17e23b48c624feeed913305cad03fd6))
* **iconButton:** PFW-266 Добавляет Vue/Angular обертку и Story для IconButton ([ce94dca](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ce94dca3b60bdff6eb4a53a3d46b22ba00126903))
* **tokens:** PFW-268 Добавляет Vite плагин для стилей ([71a4537](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/71a4537fdc110180439992f76a8b3a0b8761fe85))


### Performance Improvements

* **deps:** revert eslint ([2a1f738](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2a1f738f58f53d3f71f28ed7eb6165aefa9e8836))
* **deps:** update deps ([f254f32](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f254f3233bc8025933f4a9f4d7540dfcbda90525))

# [1.2.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.1.1...v1.2.0) (2024-12-02)


### Bug Fixes

* add release url ([cdcda64](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cdcda64cd7b18b73f3600e931dbda190d579b079))
* **button:** PFW-209 Актуализация кнопки и историй ([10c2e7e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/10c2e7ec1b6571453b5c584e4640c4129cf7ac31))
* **button:** PFW-209 Убирает слот ([c9344be](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c9344be5f0271418a9a519e28d4c38f1a00e281d))
* **checkbox:** PFW-48 Ревью ([fbad37c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fbad37c8b3b5a7b2b9c81a1ad3d0c96521fe8db5))
* **ci:** add argo release ([4095c21](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4095c21848ed95c9d8d97d492697d71617b6407e))
* **cicd:** fixed package publish steps ([790af2e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/790af2ed5c478b821afbf139327affe2c0f3908a))
* **cicd:** fixed private npm registry workflow ([5fbc56e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5fbc56e796877c002e8332848a4a9177ec3f97e9))
* **figma-tokens:** update tokens ([d8d8769](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d8d8769faf0b21b64ff25baf3d7e6747f07da8ab))
* **package:** Удаляет peer зависимости ([fc1ef0b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fc1ef0b609cc3301bbe93c988d798132323a5f20))
* **pipeline:** Правки ошибок в пайплайне ([d638e0d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d638e0d281e291eb6af391e9827c301f944b62e8))
* **postinstall:** Убирает postinstall ([06864f2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/06864f25f336369d3a841fe4bd2a95d6566d3cf2))
* rm release vars ([207ad94](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/207ad942cf6dd8794d16a9e29a701caf4572234d))
* **styles:** PFW-271 Добавляет новый подход для написания css ([6716f1c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6716f1c88721021a99aca8fc3c19366b3703d729))
* toggle.stories ([1176a32](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1176a32e81b161e1bfbe7e1d3f350e2ca05ea9aa))
* **toggle:** add scale for toggle ([da404cb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/da404cb04e443ba2a2ab12615d9a546062dbeecb))
* **toggle:** add scale story for toggle ([411044c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/411044c53766c05da927f19e63ab08716b5a212c))
* **toggle:** bem scale ([452046b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/452046be5c80e16ae3c1b9a85bb9f6fb416a80c8))
* **types:** PFW-276 исправлена satisfied провка на core свойства для vue оберток ([5599222](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5599222ffc905e6906b24ab6b7756b87388b92ed))
* **web:** PFW-270 Добавлены имена в декораторы ([b17c750](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/b17c750411918d320de3b64f3f03359630d3bbad))


### Features

* **checkbox:** PFW-47 добавляет template для core компонента ([3349b09](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3349b094964e6c7bc92b6828cc9f7c8ed3ca5315))
* **checkbox:** PFW-48 Добавляет молекулу CoreCheckbox ([6527b6d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/6527b6df6901ca7f846d837c8028c95fef95fea6))
* **checkbox:** PFW-50 Добавляет логику, пропсы и эмиты для CoreCommonCheckbox ([e876af5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e876af51eae1bd827771218e6bac035e82975c03))
* **checkbox:** PFW-52 Добавляет VUE обертку и Story для Common Checkbox и Checkbox ([f0d4911](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f0d4911ead67e0face4fabaaada642d8606f8342))
* **common-toggle:** add common togle ([2e9cfbf](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2e9cfbf093696c6b5bafecfafd4beca18b211713))
* **icon-button:** PFW-256 Добавляет компонент iconButton ([ead7a86](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ead7a864e17e23b48c624feeed913305cad03fd6))
* **iconButton:** PFW-266 Добавляет Vue/Angular обертку и Story для IconButton ([ce94dca](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ce94dca3b60bdff6eb4a53a3d46b22ba00126903))
* **tokens:** PFW-268 Добавляет Vite плагин для стилей ([71a4537](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/71a4537fdc110180439992f76a8b3a0b8761fe85))


### Performance Improvements

* **deps:** revert eslint ([2a1f738](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2a1f738f58f53d3f71f28ed7eb6165aefa9e8836))
* **deps:** update deps ([f254f32](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f254f3233bc8025933f4a9f4d7540dfcbda90525))

## [1.2.2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.2.1...v1.2.2) (2024-11-27)


### Bug Fixes

* **cicd:** fixed package publish steps ([0dbebdb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/0dbebdb10557eb5c43f837ef38abead1ebc0b44e))

## [1.2.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.2.0...v1.2.1) (2024-11-27)


### Bug Fixes

* **cicd:** fixed package publish steps ([03f1a27](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/03f1a271638f74d511115e902c25ce7bf70147e1))
* **cicd:** fixed package publish steps ([dc1c160](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/dc1c160e6b53d5687e792a7fdf6ea664b2de7ea5))

# [1.2.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.1.1...v1.2.0) (2024-11-27)


### Bug Fixes

* add release url ([cdcda64](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/cdcda64cd7b18b73f3600e931dbda190d579b079))
* **button:** PFW-209 Актуализация кнопки и историй ([10c2e7e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/10c2e7ec1b6571453b5c584e4640c4129cf7ac31))
* **button:** PFW-209 Убирает слот ([c9344be](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/c9344be5f0271418a9a519e28d4c38f1a00e281d))
* **cicd:** fixed package publish steps ([2dc9adb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2dc9adb14aff762b3b9615f03b23f4bddcd685e0))
* **cicd:** fixed package publish steps ([03eda16](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/03eda1689dc122a9831c1ec8e80660386eb41cbf))
* **cicd:** fixed package publish steps ([bb2fb28](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/bb2fb28f8e03980754cdb6add8f328a98cb049b1))
* **cicd:** fixed package publish steps ([7d23f71](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7d23f7197a7bbafcd5785514af09ec296a1cdc1d))
* **cicd:** fixed package publish steps ([5151ef2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5151ef223989da37c4ae26a467c3dfcfb32b0281))
* **cicd:** fixed package publish steps ([d7cc19c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d7cc19c98536aa4114780e574422b284a6f9cba1))
* **cicd:** fixed package publish steps ([ef45ce4](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ef45ce42e19a32fc4305ca3e181eda31b649f315))
* **cicd:** fixed package publish steps ([8dcce4d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8dcce4dd11c13fd558af19d80b6e27d5a8decc63))
* **cicd:** fixed package publish steps ([89c3106](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/89c31064f3adbf9048b064a7e381fa0acbdf96da))
* **cicd:** fixed package publish steps ([e13664c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e13664ca770f46280b4f01c7aca9c5d96c3992ca))
* **cicd:** fixed package publish steps ([ab88860](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ab888607f09f538881d8d10f3f3c4ec6be38bf1d))
* **cicd:** fixed package publish steps ([bc4fb32](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/bc4fb32406da5eb32d6ae7e0303171c790af7c0f))
* **cicd:** fixed package publish steps ([4fd51c2](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4fd51c2afc8e3e6b5eec8f1555a2b50298aeef3b))
* **cicd:** fixed package publish steps ([87f2b85](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/87f2b85aeebe0b9a08dc46f12094d89edef61fb4))
* **cicd:** fixed package publish steps ([8bb1197](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/8bb11971abe7349b9b4d4ca75f37d89684012659))
* **cicd:** fixed package publish steps ([ce60e9b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ce60e9b94cf81d2883885078df64761fde621ca6))
* **cicd:** fixed package publish steps ([3a47c9a](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3a47c9ad9a96aa9c3e09444b65fd0e2319f6fcb4))
* **cicd:** fixed package publish steps ([3e96b7f](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3e96b7f622739d8f44b671939806e2234e1066fc))
* **cicd:** fixed package publish steps ([7e9c5fb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7e9c5fb0c255e233873ff53b149dd36421aedb64))
* **cicd:** fixed private npm registry workflow ([5fbc56e](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/5fbc56e796877c002e8332848a4a9177ec3f97e9))
* **figma-tokens:** update tokens ([d8d8769](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d8d8769faf0b21b64ff25baf3d7e6747f07da8ab))
* **package:** Удаляет peer зависимости ([fc1ef0b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/fc1ef0b609cc3301bbe93c988d798132323a5f20))
* **pipeline:** Правки ошибок в пайплайне ([d638e0d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/d638e0d281e291eb6af391e9827c301f944b62e8))
* rm release vars ([207ad94](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/207ad942cf6dd8794d16a9e29a701caf4572234d))
* toggle.stories ([1176a32](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/1176a32e81b161e1bfbe7e1d3f350e2ca05ea9aa))
* **toggle:** add scale for toggle ([da404cb](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/da404cb04e443ba2a2ab12615d9a546062dbeecb))
* **toggle:** add scale story for toggle ([411044c](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/411044c53766c05da927f19e63ab08716b5a212c))
* **toggle:** bem scale ([452046b](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/452046be5c80e16ae3c1b9a85bb9f6fb416a80c8))


### Features

* **checkbox:** PFW-47 добавляет template для core компонента ([3349b09](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/3349b094964e6c7bc92b6828cc9f7c8ed3ca5315))
* **checkbox:** PFW-50 Добавляет логику, пропсы и эмиты для CoreCommonCheckbox ([e876af5](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/e876af51eae1bd827771218e6bac035e82975c03))
* **common-toggle:** add common togle ([2e9cfbf](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2e9cfbf093696c6b5bafecfafd4beca18b211713))
* **icon-button:** PFW-256 Добавляет компонент iconButton ([ead7a86](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/ead7a864e17e23b48c624feeed913305cad03fd6))


### Performance Improvements

* **deps:** revert eslint ([2a1f738](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/2a1f738f58f53d3f71f28ed7eb6165aefa9e8836))
* **deps:** update deps ([f254f32](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/f254f3233bc8025933f4a9f4d7540dfcbda90525))

## [1.1.1](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.1.0...v1.1.1) (2024-11-20)


### Bug Fixes

* **package:** Add package in lock file ([7eb9188](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/7eb91883f43773c5aa1691930527fb0b93a0ed94))
* **story:** PFW-241 Добавляет комманду для запуска core/vue/ng storybook одновременно ([050ac54](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/050ac54d11476a072ffab2325698635b44bcb33c))

# [1.1.0](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/compare/v1.0.2...v1.1.0) (2024-11-20)


### Bug Fixes

* **sr:** PFW-221 Правки конфига ([4d91709](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/4d9170915ac1896c3dff6358b597815bf822aba2))


### Features

* **toggle:** add toggle component ([733337d](https://gitlab.yclients.tech/platform/frontend-web/yclients-ui/commit/733337d711477833db86d499f2ceb4194245e5d8))
