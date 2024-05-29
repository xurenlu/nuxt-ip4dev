export default  defineEventHandler(async (event) => {
    const req = event.req;
    const query = getQuery(event)
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let resp = await fetch(`https://api.ip4.dev/location/${ip}`)
    let data =  await resp.json()

    if( query.format && query.format === 'json') return data;
    if(query.callback) {
        let json = JSON.stringify(data)
        return  `${query.callback}(${json})`
    }
    return ip
})