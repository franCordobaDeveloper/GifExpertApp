interface Props {
    title: string;
    description?: string;
}

export const CustomHeader = ({ title, description }: Props) => {
    return (
        <header className="app-header">
            <h1>{title}</h1>
            {description && <p className="header-subtitle">{description}</p>}
        </header>
    )
}
