import { useState, useRef, useCallback, useMemo } from 'react'

function EvasiveLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [isScared, setIsScared] = useState(false)
  const [escapeCount, setEscapeCount] = useState(0)
  const [isVanishing, setIsVanishing] = useState(false)
  const [isGone, setIsGone] = useState(false)
  const [tauntMessage, setTauntMessage] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const taunts = useMemo(
    () => [
      'Too slow!',
      'Nice try!',
      'Almost got me!',
      'Nope!',
      "Can't touch this!",
      'Missed me!',
      'Try again!',
      'So close... not!',
      'Haha!',
      '🏃💨',
    ],
    []
  )

  const evadeClick = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const buttonWidth = 120
    const padding = 20

    const maxX = container.width - buttonWidth - padding * 2
    const maxY = 100

    let newX, newY
    
    do {
      newX = Math.random() * maxX - maxX / 2
      newY = Math.random() * maxY - maxY / 2
    } while (
      Math.abs(newX - buttonPosition.x) < 50 &&
      Math.abs(newY - buttonPosition.y) < 30
    )

    setButtonPosition({ x: newX, y: newY })
    setIsScared(true)
    setEscapeCount((prev) => prev + 1)
    setTauntMessage(taunts[Math.floor(Math.random() * taunts.length)])

    setTimeout(() => setIsScared(false), 300)
    setTimeout(() => setTauntMessage(''), 1000)
  }, [buttonPosition, taunts])

  const handleMouseEnter = () => {
    evadeClick()
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault()
    evadeClick()
  }

  const handleClick = () => {
    if (isVanishing || isGone) return
    setIsVanishing(true)
    setTauntMessage('NOOO! 💀')
    setTimeout(() => {
      setIsGone(true)
      setTauntMessage('')
    }, 800)
  }

  const handleReset = () => {
    setIsGone(false)
    setIsVanishing(false)
    setButtonPosition({ x: 0, y: 0 })
    setEscapeCount(0)
    setTauntMessage("I'm back! 😈")
    setTimeout(() => setTauntMessage(''), 1500)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-gray-900 to-indigo-900 flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700 relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500 mr-2"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <div className="relative h-24 flex items-center justify-center">
            {tauntMessage && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-400 font-bold text-lg animate-bounce z-10">
                {tauntMessage}
              </div>
            )}
            {!isGone && (
              <button
                type="submit"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onTouchStart={handleTouchStart}
                style={{
                  transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px) ${isScared ? 'scale(0.9)' : 'scale(1)'} ${isVanishing ? 'scale(0) rotate(720deg)' : ''}`,
                  opacity: isVanishing ? 0 : 1,
                }}
                className={`
                  absolute px-8 py-3 text-white font-semibold rounded-lg
                  transition-all ease-out
                  ${isVanishing ? 'duration-700' : 'duration-200'}
                  ${isScared ? 'bg-red-500 shadow-red-500/50' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/50'}
                  shadow-lg
                `}
              >
                {isVanishing ? '😵 Goodbye!' : isScared ? '😱 Eek!' : 'Sign In'}
              </button>
            )}
            {isGone && (
              <div className="text-center">
                <p className="text-green-400 font-bold mb-2">
                  🎉 You caught me! 🎉
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Play Again?
                </button>
              </div>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don&apos;t have an account?{' '}
            <a
              href="#"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>

        {escapeCount > 0 && (
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Button escaped{' '}
              <span className="text-yellow-400 font-bold">{escapeCount}</span>{' '}
              times 🏃
            </p>
          </div>
        )}

        {escapeCount >= 10 && (
          <div className="mt-2 text-center">
            <p className="text-pink-400 text-sm animate-pulse">
              Maybe this button just doesn&apos;t want to be clicked? 🤔
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EvasiveLoginForm