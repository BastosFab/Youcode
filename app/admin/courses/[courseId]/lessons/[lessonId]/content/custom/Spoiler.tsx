import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { z } from "zod";

export const SpoilerSchema = z.object({
  title: z.string(),
  children: z.string(),
});

type SpoilerProps = z.infer<typeof SpoilerSchema>;

export function Spoiler({ title, children }: SpoilerProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="not-prose w-full rounded-lg border bg-accent/10 text-card-foreground shadow-sm"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="p-4 text-xl font-bold">
          {title}
        </AccordionTrigger>
        <AccordionContent className="border-t p-4">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
