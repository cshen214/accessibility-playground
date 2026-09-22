package accessibility_playground.service;

import accessibility_playground.model.Challenge;
import accessibility_playground.model.ChallengeResponse;

import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.util.List;

@Service
public class ChallengeService {

    private final List<Challenge> challenges = List.of(

            new Challenge(
                    1,
                    "Color Contrast",
                    "What is the accessibility problem?",
                    "contrast",
                    "Correct! The button has very low color contrast, making it difficult for some users to read."
            ),

            new Challenge(
                    2,
                    "Keyboard Navigation",
                    "What is the accessibility problem?",
                    "keyboard",
                    "Correct! The Email Notifications control cannot be reached using normal keyboard navigation."
            ),

            new Challenge(
                    3,
                    "Form Labels",
                    "What is the accessibility problem?",
                    "label",
                    "Correct! The email field does not have a label that is programmatically associated with it."
            )
    );


    public List<Challenge> getAllChallenges() {
        return challenges;
    }

    public List<ChallengeResponse> getAllChallengeResponses() {

        return challenges.stream()
            .map(challenge -> new ChallengeResponse(
                    challenge.getId(),
                    challenge.getTitle(),
                    challenge.getQuestion()
            ))
            .collect(Collectors.toList());
    }


    public Challenge getChallengeById(int id) {

        return challenges.stream()
                .filter(challenge -> challenge.getId() == id)
                .findFirst()
                .orElse(null);
    }


    public boolean checkAnswer(
            int challengeId,
            String answer) {

        Challenge challenge =
                getChallengeById(challengeId);

        if (challenge == null) {
            return false;
        }

        return challenge.getCorrectAnswer()
                .equals(answer);
        }
    public int calculateScore(List<String> answers) {

        int score = 0;

        for (int i = 0; i < challenges.size(); i++) {

            if (i < answers.size()
                    && challenges.get(i)
                            .getCorrectAnswer()
                            .equals(answers.get(i))) {

                score++;
            }
        }

        return score;
    }
}

