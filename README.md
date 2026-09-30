# 🛡️ Algiz Vault (ES)

> Backend seguro y ligero para un gestor de contraseñas construido con Node.js, TypeScript, Express y MySQL, con cifrado AES-256-GCM.

---

## 🎯 Descripción General del Proyecto

**Algiz Vault** es un backend para la gestión de contraseñas enfocado en la seguridad y centrado en los desarrolladores, diseñado con un fuerte énfasis en la privacidad de los datos y los estándares criptográficos modernos. Proporciona una API REST robusta para gestionar usuarios y almacenar de forma segura credenciales sensibles protegidas mediante cifrado simétrico de extremo a extremo.

---

## 🚀 Arquitectura y Tecnologías Principales

* **Lenguaje y Entorno:** TypeScript sobre Node.js
* **Framework:** Express.js (Arquitectura modular: Rutas, Controladores y Servicios)
* **Base de Datos y ORM:** MySQL gestionado a través de Prisma ORM
* **Seguridad y Criptografía:** 
  * Módulo nativo `crypto` de Node.js implementando **AES-256-GCM** (Cifrado Autenticado).
  * Generación dinámica de IV (Vector de Inicialización) y Etiqueta de Autenticación para cada secreto almacenado.
  * Cabeceras de seguridad y utilidad impulsadas por `Helmet` y `CORS`.

---

## ⚙️ Características Actuales (v1.0 - En Desarrollo)

* **Ciclo de Vida de Usuarios:** Registro seguro de usuarios con validación de unicidad de correo electrónico y asociación de hash maestro.
* **Almacenamiento Cifrado en el Cofre:** Cifrado automático de payloads sensibles antes de persistirlos en la base de datos.
* **Descifrado Bajo Demanda:** Canal de recuperación seguro que busca, autentica y descifra credenciales exclusivamente para usuarios autorizados.

---

## 📡 Endpoints Implementados

| Método | Endpoint | Descripción | Estado |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/vault/users` | Registrar un nuevo usuario en el cofre | Completado ✅ |
| `POST` | `/api/vault/items` | Cifrar y almacenar un nuevo secreto | Completado ✅ |
| `GET` | `/api/vault/items/:id` | Recuperar y descifrar un secreto específico | Completado ✅ |

---

## 🗺️ Hoja de Ruta / Próximas Funcionalidades

* [ ] Middleware de autenticación basado en JWT para rutas protegidas.
* [ ] Endpoint de listado masivo para obtener todos los elementos del cofre pertenecientes a un usuario específico.
* [ ] Integración con el cliente frontend.

---

# 🛡️ Algiz Vault (EN)

> Secure, lightweight password manager backend built with Node.js, TypeScript, Express, and MySQL, featuring AES-256-GCM encryption.

---

## 🎯 Project Overview

**Algiz Vault** is a secure, developer-focused password management backend designed with a strong emphasis on data privacy and modern cryptographic standards. It provides a robust REST API to manage users and safely store sensitive credentials protected by end-to-end symmetric encryption.

---

## 🚀 Core Architecture & Tech Stack

* **Language & Runtime:** TypeScript on Node.js
* **Framework:** Express.js (Modular architecture: Routes, Controllers, Services)
* **Database & ORM:** MySQL managed via Prisma ORM
* **Security & Cryptography:** 
  * Native Node.js `crypto` module implementing **AES-256-GCM** (Authenticated Encryption).
  * Dynamic IV and Auth Tag generation for every stored secret.
  * Security and utility headers powered by `Helmet` and `CORS`.

---

## ⚙️ Current Features (v1.0 - In Development)

* **User Lifecycle:** Secure user registration with email uniqueness validation and master hash association.
* **Encrypted Vault Storage:** Automatic encryption of sensitive payloads before persisting them to the database.
* **On-Demand Decryption:** Secure retrieval pipeline that fetches, authenticates, and decrypts credentials exclusively for authorized users.

---

## 📡 Implemented Endpoints

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/vault/users` | Register a new vault user | Completed ✅ |
| `POST` | `/api/vault/items` | Encrypt and store a new vault secret | Completed ✅ |
| `GET` | `/api/vault/items/:id` | Retrieve and decrypt a specific secret | Completed ✅ |

---

## 🗺️ Roadmap / Upcoming Features

* [ ] JWT-based authentication middleware for protected routes.
* [ ] Bulk retrieval endpoint to list all vault items belonging to a specific user.
* [ ] Frontend client integration.
