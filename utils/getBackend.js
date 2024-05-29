export function getBackend() {
  if(process.env.NODE_ENV==='development') {
    return 'http://localhost:3000';
  }else{
      return 'https://ip4.dev'
  }
}