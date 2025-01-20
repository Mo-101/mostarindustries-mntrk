import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { langChainService } from "@/services/langchain";

interface Message {
  content: string;
  isUser: boolean;
  type?: 'analysis' | 'prediction' | 'general';
}

export const ConversationBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageType = input.toLowerCase().includes('analyze') 
      ? 'analysis' as const
      : input.toLowerCase().includes('predict') 
      ? 'prediction' as const
      : 'general' as const;

    const userMessage: Message = { 
      content: input, 
      isUser: true, 
      type: messageType 
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await langChainService.chat(input, messageType);
      const aiMessage: Message = { 
        content: response, 
        isUser: false, 
        type: messageType 
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="rounded-full h-12 w-12 relative"
        >
          <MessageCircle className="h-6 w-6 animate-pulse" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-[350px] h-[500px] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">MNTRK Assistant</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                Send
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};