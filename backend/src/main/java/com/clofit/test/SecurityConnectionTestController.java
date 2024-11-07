
package com.clofit.test;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secure")
public class SecurityConnectionTestController {
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Not Found"),})
    @GetMapping
    @Operation(summary = "secure API 연결 테스트")
    public ResponseEntity<String> createEvaluation(){
        return ResponseEntity.ok().body("secure API CONNECTION SUCCESS");
    }
}
