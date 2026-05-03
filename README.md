# Orders API REST

Esta es una API REST desarrollada en Node.js, Express y TypeScript para la gestión de un dominio de ventas (Orders, Items, Products, Customers, Suppliers). Este proyecto cumple con los requerimientos de la "Actividad 1" del programa ADSO del SENA.

## 🚀 Tecnologías Utilizadas
*   **Node.js**: Entorno de ejecución.
*   **Express**: Framework web.
*   **TypeScript**: Lenguaje de tipado estricto.
*   **Swagger (OpenAPI)**: Documentación interactiva de la API.

## 📋 Requisitos Previos
Asegúrate de tener instalado en tu sistema:
*   [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada).
*   Git (Para clonar el repositorio).

## 🛠️ Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/CarlosAcosta44/orders-api.git
    cd orders-api
    ```

2.  **Instalar las dependencias:**
    ```bash
    npm install
    ```

3.  **Archivo de entorno:**
    Verifica que exista un archivo `.env` en la raíz del proyecto (si no, créalo) con el siguiente contenido básico:
    ```env
    PORT=3000
    NODE_ENV=development
    ```

## 💻 Ejecución del Proyecto

**Modo Desarrollo (Recomendado):**
Este comando iniciará el servidor utilizando `tsx`, lo que permite recompilación automática y soporte nativo para módulos ES.
```bash
npm run dev
```

**Modo Producción:**
Para transpilar el código TypeScript a JavaScript y ejecutarlo:
```bash
npm run build
npm start
```

## 📖 Documentación de la API (Swagger)
Una vez que el servidor esté corriendo (por defecto en el puerto 3000), puedes acceder a la interfaz gráfica de la API para visualizar y probar todos los endpoints disponibles:

👉 **URL de Swagger:** [http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs)

## 📡 Endpoints Principales
Todos los endpoints están bajo el prefijo `/api/v1/`. Los más destacados son:
*   `GET /orders`: Listar todos los pedidos.
*   `POST /orders`: Crear un nuevo pedido (Calcula automáticamente el total).
*   `GET /products`: Listar productos disponibles.
*   `GET /health`: Verificar el estado del servidor.

## 👥 Arquitectura y Patrones
Este proyecto aplica los siguientes patrones y flujos de trabajo:
*   **Arquitectura por capas:** Separación clara en `routes`, `controllers`, `services` y `repositories`.
*   **Gitflow:** Uso de ramas `main`, `develop` y `feature/*`.
*   **Commits Semánticos:** Historial limpio usando prefijos como `feat`, `fix`, `docs`, etc.
*   **Versionamiento Semántico:** Liberación mediante tags (Ej. `v1.0.0`).
