**Ejercicio 01. ¿Qué pasaría si usaras `SNAPSHOT.width` para decidir cuántas columnas mostrar en una galería?**

Las columnas se calcularían una sola vez, con el ancho que tenía la ventana al cargar el módulo, y nunca se recalcularían. Si la app arranca en vertical (2 columnas) y el usuario rota a horizontal, la galería seguiría con 2 columnas estiradas. Lo mismo pasa en split-view, plegables y ventanas redimensionables. Solución: calcular las columnas dentro del componente con `useWindowDimensions()`.

**Ejercicio 02. ¿Por qué no puedes llamar `useWindowDimensions()` fuera de un componente?**

Porque es un hook: usa `useState` y `useEffect` internamente, y React solo puede asociarlos a una instancia de componente durante su render. Fuera de uno lanzaría “Invalid hook call”. Además, a nivel de archivo el código corre una sola vez, así que no habría re-render que actualice el valor: volverías a tener una instantánea estática.

**Ejercicio 03. ¿En qué caso real de tu proyecto final la misma pantalla debería cambiar de columna a fila?**

Ejemplo (adáptalo a tu proyecto): en un dashboard de resumen, las tarjetas de métricas van apiladas en retrato y en fila en paisaje para aprovechar el ancho. Otros casos: detalle de producto (imagen arriba/texto abajo en retrato, imagen a la izquierda/texto a la derecha en paisaje) y formularios en dos columnas en paisaje.

**Ejercicio 04. ¿Por qué las funciones viven en `src/utils/` y no dentro de una pantalla? ¿Quién más las va a usar?**

Porque son lógica compartida: la galería (ejercicio 07) usa `getColumns`, y otras pantallas, componentes y el proyecto final necesitarán decidir por clase de dispositivo. Así hay una sola fuente de verdad para los cortes (si cambias 600 a 640, lo cambias en un solo lugar) y son funciones puras, fáciles de probar y utilizables fuera de componentes porque reciben `width` como parámetro.

**Ejercicio 05. ¿Qué inset le falta a la galería y dónde lo aplicarías?**

Le falta `insets.bottom` (barra de gestos/home indicator), y en paisaje también `insets.left` y `insets.right`. Lo aplicaría en la propia pantalla, como `paddingBottom` en el `contentContainerStyle` de la `FlatList`, no en `App.js`: cada pantalla sabe qué bordes toca, evita duplicar relleno con headers o tabs, y así la lista sigue dibujándose de borde a borde pero el último elemento queda alcanzable.

**Ejercicio 06. ¿Por qué `compact` exige `cardWidth > 0`? ¿Qué se vería en el primer render si no lo hicieras?**

Porque `cardWidth` empieza en 0, que significa “aún no medí”, y `0 < 240` es `true`. Sin la condición, toda tarjeta nacería compacta (imagen de 80 dp, sin descripción, “compacta · 0 dp”) y un frame después, al llegar `onLayout`, saltaría a completa: un parpadeo con cambio de altura que empuja el contenido.

**Ejercicio 07. Si la galería va dentro de un panel lateral de 320 dp, ¿qué cambiarías?**

Dejaría de medir la ventana y mediría el contenedor con `onLayout` (como en el ejercicio 06): guardar `containerWidth`, calcular `columns = getColumns(containerWidth)` e `itemWidth = containerWidth / columns`, y no renderizar la lista hasta que `containerWidth > 0`. Regla de dos niveles: `useWindowDimensions` decide el diseño de la pantalla; `onLayout` decide el diseño interno del componente reutilizable.
