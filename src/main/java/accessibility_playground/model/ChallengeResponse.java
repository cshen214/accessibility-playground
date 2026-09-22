package accessibility_playground.model;

public class ChallengeResponse {

    private int id;
    private String title;
    private String question;

    public ChallengeResponse(
            int id,
            String title,
            String question) {

        this.id = id;
        this.title = title;
        this.question = question;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getQuestion() {
        return question;
    }
}