# 🚀 My Linktree Espacial 3D
## 📋 Descripción
Linktree Espacial 3D es una aplicación web moderna que ofrece una experiencia inmersiva para compartir tus enlaces importantes en un solo lugar. Con un diseño futurista inspirado en el espacio, esta aplicación presenta tus enlaces en un entorno 3D interactivo con un planeta giratorio, anillos flotantes y efectos visuales impresionantes.

## ✨ Características
- Experiencia 3D Inmersiva : Planeta 3D con textura realista y anillos flotantes que giran a diferentes velocidades
- Diseño Responsivo : Se adapta perfectamente a dispositivos móviles y de escritorio
- Animaciones Fluidas : Transiciones suaves y efectos visuales atractivos usando Framer Motion
- Efectos Holográficos : Avatar con efecto de brillo y bordes luminosos
- Estilo Futurista : Paleta de colores neón y efectos de desenfoque para una estética espacial
- Enlaces Personalizables : Fácil configuración para añadir o modificar tus propios enlaces
- Iconos SVG Integrados : Iconos vectoriales que se escalan perfectamente en cualquier resolución
## 🛠️ Tecnologías Utilizadas
- React : Biblioteca JavaScript para construir interfaces de usuario
- Vite : Herramienta de compilación que proporciona un entorno de desarrollo más rápido
- Three.js (via React Three Fiber): Biblioteca 3D para crear y mostrar gráficos 3D en el navegador
- Tailwind CSS : Framework CSS utilitario para diseño rápido y responsivo
- Framer Motion : Biblioteca para animaciones en React

## 🚀 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/linktree-espacial-3d.git
   cd linktree-espacial-3d
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en http://localhost:5173


## 🔧 Personalización
### Modificar Enlaces
Para personalizar tus enlaces, edita el array ``links`` en el archivo ``src/App.jsx`` :
```jsx
const links = [
  { 
    icon: <TuIconoSVG />,
    label: 'Nombre del Enlace', 
    url: 'https://tu-url.com', 
    delay: 0.1 // Retraso de la animación
  },
  // Añade más enlaces aquí
]
```

### Cambiar Avatar
Reemplaza el archivo de imagen en la carpeta pública y actualiza la ruta en App.jsx :

### Personalizar Colores
Modifica la paleta de colores en tailwind.config.js :

```
colors: {
  'space-dark': '#0a0a1a',
  'space-blue': '#9423E7',
  'space-purple': '#5912A6',
  'space-cyan': '#E17FCD',
  'neon-blue': '#F8ACCD',
  'neon-purple': '#C968D5',
}
```
### Ajustar Efectos 3D
Puedes modificar los componentes 3D en App.jsx para cambiar el tamaño, velocidad y colores de los elementos:

```
<FloatingRing radius={2.2} speed={0.1} 
rotationAxis="y" color="#9423E7" />
```
## 📱 Despliegue
Para construir la aplicación para producción:

```
npm run build
```
Los archivos generados estarán en la carpeta dist y podrás desplegarlos en cualquier servicio de hosting estático como Netlify, Vercel, GitHub Pages, etc.

## 🤝 Contribuciones
Las contribuciones son bienvenidas. Si encuentras algún problema o tienes sugerencias, no dudes en abrir un issue o enviar un pull request.

⭐ Desarrollado con ☕&🎧 por Xander
