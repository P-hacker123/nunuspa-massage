export default function MapEmbed({ className = '', style = {} }: { className?: string, style?: React.CSSProperties }) {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5198629928!2d30.0622!3d-1.9536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTcnMTMuMCJTIDMwwrAwMycxOS45IkU!5e0!3m2!1sen!2srw!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, ...style }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={className}
        />
    )
}
