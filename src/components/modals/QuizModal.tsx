import { useState } from "react";
import { X, BrainCircuit, Check, ArrowRight, SkipForward, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { mockQuizQuestions } from "@/data/mockData";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (score: number) => void;
}

export function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
  const [currentQuestion] = useState(1);
  const totalQuestions = 5;
  const question = mockQuizQuestions[0];
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectOption = (value: string) => {
    if (answered) return;
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    if (!selectedOption || answered) return;
    setAnswered(true);
    setIsCorrect(selectedOption === question.correctAnswer);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setAnswered(false);
    setIsCorrect(false);
    if (currentQuestion >= totalQuestions) {
      onComplete?.(80);
      onClose();
    }
  };

  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-black/60 backdrop-blur-md" />
      <DialogContent className="animate-modal-enter max-w-2xl p-0 bg-atlas-bg-secondary border-atlas-border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-9 pt-9 pb-7 border-b border-atlas-border/50">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-atlas-gold/8 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-atlas-gold" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-atlas-text-primary">Comprehension Quiz</h2>
                <p className="font-body text-sm text-atlas-text-muted mt-0.5">Test your understanding</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-xl hover:bg-atlas-bg-tertiary flex items-center justify-center transition-all duration-300"
            >
              <X className="w-[18px] h-[18px] text-atlas-text-secondary" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-display font-medium text-sm text-atlas-gold tabular-nums">
                Question {currentQuestion}/{totalQuestions}
              </span>
              <span className="font-body text-sm text-atlas-text-muted tabular-nums">{Math.round(progress)}% complete</span>
            </div>
            <div className="h-1.5 bg-atlas-bg-tertiary rounded-full overflow-hidden">
              <div 
                className="h-full bg-atlas-gold rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="px-9 py-7 animate-fade-in">
          <h3 className="font-display font-semibold text-lg text-atlas-text-primary mb-7">
            {question.question}
          </h3>

          {question.codeContext && (
            <div className="mb-7 code-block rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-3.5 h-3.5 text-atlas-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <span className="font-mono text-xs text-atlas-text-muted uppercase tracking-wider">Context</span>
              </div>
              <pre className="font-mono text-sm text-atlas-text-secondary overflow-x-auto">
                <code>{question.codeContext}</code>
              </pre>
            </div>
          )}

          {/* Options — Hover feedback with translateX */}
          <div className="space-y-3 mb-7">
            {question.options.map((option) => {
              const isSelected = selectedOption === option.value;
              const isCorrectOption = option.value === question.correctAnswer;
              const showCorrect = answered && isCorrectOption;
              const showIncorrect = answered && isSelected && !isCorrectOption;

              return (
                <button
                  key={option.value}
                  onClick={() => handleSelectOption(option.value)}
                  disabled={answered}
                  className={cn(
                    "quiz-option w-full text-left p-5 rounded-xl border bg-atlas-bg-primary flex items-center gap-4 disabled:cursor-not-allowed",
                    isSelected && !answered && "selected",
                    showCorrect && "correct",
                    showIncorrect && "incorrect",
                    !isSelected && !showCorrect && !showIncorrect && "border-atlas-border"
                  )}
                >
                  <div className={cn(
                    "relative w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all duration-300",
                    isSelected && !answered && "border-atlas-gold bg-atlas-gold",
                    showCorrect && "border-atlas-success bg-atlas-success",
                    showIncorrect && "border-atlas-error bg-atlas-error",
                    !isSelected && !showCorrect && !showIncorrect && "border-atlas-text-muted"
                  )}>
                    {(isSelected || showCorrect) && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-atlas-bg-primary" />
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-mono text-sm text-atlas-gold font-medium mr-2">{option.label}.</span>
                    <span className="font-body text-atlas-text-primary">{option.text}</span>
                  </div>
                  {showCorrect && <Check className="w-[18px] h-[18px] text-atlas-success" />}
                  {showIncorrect && <X className="w-[18px] h-[18px] text-atlas-error" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Panel — Semantic feedback */}
          {answered && (
            <div className="mb-4 animate-fade-in">
              <div className="bg-atlas-bg-primary rounded-xl p-6 border border-atlas-border">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5",
                    isCorrect ? "bg-atlas-success/8" : "bg-atlas-error/8"
                  )}>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-atlas-success" />
                    ) : (
                      <X className="w-5 h-5 text-atlas-error" />
                    )}
                  </div>
                  <div>
                    <h4 className={cn(
                      "font-display font-semibold mb-2",
                      isCorrect ? "text-atlas-success" : "text-atlas-error"
                    )}>
                      {isCorrect ? "Correct!" : "Not quite right"}
                    </h4>
                    <p className="font-body text-sm text-atlas-text-secondary">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer — Clear action hierarchy */}
        <div className="px-9 pb-9 pt-2 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="font-body text-sm text-atlas-text-muted hover:text-atlas-text-secondary transition-colors duration-300 flex items-center gap-2 active:scale-[0.98]"
          >
            <SkipForward className="w-4 h-4" />
            Skip Question
          </button>

          <div className="flex items-center gap-3">
            {!answered ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="btn-premium px-7 py-3 bg-atlas-gold hover:bg-atlas-gold-hover disabled:bg-atlas-bg-tertiary disabled:text-atlas-text-muted disabled:hover:translate-y-0 disabled:hover:shadow-none text-atlas-bg-primary font-display font-semibold text-sm rounded-xl disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Submit Answer</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-premium px-7 py-3 bg-atlas-gold hover:bg-atlas-gold-hover text-atlas-bg-primary font-display font-semibold text-sm rounded-xl flex items-center gap-2"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
