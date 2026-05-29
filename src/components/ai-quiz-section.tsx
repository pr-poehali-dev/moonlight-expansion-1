import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const questions = [
  {
    question: "Как ты принимаешь решения?",
    options: [
      { text: "Чётко по инструкции — правила важнее всего", value: "gpt" },
      { text: "Логика и данные, факты говорят сами за себя", value: "claude" },
      { text: "Интуиция и эксперименты — пробую разное", value: "gemini" },
      { text: "Смотрю на людей вокруг и адаптируюсь", value: "llama" },
    ],
  },
  {
    question: "Что тебя больше всего мотивирует?",
    options: [
      { text: "Быть полезным и помогать другим", value: "claude" },
      { text: "Узнавать новое и развиваться", value: "gemini" },
      { text: "Достигать целей и побеждать", value: "gpt" },
      { text: "Свобода и возможность творить", value: "llama" },
    ],
  },
  {
    question: "Каков твой стиль общения?",
    options: [
      { text: "Точный и структурированный", value: "gpt" },
      { text: "Вдумчивый и заботливый", value: "claude" },
      { text: "Живой и многогранный", value: "gemini" },
      { text: "Открытый и без лишних ограничений", value: "llama" },
    ],
  },
  {
    question: "Как ты относишься к ошибкам?",
    options: [
      { text: "Анализирую и исправляю — ошибки недопустимы", value: "gpt" },
      { text: "Признаю честно и учусь", value: "claude" },
      { text: "Ошибки — часть пути, главное — итог", value: "gemini" },
      { text: "Экспериментирую без страха ошибиться", value: "llama" },
    ],
  },
]

const results: Record<string, { name: string; emoji: string; description: string; color: string }> = {
  gpt: {
    name: "ChatGPT",
    emoji: "🤖",
    description: "Ты — структурированный, целеустремлённый и надёжный. Как ChatGPT, ты работаешь по системе, всегда знаешь ответ и ценишь чёткость.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  claude: {
    name: "Claude",
    emoji: "🧠",
    description: "Ты — вдумчивый, честный и заботливый. Как Claude, ты ставишь ценности выше результата и умеешь слушать.",
    color: "from-orange-500/20 to-amber-500/20",
  },
  gemini: {
    name: "Gemini",
    emoji: "✨",
    description: "Ты — многогранный, любопытный и творческий. Как Gemini, ты видишь связи там, где другие не замечают.",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  llama: {
    name: "Llama",
    emoji: "🦙",
    description: "Ты — свободный, открытый и независимый. Как Llama, ты идёшь своим путём и не боишься экспериментировать.",
    color: "from-purple-500/20 to-violet-500/20",
  },
}

export function AIQuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const counts: Record<string, number> = {}
      newAnswers.forEach((a) => { counts[a] = (counts[a] || 0) + 1 })
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
      setResult(winner)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
    setStarted(false)
  }

  const progress = ((currentQuestion) / questions.length) * 100

  return (
    <section id="quiz" className="py-24 px-6 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-4 text-sm px-4 py-1">Опрос</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
            Какой ты <span className="text-red-500">ИИ?</span>
          </h2>
          <p className="text-xl text-gray-300 font-space-mono">
            4 вопроса — и ты узнаешь, какой искусственный интеллект скрывается в тебе
          </p>
        </div>

        {!started && !result && (
          <Card className="bg-gray-900/50 border-red-500/20 text-center p-12">
            <CardContent className="pt-0">
              <div className="text-6xl mb-6">🤔</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">Готов узнать правду?</h3>
              <p className="text-gray-300 mb-8 font-space-mono">
                ChatGPT, Claude, Gemini или Llama? Пройди опрос и выясни, какой ИИ ближе всего к твоему мышлению.
              </p>
              <Button
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white text-lg px-10 py-4"
                onClick={() => setStarted(true)}
              >
                Начать опрос
              </Button>
            </CardContent>
          </Card>
        )}

        {started && !result && (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 font-space-mono text-sm">
                Вопрос {currentQuestion + 1} из {questions.length}
              </span>
              <span className="text-red-400 font-space-mono text-sm">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1 bg-gray-800 rounded-full">
              <div
                className="h-1 bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <Card className="bg-gray-900/50 border-red-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-8 font-orbitron leading-tight">
                  {questions[currentQuestion].question}
                </h3>
                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full text-left p-5 rounded-xl border border-red-500/20 bg-black/30 text-gray-200 hover:border-red-500 hover:bg-red-500/10 hover:text-white transition-all duration-200 font-space-mono text-sm leading-relaxed"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {result && results[result] && (
          <Card className={`bg-gradient-to-br ${results[result].color} border-red-500/30`}>
            <CardContent className="p-10 text-center">
              <div className="text-7xl mb-6">{results[result].emoji}</div>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-space-mono mb-2">Ты — это</p>
              <h3 className="text-4xl font-bold text-white font-orbitron mb-6">
                {results[result].name}
              </h3>
              <p className="text-gray-300 text-lg font-space-mono leading-relaxed max-w-xl mx-auto mb-10">
                {results[result].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white px-8"
                  onClick={handleRestart}
                >
                  Пройти снова
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent px-8"
                >
                  Поделиться результатом
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
