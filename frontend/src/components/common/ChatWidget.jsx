import { useState, useRef } from "react";
import { X, Send } from "lucide-react";
import { BsRobot } from "react-icons/bs";
import Markdown from "react-markdown";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 30);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    scrollToBottom();

    const question = input;
    setInput("");
    setLoading(true);

    // AI message placeholder
    const aiId = crypto.randomUUID();
    setMessages((prev) => [...prev, { id: aiId, role: "ai", content: "" }]);

    try {
      const eventSource = new EventSource(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/api/chat/stream?request=${encodeURIComponent(question)}`
      );

      eventSource.onmessage = (event) => {
        const text = event.data;
        if (!text) return;

        // Append chunk vào AI message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiId ? { ...msg, content: msg.content + text } : msg
          )
        );
        scrollToBottom();
      };

      eventSource.onerror = () => {
        console.error("Stream error");
        eventSource.close();
        setLoading(false);
      };

      eventSource.onopen = () => {
        console.log("Stream connected");
      };
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 hover:cursor-pointer right-3 w-15 h-15 bg-(--color-background) rounded-full shadow-lg hover:transition-all z-50 flex items-center justify-center hover:scale-110"
        >
          <BsRobot className="text-white" size={30} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 md:w-md sm:w-sm bg-white h-[600px] rounded-lg shadow-xl z-50 border flex flex-col">
          <div className="flex justify-between items-center p-4 bg-(--color-background) text-white rounded-t-lg">
            <div>
              <p className="font-medium text-lg">Twan Hotel</p>
              <p>Chat với chúng tôi</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-(--color-primary) rounded p-1 transition-colors hover:cursor-pointer"
            >
              <X size={25} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm">
                Chào bạn! Tôi có thể giúp gì cho bạn?
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "ai" && msg.content === "" && loading ? (
                  <TypingIndicator />
                ) : (
                  <div
                    className={`p-3 rounded-lg whitespace-pre-wrap max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <Markdown>{msg.content}</Markdown>
                  </div>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-(--color-primary)"
              placeholder="Nhập tin nhắn..."
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-(--color-background) hover:cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-(--color-primary) disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const TypingIndicator = () => {
  return (
    <div className="flex gap-1 items-center px-3 py-2 bg-gray-200 rounded-xl w-fit">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
    </div>
  );
};

export default ChatWidget;
