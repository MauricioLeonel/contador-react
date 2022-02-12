const Contador = ()=>{

	const [contador, setContador] = React.useState(0)
	console.log(contador)

	const aumentar = e=>setContador(contador + 1)
	const diminuir = e=>setContador(contador - 1)
	return (
		<div>
			<h1 className={contador < 0 ? 'menor' : 'mayor'}>contador : {contador}</h1>
			<hr/>
			<button onClick={aumentar}> aumentar</button>
			<button onClick={diminuir}> disminuir</button>
			
		</div>
	)
}