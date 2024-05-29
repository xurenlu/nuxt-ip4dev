export default  defineEventHandler(event => {
    const req = event.req;
    const query = getQuery(event)
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if( query.format && query.format === 'json') return {
        code:200,
        data: ip
    }
    if(query.callback) {
        return  `${query.callback}("${ip}")`
    }
    return ip
})