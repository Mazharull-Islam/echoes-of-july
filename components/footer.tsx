import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mt-auto w-full border-t border-border bg-background",
        className
      )}
    >
      <Container className="flex flex-col items-start gap-1 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground sm:text-sm">
          © {new Date().getFullYear()} Echoes of July
        </p>
        <p className="text-xs text-muted-foreground sm:text-sm">
          An interactive documentary
        </p>
      </Container>
    </footer>
  );
}
