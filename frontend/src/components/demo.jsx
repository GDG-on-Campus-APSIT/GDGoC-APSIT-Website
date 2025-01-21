import { WarpBackground } from "@/components/ui/warp-background";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/wrap-card";
import { CardFooter } from "./ui/card";

export function ExampleComponentDemo() {
  return (
    <WarpBackground>
      <Card className="w-80">
        <CardContent className="flex flex-col gap-2 p-4">
          <CardTitle>Congratulations on Your Certificate!</CardTitle>
          <CardDescription>
            Your hard work and dedication have paid off. We&apos;re thrilled to
            see you take this next step in your career. Keep up the fantastic
            work!
          </CardDescription>
          </CardContent>
          <CardTitle className="text-base text-black pl-4">
            This certificate is valid for a lifetime.
          </CardTitle>
        
      </Card>
    </WarpBackground>
  );
}
