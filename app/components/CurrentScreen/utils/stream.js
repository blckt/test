export function initPreview(options){
  return new Promise((resolve,reject)=>{
   const gotStream =(stream)=>{
      resolve(stream);
    }
    const gotError=(err)=>{
      reject(err);
    }
    navigator.webkitGetUserMedia(options,gotStream,gotError)
  })
}
