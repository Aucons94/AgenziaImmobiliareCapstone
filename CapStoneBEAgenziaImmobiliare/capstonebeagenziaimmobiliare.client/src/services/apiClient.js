import { jwtDecode } from "jwt-decode";

/**
 * Verifica se il token JWT è scaduto
 */
export function isTokenExpired(token) {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Errore nella decodifica del token:", error);
    return true;
  }
}

/**
 * Ottiene il token dal localStorage
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Rimuove il token e reindirizza al login
 */
export function handleTokenExpired() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}

/**
 * API Client centralizzato con gestione automatica del token
 */
class ApiClient {
  /**
   * Esegue una chiamata fetch con gestione automatica dell'autenticazione
   * @param {string} url - URL dell'endpoint
   * @param {object} options - Opzioni fetch
   * @returns {Promise<Response>}
   */
  async fetch(url, options = {}) {
    const token = getToken();

    // Verifica token per richieste autenticate
    if (token && isTokenExpired(token)) {
      console.warn("Token scaduto. Reindirizzamento al login...");
      handleTokenExpired();
      return Promise.reject(new Error("Token scaduto"));
    }

    // Prepara headers
    const headers = {
      ...options.headers,
    };

    // Aggiungi token se presente
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Aggiungi Content-Type solo se non è FormData
    if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    const fetchOptions = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, fetchOptions);

      // Gestione errori HTTP
      if (!response.ok) {
        // Token scaduto o non autorizzato
        if (response.status === 401) {
          console.warn("Non autorizzato. Reindirizzamento al login...");
          handleTokenExpired();
          throw new Error("Non autorizzato");
        }

        // Altri errori HTTP
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error("Errore nella chiamata API:", error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(url, options = {}) {
    return this.fetch(url, {
      ...options,
      method: "GET",
    });
  }

  /**
   * POST request
   */
  async post(url, body, options = {}) {
    return this.fetch(url, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  /**
   * PUT request
   */
  async put(url, body, options = {}) {
    return this.fetch(url, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  /**
   * DELETE request
   */
  async delete(url, options = {}) {
    return this.fetch(url, {
      ...options,
      method: "DELETE",
    });
  }
}

// Esporta istanza singleton
const apiClient = new ApiClient();
export default apiClient;
