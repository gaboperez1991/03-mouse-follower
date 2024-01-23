import { useState } from "react"
import { useEffect } from "react"

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y:0 })

  // pointer move
  useEffect(() => {
    console.log('effect', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', {clientX, clientY})
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
    window.addEventListener('pointermove', handleMove)
  }

    // cleanup
    // cuando el componente se desmonta 
    // cuando cambia las dependencias, antes de ejecutar el efecto nuevo 
  return () => {
    window.removeEventListener('pointermove', handleMove)
  }
}, [enabled])

  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
    <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
    }}>
    </div>
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? 'Desactivar' : 'Activar'} seguir puntero </button>
    </>
  )
}

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  )

}

export default App
