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
          "200": { "description": "Lista de pedidos obtenida con éxito." }
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
      "put": {
        "summary": "Reemplazar completamente un pedido",
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
                  "customerId": { "type": "integer", "example": 2 },
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "productId": { "type": "integer", "example": 4 },
                        "quantity": { "type": "integer", "example": 1 }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Pedido reemplazado exitosamente." },
          "400": { "description": "Error de validación." },
          "404": { "description": "Pedido no encontrado." }
        }
      },
      "patch": {
        "summary": "Actualizar parcialmente un pedido",
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
                  "customerId": { "type": "integer", "example": 2 },
                  "orderDate": { "type": "string", "format": "date-time", "example": "2026-05-01T10:00:00Z" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Pedido actualizado exitosamente." },
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
        "summary": "Actualizar cantidad y/o precio de un item",
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
                  "quantity": { "type": "integer", "example": 10 },
                  "unitPrice": { "type": "number", "example": 15.5 }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Item actualizado y totalAmount recalculado." }
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
    "/customers": {
      "get": {
        "summary": "Listar clientes",
        "parameters": [
          { "name": "page", "in": "query", "schema": { "type": "integer" } },
          { "name": "limit", "in": "query", "schema": { "type": "integer" } },
          { "name": "country", "in": "query", "schema": { "type": "string" } },
          { "name": "city", "in": "query", "schema": { "type": "string" } },
          { "name": "search", "in": "query", "schema": { "type": "string" } }
        ],
        "responses": { "200": { "description": "Lista de clientes" } }
      },
      "post": {
        "summary": "Crear un cliente",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "firstName": { "type": "string", "example": "John" },
                  "lastName": { "type": "string", "example": "Doe" },
                  "city": { "type": "string", "example": "Bogotá" },
                  "country": { "type": "string", "example": "Colombia" },
                  "phone": { "type": "string", "example": "123456789" }
                }
              }
            }
          }
        },
        "responses": { "201": { "description": "Cliente creado exitosamente." } }
      }
    },
    "/customers/{customerId}": {
      "get": {
        "summary": "Obtener detalle de cliente",
        "parameters": [{ "name": "customerId", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "responses": { "200": { "description": "Detalles del cliente" }, "404": { "description": "Cliente no encontrado" } }
      },
      "patch": {
        "summary": "Actualizar parcialmente un cliente",
        "parameters": [{ "name": "customerId", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "city": { "type": "string", "example": "Medellín" }
                }
              }
            }
          }
        },
        "responses": { "200": { "description": "Cliente actualizado exitosamente" }, "404": { "description": "No encontrado" } }
      }
    },
    "/customers/{customerId}/orders": {
      "get": {
        "summary": "Listar pedidos asociados a un cliente",
        "parameters": [{ "name": "customerId", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "responses": { "200": { "description": "Lista de pedidos del cliente" } }
      }
    },
    "/suppliers": {
      "get": {
        "summary": "Listar proveedores",
        "parameters": [
          { "name": "page", "in": "query", "schema": { "type": "integer" } },
          { "name": "limit", "in": "query", "schema": { "type": "integer" } },
          { "name": "country", "in": "query", "schema": { "type": "string" } },
          { "name": "search", "in": "query", "schema": { "type": "string" } }
        ],
        "responses": { "200": { "description": "Lista de proveedores" } }
      },
      "post": {
        "summary": "Crear proveedor",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "companyName": { "type": "string", "example": "Acme Corp" },
                  "contactName": { "type": "string", "example": "Alice" },
                  "city": { "type": "string", "example": "Miami" },
                  "country": { "type": "string", "example": "USA" },
                  "phone": { "type": "string", "example": "555-1234" }
                }
              }
            }
          }
        },
        "responses": { "201": { "description": "Proveedor creado" } }
      }
    },
    "/suppliers/{supplierId}": {
      "get": {
        "summary": "Detalle de proveedor",
        "parameters": [{ "name": "supplierId", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "responses": { "200": { "description": "Detalle del proveedor" } }
      },
      "patch": {
        "summary": "Actualizar parcialmente un proveedor",
        "parameters": [{ "name": "supplierId", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "contactName": { "type": "string", "example": "Bob" }
                }
              }
            }
          }
        },
        "responses": { "200": { "description": "Proveedor actualizado" } }
      }
    },
    "/suppliers/{supplierId}/products": {
      "get": {
        "summary": "Listar productos de un proveedor",
        "parameters": [{ "name": "supplierId", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "responses": { "200": { "description": "Lista de productos del proveedor" } }
      }
    },
    "/products": {
      "get": {
        "summary": "Listar productos",
        "parameters": [
          { "name": "page", "in": "query", "schema": { "type": "integer" } },
          { "name": "limit", "in": "query", "schema": { "type": "integer" } },
          { "name": "supplierId", "in": "query", "schema": { "type": "integer" } },
          { "name": "search", "in": "query", "schema": { "type": "string" } },
          { "name": "discontinued", "in": "query", "schema": { "type": "boolean" } }
        ],
        "responses": { "200": { "description": "Lista de productos." } }
      },
      "post": {
        "summary": "Crear producto",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "productName": { "type": "string", "example": "Queso" },
                  "supplierId": { "type": "integer", "example": 1 },
                  "unitPrice": { "type": "number", "example": 12.5 },
                  "package": { "type": "string", "example": "1 kg pkg" },
                  "isDiscontinued": { "type": "boolean", "example": false }
                }
              }
            }
          }
        },
        "responses": { "201": { "description": "Producto creado" } }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "Detalle de un producto",
        "parameters": [{ "name": "productId", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "responses": { "200": { "description": "Detalles del producto." } }
      },
      "put": {
        "summary": "Reemplazar completamente el producto",
        "parameters": [{ "name": "productId", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "productName": { "type": "string" },
                  "supplierId": { "type": "integer" },
                  "unitPrice": { "type": "number" },
                  "package": { "type": "string" },
                  "isDiscontinued": { "type": "boolean" }
                }
              }
            }
          }
        },
        "responses": { "200": { "description": "Producto reemplazado" } }
      },
      "patch": {
        "summary": "Actualizar parcialmente el producto",
        "parameters": [{ "name": "productId", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "unitPrice": { "type": "number" },
                  "isDiscontinued": { "type": "boolean" }
                }
              }
            }
          }
        },
        "responses": { "200": { "description": "Producto actualizado" } }
      },
      "delete": {
        "summary": "Eliminar producto o marcar como discontinuado",
        "parameters": [{ "name": "productId", "in": "path", "required": true, "schema": { "type": "integer" } }],
        "responses": {
          "204": { "description": "Producto eliminado" },
          "409": { "description": "Producto en uso. Marcado como discontinuado." }
        }
      }
    }
  }
};
