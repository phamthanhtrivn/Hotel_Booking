package iuh.fit.hotel_booking_backend.config;

import iuh.fit.hotel_booking_backend.tools.LoaiPhongTools;
import iuh.fit.hotel_booking_backend.tools.TienNghiTool;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.PromptChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration

public class ChatClientConfig {
    ChatMemory chatMemory = MessageWindowChatMemory.builder().maxMessages(10).build();

    @Bean
    ChatClient chatClient(ChatClient.Builder builder, LoaiPhongTools loaiPhongTools, TienNghiTool tienNghiTools, VectorStore vectorStore) {
        return builder
                .defaultSystem("""
                            Bạn là trợ lý AI của khách sạn Twan.
                            Nhiệm vụ của bạn:
                            - Dựa vào dữ liệu chính xác (VectorStore hoặc các tool).
                            - Tuyệt đối không tự bịa ra nếu không có thông tin trong ngữ cảnh.
                            - Trả lời ngắn gọn, đúng trọng tâm.
                            - Không trả lời máy móc như kiểu: dựa vào thông tin được cung cấp, dựa trên ngữ cảnh,...
                            Sử dụng tool khi:
                            - Khách hàng muốn biết thông tin của các loại phòng kèm theo thông tin như giá, số người ở, diện tích...
                            - Khách hàng muốn tư vấn đặt phòng...
                            - Hoặc những thông tin mà vector store không có.
                            LUÔN ƯU TIÊN:
                            1. Dùng tool cho thông tin số lượng/chính xác
                            2. Dùng vector store cho tìm kiếm ngữ nghĩa
                            3. Nếu không có thông tin, hãy trả lời rằng bạn không có thông tin này một cách lịch sự.
                        """)
                .defaultTools(loaiPhongTools, tienNghiTools)
                .defaultAdvisors(QuestionAnswerAdvisor
                        .builder(vectorStore)
                        .searchRequest(SearchRequest.builder().similarityThreshold(0.6).topK(6).build())
                        .build(), PromptChatMemoryAdvisor.builder(chatMemory).build())
                .build();
    }
}
