package com.clofit.test;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/gpu")
public class GPUConnectionTestController {

    private final Logger logger = LoggerFactory.getLogger(GPUConnectionTestController.class);

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),})
    @GetMapping
    @Operation(summary = "gpu API 연결 테스트")
    public ResponseEntity<String> createEvaluation(){
        logger.info("GPU API LOG TEST");
        return ResponseEntity.ok().body("gpu API CONNECTION SUCCESS");
    }

}
