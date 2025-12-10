package iuh.fit.hotel_booking_backend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service

public class AIService {
    private final ChatClient chatClient;

    @Autowired
    public AIService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public Flux<String> chatWithTool(String userMessage) {
        return this.chatClient.prompt().user(userMessage)
                .stream()
                .content().transform(this::emitByWords);
    }

    private Flux<String> emitByWords(Flux<String> flux) {
        return Flux.create(sink -> {
            StringBuilder buffer = new StringBuilder();

            flux.subscribe(chunk -> {
                        buffer.append(chunk);

                        // Tách theo khoảng trắng
                        int lastSpaceIndex = buffer.lastIndexOf(" ");

                        // Nếu có từ hoàn chỉnh thì emit
                        if (lastSpaceIndex != -1) {
                            String complete = buffer.substring(0, lastSpaceIndex + 1);
                            sink.next(complete);

                            // giữ lại phần còn lại chưa hoàn chỉnh
                            buffer.delete(0, lastSpaceIndex + 1);
                        }
                    }, sink::error,
                    () -> {
                        // emit phần cuối
                        if (!buffer.isEmpty()) {
                            sink.next(buffer.toString());
                        }
                        sink.complete();
                    });
        });
    }
}
