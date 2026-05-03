# Planeación de Actividad 1: Desarrollo de API REST (orders-api)

Este documento detalla el paso a paso para la realización de la Actividad 1 de la guía ADSO, enfocándose en el desarrollo del backend utilizando Node.js y una arquitectura limpia por capas.

## 1. Objetivos
- Diseñar y construir una API REST para la gestión de pedidos (`orders`).
- Aplicar arquitectura por capas (Routes, Controllers, Services, Repositories).
- Implementar flujo de trabajo Gitflow y commits semánticos.
- Documentar con OpenAPI/Swagger.
- Desplegar la API en un entorno funcional.

## 2. Stack Tecnológico
- **Lenguaje**: JavaScript / TypeScript (según imagen de arquitectura).
- **Framework**: Node.js + Express.
- **Base de Datos**: (Por definir, pero se abstraerá mediante Repositorios).
- **Documentación**: Swagger / OpenAPI.
- **Entorno**: Node.js.

## 3. Arquitectura del Proyecto
Basado en la imagen proporcionada, seguiremos una estructura de carpetas clara:

```text
orders-api/
├── src/
│   ├── controllers/    # Lógica de manejo de peticiones HTTP
│   ├── models/         # Definiciones de datos (Interfaces/Clases)
│   ├── routes/         # Definición de rutas (endpoints)
│   ├── services/       # Lógica de negocio (Cálculos de totalAmount, validaciones)
│   ├── repositories/   # Acceso a datos (Simulado o DB real)
│   └── index.ts        # Punto de entrada de la aplicación
├── docs/               # Guías y documentación técnica
├── .env                # Variables de entorno
├── package.json
└── tsconfig.json
```

## 4. Paso a Paso de la Implementación

### Fase 1: Configuración Inicial
1. [x] Inicializar repositorio Git y configurar ramas (main, develop).
2. [x] Inicializar proyecto Node.js (`npm init`).
3. [x] Instalar dependencias base (express, dotenv, cors, swagger-ui-express).
4. [x] Configurar TypeScript (usaremos TS según la imagen `index.ts`).
5. [x] Configurar variables de entorno iniciales.

### Fase 2: Modelado y Acceso a Datos
1. [x] Definir modelos/interfaces para: `Customer`, `Order`, `OrderItem`, `Product`, `Supplier`.
2. [x] Crear repositorios que carguen los datos desde el archivo `Orders.json` proporcionado.
3. [x] **Normalización**: Al cargar el JSON, extraer y almacenar listas únicas de Clientes y Productos para servir los endpoints de consulta.
4. [x] Implementar la lógica de persistencia en memoria (usando el JSON como semilla).

### Fase 3: Lógica de Negocio (Services)
1. [x] Implementar `OrderService` con:
    - Validación de existencia de clientes y productos.
    - Lógica de cálculo automático de `totalAmount` al crear/modificar/eliminar items.
2. [x] Implementar servicios para productos y otros recursos complementarios.

### Fase 4: Controladores y Rutas (Endpoints)
Implementar los endpoints obligatorios bajo el prefijo `/api/v1`:
1. [x] **Orders**:
    - `GET /orders` (Listado con paginación/filtros).
    - `GET /orders/{id}` (Detalle con items y cliente).
    - `POST /orders` (Creación con validación).
    - `PUT /orders/{id}` (Reemplazo completo).
    - `PATCH /orders/{id}` (Actualización parcial).
    - `DELETE /orders/{id}` (Eliminación/Anulación).
2. [x] **Order Items**:
    - `GET /orders/{id}/items`
    - `POST /orders/{id}/items` (Agregación con recálculo).
    - `PATCH /orders/{id}/items/{itemId}` (Edición con recálculo).
    - `DELETE /orders/{id}/items/{itemId}` (Eliminación con recálculo).
3. [x] **Products**:
    - `GET /products` (Listado).
    - `GET /products/{id}` (Detalle con proveedor).
4. [x] **Sistema**:
    - `GET /health` (Estado del servicio).
    - `GET /docs` (Swagger UI).

### Fase 5: Documentación y Calidad
1. [x] Configurar Swagger para autogenerar documentación de los endpoints.
2. [x] Implementar manejo de errores consistente (400, 404, 409, 500).
3. [ ] Realizar pruebas manuales (Postman/Thunder Client) según la rúbrica.

### Fase 6: Despliegue y Entrega
1. [x] Preparar el archivo `README.md` con instrucciones de instalación.
2. [ ] Etiquetar versión final como `v1.0.0` (SemVer).
3. [ ] Desplegar en plataforma (Render/Vercel/RailWay).

## 5. Reglas de Negocio Críticas a Considerar
- **Recálculo del total**: El `totalAmount` es siempre la suma de `unitPrice * quantity` de sus items. No se guarda estáticamente sin validación.
- **Validaciones**: No se permite crear pedidos para clientes inexistentes ni agregar productos no registrados.
- **Códigos HTTP**: Uso estricto de 201 para creación, 204 para eliminación exitosa, 404 para no encontrado, etc.
