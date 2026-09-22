package accessibility_playground.controller;

import accessibility_playground.model.Challenge;
import accessibility_playground.model.ChallengeResponse;
import accessibility_playground.service.ChallengeService;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
    public List<ChallengeResponse> getChallenges() {

        return challengeService
                .getAllChallengeResponses();
    }

    @GetMapping("/{id}")
    public ChallengeResponse getChallenge(
            @PathVariable int id) {

        Challenge challenge =
                challengeService
                        .getChallengeById(id);

        if (challenge == null) {
            return null;
        }

        return new ChallengeResponse(
                challenge.getId(),
                challenge.getTitle(),
                challenge.getQuestion()
        );
    }

    @PostMapping("/{id}/answer")
    public Map<String, Object> checkAnswer(
            @PathVariable int id,
            @RequestBody Map<String, String> request,
            HttpSession session) {

        String answer = request.get("answer");

        Challenge challenge =
                challengeService.getChallengeById(id);

        if (challenge == null) {
            return Map.of(
                    "correct", false,
                    "pointsEarned", 0,
                    "score", getScore(session),
                    "feedback", "Challenge not found."
            );
        }

        boolean correct =
                challengeService.checkAnswer(
                        id,
                        answer
                );

        Set<Integer> completedChallenges =
                getCompletedChallenges(session);

        int score = getScore(session);

        if (correct) {

            boolean firstCorrectAnswer =
                    !completedChallenges.contains(id);

            if (firstCorrectAnswer) {

                completedChallenges.add(id);
                score++;

                session.setAttribute(
                        "score",
                        score
                );
            }

            return Map.of(
                    "correct", true,
                    "pointsEarned",
                    firstCorrectAnswer ? 1 : 0,
                    "score", score,
                    "total", 3,
                    "feedback",
                    challenge.getFeedback()
            );
        }

        return Map.of(
                "correct", false,
                "pointsEarned", 0,
                "score", score,
                "total", 3,
                "feedback",
                "Not quite. Try looking at the interface more carefully."
        );
    }

    @PostMapping("/reset")
    public Map<String, Object> resetScore(
            HttpSession session) {

        session.setAttribute(
                "score",
                0
        );

        session.setAttribute(
                "completedChallenges",
                new HashSet<Integer>()
        );

        return Map.of(
                "score", 0,
                "total", 3
        );
    }

    private int getScore(HttpSession session) {

        Object score =
                session.getAttribute("score");

        if (score == null) {
            return 0;
        }

        return (int) score;
    }

    @SuppressWarnings("unchecked")
    private Set<Integer> getCompletedChallenges(
            HttpSession session) {

        Object completed =
                session.getAttribute(
                        "completedChallenges"
                );

        if (completed == null) {

            Set<Integer> newSet =
                    new HashSet<>();

            session.setAttribute(
                    "completedChallenges",
                    newSet
            );

            return newSet;
        }

        return (Set<Integer>) completed;
    }
}