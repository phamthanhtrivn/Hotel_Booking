package iuh.fit.hotel_booking_backend.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class VectorStoreService {
    @Autowired
    VectorStore vectorStore;

    // Thêm một list document vào Qdrant
    public void addDocuments(List<Document> documents) {
        vectorStore.add(documents);
    }

    // Tìm kiếm document tương đồng với query
    public List<Document> searchSimilar(String query, int topK) {
        SearchRequest request = SearchRequest.builder()
                .query(query)
                .topK(topK)
                .build();
        return vectorStore.similaritySearch(request);
    }

}
