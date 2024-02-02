export default function Footer() {
	const year = new Date().getFullYear();

	return <footer className="text-xs p-4 border-t flex text-muted-foreground whitespace-pre">&copy; {year}</footer>;
}
