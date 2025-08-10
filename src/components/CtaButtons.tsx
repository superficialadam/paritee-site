interface CtaButton {
  text: string
  href: string
  icon?: React.ReactNode
}

interface CtaButtonsProps {
  primary: CtaButton
  secondary?: CtaButton
  className?: string
}

export default function CtaButtons({ primary, secondary, className = '' }: CtaButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className}`}>
      <a
        href={primary.href}
        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
      >
        {primary.text}
        {primary.icon && <span className="ml-2">{primary.icon}</span>}
      </a>
      
      {secondary && (
        <a
          href={secondary.href}
          className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md hover:bg-muted transition-colors font-medium"
        >
          {secondary.text}
          {secondary.icon && <span className="ml-2">{secondary.icon}</span>}
        </a>
      )}
    </div>
  )
}