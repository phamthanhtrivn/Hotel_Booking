package iuh.fit.hotel_booking_backend.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class DocumentVectorService {
    @Autowired
    private VectorStore vectorStore;

    @PostConstruct
    public void loadTextDocuments() throws IOException {
        // Load file 1
        Resource resource1 = new ClassPathResource("documents/hotel_policy.txt");
        String chinhSach = new String(resource1.getInputStream().readAllBytes());
        Document doc1 = new Document(
                UUID.nameUUIDFromBytes("policy_doc_001".getBytes()).toString(),
                chinhSach,
                Map.of("type", "policy", "source", "hotel_policy.txt", "category", "terms")
        );
        vectorStore.add(List.of(doc1));

        // Load file 2
        Resource resource2 = new ClassPathResource("documents/hotel_introduce.txt");
        String gioiThieu = new String(resource2.getInputStream().readAllBytes());
        Document doc2 = new Document(
                UUID.nameUUIDFromBytes("intro_doc_002".getBytes()).toString(),
                gioiThieu,
                Map.of("type", "introduction", "source", "hotel_introduce.txt", "category", "hotel_info")
        );
        vectorStore.add(List.of(doc2));
    }
}
