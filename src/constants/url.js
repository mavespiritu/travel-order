const apiUrl = import.meta.env.VITE_API_URL
const beUrl = import.meta.env.VITE_APP_BE_URL
const appUrl = import.meta.env.VITE_APP_URL
const azureClientId = import.meta.env.VITE_AZURE_CLIENT_ID
const azureTenantId = import.meta.env.VITE_AZURE_TENANT_ID
const azureGraphEndpoint = import.meta.env.VITE_AZURE_GRAPH_ENDPOINT

export {
  apiUrl,
  beUrl,
  appUrl,
  azureClientId,
  azureTenantId,
  azureGraphEndpoint
}