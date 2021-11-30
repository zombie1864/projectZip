export const fetchData  = async (httpRoute) => {
    const res = await fetch(httpRoute)
    const backendData = await res.json()
    return backendData
}