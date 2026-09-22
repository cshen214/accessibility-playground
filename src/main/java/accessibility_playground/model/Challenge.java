package accessibility_playground.model;

public class Challenge {

    private int id;
    private String title;
    private String question;
    private String correctAnswer;
    private String feedback;

    public Challenge(
            int id,
            String title,
            String question,
            String correctAnswer,
            String feedback) {

        this.id = id;
        this.title = title;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.feedback = feedback;
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

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public String getFeedback() {
        return feedback;
    }
}