package com.idb.laauth.Services.WebClient;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.idb.laauth.Models.Group.GroupBaseModel;

import reactor.core.publisher.Mono;

@Service
public class GroupClientService {

    @Value("${idb.3cx-api.base-url}")
    private String baseUrl3CX;

    public List<GroupBaseModel> retrieveAll() {
        WebClient webClient = WebClient.create(baseUrl3CX + "/api/v1");
        // WebClient client = WebClient.builder()
        //     .baseUrl(baseUrl3CX + "/api/v1/groups")
        //     .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
        //     .build();

        // RequestHea client.get();

        List<GroupBaseModel> groupBaseModels = new ArrayList<GroupBaseModel>(); 

        try {
            Mono<List<GroupBaseModel>> monoGroup = webClient.get()
            .uri("/groups")
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .header("X-API-KEY", "bkc4c0pWU0NkZTVFa21haA==")
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<List<GroupBaseModel>>() {});

            groupBaseModels = monoGroup.block();
        } catch (Exception e) {
            // TODO: handle exception
        }

        return groupBaseModels;
    }
}
