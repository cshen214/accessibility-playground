package accessibility_playground.controller;

import accessibility_playground.model.Challenge;
import accessibility_playground.service.ChallengeService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/challenges")
public class ChallengeController {

    private final ChallengeService challengeService;


    public ChallengeController(
            ChallengeService challengeService) {

        this.challengeService =
                challengeService;
    }


    @GetMapping
    public List<Challenge> getChallenges() {

        return challengeService.getAllChallenges();
    }


    @GetMapping("/{id}")
    public Challenge getChallenge(
            @PathVariable int id) {

        return challengeService
                .getChallengeById(id);
    }


    @PostMapping("/{id}/answer")
    public Map<String, Object> checkAnswer(
            @PathVariable int id,
            @RequestBody Map<String, String> request) {

        String answer =
                request.get("answer");

        Challenge challenge =
                challengeService.getChallengeById(id);

        if (challenge == null) {

            return Map.of(
                    "correct", false,
                    "feedback", "Challenge not found."
            );
        }


        boolean correct =
                challengeService.checkAnswer(
                        id,
                        answer
                );


        if (correct) {

            return Map.of(
                    "correct", true,
                    "feedback",
                    challenge.getFeedback()
            );
        }


        return Map.of(
                "correct", false,
                "feedback",
                "Not quite. Try looking at the interface more carefully."
        );
    }
}