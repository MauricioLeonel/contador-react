const CACHE_ELEMENTS = ["./",
"https://unpkg.com/react@17/umd/react.production.min.js",
"https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
"https://unpkg.com/@babel/standalone/babel.min.js",
"./style.css",
"./components/Contador/index.js"];

const CACHE_NAME= "v3_cache_contador_react";
//iniciamos con el primer elemento -> self === this
//es la primer parte del ciclo de vida de un serviceWorker
self.addEventListener('install', (e)=>
	e.waitUntil(
		caches.open(CACHE_NAME).then(cache=>{
			cache.addAll(CACHE_ELEMENTS).then(e=>{
				self.skipWaiting()
			})
		}).catch(e=>console.log('error',e))
	)//espera a que algo que se ejecute
)

//activate un services worker -> cuando activamos tenemos que ver que cache esta activo 
self.addEventListener('activate', (e)=>{
	const cacheWhiteList = [CACHE_NAME];
	e.waitUntil(
		caches.keys().then((cachesName)=>{
			// return Promise.all(cachesName.map(cacheName=>{
			// 	return cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName) 
			// }))
			cachesName.map(cacheName=>{
				return cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName) 
			})
		}).then(e=>{
			self.clients.claim()
		})
	)
})

//el evento fetch lee cada peticion que se haya lanzado
self.addEventListener('fetch', (e)=>{
	e.respondWith(
		caches.match(e.request).then(res=> {
			if(res){
				return res
			}

			return fetch(e.request)
		})
	)
	
})
