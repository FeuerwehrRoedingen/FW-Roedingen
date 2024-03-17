
export function proxy(url: string){
  return `/api/proxy?url=${encodeURIComponent(url)}`
}
