export const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "Orders API",
    "version": "1.0.0",
    "description": "API REST para la gestión de pedidos, clientes y productos."
  },
  "servers": [
    {
      "url": "http://localhost:3000/api/v1",
      "description": "Servidor de Desarrollo"
    }
  ],
  "paths": {
    "/orders": {
      "get": {
        "summary": "Listar pedidos",
        "description": "Retorna una lista de todos los pedidos.",
        "responses": {
          "200": {
            "description": "Lista de pedidos obtenida con éxito."
          }
        }
      },
      "post": {
        "summary": "Crear un pedido",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "customerId": { "type": "integer", "example": 1 },
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "productId": { "type": "integer", "example": 1 },
                        "quantity": { "type": "integer", "example": 2 }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Pedido creado exitosamente." },
          "400": { "description": "Error de validación (ej. cliente o producto no existe)." }
        }
      }
    },
    "/orders/{orderId}": {
      "get": {
        "summary": "Obtener detalle de un pedido",
        "parameters": [
          { "name": "orderId", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        "responses": {
          "200": { "description": "Detalles del pedido." },
          "404": { "description": "Pedido no encontrado." }
        }
      },
      "delete": {
        "summary": "Eliminar o anular un pedido",
        "parameters": [
          { "name": "orderId", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        "responses": {
          "204": { "description": "Pedido eliminado correctamente." },
          "404": { "description": "Pedido no encontrado." }
        }
      }
    },
    "/orders/{orderId}/items": {
      "get": {
        "summary": "Listar items de un pedido",
        "parameters": [
          { "name": "orderId", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        "responses": {
          "200": { "description": "Lista de items." }
        }
      },
      "post": {
        "summary": "Agregar un producto a un pedido existente",
        "parameters": [
          { "name": "orderId", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "productId": { "type": "integer", "example": 3 },
                  "quantity": { "type": "integer", "example": 5 }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Item agregado exitosamente." }
        }
      }
    },
    "/orders/{orderId}/items/{itemId}": {
      "patch": {
        "summary": "Actualizar cantidad de un item",
        "parameters": [
          { "name": "orderId", "in": "path", "required": true, "schema": { "type": "integer" } },
          { "name": "itemId", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "quantity": { "type": "integer", "example": 10 }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Cantidad actualizada." }
        }
      },
      "delete": {
        "summary": "Eliminar un item del pedido",
        "parameters": [
          { "name": "orderId", "in": "path", "required": true, "schema": { "type": "integer" } },
          { "name": "itemId", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        "responses": {
          "204": { "description": "Item eliminado correctamente." }
        }
      }
    },
    "/products": {
      "get": {
        "summary": "Listar productos",
        "responses": {
          "200": { "description": "Lista de productos." }
        }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "Detalle de un producto",
        "parameters": [
          { "name": "productId", "in": "path", "required": true, "schema": { "type": "integer" } }
        ],
        "responses": {
          "200": { "description": "Detalles del producto." }
        }
      }
    }
  }
};
