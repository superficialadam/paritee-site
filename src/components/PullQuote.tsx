import { Quote } from 'lucide-react'

interface PullQuoteProps {
  quote: string
  author: string
  title: string
}

export default function PullQuote({ quote, author, title }: PullQuoteProps) {
  return (
    <blockquote className="relative bg-muted/30 p-8 rounded-lg">
      <Quote className="absolute top-4 left-4 text-accent opacity-20" size={32} />
      <p className="text-xl italic leading-relaxed mb-6 relative z-10">
        "{quote}"
      </p>
      <footer className="relative z-10">
        <div className="font-semibold font-heading">{author}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </footer>
    </blockquote>
  )
}