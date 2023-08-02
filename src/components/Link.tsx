
export function Link({ to, children }: { to: string, children: React.ReactNode }) {
 return (
    <a href={to}> {children} </a>
 );   
}