export default  defineEventHandler(async (event) => {
    const ip = getRouterParam(event, 'ip')
    let resp = await fetch(`https://api.ip4.dev/location/${ip}`)
    return await resp.json()
})