import { cn, scoreBg, scoreColor } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  score: number;
}

export function ScoreBar({ label, score }: ScoreBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-ink-muted">{label}</span>
        <span className={cn("font-semibold tabular-nums", scoreColor(score))}>{score}/10</span>
      </div>
      <div className="score-bar">
        <div
          className={cn("h-full rounded-full transition-all duration-500", scoreBg(score))}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}

interface PostScoreCardProps {
  scores: {
    hookStrength: number;
    clarity: number;
    originality: number;
    linkedInReadability: number;
    overall: number;
    notes: string;
  };
}

export function PostScoreCard({ scores }: PostScoreCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h4 className="text-sm font-semibold text-ink">Post Score</h4>
        <span className={cn("text-2xl font-bold tabular-nums", scoreColor(scores.overall))}>
          {scores.overall}
          <span className="text-sm font-normal text-ink-subtle">/10</span>
        </span>
      </div>
      <div className="space-y-3">
        <ScoreBar label="Hook strength" score={scores.hookStrength} />
        <ScoreBar label="Clarity" score={scores.clarity} />
        <ScoreBar label="Originality" score={scores.originality} />
        <ScoreBar label="LinkedIn readability" score={scores.linkedInReadability} />
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">{scores.notes}</p>
    </div>
  );
}
